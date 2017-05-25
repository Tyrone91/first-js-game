var Player = function(name){
    this.inventory = new Inventory();
    this.stats = new Stats();
}
Player.prototype = new Entity();
