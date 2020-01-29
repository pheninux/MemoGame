var rectWith = 100 ;
var rectHeight = 100 ;
var startPosX = 0;
var startPosY = 0;
var startLigne = 1 ;
var startCol = 5 ;
var tab = [] ;
var position = {x : 0 , y : 0} ;
var nbrRect = 25 ;
var canvWith = 500 ;
var canvHeight = 500 ;

$(document).ready(function() {
    var p = createDefaultPositions() ;
    createRondomPositions(p) ;
    var cnv=document.getElementById("canv");
    var ctx=cnv.getContext("2d");
    cnv.addEventListener("mousedown", function () {
        (function () {
            var rect = cnv.getBoundingClientRect() ;
            var x = event.clientX -  rect.left ;
            var y = event.clientY - rect.top ;
            console.log("Coordinate x: " + x,
                "Coordinate y: " + y);
            $.each(p , function (k , v) {
                 if (contains(p,x,y)) {
                     ctx.fillStyle = "green" ;
                     ctx.fillRect(v.x , v.y ,rectWith , rectHeight);
                 }
            }) ;

        })(cnv , event , p);
    }) ;

    disignRect(0 , p , ctx);




});

function createRondomPositions(p) {

        for (let i = p.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [p[i], p[j]] = [p[j], p[i]];
        }
}

function disignRect(i , tabPos , ctx) {
    setTimeCreation =  setTimeout(function () {

        if (i >= 0 && i <= tabPos.length -1){
            ctx.fillStyle="yellow";
            ctx.strokeStyle="black";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.lineWidth=0.5;
            ctx.fillRect(tabPos[i].x , tabPos[i].y , 100 , 100) ;
            ctx.strokeRect(tabPos[i].x , tabPos[i].y , 100 , 100);

            i++ ;
            disignRect(i , tabPos , ctx);

        }

    }, 500) ;
}

function createDefaultPositions(){

    for (var i = 0 ; i < nbrRect ; i ++){

        if ((startPosX < canvWith) && (startLigne == 1)){
            var p ={ x : startPosX , y : startPosY  , width : 100 , height :100} ;
            tab.push(p);

        }else{
            if (startPosX == canvWith){
                startPosX = 0 ;
                startLigne++
            }
            startPosY = rectWith * (startLigne -1) ;
            var p ={ x : startPosX , y : startPosY } ;

            tab.push(p);
            startPosX += rectWith ;


        }
        if (startLigne == 1){
            startPosX += rectWith ;
        }

    }
    return tab ;
}

function contains(p , x , y) {
    $.each(p , function (k , v) {
        if (x >= v.x &&
            x <= v.x + v.width &&
            y >= v.y &&
            y <= v.y + v.height ) return true ;
    }) ;
}