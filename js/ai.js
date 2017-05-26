// depends on:
// - battle.js
// - entity.js
// - action.js
// - stats.js

var BattleScript = function(){

}
BattleScript.prototype = new ActionProvider();
BattleScript.prototype.getAction = function(battleInstance, callback){
    if(battleInstance.isFriendly(this) ){

    }else{
        var target = battleInstance.allies()[0];
        var action = new AttackAction();
        action.target(target);
        action.caster(this._master);
        console.log("AI: decide to attack");
        callback(this._master, action);
    }
}
