
let workflow = require('../srv/lib/workflow');
const call_dest = require('../srv/lib/callDestinations');

describe('Workflow Trigger Validation', () => {
  
    test('Workflow to triiger for Order Status as pending for order value greater than 100000', async () => {
      const lines = {
        ID: 'ed112fc1-714d-41d7-b9d5-a9631c417845',
        orderNo: 9001,
        customer_ID: 901,
        totalPrice: 175000,
        orderStatus: 'Pending',
        comment: null,
        actionEnabled: true,
        IsActiveEntity: true,
        HasActiveEntity: false,
        HasDraftEntity: false
      }
      call_dest.trigger_workflow_module = jest.fn();

      let ret = await workflow.check_order_value(lines);
      console.log('ret>>>', ret);
      expect(ret).toBe(true);
      expect(call_dest.trigger_workflow_module).toBeCalled();  
      
    });

    test('Workflow NOT to trigger for Order Status NOT pending for order value less than or equals to 100000', async () => {
      const lines = {
        ID: 'ed112fc1-714d-41d7-b9d5-a9631c417845',
        orderNo: 9002,
        customer_ID: 901,
        totalPrice: 75000,
        orderStatus: 'Okay',
        comment: null,
        actionEnabled: true,
        IsActiveEntity: true,
        HasActiveEntity: false,
        HasDraftEntity: false
      }
      call_dest.trigger_workflow_module = jest.fn();

      let ret = await workflow.check_order_value(lines);
      // console.log('ret>>>', ret);
      expect(ret).toBe(false);
      expect(call_dest.trigger_workflow_module).not.toBeCalled();
      
    });
  })

