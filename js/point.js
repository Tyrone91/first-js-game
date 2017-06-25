var Point = function(x,y){
    this.x = x || 0;
    this.y = y || 0;
}
Point.prototype = {
    toString: function(){
        return "[x:" + this.x + "|y:"+ this.y +"]";
    }
}
