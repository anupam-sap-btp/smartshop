const cds = require('@sap/cds/lib');
const { trigger_workflow_module } = require('../srv/lib/workflow');
const { setDestinationCache } = require('@sap-cloud-sdk/connectivity');

describe('API Validations', () => {

  const { GET, POST, expect, should } = cds.test(__dirname+'/..')
// cds.test(__dirname+'/..')
  beforeAll(()=>{
    cds.User.default = cds.User.Privileged 
  })

  it('should reject if stock is 10 or more', async () => {

    await expect(POST `/master/Products(ID=1001,IsActiveEntity=true)/AddStock ${{ stock: 1 }}`)
            .to.be.rejectedWith(/405 - Enough stock available/)
    const { data } = await GET`/master/Products(ID=1001,IsActiveEntity=true)/stock/$value`
    expect(data).to.equal(11)
  })

  it('Order Status as pending for order value greater than 100000', async () => {
    const { data } = await POST `/transaction/Orders ${{orderNo: 9001, customer_ID: 901}}`
    await POST `/transaction/Orders(ID=${data.ID},IsActiveEntity=false)/items ${{itemNo: 1, product_ID: 1001, quantity: 7, unit: 'PC'}}`
    const { data: dataAct } = await POST `/transaction/Orders(ID=${data.ID},IsActiveEntity=false)/draftActivate`
    
    console.log(dataAct);
    expect(dataAct.orderStatus).to.eq('Pending');
  });

  it('Order Status as Okay for order value less than or equals to 100000', async () => {
    const { data } = await POST `/transaction/Orders ${{orderNo: 9002, customer_ID: 901}}`
    await POST `/transaction/Orders(ID=${data.ID},IsActiveEntity=false)/items ${{itemNo: 1, product_ID: 1001, quantity: 1, unit: 'PC'}}`
    const { data: dataAct } = await POST `/transaction/Orders(ID=${data.ID},IsActiveEntity=false)/draftActivate`
    
    // console.log(dataAct);
    expect(dataAct.orderStatus).to.eq('Okay');
  });
})