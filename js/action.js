/**
 * An Action that will be performed on an entity.
 * The actual action that will be performed can be set via onPerform();
 * The onPerform() - Actio  will receive it's father Action as reference.
 * @type {[Object]}
 */
var Action = funtion(){
    this._caster = null;
    this._target = null;
    this._cooldown = 0.0;
    this._onperform = () => console.log("DEBUG: action fired"); // Placeholder action
}
Action.prototype = {
    target:  function(entity){
        if(entity){
            this._target = entity;
            return this;
        }else{
            return this._target;
        }
    },
    caster: function(entity){
        if(enity){
            this._caster = entity;
            return this;
        }else{
            return this._caster;
        }
    }
    /**
     * Sets the function which will executed if the the Action is activated
     * @param  {function} func Optional function,
     * @return {function|this}      If used as setter it will return this else the current value.
     */
    onPerform: function(func){
        if(func){
            this._onperform = func;
            return this;
        }else{
            return this._onperform;
        }
    },
    /**
     * Cooldown value of the action
     * @param  {number} value Optional new value for the cooldown
     * @return {Number|Action}       If used as a setter the function will return this else the current value
     */
    cooldown(value){
        if(value){
            this._cooldown = value;
            return this;
        }else{
            return this._cooldown;
        }
    },
    perform(){
        this._onperform(this);
    }
}