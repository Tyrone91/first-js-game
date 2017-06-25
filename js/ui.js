var MapView = function(map){
    if(!map || !(map instanceof Map)){
        throw "MapView needs a map as model";
    }
    this._model = map;
    this._keyObserver = [];
}
MapView.prototype = {
    addKeyObserver: function(listener){
        var hasUp = listener.hasOwnProperty('keyUp');
        var hasDown = listener.hasOwnProperty('keyDown');
        var hasLeft = listener.hasOwnProperty('keyLeft');
        var hasRight = listener.hasOwnProperty('keyRight');

        if(!hasUp || !hasDown || !hasRight || !hasLeft){
            throw "listener doesn't support all events";
        }
        this._keyObserver.push(listener);

    },
    getViewContainer: function(){
        var container = $('<div>');
        container.addClass('map-view-ui');
        var model = this._model;
        for(var y = 0; y < this._model.height(); ++y){
            var row = $('<div>').addClass('map-entry-row');
            for(var x = 0;  x < this._model.width(); ++x ){
                var entry = this._model.getPosition(x,y);
                row.append(this._createViewForEntry(entry));
            }
            container.append(row);
        }
        console.log("register event");
        container.keydown( event => {
            console.log("event keyCode: " + event.keyCode + " which: " + event.which + " charCode " + event.charCode);
            console.log(event);
            var code = event.key || event.charCode || event.keyCode;
            console.log("code: " + code + " w: " + toCharCode('w'));
            if(code == 'w' ){
                console.log("UP");
                this._notifyObservers('keyUp');
            }else if(code == 'a'){
                console.log("LEFT");
                this._notifyObservers('keyLeft');
            }else if(code == 's'){
                console.log("DOWN");
                this._notifyObservers('keyDown');
            }else if(code == 'd'){
                console.log("RIGHT");
                this._notifyObservers('keyRight');
            }
        });
        container.attr('tabindex', -1);
        return container;
    },
    drawTo: function(parent){
        $(parent).append(this.getViewContainer());
    },
    _createViewForEntry(entry){
        var div = $('<div>');
        div.addClass('map-entry');
        div.text("[x: " + entry.getX() + " y:" + entry.getY() + "]");
        entry.onEnter(( _entry, entity) => {
            if(entity.id() === 'player'){
                $(div).addClass('player-is-here');
            }
            console.log("enter-callback");
        });
        entry.onExit( (_entry, entity) => {
            if(entity.id() === 'player'){
                $(div).removeClass('player-is-here');
            }
            console.log("exit-callback");
        });
        return div;
    },
    _notifyObservers: function(event){
        for(var o of this._keyObserver){
            o[event](this);
        }
    }
}

function toCharCode(value){
    return value.charCodeAt(0);
}

var BattleView = function(battle, success){
    this.domElement = $("<div></div>");
    this._battle = battle;
    var self = this;

    $(this.domElement).load("template/battle/template-battle-view.html", () => {
        var count = 2;
        var reduceCount = () => {
            --count;
            if(count === 0){
                success(self);
            }
        };
        var finishedPlayer = (entry) => {
            --count;
            self.domElement.find('.battle-view .player-overview').append(entry);
            if(count == 0){
                success(self);
            }
        };
        var finishedEnemey = (entry) => {
            --count;
            self.domElement.find('.battle-view .enemy-overview').append(entry);
            if(count == 0){
                success(self);
            }
        };
        self._battle.enemies().forEach(actor => self._loadActor(self.domElement, actor, finishedEnemey));
        self._battle.allies().forEach(actor => self._loadActor(self.domElement, actor, finishedPlayer));
        console.log("halleluja");
        self._battle.allies().forEach( actor => {
            console.log("setting provider");
            var provider = new ActionProvider();
            provider.getAction = function(battle, callback){
                console.log("mmmmhh");
                self._createUIForActor(self.domElement,actor,callback, self._battle);
            };
            actor.actionprovider(provider)
        });
    });
}
BattleView.prototype = {
    _loadActor: function(domElement, actor, finished){
        var self = this;
        var entry  = $("<div>");
        entry.addClass("entry-for-" + actor.id() );
        entry.load("template/battle/actor-entry.html", () => {
            self._applyActorValues(domElement, entry, actor);
            finished(entry);
        });
    },
    _applyActorValues: function(domElement, entry, actor){
        entry.find(".name").text("name: " + actor.name() );
        entry.find(".atk").text("atk: " + actor.stats.atk() );
        entry.find(".def").text("def: " + actor.stats.def() );
        entry.find(".hp").text("hp: " + actor.stats.hp() );
    },
    _createUIForActor(domElement, actor, callback, battle){
        var overview = domElement.find(".action-overview");
        overview.empty();
        actor.possibleActions().forEach( action => {
            action.target(battle.enemies()[0]);
            action.caster(actor);
            console.log("action");
            var entry = $("<div>");
            var bttn = $("<button>");
            bttn.text("Action fire");
            bttn.click(event => {
                callback(actor, action);
            });
            entry.append(bttn);
            overview.append(entry);
        });
    }
}

var UI = function(){
    this.showBattle = function(battle, onready){
        var view = new BattleView(battle, (view) => {
            $('body').append(view.domElement);
            onready(battle);
        });
    };
}
