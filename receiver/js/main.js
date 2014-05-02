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
    onMessage: function(event){    
      switch (event.data.action){
        case 'join':
          this.onJoin(event.senderId, event.data.data.name, event.data.data.img, event.data.data.position);
          break;
        case 'start':
          startGame(event.senderId, function(senderId, isSuccess, message){
            toSender(event.senderId, { isSuccess: isSuccess, message: message }); 
          });
          break;
        case 'roll':
          this.onRoll(event.senderId);
          break;
        case 'move':
          selectPieceDice(event.senderId, event.data.data.pieceID, event.data.data.diceNum);
          break;
        case 'leave':
          this.onLeave(event.senderId);
          break;
        case 'pass':
          this.onEndTurn(event.senderId);
          break; 
        default:
          break;
      }
    },

    /**
     * GAME FUNCTIONS
     */
    

    onJoin: function(senderId, playerName, pieceImage, Position){
      //this.Players.push({
        //senderId: event.senderId,
        //name: event.data.data.name
      //}); 
      joinGame(senderId, playerName, pieceImage, Position);
    },

    onLeave: function(senderId){
      leaveGame(senderId);
    },

    onMove: function(){

    },

    onRoll: function(senderId){
      rollDice(senderId);
    },

    onEndTurn: function(senderId){
      endTurn(senderId);
    },
 


 

    /**
     * COMMUNICATION
     */

    toSender: function(senderId, message){ 
      this.messageBus.send(senderId, message);
    },

    broadcast: function(message){
      this.messageBus.broadcast(message);
    }
  };

  // Exposes public functions and APIs
  window.Pachisi = Pachisi;

}());