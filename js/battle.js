var Battle = function(){
    this._roundnr = 0;
    this._enemies = [];
    this._allies = [];
    this._onVicotry = (battle) => console.log("Debug: Player won"); // default Debug print
    this._onDefeat = (battle) => console.log("Debug: Player lost");
}

Battle.prototype = {
    onvictory(func){
        if(func){
            this._onVicotry = func;
            return this;
        }else{
            return this._onVicotry;
        }
    },
    ondefeat(func){
        if(func){
            this.ondefeat = func;
            return this;
        }else{
            return this.ondefeat;
        }
    },
    addEnemy: function(enemy){
        this._enemies.push(enemy);
    },
    addFriend: function(friend){
        this._allies.push(friend);
    },
    enemies: function(){
        return this._enemies;
    },
    allies: function(){
        return this._allies;
    },
    roundnr: function(){
        return this._roundnr;
    },
    /**
     * Indicates if the given entity is friendly in aspect to the player
     * @param  {Object}  entity The entity to check
     * @return {Boolean} True if the entity is a friend of the player, otherwise false.
     */
    isFriendly(entity){
        return this._allies.includes(entity);
    },
    isEnemy(entity){
        return !this.isFriendly(entity);
    },
    start: function(){
        var current  = null;
        if( this.roundnr() % 2 == 0){
            current  = this.allies()[0];
        }else{
            current = this.enemies()[0];
        }
        this._getActionFrom(current);
    },
    _isTeamCombatReady: function(team){
        var res = false;
        for(var entity of team){
            res = res || entity.stats.hp() > 0;
        }
        return res;
    },
    _validatestate: function(){
        var playerTeamReady = this._isTeamCombatReady(this.allies());
        var enemyTeamReady = this._isTeamCombatReady(this.enemies());
        if(!playerTeamReady){
            this._onDefeat(this);
        }
        if(!enemyTeamReady){
            this._onVicotry(this);
        }
    },
    _roundfinished: function(){
        this._validatestate();
        ++this._roundnr;
        this.start(); //TODO: Don't call start again.
    },
    _getActionFrom: function(entity){
        var self = this;
        entity.getAction(this, (entity,action) => self._execute(entity,action) );
    },
    _execute: function(entity, action){
        action.perform();
        console.log(this);
        console.log("current round: " + this.roundnr());
        console.log("entity name: " + entity.name() );
        console.log("target name: " + action.target().name() );
        console.log("targt-hp: " + action.target().stats.hp() );

        this._roundfinished();
    }
}
