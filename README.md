# Simple features:

Manage Customers – Create a customer with basic details. Once customer is created the status is set to ‘review’. It needs to be activated before an order can be created.

Manage Products – Create a product with basic details and a URL for the product image. Stock is set to zero while creating the product. Use ‘Add Stock’ button to add stock. The ‘Add Stock’ button is only enabled when the stock goes below 10.

Manage Orders – Create an order by selecting the customer at the header level and adding line items at the line item section. While order creation, validations are done for
a)	Availability of ‘active’ customer
b)	Availability of stock
Once the order is created stock from the products are deducted. The stock will be back if the order is deleted. 
If the order value is more than 100000, it is set to pending status and ‘Approve’/’Reject’ button is enabled. For orders less than 100000, the status is set to okay.
