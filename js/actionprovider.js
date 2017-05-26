var ActionProvider = function(){
    this._master = null;
}
ActionProvider.prototype = {
    master: function(entity){
        if(entity){
            this._master = entity;
            return this;
        }else{
            return this._master;
        }
    }
}
