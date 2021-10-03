let main = document.querySelector('.main')
let scoreElem = document.querySelector('.score')
let levelElem = document.querySelector('.level')
let play = document.querySelector('.fa-play')
let mmain = document.querySelector('.mmain')
let retry = document.querySelector('.retry')
let retrybutton = document.querySelector('.fa-undo-alt')
let playField = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
]

function startPlayField(){
    for(let i = 0; i < playField.length; i++){
        for(let j = 0; j < playField[i].length; j++){
            playField[i][j] = 0;
        }
    }
    scoreElem.innerHTML = 0;
    levelElem.innerHTML = 1;
    gameSpeed = 900;
    getNewTetro();
    addActiveTetro();
}

let gameSpeed = 900;
let activeTetro = {
    x: 0, 
    y: 0,
    shape: []   
}
let score = 0;
let level = 1;
let n = 0
let colors = ['#8B008B','#FF8C00','#0000CD','#00FFFF','#FF0000']
let figures = [
    [
        [1, 1],
        [1, 1]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
]
function draw (){
    let mainInnerHTML = ''
        for(let y = 0; y < playField.length; y++){
            for(let x = 0; x < playField[y].length; x++){
                if(playField[y][x] === 1){
                    mainInnerHTML += '<<div class="cell movingCell"></div>'
                }else if(playField[y][x] === 2){
                    mainInnerHTML += '<<div class="cell fixedCell"></div>'
                }else{
                    mainInnerHTML += '<div class="cell"></div>'
                }
            }
        }
        main.innerHTML = mainInnerHTML
        let movingCell = document.querySelectorAll('.movingCell')
        
        for(let i = 0; i < movingCell.length; i++){
            movingCell[i].style.backgroundColor = colors[color]
        }
        
        
}


function removePrevActiveTetro(){
    for(let y = 0; y < playField.length; y++){
        for(let x = 0; x < playField[y].length; x++){
            if(playField[y][x] === 1){
                playField[y][x] = 0;
            }
        }
    }        
}

function addActiveTetro (){
    removePrevActiveTetro();
    for(let y = 0; y < activeTetro.shape.length; y++){
        for(let x = 0; x < activeTetro.shape[y].length; x++){
            if(activeTetro.shape[y][x] === 1){
                playField[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x]
            }
        }
    }
    
    
}    
    

function rotateTetro (){
    let prevTetroState = [...activeTetro.shape];
        for(let i = 0; i < prevTetroState.length; i++){
            prevTetroState[i] = [...activeTetro.shape[i]]
        }
        for(let i = 0; i < activeTetro.shape.length;i++){
            for(let j = 0; j < activeTetro.shape[i].length; j++){
                activeTetro.shape[j][activeTetro.shape[i].length-1-i] =  prevTetroState[i][j]
            }
        }
        if(hasCollisions()){
            activeTetro.shape = prevTetroState;
        }
            
}


function hasCollisions (){
    for(let y = 0; y < activeTetro.shape.length; y++){
        for(let x = 0; x < activeTetro.shape[y].length; x++){
            if(
                activeTetro.shape[y][x] && 
                (playField[activeTetro.y + y] === undefined || playField[activeTetro.y + y][activeTetro.x + x] === 2 ||
                playField[activeTetro.y + y][activeTetro.x + x] === undefined)
            ) {
                return true;
            }
        }
    }
    return false;    
}

function removeFullLines (){
    for(let y = 0; y < playField.length; y++){
        let canRemoveLine = true;
        for(let x = 0; x < playField[y].length; x++){
            if(playField[y][x] !== 2){
                canRemoveLine = false;
                break;
            }
        }
        if(canRemoveLine){
            playField.splice(y,1)
            playField.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            n++
        }
        
    }
    if(n > 0){
        levelAndScore();
        n = 0; 
    }
}




function levelAndScore (){
    if(n===1){
        score += 10
        scoreElem.innerHTML = score
    }
    else{
    score += (10 * Math.pow(2,n))
    scoreElem.innerHTML = score
    }
    if(score > 50*level){
        level++
        gameSpeed = (gameSpeed - 100)
        levelElem.innerHTML = level
    }
}
 

function getNewTetro(){
    activeTetro.shape = figures[Math.floor(Math.random()*7)];
    activeTetro.x = Math.floor((10 - activeTetro.shape[0].length)/2)
    color = Math.floor(Math.random()*5) 
}


function fixTetro(){
    for(let y = 0; y < playField.length; y++){
        for(let x = 0; x < playField[y].length; x++){
            if(playField[y][x] === 1){
                playField[y][x] = 2;
            }
        }
    }
   
    removeFullLines()
    for(let i = 0; i < playField[0].length; i++){
        if(playField[0][i] === 2){
            clearInterval(x)
            retry.style.display = 'flex'
            
            document.onkeydown = function(event){
                if(event.keyCode === 37){
                    activeTetro.x -= 0;
                }
                else if(event.keyCode === 39){
                    activeTetro.x += 0;
                }
                else if(event.keyCode === 40){
                    activeTetro.y += 0;
                }    
                else if(event.keyCode === 38){
                    activeTetro.y += 0;  
                }
            }    
            
        }
    }   
}

function moveTetroDown(){
    activeTetro.y += 1;
    if(hasCollisions()){
        activeTetro.y -= 1;
        fixTetro();
        activeTetro.y = 0
    }
}
function onkeydown (){
document.onkeydown = function(event){
    if(event.keyCode === 37){
        activeTetro.x -= 1;
        if(hasCollisions()){
            activeTetro.x += 1
        }
    }
    else if(event.keyCode === 39){
        activeTetro.x += 1;
        if(hasCollisions()){
            activeTetro.x -= 1 
        }
    }
    else if(event.keyCode === 40){
        activeTetro.y += 1;
        if(hasCollisions()){
            activeTetro.y -= 1;
            fixTetro();
            getNewTetro();
            activeTetro.y = 0
        }
    }    
    else if(event.keyCode === 38){
        rotateTetro();       
    }
    addActiveTetro();
    draw();
}
}    
onkeydown();
draw();

let x;

retrybutton.addEventListener('click', function(){
    startPlayField()
    onkeydown()
    draw()
    x = setInterval(startGame, gameSpeed)
    retry.style.display = 'none'
})

play.addEventListener('click',function(){
    getNewTetro();
    
    addActiveTetro();
    draw();
    mmain.style.display = 'none'
    x = setInterval(startGame, gameSpeed)
    
})

function startGame (){
    moveTetroDown();
    addActiveTetro();
    draw();
}

