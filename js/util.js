function loadEntityFromFile(game, source, callback){
    $.getJSON(source, data => {
        var entity = new Entity();
        entity.name = data.name;
        entity.id = data.id;

    });
}

function loadPlayerFromFile(source, callback){
    loadJsonFrom(source, data => {
        var id = data.id;
        var name = data.name;
        var player = new Player(id, name);
        player.stats.atk(data.atk);
        player.stats.def(data.def);
        player.stats.hp(data.hp);
        console.log(player);
        callback(player);
    });
}

function loadJsonFrom(url, onSuccess, onFailure){
      var xhttp = new XMLHttpRequest();

      xhttp.overrideMimeType("application/json");
      xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4) {
              if(xhttp.status != 200){
                  if(onFailure){
                      onFailure(xhttp.status, xhttp.statusText, xhttp.responseText);
                  }
              }else{
                  if(onSuccess){
                      onSuccess(JSON.parse(xhttp.responseText));
                  }
              }
          }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}
