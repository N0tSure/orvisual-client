import { makeData, sortData } from './Utils';
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

test('should sort accept dates properly', () => {

  const ordersFixture = [
    { 'acceptedAt': '2018-05-08T20:34:44Z' },
    { 'acceptedAt': '2018-06-11T20:34:44Z' },
    { 'acceptedAt': '2018-05-22T20:34:44Z' },
    { 'acceptedAt': null },
    { 'acceptedAt': '2018-05-23T20:34:44Z' }
  ];

  const sorted = [
    { id: 'acceptedAt', desc: false }
  ];

  const result = sortData(ordersFixture, sorted);

  assert.strictEqual(result[0].acceptedAt, null);
  assert.strictEqual(result[1].acceptedAt, '2018-05-08T20:34:44Z');
  assert.strictEqual(result[2].acceptedAt, '2018-05-22T20:34:44Z');
  assert.strictEqual(result[3].acceptedAt, '2018-05-23T20:34:44Z');
  assert.strictEqual(result[4].acceptedAt, '2018-06-11T20:34:44Z');
})

test('should sort all dates properly', () => {
  const ordersFixture = [
    { 'acceptedAt': null, 'completedAt': '2018-06-11T20:34:44Z' },
    { 'acceptedAt': '2018-06-11T20:34:44Z', 'completedAt': null },
    { 'acceptedAt': '2018-05-22T20:34:44Z', 'completedAt': '2018-05-23T20:34:44Z' },
    { 'acceptedAt': null, 'completedAt': null },
    { 'acceptedAt': '2018-05-23T20:34:44Z', 'completedAt': '2018-05-26T20:34:44Z' }
  ];

  const sorted = [
    { id: 'orderStatus', desc: true }
  ];

  const result = sortData(ordersFixture, sorted);

  assert.strictEqual(result[0].completedAt, '2018-06-11T20:34:44Z');
  assert.strictEqual(result[1].completedAt, '2018-05-26T20:34:44Z');
  assert.strictEqual(result[2].completedAt, '2018-05-23T20:34:44Z');
  assert.strictEqual(result[3].acceptedAt, '2018-06-11T20:34:44Z');
  assert.strictEqual(result[4].acceptedAt, null);
})
