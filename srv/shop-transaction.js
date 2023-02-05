const cds = require('@sap/cds');
const { Customers, Products, Orders } = cds.entities('smartshop.db');

module.exports = cds.service.impl( (srv) => {
    srv.before(['SAVE'], 'Orders', async (req) => {

        if (req.data.items == undefined) {return }
        else if (req.data.items.length == 0) { req.error({code: 405, message: "No items specified."} ); return; }
        
        //Get customer information and throw error if it's not active
        await cds.tx(req).run(SELECT.from(Customers).where({ID: req.data.customer_ID}))
        .then(async resolve => {console.log("Customer Select>>>>", resolve);
        if (resolve.length === 0) {req.error(405, "Customer not found");}
        else if (resolve[0].creditStatus != 'active') {req.error(405, "Customer is blocked");}
        else {

        //Get product details from the line items in the order
        await cds.tx(req).run(SELECT.from(Products)
        .where({ID: {in: req.data.items.map(item=> item.product_ID)}}))
        .then(prodsFetched => {
            // console.log(prodsFetched);
            
            //Loop through all the line items and validate product. Put all other 
            //product related information at the line item
            let count = 0; let ordTotal = 0;
            req.data.items = req.data.items.map(item => {

                //Find the product at the item with all the product data fetched
                let prod = prodsFetched.find(o=> o.ID === item.product_ID);
                if (prod == undefined ) {
                    //Throw error if product provided at the item is not available
                    req.error(405, "Product not found.");} 
                else {
                    // console.log(prod);
                    //Check stock and update price
                    if (prod.stock < item.quantity) {
                        req.error(405, "Not enough stock");
                    } else if (prod.price != item.unitPrice) {
                        item.unitPrice = prod.price;
                        req.notify(208, "Product price updated.");
                    }

                    //Put unit at item from product master
                    item.unit = prod.unit;
                    //Calculate item total
                    item.itemPrice = item.unitPrice * item.quantity;

                    //Reduce stock quantity based on the item quantity received
                    cds.tx(req).run(UPDATE(Products)
                         .set('stock -=', item.quantity).where('ID =', item.product_ID))
                         .then(result => {if (result[0] === 0) req.error(405, "Error updating stock");});

                }
                
                //Calculate order total that is to be used outside this loop
                item.itemNo = ++count;
                ordTotal += item.itemPrice;
                //Pass the updated item back to the item array
                return item;
            });

            //Update order total and put order status based on that
            req.data.totalPrice = ordTotal;
            if (ordTotal > 100000) {
                req.data.orderStatus = 'Pending';
            } else {
                req.data.orderStatus = 'Okay';
            }
        }); 
        }});
    });

    srv.after('READ', 'Orders', (lines) => { 
        //Update the actionEnabled field based on order status. This would be
        //used for enabling the action buttons(approve/reject)
        //This is used in service definition annotation
        if(Array.isArray(lines)) {
        lines.map((line) => line.actionEnabled = line.orderStatus == 'Pending') }
        else if(lines != null){
            lines.actionEnabled = lines.orderStatus == 'Pending';
        }
    } );

    srv.on('DELETE', 'Orders', async (req, next) => {
        console.log("Delete req>>>>",req.data);
        
        //Fetch the order details along with the line items
        await cds.tx(req).run(SELECT.from(Orders, a => {a`.*`, a.items(b => b`.*`) })
        .where({ID: req.data.ID}))
        .then(async resolve => {
            console.log("Orders>>>>",resolve);
            //Update the stock value as the item is being deleted
            if (resolve.length != 0) {
                await cds.tx(req).run(resolve[0].items.map(item => UPDATE(Products)
                .set('stock +=', item.quantity).where('ID =', item.product_ID)))
                .then(async resolve => {
                    //If all the stocks are updated successfully, pass the control to generic handler
                    //to delete the order; else issue error
                    if ( resolve.some(row => !row)) req.error("Error updating stock back.");
                    else await next(); 
                });
            }
        });

        // const result = await next().then(resolve => console.log("Del>>>>",resolve));
        // console.log("Delete Result>>>>", result);
    });

    //Stop edit for the time being
    srv.reject('UPDATE', 'Orders');

    //Action - Approve
    srv.on('ApproveOrder', approve_order);

    //Action - Reject
    srv.on('RejectOrder', reject_order);

});

async function approve_order(req) {
    //Update orderStatus with comment received
    const ID = req.params[0].ID;
    await cds.tx(req).run(UPDATE(Orders).set('orderStatus = `Approved`')
    .set('comment =', req.data.comment).where('ID =', ID));
}

async function reject_order(req) {
    //Update orderStatus with comment received
    const ID = req.params[0].ID;
    await cds.tx(req).run(UPDATE(Orders).set('orderStatus = `Rejected`')
    .set('comment =', req.data.comment).where('ID =', ID));
}