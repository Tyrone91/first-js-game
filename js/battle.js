var Battle = function(){
    this._roundnr;
    this._enemies = [];
    this._allies = [];
}

Battle.prototype = {
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
    _getActionFrom(entity){
        var action = entity.getAction(this);
        action.perform();
    }
}
