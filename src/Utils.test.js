import { makeData } from './Utils';
import assert from 'assert';

test('should return ten orders', () => {
  const orders = makeData(10);
  assert.strictEqual(orders.length, 10);
})

test('should return only strings', () => {
  const order = makeData(1)[0];
  assert.equal(typeof(order.clientName), 'string');
  assert.equal(typeof(order.clientEmail), 'string');
  assert.equal(typeof(order.clientPhone), 'string');
  assert.equal(typeof(order.description), 'string');
  order['acceptedAt'] && assert.equal(typeof(order.acceptedAt), 'string');
  order['completedAt'] && assert.equal(typeof(order.completedAt), 'string');
})
