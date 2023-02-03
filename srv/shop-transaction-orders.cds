using {TransactionService} from './shop-transaction';

annotate TransactionService.Products with {
    ID @( Common: { Label : 'Product ID' } );
    name @( Common: { Label : 'Description' } );
    category @(Common: {Label : 'Category',});
    price @(Common: {Label : 'Price',});
    stock @(Common: {Label : 'Available Stock',});
    unit @(Common: {Label : 'Unit',});
    image @(Common: {Label : 'Image',}, UI.IsImageURL: true,  );
}

annotate TransactionService.Orders with @(
    // Capabilities.UpdateRestrictions: {Updatable: false},
    // Capabilities: {DeleteRestrictions : { Deletable: false}},
    UI: {
        LineItem  : [
            {$Type: 'UI.DataField', Value: orderNo, Label: 'Order Number'},
            {$Type: 'UI.DataField', Value: customer.ID, Label: 'Customer ID'},
            {$Type: 'UI.DataFieldForAnnotation', Target: '@UI.FieldGroup#Names', Label: 'Name'},
            {$Type: 'UI.DataField', Value: totalPrice, Label: 'Total Price'},
            {$Type: 'UI.DataField', Value: createdAt, Label: 'Order Date'},
            {$Type: 'UI.DataField', Value: orderStatus, Label: 'Status'},
            {$Type: 'UI.DataFieldForAnnotation', Target: '@UI.FieldGroup#Act', Label: 'Approve/Reject'},
            {$Type: 'UI.DataField', Value: comment, Label: 'Comment'},
        ],
        HeaderFacets  : [
            {$Type: 'UI.ReferenceFacet', Label: 'Header Data', Target: '@UI.FieldGroup#Header'},
        ],
        Facets  : [
            {$Type: 'UI.ReferenceFacet', Label: 'Items', Target: 'items/@UI.LineItem'}
        ],
        FieldGroup #Act : {
            Data: [
                {
                    $Type : 'UI.DataFieldForAction',
                    Label : 'Approve',
                    Action : 'TransactionService.ApproveOrder',
                    Inline : true
                },
                {
                    $Type : 'UI.DataFieldForAction',
                    Label : 'Reject',
                    Action : 'TransactionService.RejectOrder',
                    Inline : true
                },
            ]
        },
        FieldGroup #Header : {
            Data: [
                {$Type: 'UI.DataField', Value: orderNo, Label: 'Order Number'},
                {$Type: 'UI.DataField', Value: customer_ID, Label: 'Customer ID'},
                {$Type: 'UI.DataField', Value: customer.firstName, Label: 'Customer Name', ![@Common.FieldControl] : #ReadOnly,},
                {$Type: 'UI.DataField', Value: totalPrice, Label: 'Total Price'},
                {$Type: 'UI.DataField', Value: createdAt, Label: 'Order Date'},
                {$Type: 'UI.DataField', Value: orderStatus, Label: 'Status'},
            ]
            
        },
        FieldGroup #Names : {
            Data: [
                {$Type : 'UI.DataField', Value: customer.firstName},
                {$Type : 'UI.DataField', Value: customer.lastName},
            ]
        },
    }
);

annotate TransactionService.Items with @(
    UI: {
        HeaderInfo  : {
            $Type : 'UI.HeaderInfoType',
            TypeName : 'Item',
            TypeNamePlural : 'Items',
        },
        LineItem  : [
            {$Type: 'UI.DataField', Value: product.image, Label: 'Product Image'},
            {$Type: 'UI.DataField', Value: itemNo, Label: 'Item Number'},
            {$Type: 'UI.DataField', Value: product_ID, Label: 'Product'},
            {$Type: 'UI.DataField', Value: product.name, Label: 'Product Desc', ![@Common.FieldControl] : #ReadOnly},
            {$Type: 'UI.DataField', Value: quantity, Label: 'Quantity'},
            {$Type: 'UI.DataField', Value: unit, Label: 'Unit', ![@Common.FieldControl] : #ReadOnly},
            {$Type: 'UI.DataField', Value: unitPrice, Label: 'Unit Price', ![@Common.FieldControl] : #ReadOnly},
            {$Type: 'UI.DataField', Value: itemPrice, Label: 'Total Price', ![@Common.FieldControl] : #ReadOnly},
            {$Type: 'UI.DataField', Value: product.currency_code, Label: 'Currency', ![@Common.FieldControl] : #ReadOnly},
        ],
        Facets  : [
            {$Type: 'UI.CollectionFacet', Label: 'Item Details', 
            Facets: [
                    {$Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#ItemDetails', Label:'Item Details' },
                ] }
        ],
        FieldGroup#ItemDetails: {
            Data:[
            {$Type: 'UI.DataField', Value: product_ID, Label: 'Product ID'},
            ]
        },
    }    
);