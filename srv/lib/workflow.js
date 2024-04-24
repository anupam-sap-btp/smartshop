const cds = require('@sap/cds');
const call_dest = require('./callDestinations');

// cds.connect.to('smartshop.db')
// const { Customers, Products, Orders } = cds.entities('smartshop.db');

const check_order_value =  async (lines) => {
    if ( lines.orderStatus == 'Pending' ) {
        //Get customer name
        let cust_det = {firstName: 'AA', lastName: 'BB'}; //await SELECT.one.from(Customers).columns('firstName', 'lastName').where({ID: lines.customer_ID});
        if (cust_det) {
            var cust_name = cust_det.firstName + ' ' + cust_det.lastName;
        }

        await call_dest.trigger_workflow_module(lines, cust_name);
        return true;
        
    } else {
        return false;
    }
}


module.exports = { check_order_value }