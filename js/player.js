var Player = function(id, name){
    this.inventory = new Inventory();
    this.stats = new Stats();
    this.id(id);
    this.name(name);
}
Player.prototype = new Actor();

var PlayerInput = function(){

}
PlayerInput.prototype = ActionProvider.prototype;
PlayerInput.prototype.getAction = function(battle, callback){
    var action = new AttackAction();
    action.caster(this.master());
    action.target(battle.enemies()[0]);
    var self = this;
    console.log(this.master());
    var bttn = $('<button>').text("Fire action").click( e => callback(self.master(), action));
    bttn.addClass("test-input-bttn");
    $('.test-user-input').append(bttn);
}
