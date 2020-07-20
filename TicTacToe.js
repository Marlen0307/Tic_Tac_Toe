var gameState= {
    player: [],
    cpu: [],
    clicks : 0,
    winningPositions : [["0","1","2"],["3","4","5"],["6","7","8"],["0","3","6"],["1","4","7"],["2","5","8"],
    ["0","4","8"],["2","4","6"]]
};
window.onload = function(){
    var canvas = document.getElementById("GameBoard");
    drawBoard(canvas);
    var tds = document.getElementsByTagName("td");
    for(var i = 0 ; i < tds.length; i++){
        tds[i].onclick = drawX;
    }
}
function drawBoard(canvas){
    //Vertical lines
    //Line 1
    var context = canvas.getContext("2d");
    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;
    var verticalLineCoords = Math.floor(width/3);
    var horizontalLineCoords = Math.floor(height/3);
    context.beginPath();
    context.moveTo(verticalLineCoords, 0);
    context.lineTo(verticalLineCoords, 800);
    context.stroke();
    //Line 2
    context.beginPath();
    context.moveTo(2*verticalLineCoords, 0);
    context.lineTo(2*verticalLineCoords,800);
    context.stroke();
    //Horizontal lines
    //Line 1
    context.beginPath()
    context.moveTo(0,horizontalLineCoords);
    context.lineTo(1200, horizontalLineCoords);
    context.stroke();
    //Line 2
    context.beginPath()
    context.moveTo(0, 2*horizontalLineCoords);
    context.lineTo(1200, 2*horizontalLineCoords);
    context.stroke();
}
function drawX(e){
    var canvas = e.target;
    var canvasId = canvas.getAttribute("id");
    if(gameState.player.indexOf(canvasId)>=0 || gameState.cpu.indexOf(canvasId)>=0){
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = "Invalid move!";
    }
    else{
    gameState.clicks++;
    gameState.player.push(canvasId);
    var context = canvas.getContext("2d");
    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(70,25);
    context.lineTo(220,120);
    context.stroke();
    context.beginPath();
    context.moveTo(70,120);
    context.lineTo(220,25);
    context.stroke();
    if(gameState.player.length>=3){
    if(checkWinner(gameState.player)){
        winningMessage();
        return true;
    }else{
        if(checkDraw()){
            drawMessage();
        }
    }
    }
    if(gameState.clicks<5){
    drawO();
    }
}
}
function drawO (){
    var random = Math.floor(Math.random()* 9);
    cell = random.toString();
    console.log(cell);
    if(gameState.player.indexOf(cell)>=0 || gameState.cpu.indexOf(cell)>=0){
        drawO();
    }else{
    gameState.cpu.push(cell);
    var canvas = document.getElementById(cell);
    var context = canvas.getContext("2d");
    context.beginPath()
    context.arc(150,80,60,0,2*Math.PI,true);
    context.stroke();
    if(gameState.cpu.length>=3){
    if(checkWinner(gameState.cpu)){
        loosingMessage();
        return true;
    }else{
        if(checkDraw()){
            drawMessage();
        }
    }
    }
    }
}
function checkWinner(array){
    var count;
        for(var j = 0 ; j < gameState.winningPositions.length;j++){
            var winner = gameState.winningPositions[j];
            count = 0;
            for(var i = 0 ; i < array.length; i++){
                var pos = array[i];
            if(winner.indexOf(pos)>=0){
                count++;
                if(count==3){
                    return true;
                }
            }
        }
    }
    return false;
}
function winningMessage(){
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = "You won the game!";
    var tds = document.getElementsByTagName("td");
    for(var i = 0 ; i < tds.length; i++){
        tds[i].onclick = function(){
            winningMessage();
        }
    }
}
function loosingMessage(){
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = "You lost the game!";
    var tds = document.getElementsByTagName("td");
    for(var i = 0 ; i < tds.length; i++){
        tds[i].onclick = function(){
            loosingMessage();
        }
    }

}
function drawMessage(){
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = "It's a draw!";
    var tds = document.getElementsByTagName("td");
    for(var i = 0 ; i < tds.length; i++){
        tds[i].onclick = function(){
            drawMessage();
        }
    }
}
function checkDraw(){
    if(gameState.clicks >=5 && !checkWinner(gameState.player) && !checkWinner(gameState.cpu)){
        return true;
    }
}

