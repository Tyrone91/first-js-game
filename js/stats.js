var Stats = function(){
	this._atk = 0;
	this._def = 0;
	this._hp = 0;
	this._critchance = 0.0;
	this._critboost = 0.0;
}

Stats.prototype = {
	atk: function(atk){
		if(atk){
			this._atk = atk;
			return this;
		}else{
			return this._atk;
		}
	},
	def: function(def){
		if(def){
			this._def = def;
			return this;
		}else{
			return this._def;
		}
	},
	hp: function(hp){
		if(hp){
			this._hp = hp;
			return this;
		}else{
			return this._hp;
		}
	},
	critchance: function(chance){
		if(chance){
			this._critchance = chance;
			return this;
		}else{
			return this._critchance;
		}
	},
	critboost: function(boost){
		if(boost){
			this._critboost = boost;
			return this;
		}else{
			return this._critboost;
		}
	},
	reset: function(){
		for(var propName in this){
			if(typeof this[propName] == "number" ) {
				this[propName] = 0;
			}
		}
	},
	_debug_print: function(){
		for(var propName in this){
			if(typeof this[propName] == "number" ) {
				console.log("'" + propName + "' : " + this[propName]);
			}
		}
	}
}
