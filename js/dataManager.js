function savePlayer() {
    var login = $("#login").val();
    var level = config.level
    var score = "0"
    var player = new Player(login,score,level) ;

    var result  =  RestManager.doSecretSynchronousServerQuery("localhost:4000/save/login",false,player,5000) ;
    console.log(result);
}