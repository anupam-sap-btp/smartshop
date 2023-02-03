using { smartshop.db as shopdb } from '../db/schema';

service MasterService {
    @odata.draft.enabled
    entity Customers as projection on shopdb.Customers 
    {*, @readonly creditStatus}
    excluding { createdAt, createdBy, modifiedAt, modifiedBy }

    actions {
        // @sap.applicable.path: 'activateEnabled'
        @Core.OperationAvailable : in.activateEnabled
        @Common.SideEffects.TargetProperties : [ 'in/creditStatus',
        'in/activateEnabled' ]
        action CustomerStatusUpdate() returns String;
        }
    
    @odata.draft.enabled
    entity Products 
    //     @(restrict : [ {grant : ['READ', 'CREATE', 'DELETE']} ]) 
    as projection on shopdb.Products  {*, image as imgTxt, @readonly stock}
    excluding { createdAt, createdBy, modifiedAt, modifiedBy }
    
    actions {
        @Core.OperationAvailable : in.addStockEnabled
        @Common.SideEffects.TargetProperties : [ 'in/stock',
        'in/addStockEnabled' ]
        action AddStock(stock: Integer) returns String;
    };

}

