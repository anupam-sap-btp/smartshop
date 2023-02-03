using { smartshop.db as shopdb } from '../db/schema';

service TransactionService {

    @readonly entity Customers as projection on shopdb.Customers excluding { creditStatus, createdAt, createdBy, modifiedAt, modifiedBy };
    @readonly entity Products as projection on shopdb.Products excluding { createdAt, createdBy, modifiedAt, modifiedBy };
    
    @odata.draft.enabled
    entity Orders as projection on shopdb.Orders {*, 
    @readonly orderStatus, @readonly totalPrice } 
    excluding { modifiedAt, modifiedBy }
    actions {
        @Core.OperationAvailable: in.actionEnabled
        @Common.SideEffects.TargetProperties: ['in/orderStatus', 'in/actionEnabled', 'in/comment']
        action ApproveOrder(comment: String);

        @Core.OperationAvailable: in.actionEnabled
        @Common.SideEffects.TargetProperties: ['in/orderStatus', 'in/actionEnabled', 'in/comment']
        action RejectOrder(comment: String);
    };

    
}