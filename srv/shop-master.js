const cds = require('@sap/cds');
const { Customers, Products } = cds.entities('smartshop.db');

module.exports = cds.service.impl( (srv) => {
    //Set new customers' credit status to review
    srv.before('CREATE', 'Customers', (req) => req.data.creditStatus = 'review');
    //Set new customers' credit status to review
    srv.before('SAVE', 'Customers', (req) => req.data.creditStatus = 'review');
    //Set draft customers' credit status to draft
    srv.before(['NEW', 'EDIT'], 'Customers', (req) => req.data.creditStatus = 'draft');
    
    //Action - Update customer status
    srv.on('CustomerStatusUpdate', status_update);


    srv.after('READ', 'Customers', (lines) => { 
        //In case a customer is not active, enable the activate button - 
        //This is used in service definition annotation
        if(Array.isArray(lines)) {
        lines.map((line) => line.activateEnabled = line.creditStatus != 'active' && line.creditStatus != 'draft') }
        else {
            lines.activateEnabled = lines.creditStatus != 'active';
        }
    });

    //Pass the image link to image field in creation mode as the upload image option is not available
    srv.before(['CREATE', 'NEW', 'UPDATE', 'SAVE', 'EDIT'], 'Products', (req) => req.data.image = req.data.imgTxt);
    
    //While creating the Product, set the stock as zero
    srv.before(['CREATE', 'SAVE'], 'Products', req => req.data.stock = 0);

    //Action - Add stock
    srv.on('AddStock', add_stock);

    //Enable add stock button when the stock goes below 10
    srv.after('READ', 'Products', (lines) => { 
        
        if(Array.isArray(lines)) {
        lines.map((line) => line.addStockEnabled = line.stock < 10) }
        else {
            lines.activateEnabled = lines.addS < 10;
        }
    } );
});

//Action - Add stock
async function add_stock(req) {
    console.log(req.params)
    const stockVal = req.data.stock;
    const prodID = req.params[0].ID;

    //Update stock with the value entered
    await cds.tx(req).run(UPDATE(Products).set('stock +=', stockVal).where('ID =', prodID))
    .then(all => {console.log(all); 
    if (all == 1 ) {req.notify(200, "Stock Updated");}});
}

//Action - customer status update
async function status_update(req) {
    console.log(req.params);
    const custID = req.params[0].ID;

    let custResult = await cds.tx(req).run(SELECT.from(Customers).where({ID : custID}));
    // let custResult1 = await cds.read(Customers).columns('ID', 'creditStatus').where({ID: custID});
    console.log(custResult);
    if ( custResult.length == 0) {
        console.log("nothing found");
    }
    else if  (custResult[0].creditStatus != 'active') {
        let updatedstat = await cds.update(Customers).where({ID: custID}).with({creditStatus: 'active'});
        console.log(updatedstat,"update done");
    }
    else {
        console.log("Status is already active");
    }
    return custResult;
}