$(document).ready(function() {
    var cnv=document.getElementById("canv");
    var ctx=cnv.getContext("2d");

    var p = createPositions() ;

    for (var i = 0 ; i < p.length  ; i++){

        window.setTimeout(createRect(ctx,i,p) ,3000) ;

    }

});


function createRect(ctx,idx,p){
    for ( i = idx ; i < p.length  ; i++){
        ctx.fillStyle="yellow";
        ctx.strokeStyle="black";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.lineWidth=0.5;
        ctx.fillRect(p[i].x , p[i].y , 100 , 100) ;
        ctx.strokeRect(p[i].x , p[i].y , 100 , 100);
    }
}

function createPositions(){
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
    for (var i = 0 ; i < nbrRect ; i ++){

        if ((startPosX < canvWith) && (startLigne == 1)){
            var p ={ x : startPosX , y : startPosY } ;
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