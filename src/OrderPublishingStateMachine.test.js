import OrderPublishingStateMachine from './OrderPublishingStateMachine';
import jest from 'jest-mock';
import assert from 'assert';

let mockListeners = undefined;
let fsm = undefined;

beforeEach(() => {
  mockListeners = {
    onAdded: jest.fn(),
    onPublished: jest.fn(),
    onFailure: jest.fn(),
    onHasFiles: jest.fn(),
    onFileProcessed: jest.fn(),
    onSuccess: jest.fn(),
    onWarning: jest.fn(),
    onReset: jest.fn()
  };

  fsm = new OrderPublishingStateMachine(mockListeners);
})

test('should process order publishing failure', () => {

  fsm.added();
  assert.strictEqual(fsm.state, 'newOrder');
  expect(mockListeners.onAdded.mock.calls.length).toBe(1);

  fsm.failure();
  assert.strictEqual(fsm.state, 'publishingFailed');
  expect(mockListeners.onFailure.mock.calls.length).toBe(1);

  fsm.reset();
  assert.strictEqual(fsm.state, 'ready');
  expect(mockListeners.onReset.mock.calls.length).toBe(1);
});

test('should process order publishing without files', () => {

  fsm.added();
  assert.strictEqual(fsm.state, 'newOrder');
  expect(mockListeners.onAdded.mock.calls.length).toBe(1);

  fsm.published();
  assert.strictEqual(fsm.state, 'orderPublished');
  expect(mockListeners.onPublished.mock.calls.length).toBe(1);

  fsm.success();
  assert.strictEqual(fsm.state, 'publishedSuccessful');
  expect(mockListeners.onSuccess.mock.calls.length).toBe(1);

  fsm.reset();
  assert.strictEqual(fsm.state, 'ready');
  expect(mockListeners.onReset.mock.calls.length).toBe(1);

});

test('should process order publishing with files', () => {

  fsm.added();
  assert.strictEqual(fsm.state, 'newOrder');
  expect(mockListeners.onAdded.mock.calls.length).toBe(1);

  fsm.published();
  assert.strictEqual(fsm.state, 'orderPublished');
  expect(mockListeners.onPublished.mock.calls.length).toBe(1);

  fsm.hasFiles();
  assert.strictEqual(fsm.state, 'fileProcessing');
  expect(mockListeners.onHasFiles.mock.calls.length).toBe(1);

  fsm.fileProcessed();
  fsm.fileProcessed();
  fsm.fileProcessed();
  assert.strictEqual(fsm.state, 'fileProcessing');
  expect(mockListeners.onFileProcessed.mock.calls.length).toBe(3);

  fsm.success();
  assert.strictEqual(fsm.state, 'publishedSuccessful');
  expect(mockListeners.onSuccess.mock.calls.length).toBe(1);

  fsm.reset();
  assert.strictEqual(fsm.state, 'ready');
  expect(mockListeners.onReset.mock.calls.length).toBe(1);

});

test('should process order publishing with warnings', () => {
  fsm.added();
  assert.strictEqual(fsm.state, 'newOrder');
  expect(mockListeners.onAdded.mock.calls.length).toBe(1);

  fsm.published();
  assert.strictEqual(fsm.state, 'orderPublished');
  expect(mockListeners.onPublished.mock.calls.length).toBe(1);

  fsm.hasFiles();
  assert.strictEqual(fsm.state, 'fileProcessing');
  expect(mockListeners.onHasFiles.mock.calls.length).toBe(1);

  fsm.fileProcessed();
  assert.strictEqual(fsm.state, 'fileProcessing');
  expect(mockListeners.onFileProcessed.mock.calls.length).toBe(1);

  fsm.warning();
  assert.strictEqual(fsm.state, 'publishedWarnings');
  expect(mockListeners.onWarning.mock.calls.length).toBe(1);

  fsm.reset();
  assert.strictEqual(fsm.state, 'ready');
  expect(mockListeners.onReset.mock.calls.length).toBe(1);

});
