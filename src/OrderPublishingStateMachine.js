import StateMachime from 'javascript-state-machine';

/**
 * This componet provides control logic for Order publishing,
 * reperesnt internal implementation of state machine.
 **/
class OrderPublishingStateMachine extends StateMachime {
  constructor(props) {
    super({
      init: 'ready',
      transitions: [
        { name: 'added', from: 'ready', to: 'newOrder'},
        { name: 'published', from: 'newOrder', to: 'orderPublished' },
        { name: 'hasFiles', from: 'orderPublished', to: 'fileProcessing' },
        { name: 'fileProcessed', from: 'fileProcessing', to: 'fileProcessing' },
        { name: 'warning', from: 'fileProcessing', to: 'publishedWarnings' },
        { name: 'failure', from: 'newOrder', to: 'publishingFailed' },
        { name: 'success', from: [ 'fileProcessing', 'orderPublished'], to: 'publishedSuccessful' },
        { name: 'reset', from: [ 'publishedSuccessful', 'publishingFailed',  'publishedWarnings' ], to: 'ready' }
      ],
      methods: {
        onAdded: props.onAdded,
        onPublished: props.onPublished,
        onFailure: props.onFailure,
        onHasFiles: props.onHasFiles,
        onFileProcessed: props.onFileProcessed,
        onSuccess: props.onSuccess,
        onWarning: props.onWarning,
        onReset: props.onReset
      }
    });
  }
}

export default OrderPublishingStateMachine;
