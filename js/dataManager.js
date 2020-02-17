$.getScript("config/conf.js", function() {
    alert("Script (config) loaded but not necessarily executed.");
});
$.getScript("lib/rest/rest.js", function() {
    alert("Script (rest) loaded but not necessarily executed.");
});
$.getScript("model/Player.js", function() {
    alert("Script (player) loaded but not necessarily executed.");
});
function savePlayer() {
    var player = {};
    var login = $("#login").val();
    var level = config.level ;
    var score = 0 ;
    player = new Player(login,level,score) ;
    var jsonData = JSON.stringify(player);

   /*$.post(config.server.url+"/save/login", jsonData ,function(data, status){

        alert("Data: " + data + "\nStatus: " + status);
    });*/

    $.ajax({
        url: config.server.url+"/save/login",
        headers: {  'Access-Control-Allow-Origin': config.server.url },
        data: player,
        type: 'post',
        /* etc */
        success: function(jsondata){
       console.log(jsondata) ;
        }
    })


}