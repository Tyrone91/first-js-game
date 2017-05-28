var Entity = function(id, name){
    this._id = id;
    this._name = name;
}
Entity.prototype = {
    /**
     * setter or getter for the name of the Entity
     * @param  {String} name optional String param. If provided it will be treated like a settter
     * @return {String|Entity}      If used as a setter it will return this and else the value of the field
     */
    name: function(name){
        if(typeof name !== 'undefined'){
            this._name = name;
            return this;
        }else{
            return this._name;
        }
    },
    /**
     * setter or getter for the id of the Entity
     * @param  {String} name optional String param. If provided it will be treated like a settter
     * @return {String|Entity}      If used as a setter it will return this and else the value of the field
     */
    id: function(id){
        if(typeof id !== 'undefined'){
            this._id = id;
            return this;
        }else{
            return this._id;
        }
    }
}
