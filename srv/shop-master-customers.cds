using MasterService from './shop-master';
annotate MasterService.Customers with @(
    UI: {
        HeaderInfo  : {
            $Type : 'UI.HeaderInfoType',
            TypeName : 'Customer',
            TypeNamePlural : 'Customers',
        },
        SelectionFields  : [
            ID, firstName, lastName, city, creditStatus
        ],
        LineItem  : [
            { $Type: 'UI.DataField', Value: ID },
            { $Type: 'UI.DataFieldForAnnotation', Target: '@UI.FieldGroup#Names', Label: 'Name'},
            { $Type: 'UI.DataField', Value: email },
            { $Type: 'UI.DataField', Value: city },
            { $Type: 'UI.DataFieldForAnnotation', Target: '@UI.FieldGroup#Credit', Label: 'Credit Status'}
        ],
        Identification: [
            {
                $Type  : 'UI.DataFieldForAction',
                Label   : 'Activate',
                Action : 'MasterService.CustomerStatusUpdate'
            }
        ],
        HeaderFacets: [       
            {$Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#Identity', Label:'Identity' },
            {$Type: 'UI.ReferenceFacet', Target: '@UI.DataPoint#Status'}
        ],
        Facets: [
            {
                $Type: 'UI.CollectionFacet',
                Label: 'Details',
                Facets: [
                    {$Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#Personal', Label:'Personal Details' },
                    {$Type: 'UI.ReferenceFacet', Target: '@UI.FieldGroup#Description', Label: 'Contact Details'},
                ]
            }
        ],
        DataPoint#Status: {Value: creditStatus, Title: 'Customer Status'},
        FieldGroup#Names  : {
            Data:   [ 
                { $Type: 'UI.DataField', Value: firstName },
                { $Type: 'UI.DataField', Value: lastName },
            ]
        },
        FieldGroup#Credit  : {
            Data:   [
                { $Type: 'UI.DataField', Value: creditStatus },
                {
                    $Type : 'UI.DataFieldForAction',
                    Label : 'Activate',
                    Action : 'MasterService.CustomerStatusUpdate',
                    Inline : true
                }
            ]            
        },
        FieldGroup#Description  : {
           Data: [
                {$Type : 'UI.DataField', Value: email},
                {$Type : 'UI.DataField', Value: mobile}
           ] 
        },
        FieldGroup#Identity: {
            Data:[
            {$Type: 'UI.DataField', Value: ID}
            ]
        },
        FieldGroup#Personal: {
            Data:[
            {$Type: 'UI.DataField', Value: firstName},
            {$Type: 'UI.DataField', Value: lastName},
            {$Type: 'UI.DataField', Value: city}
            ]
        },
    }
){
    ID @( Common: { Label: 'Customer ID'} );
    firstName @( Common: { Label: 'First Name'} );
    lastName @( Common: { Label: 'Last Name'} );
    email @( Common: { Label: 'Email'} );
    mobile @( Common: { Label: 'Mobile No'} );
    city @( Common: { Label: 'City'} );
    creditStatus @( Common: { Label: 'Status'} );
};