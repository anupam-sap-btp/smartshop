using MasterService from './shop-master';
annotate MasterService.Products with @(
    UI: {
        HeaderInfo  : {
            $Type : 'UI.HeaderInfoType',
            TypeName : 'Product',
            TypeNamePlural : 'Products',
            
        },
        SelectionFields  : [
            ID, name, category
        ],
        LineItem  : [
            { $Type: 'UI.DataField', Value: image },
            { $Type: 'UI.DataField', Value: ID },
            { $Type: 'UI.DataField', Value: name },
            { $Type: 'UI.DataField', Value: category },
            { $Type: 'UI.DataField', Value: price },
            { $Type: 'UI.DataField', Value: currency_code},
            { $Type: 'UI.DataFieldForAnnotation', Target: '@UI.FieldGroup#Stock', Label: 'Stock'},
            { $Type: 'UI.DataField', Value: unit}
        ],
        HeaderFacets  : [
            { $Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#Header', Label: 'Product Information'}
        ],
        Facets  : [
            { $Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#General', Label: 'General'}
        ],
        FieldGroup #Stock : {
            Data: [
                { $Type: 'UI.DataField', Value: stock},
                {
                    $Type : 'UI.DataFieldForAction',
                    Label : 'Add Stock',
                    Action : 'MasterService.AddStock',
                    Inline : true
                },
            ]
        },
        FieldGroup #Header : {
            Data: [
                { $Type: 'UI.DataField', Value: image },
                { $Type: 'UI.DataField', Value: imgTxt },
                { $Type: 'UI.DataField', Value: ID },
                { $Type: 'UI.DataField', Value: name },
                { $Type: 'UI.DataField', Value: category },
            ]  
        },
        FieldGroup #General : {
            Data: [
                { $Type: 'UI.DataField', Value: stock },
                { $Type: 'UI.DataField', Value: unit },
                { $Type: 'UI.DataField', Value: price },
                { $Type: 'UI.DataField', Value: currency_code },
            ]  
        },
    }
) {
    ID @( Common: { Label : 'Product ID' } );
    name @( Common: { Label : 'Description' } );
    category @(Common: {Label : 'Category',});
    price @(Common: {Label : 'Price',});
    currency_code @(Common: {Label : 'Currency'});
    stock @(Common: {Label : 'Available Stock',});
    unit @(Common: {Label : 'Unit',});
    image @(Common: {Label : 'Image',}, UI.IsImageURL: true,  );
    imgTxt @(Common: {Label : 'Image URL',}, );
};