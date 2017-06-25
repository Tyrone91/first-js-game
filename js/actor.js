var Actor = function(id,name) {
    this.id(id);
    this.name(name);
    this_actionprovider = null;
    this.stats = new Stats();
    this._possibleActions = [];
}
Actor.prototype = new Entity();
Actor.prototype.getAction = function(battle, callback) {
    this.actionprovider().getAction(battle, callback);
};
Actor.prototype.actionprovider = function (provider) {
    if(provider){
        this._provider = provider;
        this._provider.master(this);
        return this;
    }else{
        return this._provider;
    }
};
Actor.prototype.addPossibleAction = function(action){
    this._possibleActions.push(action);
    return this;
}
Actor.prototype.possibleActions = function(){
    return this._possibleActions;
}
//Actor.prototype.stats = new Stats();
