$.getScript("/x/config/conf.js", function() {
    //alert("Script (config) loaded but not necessarily executed.");
});
$.getScript("/x/lib/rest/rest.js", function() {
    //alert("Script (rest) loaded but not necessarily executed.");
});
$.getScript("/x/model/Player.js", function() {
    //alert("Script (player) loaded but not necessarily executed.");
});

function savePlayer() {
    var player = new Player();
    player.login = $("#login").val() ;
    player.lvl = config.level ;
    player.score = 0 ;

    $.ajax({
        url: "/save/player",
        headers: { 'Access-Control-Allow-Origin': config.server.url },
        data: JSON.stringify(player),
        type: 'POST',

        success: function(response){
            console.log(response);
            sessionStorage.setItem("id",response);
            sessionStorage.setItem("login",player.login);
            sessionStorage.setItem("level",config.level);
            window.location.href = "/x/html/espace_game.html"
        }
    });
}

function updateplayer(){
    var player = new Player();
    player.id = parseInt(sessionStorage.getItem("id"));
    player.login = sessionStorage.getItem("login");
    player.lvl = config.level ;
    player.score = 0 ;

    $.ajax({
        url: "/update/player",
        headers: { 'Access-Control-Allow-Origin': config.server.url },
        data: JSON.stringify(player),
        type: 'POST',

        success: function(jsondata){

        }
    });
}
