
/**
 * Events are statelss objects that can be fired at any time and execute a specifc task.
 * Every Event needs an unique name.
 * @return {[type]} [description]
 */
var GameEvent = function(action){
    this._game = null;
    if(typeof action === 'undefined'){
        throw "Each event needs an action";
    }
    this._action = action;
    this._finishedListener = [];
}
GameEvent.prototype = {
    setGame: function(game){
        this._game = game;
    },
    finished: function(args){
        this._finishedListener.forEach( (callback, index) => {
            callback(this, args);
        });
    },
    onFinished: function(callback){
        this._finishedListener.push(callback);
    },
    execute: function(args){
        this._action(this._game, args);
    }
}

var EventForceBattle = function(){
}
EventForceBattle.protoype = new GameEvent((game,args) => {
    var enemies = args;
    if(typeof enemies === 'undefined'){
        throw "could not execute event forceBattle";
    }

    var goodGuys = [];
    goodGuys.push(game.player()); //TODO player.party();
    game.startBattle(goodGuys, enemies).start();
});




var Executor = function(game){
    this._game = game;
    this._installedEvents = {};
}

Executor.prototype = {
    loadEvent: function(source){

    },
    event: function(eventName, args){
        var event = this._eventLookup(eventName);
        if(!event){
            throw "No event found with name: " + eventName;
        }
        event.setGame(this._game);
        return event;
    },
    _eventLookup: function(eventName){
        return this._installedEvents[name];
    },
    registerEvent: function(name, event){
        var nameCollision = this._eventLookup(name);
        if(nameCollision){
            throw "Alreay registered an event with name: " + name;
        }
        this._installedEvents[name] = event;
    }
}
