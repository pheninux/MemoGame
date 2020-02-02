var ctx;
var countClikc = [];
var tabRectangles = [];
var floorRects = [];
var enableClickInFloor = true ;
var nbrErrorCase = 0;





/***
 * start programme
 */
$(document).ready(function () {

    /*** creation des positions par defaut ***/
    createFloorDefaultPositions();
    createRondomFullRectPos(floorRects);
    createRondomLevelRectPos(floorRects);
    /*** initialisation de la canvas ***/
    cnv = document.getElementById("canv");
    ctx = cnv.getContext("2d");

    manageEventCanvas(ctx,cnv);
    // disignRectWithTimeOut(0 , p , ctx);
    disignfloor(floorRects, ctx);


});

/***
 * create a rondom  positions
 * @param p
 */
function createRondomFullRectPos(floorRects) {

    for (let i = floorRects.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [floorRects[i], floorRects[j]] = [floorRects[j], floorRects[i]];
    }
}

/***
 * create rondom value of level case from a full floor case
 * @param tabFloorRects
 */
function createRondomLevelRectPos(floorRects) {

    tabRectangles = floorRects.slice(0 , config.nbrRect);
   return tabRectangles ;
}



/***
 * manage Event canvas
 * @param ctx
 * @param tabPos
 */
function manageEventCanvas(ctx,cnv) {
    cnv.addEventListener("mousedown", function () {

        if (enableClickInFloor){
            (function () {
                var rect = cnv.getBoundingClientRect();
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;
                console.log("Coordinate x: " + x,
                    "Coordinate y: " + y);

                /*** si le les coordonnées du pointeur de la sourie existe dans la liste des positions ***/
                /*** modifié la couleur du rectangle ***/
                //contains(p,x,y,ctx) ;
                checkResultat(tabRectangles, x, y, ctx, countClikc.length);


            })(cnv, event, tabRectangles);
        }
        /*** recuperation des coordonnée de la canvas ***/
    });
}

/***
 * manage design rectancle with time out
 * @param i
 * @param tabPos
 * @param ctx
 */
function disignRectWithTimeOut(idx, tabRectangles, ctx) {
    setTimeCreation = setTimeout(function () {

        if (idx >= 0 && idx <= tabRectangles.length - 1) {
            ctx.fillStyle = tabRectangles[idx]._color;
            ctx.strokeStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.lineWidth = 0.5;
            ctx.fillRect(tabRectangles[idx]._position.x, tabRectangles[idx]._position.y, tabRectangles[idx]._width, tabRectangles[idx]._height);
            ctx.strokeRect(tabRectangles[idx]._position.x, tabRectangles[idx]._position.y, tabRectangles[idx]._width, tabRectangles[idx]._height);

            idx++;
            disignRectWithTimeOut(idx, tabRectangles, ctx);

        }

    }, 2000);
}

function disignRect(ctx, tabRects, i) {
    ctx.fillStyle = "#efe5da";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 0.5;
    ctx.fillRect(tabRects[i]._position.x, tabRects[i]._position.y, tabRects[i]._width, tabRects[i]._height);
    ctx.strokeRect(tabRects[i]._position.x, tabRects[i]._position.y, tabRects[i]._width, tabRects[i]._height);
}

function disignfloor(tabRects, ctx) {

    for (let i = 0; i < tabRects.length; i++) {
        disignRect(ctx, tabRects, i);
    }
}


/***
 * init and create default position for game floor
 * @returns {[]}
 */
function createFloorDefaultPositions() {

     var rect ;

    for (var i = 0; i < config.floor.nbrRect; i++) {

        if ((config.startPosX < config.canvasWidth) && (config.startLigne == 1)) {

            rect = new MyRectangle(config.rectWidth, config.rectHeight, new Position(config.startPosX, config.startPosY), "yellow");
            floorRects.push(rect);

        } else {
            // test if we arrive at the end of first line , we passe to second
            if (config.startPosX == config.canvasWidth) {
                config.startPosX = 0;
                config.startLigne++
            }
            config.startPosY = config.rectWidth * (config.startLigne - 1);

            rect = new MyRectangle(config.rectWidth, config.rectHeight, new Position(config.startPosX, config.startPosY), "yellow");
            floorRects.push(rect);
            config.startPosX += config.rectWidth;


        }
        if (config.startLigne == 1) {
            config.startPosX += config.rectWidth;
        }

    }
    return floorRects;
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

/***
 * play a count dwon and show message to start memoring case
 */
function playCountDown() {

    // initialise enable click in canavas floor and nbr of errors
    enableClickInFloor = true ;
    nbrErrorCase = 0 ;
    //initialise variable count click
    i = 0;
    countClikc = [];
    disignfloor(floorRects, ctx);
    // re create new rondom suite
    createRondomFullRectPos(floorRects);
    createRondomLevelRectPos(floorRects);

    var downloadTimer = setInterval(function () {
        document.getElementById("countDown").innerHTML = config.countDown;
        config.countDown -= 1;
        if (config.countDown < 0) {
            config.countDown = 3;
            clearInterval(downloadTimer);
            document.getElementById("countDown").innerHTML = "Start memoring case";
            disignRectWithTimeOut(0, tabRectangles, ctx);
        }
    }, 1000);
}


function checkResultat(tabRects, x, y, ctx, i) {

    if (x >= tabRects[i]._position.x &&
        x <= tabRects[i]._position.x + tabRects[i]._width &&
        y >= tabRects[i]._position.y &&
        y <= tabRects[i]._position.y + tabRects[i]._height) {
        ctx.fillStyle = "green";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5 ;
        ctx.fillRect(tabRects[i]._position.x, tabRects[i]._position.y, tabRects[i]._width, tabRects[i]._height);
        ctx.strokeRect(tabRects[i]._position.x, tabRects[i]._position.y, tabRects[i]._width, tabRects[i]._height);
        countClikc.push(i++);
        if (countClikc.length == tabRects.length){
            enableClickInFloor = false ;
            if (nbrErrorCase == 0) {
                playSongWin() ;
                config.nbrRect ++ ;
            }else {
                playSongLose() ;
            }
        }

    } else {
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5
        ctx.fillRect(tabRects[i]._position.x, tabRects[i]._position.y, tabRects[i]._width, tabRects[i]._height);
        ctx.strokeRect(tabRects[i]._position.x, tabRects[i]._position.y, tabRects[i]._width, tabRects[i]._height);
        countClikc.push(i++);
        nbrErrorCase ++ ;
        if (countClikc.length == tabRects.length){
            enableClickInFloor = false ;
                playSongLose() ;

        }

    }


}

function playSongWin() {
    var audio = new Audio('http://soundbible.com/mp3/Ta%20Da-SoundBible.com-1884170640.mp3');
    audio.play();
}

function playSongLose() {
    var audio = new Audio('http://soundbible.com/mp3/Sad_Trombone-Joe_Lamb-665429450.mp3');
    audio.play();

}