var Battle = function(){
    this._roundnr = 0;
    this._enemies = [];
    this._allies = [];
    this.actionQueue = [];
    this._onVicotry = (battle) => console.log("Debug: Player won"); // default Debug print
    this._onDefeat = (battle) => console.log("Debug: Player lost");
}

Battle.prototype = {
    onVictory(func){
        if(func){
            this._onVicotry = func;
            return this;
        }else{
            return this._onVicotry;
        }
    },
    onDefeat(func){
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
    /**
     * starts a new battle between the current added teams.
     * After this call no entity should be add to the battle.
     * @return {Undefined} returns nothing.
     */
    start: function(){
        this._roundnr = 1;
        this._nextAction();
    },
    /**
     * Will try to get the next action from an entity.
     * @return {[type]} [description]
     */
    _nextAction(){
        //TODO placeholder function
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
            console.log("name: " + entity.name() + " hp: " + entity.stats.hp() + " combat-ready: " + (entity.stats.hp() > 0) );
            res = res || entity.stats.hp() > 0;
        }
        return res;
    },
    /**
     * Validates the current state of the battle.
     * If any team has no combat-ready Entities the function will return false
     * and will call the corresponding callback function.
     * If the enemy-team lost it will call the onVictory-callback
     * and if the player-team lost the onDefeat-callback
     * @return {[type]} [description]
     */
    _validateState: function(){
        var playerTeamReady = this._isTeamCombatReady(this.allies());
        var enemyTeamReady = this._isTeamCombatReady(this.enemies());
        if(!playerTeamReady){
            this._onDefeat(this);
        }
        if(!enemyTeamReady){
            this._onVicotry(this);
        }
        return playerTeamReady && enemyTeamReady;
    },
    _roundfinished: function(){
        if(this._validateState()){
            ++this._roundnr;
            this._nextAction();
        }
    },
    _getActionFrom: function(entity){
        var self = this;
        entity.getAction(this, (entity,action) => self._execute(entity,action) );
    },
    /**
     * Internal callback function because getAction from an entity is asynchronous.
     * if the entity chose it action it must call this function or more accurate
     * it must call the function passed to it and that will call this one.
     * @param  {[type]} entity [description]
     * @param  {[type]} action [description]
     * @return {[type]}        [description]
     */
    _execute: function(entity, action){
        action.perform();
        console.log("current round : " + this.roundnr());
        console.log("caster name   : " + entity.name() );
        console.log("target name   : " + action.target().name() );
        console.log("targt-hp      : " + action.target().stats.hp() );
        console.log("----------------------------------------------");

        this._roundfinished();
    }
}
