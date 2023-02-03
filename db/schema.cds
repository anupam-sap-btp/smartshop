namespace smartshop.db;

using { managed, Currency } from '@sap/cds/common';

entity Products: managed {
    key ID: Integer;
    name: String(100);
    category: String(20);
    price: Integer;
    currency: Currency;
    stock: Integer;
    unit: String(10);
    image: String;
    virtual addStockEnabled: Boolean;
}

entity Customers: managed {
    key ID: Integer;
    firstName: String(40);
    lastName: String(40);
    email: String(100);
    mobile: String(10);    
    city: String(20);
    creditStatus: String(20) enum {active = 'active'; review = 'review'; blocked = 'blocked '; };
    virtual activateEnabled: Boolean;
}

entity Orders: managed {
    key ID: UUID;
    orderNo: Integer;
    customer: Association to Customers;
    totalPrice: Integer;
    orderStatus: String(10) enum {na = 'Okay'; pending = 'Pending'; approved = 'Approved'; rejected = 'Rejected'; };
    comment: String;
    items: Composition of many Items on items.orderHead = $self;
    virtual actionEnabled: Boolean;
}

entity Items {
    key ID: UUID;
    orderHead: Association to Orders;
    itemNo: Integer;
    product: Association to Products;
    quantity: Integer;
    unit: String(10);
    unitPrice: Integer;
    itemPrice: Integer;
}