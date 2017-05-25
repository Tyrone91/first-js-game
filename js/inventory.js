Inventory = function(owner){
	this._owner = owner;
	this._items = [];
}

Inventory.prototype = {
	refresh: function(){

	},
	addItem: function(item){
		this._items.push(item);
		//$('.item-overview').append(this._createItemContainer(item));
		console.log("INFO: addItem()");

		var inventory = $('.item-overview');
		var entry = $('<div>');
		entry.attr("id", "container-for-"+item.id());
		entry.css("display","table-row");
		entry.load("../html/template-item-entry.html", () => {
			console.log("success");
			this._populateEntry(entry,item);
			inventory.append(entry);
		});
	},
	/**
	* entry - JQuery template element
	* Adds the specific data to the template from the given item as source.
	*/
	_populateEntry: function(entry,item){
		console.log(entry);
		entry.find(".item-entry-template-name").text(item.name() );
		entry.find(".item-entry-template-atk").text(item.stats.atk() );
		entry.find(".item-entry-template-def").text(item.stats.def() );
		entry.find(".item-entry-template-hp").text(item.stats.hp() );
		entry.find(".item-entry-template-critchance").text(item.stats.critchance() );
		entry.find(".item-entry-template-critboost").text(item.stats.critboost() );

	},
	_createItemContainer(item){
		 var divId = "container-for-" + item.id();
		 var divElement = $("<div></div>").attr("id", divId);
		 divElement
		 .append($("<div></div>").text("name: " + item.name() ))
		 return divElement;
	}

}
