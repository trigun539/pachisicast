/**
 * Cast connector: Reciver
 */

// External namespace for cast specific javascript library
var cast = window.cast || {};

(function(){
  'user strict';
  
  Pachisi.PROTOCOL = 'urn:x-cast:com.edwinmike.pachisicast';
  Pachisi.Players = [];
  
  function Pachisi(){

    console.log('*********** PACHISI ************');

    // Initialize Pachisi
    this.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    this.messageBus = this.castReceiverManager.getCastMessageBus(Pachisi.PROTOCOL,
      cast.receiver.CastMessageBus.MessageType.JSON);

    // // Event Listeners
    this.messageBus.onMessage = this.onMessage.bind(this);
    this.castReceiverManager.onSenderConnected =
        this.onSenderConnected.bind(this);
    this.castReceiverManager.onSenderDisconnected =
        this.onSenderDisconnected.bind(this);

    this.castReceiverManager.start();
  };

  // Adds event listening functions to Pachisi
  Pachisi.prototype = {

    onSenderConnected: function(event){
      console.log('Sender connected: ', event);
    },

    onSenderDisconnected: function(){
      console.log('Sender disconnected: ', event);
      if (this.castReceiverManager.getSenders().length == 0) {
        window.close();
      }
    },

    onMessage: function(){
      switch (event.data.action){
        case 'join':
          this.onJoin(event).bind(this);
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
    },

    /**
     * GAME FUNCTIONS
     */

    onJoin: function(event){
      this.Players.push({
        senderId: event.senderId,
        name: event.data.data.name
      });
      joinGame(event.senderId, event.data.data.name, event.data.data.img, event.data.data.position);
      toSender(event.senderId, 'joined');
    },

    onLeave: function(){
      
    },

    onMove: function(){

    },

    onRoll: function(){

    },

    /**
     * COMMUNICATION
     */

    toSender: function(senderId, message){
      this.messageBus.send(senderId, message);
    },

    broadcast: function(message){

    }
  };

  // Exposes public functions and APIs
  window.Pachisi = Pachisi;

}());