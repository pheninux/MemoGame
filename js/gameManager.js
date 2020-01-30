var rectWith = 100 ;
var rectHeight = 100 ;
var startPosX = 0;
var startPosY = 0;
var startLigne = 1 ;
var startCol = 5 ;
var tab = [] ;
var position = {x : 0 , y : 0} ;
var nbrRect = 10 ;
var canvWith = 500 ;
var canvHeight = 500 ;
var timeleft = 3;
var cnv ;
var ctx ;
var p ;

/***
 * start programme
 */
$(document).ready(function() {
    /*** creation des positions par defaut ***/
    p = createDefaultPositions() ;
    createRondomPositions(p) ;
    /*** initialisation de la canvas ***/
    cnv=document.getElementById("canv");
    ctx=cnv.getContext("2d");

    manageEventCanvas(ctx,p,cnv);
   // disignRectWithTimeOut(0 , p , ctx);
    disignRect(p,ctx);


});

/***
 * create a rondom  positions
 * @param p
 */
function createRondomPositions(p) {

        for (let i = p.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [p[i], p[j]] = [p[j], p[i]];
        }
}

/***
 * manage Event canvas
 * @param ctx
 * @param tabPos
 */
function manageEventCanvas(ctx ,tabPos , cnv) {
    cnv.addEventListener("mousedown", function () {

        /*** recuperation des coordonnée de la canvas ***/
        (function () {
            var rect = cnv.getBoundingClientRect() ;
            var x = event.clientX -  rect.left ;
            var y = event.clientY - rect.top ;
            console.log("Coordinate x: " + x,
                "Coordinate y: " + y);

            /*** si le les coordonnées du pointeur de la sourie existe dans la liste des positions ***/
            /*** modifié la couleur du rectangle ***/
            contains(p,x,y,ctx) ;


        })(cnv , event , p);
    }) ;
}

/***
 * manage design rectancle with time out
 * @param i
 * @param tabPos
 * @param ctx
 */
function disignRectWithTimeOut(i , tabPos , ctx) {
    setTimeCreation =  setTimeout(function () {

        if (i >= 0 && i <= tabPos.length -1){
            ctx.fillStyle= "#ffff99";
            ctx.strokeStyle="black";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.lineWidth=0.5;
            ctx.fillRect(tabPos[i].x , tabPos[i].y , 100 , 100) ;
            ctx.strokeRect(tabPos[i].x , tabPos[i].y , 100 , 100);

            i++ ;
            disignRectWithTimeOut(i , tabPos , ctx);

        }

    }, 2000) ;
}

function disignRect(tabPos , ctx) {

    for ( let i =0 ; i < tabPos.length ; i++){
        ctx.fillStyle= "#efe5da";
        ctx.strokeStyle="black";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.lineWidth=0.5;
        ctx.fillRect(tabPos[i].x , tabPos[i].y , 100 , 100) ;
        ctx.strokeRect(tabPos[i].x , tabPos[i].y , 100 , 100);
    }
}



/***
 * init and create default position for game floor
 * @returns {[]}
 */
function createDefaultPositions(){

    for (var i = 0 ; i < nbrRect ; i ++){

        if ((startPosX < canvWith) && (startLigne == 1)){
            var p ={ x : startPosX , y : startPosY  , width : rectWith , height :rectHeight} ;
            tab.push(p);

        }else{
            if (startPosX == canvWith){
                startPosX = 0 ;
                startLigne++
            }
            startPosY = rectWith * (startLigne -1) ;
            var p ={ x : startPosX , y : startPosY , width : rectWith , height :rectHeight} ;

            tab.push(p);
            startPosX += rectWith ;


        }
        if (startLigne == 1){
            startPosX += rectWith ;
        }

    }
    return tab ;
}

/***
 * function to check if de coordinate of mousse pointer existe in positions table
 * @param p
 * @param x
 * @param y
 * @param ctx
 */
function contains(p , x , y , ctx) {
    $.each(p , function (k , v) {
        if (x >= v.x &&
            x <= v.x + v.width &&
            y >= v.y &&
            y <= v.y + v.height ) {
            ctx.fillStyle = getRandomColor() ;
            ctx.fillRect(v.x , v.y ,rectWith , rectHeight);
            return false

        }
    }) ;
}

/***
 * get a rondom for colors
 * @returns {string}
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function playCountDown() {
    disignRect(p,ctx);
    var downloadTimer = setInterval(function(){
        document.getElementById("countDown").innerHTML = timeleft ;
        timeleft -= 1;
        if(timeleft < 0){
            timeleft = 3 ;
            clearInterval(downloadTimer);
            document.getElementById("countDown").innerHTML = "Start memoring case" ;
            disignRectWithTimeOut(0,p,ctx);
        }
    }, 1000);
}


function checkResul(p ,ctx) {

}
