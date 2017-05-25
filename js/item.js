var Item = function(id, name, paramstats){
	this._id = id;
	this._name = name;
	this.stats = paramstats;
}

Item.prototype = {
	id: function(){
		return this._id;
	},
	name: function(name){
		if(name){
			this._name = name
			return this;
		}else{
			return this._name;
		}
	}
}

function loadItems(url){
	return null;
}
