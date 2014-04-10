/**
 * Pachisicast connector library
 */

window.Pachisi = {};
window.Pachisi.PROTOCOL = 'urn:x-cast:com.edwinmike.pachisicast';
window.Pachisi.Players = [];

window.onload = function() {
  cast.receiver.logger.setLevelValue(0);
  
  /**
   * Initialize
   */

  console.log('************* Pachisicast *************');

  // Cast receiver manager
  window.Pachisi.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  
  // create a CastMessageBus to handle messages for a custom namespace
  window.Pachisi.messageBus = window.Pachisi.castReceiverManager.getCastMessageBus(window.Pachisi.PROTOCOL,
    cast.receiver.CastMessageBus.MessageType.JSON);

  /**
   * Event Listeners
   */

  // handler for the 'ready' event
  window.Pachisi.castReceiverManager.onReady = function(event) {
    console.log('Received Ready event');
    window.Pachisi.castReceiverManager.setApplicationState("Application is Ready");
  };
  
  // handler for the CastMessageBus message event
  window.Pachisi.messageBus.onMessage = function(event) {
    $('#debugMan').html('<h3>Debugging</h3>');

    switch (event.data.action){
      case 'join':
        window.Pachisi.Players.push({
          senderId: event.senderId,
          name: event.data.data.name
        });
        joinGame(event.senderId, event.data.data.name, event.data.data.img, event.data.data.position);
        window.Pachisi.messageBus.send(event.senderId, 'joined game');
        console.log(window.Pachisi.Players);
        break;
      case 'move':
        selectPieceDice(event.senderId, event.data.data.pieceId, event.data.data.diceNum);
      case 'leave':
        leaveGame(event.senderId);
        break;
      case 'start':
        startGame();
        break;
      case 'roll':
        rollDice(event.senderId);
        break;
      default:
        break;
    }
  }
  
  // handler for 'senderconnected' event
  window.Pachisi.castReceiverManager.onSenderConnected = function(event) {
    console.log('Sender connected: ', event);
  };
  
  // handler for 'senderdisconnected' event
  window.Pachisi.castReceiverManager.onSenderDisconnected = function(event) {
    console.log('Received Sender Disconnected event: ' + event.data);
    if (window.castReceiverManager.getSenders().length == 0) {
      window.close();
    }
  };
  
  // initialize the CastReceiverManager with an application status message
  window.Pachisi.castReceiverManager.start();
};

/**
 * Receiver to Sender Functions
 */

// Announce roll needed: senderId
// parameters: players[currentPlayersTurn].senderID
function announce_RollNeeded(senderId){
  window.Pachisi.messageBus.send(senderId, {action: 'roll'});
};

// Game started: all people get this message
// No parameters

function announce_gameStarted(){
  window.Pachisi.messageBus.broadcast('started');
}

// Announce roll result: senderId
// players[currentPlayersTurn].senderID, dice[0], dice[1]

function announce_RollResult(senderId, dice1, dice2){
  window.Pachisi.messageBus.send(senderId, {
    action: 'rollResult',
    dice1: dice1,
    dice2: dice2
  });
}

/**
 * Cast connector: Reciver
 */

// var Pachisi = (function(cast){
//   var module = {};
//   module.PROTOCOL = 'urn:x-cast:com.edwinmike.pachisicast';
//   module.Players = [];
//   
//   var init = function(){

//     // Initialize Pachisi
//     cast.receiver.logger.setLevelValue(0);
//     module.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
//     module.messageBus = module.castReceiverManager.getCastMessageBus(module.PROTOCOL,
//       cast.receiver.CastMessageBus.MessageType.JSON);

//     // Event Listeners
//     module.messageBus.onMessage = onMessage.bind(this);
//     module.castReceiverManager.onSenderConnected =
//         onSenderConnected.bind(this);
//     module.castReceiverManager.onSenderDisconnected =
//         onSenderDisconnected.bind(this);

//     module.castReceiverManager.start();
//   };

//   var onSenderConnected = function(){

//   };

//   var onSenderDisconnected = function(){

//   };

//   var onMessage = function(){

//   };

//   return module;

// }());