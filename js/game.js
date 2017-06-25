var Game = function(){
    this._player = null;
    this._worldMap = null;
    this._eventExecuter = new Executor(this);
    initEvents(this._eventExecuter);
}

Game.prototype = {
    player: function(player){
        if(typeof player !== 'undefined'){
            this._player = player;
            return this;
        }else{
            return this._player;
        }
    },

    map: function(map){
        if(typeof map !== 'undefined'){
            this._worldMap = map;
            return this;
        }else{
            return this._worldMap;
        }
    },

    _init: function(){

    },

    _initControls: function(){
        var player = this._player;
        var map = this._worldMap;

    },

    startBattle: function(goodGuys, badGuys, onready){
        var battle = new Battle();
        goodGuys.forEach(data => battle.addFriend(data));
        badGuys.forEach(data => battle.addEnemy(data));
        new UI().showBattle(battle, onready);
        return battle;
    }
}

function initEvents(e){
    e.registerEvent('forceBattle', new EventForceBattle() );
}
