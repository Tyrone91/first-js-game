var Stats = function(){
	this._atk = 0;
	this._def = 0;
	this._hp = 0;
	this._critchance = 0.0;
	this._critboost = 0.0;
}

Stats.prototype = {
	atk: function(atk){
		if(typeof atk !== 'undefined'){
			this._atk = atk;
			return this;
		}else{
			return this._atk;
		}
	},
	def: function(def){
		if(typeof def !== 'undefined'){
			this._def = def;
			return this;
		}else{
			return this._def;
		}
	},
	hp: function(hp){
		if(typeof hp !== 'undefined'){
			this._hp = hp;
			return this;
		}else{
			return this._hp;
		}
	},
	critchance: function(chance){
		if(typeof chance !== 'undefined'){
			this._critchance = chance;
			return this;
		}else{
			return this._critchance;
		}
	},
	critboost: function(boost){
		if(typeof boost !== 'undefined'){
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
