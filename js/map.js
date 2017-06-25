var Entry = function(father,x,y){
    this._father = father;
    this._point = new Point(x,y);
    this._onExit = [];
    this._onEnter = [];
    this._visitors = {};
}
Entry.prototype = {

    getX: function(){
        return this._point.x;
    },
    getY: function(){
        return this._point.y;
    },
    onExit: function(callback){
        this._onExit.push(callback);
    },
    onEnter: function(callback){
        this._onEnter.push(callback);
    },
    clearOnExit: function(){
        this._onExit = [];
    },
    clearOnEnter: function(){
        this._onEnter = [];
    },
    enter: function(entity){
        var former = this._visitors[entity.id()];
        if( (typeof former !== 'undefined' && former != null) || former != null){
            throw "entity: " + entity.id() + " already present at " + this._point.toString();
        }
        this._visitors[entity.id()] = entity;
        this._onEnter.forEach( (callback, index) => {
            callback(this, entity);
        });
    },
    leave: function(entity){
        var former = this._visitors[entity.id()];
        if( typeof former === 'undefined' || former == null){
            throw "entity: " + entity.id() + " isn't present at " + this._point.toString();
        }
        this._visitors[entity.id()] = null;
        this._onExit.forEach( (callback, index) => {
            callback(this, entity);
        });
    }
}

var Map = function(width, height){
    if(!width || !height){
        throw "width or height can't be null or undefined";
    }
    this._width = width;
    this._height = height;
    this._field = [];
}
Map.prototype = {
    /**
     * Setter/Getter for width. If set to a new value fillMap() must be called to take effect
     * @param  {number} width - optional. If given then the methode is a setter
     * @return {number} returns this or the value of the width;
     */
    width: function(width){
        if(typeof width !== 'undefined'){
            this._width = width;
            return this;
        }else{
            return this._width;
        }
    },

    /**
     * Setter/Getter for height. If set to a new value fillMap() must be called to take effect
     * @param  {number} height - optional. If given then the methode is a setter
     * @return {number} returns this or the value of the height;
     */
    height: function(height){
        if(typeof height !== 'undefined'){
            this._height = height;
            return this;
        }else{
            return this._height;
        }
    },

    /**
     * Evaluates if the given x/y-value are in bounds of the width and height of the map
     * @param  {number} x x-value of the position.
     * @param  {number} y y-value of the position.
     * @return {boolean}   true if in bounds otherwise false.
     */
    inBounds: function(x, y){
        return !(x >= this._width || y >= this._height || x < 0 || y < 0);
    },

    /**
     * Returns the entry for the given position.
     * Use a point-object or an x and y coordinate
     * @param  {Point} point Optional point-object
     * @param  {number} y
     * @param  {number} x
     * @return {Entry}  Entry for the givn positon
     */
    getPosition(point, y , x){
        if(typeof point !== 'object'){
            x = point;
        }else{
            x = point.x;
            y = point.y;
        }
        if(!this.inBounds(x,y)){
            throw "x(value=" + x + ") must be smaller than " + this._width + " and y(value=" + y + ") must be smaller than " + this._height;
            //throw "x or y greater than width or height";
        }
        var entry = this._field[this._toIndex(x,y)];
        return entry;
    },

    /**
     * Fills the map with new Entries in every single spot.
     * @return {[type]} [description]
     */
    fillMap: function(){
        for(var x = 0; x < this.width(); ++x){
            for(var y = 0; y < this.height(); ++y){
                this._field[this._toIndex(x,y)] = new Entry(this,x,y);
            }
        }
    },

    /**
     * Shortcut for entering an Entry.
     * @param  {Point} point The position of the Entry which should be entered.
     * @param  {[type]} entity [description]
     * @return {[type]}        [description]
     */
    enter: function(point, entity){
        this.getPosition(point).enter(entity);
    },
    leave: function(point, entity){
        this.getPosition(point).leave(entity);
    },
    _toPosition: function(index){
        throw "not-yet-implemented";
    },
    _toIndex: function(x,y){
        return x + (this._width * y);
    }
}
