

            var canvas;
            var ctx ;
            var field;
            var scale;
            var offset;
            var noOfObstacles;
            var grid;
            var typeOfObstacles;
            var cleaned;
            var startingDirty;

            function Field(){
                offset = 5;
                grid =10;
                noOfObstacles = 3;
                typeOfObstacles =7;

                this.cleanedImage=   new Image();
                this.cleanedImage.src="http://orig06.deviantart.net/b498/f/2009/327/4/2/wood_floor_by_braddamy.png";

                this.dirtyImage=   new Image();
                this.dirtyImage.src="http://www.clker.com/cliparts/Y/t/F/2/t/o/ink-splash-with-drops-brown-md.png";

                this.tiles = new Array(100);

                this.setField = function(){

                for(var x=0;x<this.tiles.length;x++){
                this.tiles[x] = 'dirty';
                }
            } ;

            this.setUp = function(){
                this.setField();  //Dirties Up The Field

                //Places Obstacles**********
                for(var i=0;i<noOfObstacles;i++){
                var n1=parseInt(Math.random()*10);
                var n2=parseInt(Math.random()*10);
                var n3=parseInt(Math.random()*typeOfObstacles)+1;
                this.getObstacle(n1,n2,n3);
                }
            //*****Obstacles*****************

            startingDirty=0;
            for(var i=0;i<this.tiles.length;i++){
                if(this.tiles[i]=='dirty')startingDirty++;}

            };

            this.fieldCheck= function(ax,ay){
                if(this.tiles[ay*grid+ax]=='dirty'){this.tiles[ay*grid+ax]='clean';
                cleaned++;}
            }

            this.drawField = function(){

                ctx.fillStyle = '#ff0000';
                ctx.fillRect(0,0,scale*grid+2*offset,scale*grid+2*offset);

                for(var i =0;i<this.tiles.length;i++){

                var column = i%grid;
                var row = parseInt(i/grid);
                ctx.drawImage(this.cleanedImage,scale*column+offset,scale*row+offset,scale,scale);

                if(this.tiles[i]=='dirty'){

                ctx.drawImage(this.dirtyImage,scale*column+offset+parseInt(scale*0.1),
                scale*row+offset+parseInt(scale*0.1),parseInt(scale*0.8),parseInt(scale*0.8));
                }
            if(this.tiles[i]=='obstacle'){
                ctx.fillStyle = '#000000';
            ctx.fillRect(scale*column+offset,scale*row+offset,scale,scale);
            }
            }

            ctx.fillStyle = '#00ff00';
            ctx.fillRect(playerX*scale+offset,playerY*scale+offset,scale,scale);

            ctx.clearRect(650,0,50,600);
            ctx.fillStyle = '#000000';
            ctx.fillText('Clean: '+cleaned,650,50);
        ctx.fillText('Goal: '+startingDirty,650,100);
        ctx.fillText('Turns: '+turn,650,150);

    };

    this.isVacant=function(checkX,checkY){
        var q = this.tiles[checkY*10+checkX];
        if((checkX>=10)||(checkX<0)|| (checkY>=10)||(checkY<0))return false;

        if(this.tiles[checkY*10+checkX]=='obstacle')return false;
        else return true;
    }
    this.getObstacle=function(startX,startY,obstacleType){

        //L Shape Upright
        if(obstacleType==1){
            if(startX>=grid-1)startX=grid-2;
            if(startY>=grid-2)startY=grid-3;
            this.tiles[startY*10+startX]='obstacle';
            this.tiles[(startY+1)*10+startX]='obstacle';
            this.tiles[(startY+2)*10+startX]='obstacle';
            this.tiles[(startY+2)*10+startX+1]='obstacle';
        }
        //L Shape Laying down
        if(obstacleType==2){
            if(startY==0)startY=startY+1;
            while(startX>=grid-2)startX=startX-1;
            this.tiles[startY*10+startX]='obstacle';
            this.tiles[startY*10+startX+1]='obstacle';
            this.tiles[(startY)*10+startX+2]='obstacle';
            this.tiles[(startY-1)*10+startX+2]='obstacle';
        }
        //J Shape Upright
        if(obstacleType==3){
            if(startX==0)startX=startX+1;
            if(startY>=grid-2)startY=grid-3;
            this.tiles[startY*10+startX]='obstacle';
            this.tiles[(startY+1)*10+startX]='obstacle';
            this.tiles[(startY+2)*10+startX]='obstacle';
            this.tiles[(startY+2)*10+startX-1]='obstacle';
        }

        //J Shape Laying down
        if(obstacleType==4){
            if(startX>=grid-3)startX=grid-3;;
            if(startY>=grid-1)startY=grid-2;
            this.tiles[startY*10+startX]='obstacle';
            this.tiles[(startY)*10+startX+1]='obstacle';
            this.tiles[(startY)*10+startX+2]='obstacle';
            this.tiles[(startY-1)*10+startX+2]='obstacle';
        }
        //Square
        if(obstacleType==5){
            if(startX>=grid-2)startX=grid-2;;
            if(startY>=grid-2)startY=grid-2;
            this.tiles[startY*10+startX]='obstacle';
            this.tiles[(startY)*10+startX+1]='obstacle';
            this.tiles[(startY+1)*10+startX]='obstacle';
            this.tiles[(startY+1)*10+startX+1]='obstacle';
        }

        //Upright line
        if(obstacleType==6){
            if(startY>=grid-3)startY=grid-4;
            this.tiles[startY*10+startX]='obstacle';
            this.tiles[(startY+1)*10+startX]='obstacle';
            this.tiles[(startY+2)*10+startX]='obstacle';
            this.tiles[(startY+3)*10+startX]='obstacle';
        }

        //Lying line
        if(obstacleType==7){

            if(startX>=grid-3)startX=grid-4;
            this.tiles[startY*10+startX]='obstacle';
            this.tiles[(startY)*10+startX+1]='obstacle';
            this.tiles[(startY)*10+startX+2]='obstacle';
            this.tiles[(startY)*10+startX+3]='obstacle';
        }



    }  ;

}


var playerX;
var playerY;

function Play(){
    turn++;

    var newMove = sweeper.move();
    if(newMove=="Left"){
        if(field.isVacant(sweeper.x-1,sweeper.y)){
            playerX = playerX-1;
            playerY= playerY;
            if(playerX<=0)playerX=0;
            if(playerY<=0)playerY=0;
        }
    }
    if(newMove=="Right"){
        if(field.isVacant(sweeper.x+1,sweeper.y)){
            playerX = playerX+1;
            playerY= playerY;
            if(playerX>=grid)playerX=grid-1;
            if(playerY>=grid)playerY=grid-1;
        }
    }
    if(newMove=="Up"){
        if(field.isVacant(sweeper.x,sweeper.y-1)){
            playerX = playerX;
            playerY= playerY-1;
            if(playerX<=0)playerX=0;
            if(playerY<=0)playerY=0;
        }
    }
    if(newMove=="Down"){

        if(field.isVacant(sweeper.x,sweeper.y+1)){
            playerX = playerX;
            playerY= playerY+1;
            if(playerX>=grid)playerX=grid-1;
            if(playerY>=grid)playerY=grid-1;
        }
    }

    resetField();
}
function resetField(){
    sweeper.x = playerX;
    sweeper.y=playerY;
    field.fieldCheck(playerX,playerY);
    field.drawField();

}


var sweeper;
var turn;
var gm;
 var gameInterval;
function GameSetup(){
    turn =0;
    cleaned=0;
    canvas = document.getElementById("canvas");
    ctx =  canvas.getContext("2d");
    scale = 60;


    field = new Field();
    field.setUp();
    field.drawField();

    sweeper = new Sweeper();
    playerX = sweeper.x;
    playerY = sweeper.y;
    gameInterval = 50;

    gm=window.setInterval(function(){Play()},gameInterval);

}


