let currMoleTile;
let currMoletrioTile;
let currPlantTile;
let score = 0;
let gameOver = false;

let Moleint;
let Plantint;
let Moletrioint;

window.onload = function(){
    setGame();
}

function setGame(){
    //set up the grid for the game board in html 
    for(let i = 0; i < 9; i++){ //i 0 to 8
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    Moleint = setInterval(setMole, 1000); //1000ms = 1s
    Plantint = setInterval(setPlant, 2000); //2000ms = 2s
    Moletrioint = setInterval(setMoletrio, 5000); //5000ms = 5s
}

function getRandomTile(){
    // math.random --> (0-1) * 9 = 0-9 --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole(){
    if(gameOver){
        return;
    }
    //remove prev mole when new mole appears [one mole appears at a time(to avoid overlapping)]
    if(currMoleTile){
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./diglett.png";
    mole.draggable = false;

    let num = getRandomTile();
    if((currPlantTile && currPlantTile.id == num) || (currMoletrioTile && currMoletrioTile.id == num)){ //mole & plant won't appear on same tile
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setMoletrio(){
    if(gameOver){
        return;
    }
    if(currMoletrioTile){
        currMoletrioTile.innerHTML = "";
    }
    let moletrio = document.createElement("img");
    moletrio.src = "./dugtrio.png";
    moletrio.classList.add("dugtrio");
    moletrio.draggable = false;

    let num = getRandomTile();
    if((currPlantTile && currPlantTile.id == num) || (currMoleTile && currMoleTile.id == num)){
        return;
    }
    currMoletrioTile = document.getElementById(num);
    currMoletrioTile.appendChild(moletrio);

    //To remove the moletrio after 2 secs
    setTimeout(() => {
        if (currMoletrioTile) {
            currMoletrioTile.innerHTML = "";
            currMoletrioTile = null;
        }
    }, 2000); // 2000ms = 2s
}

function setPlant(){
    if(gameOver){
        return;
    }
    if(currPlantTile){
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./charmander.png";
    plant.draggable = false;

    let num = getRandomTile();
    if((currMoleTile && currMoleTile.id == num) || (currMoletrioTile && currMoletrioTile.id == num)){ //mole & plant won't appear on same tile
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile(){
    if(gameOver){
        return;
    }
    if (this == currMoleTile){
        score += 1;
        document.getElementById("score").innerText = score.toString(); //updates score - diglett
    }
    else if (this == currMoletrioTile){
        score += 3;
        document.getElementById("score").innerText = score.toString(); //updates score - dugtrio
        currMoletrioTile.innerHTML = ""; // Remove the moletrio after clicking
        currMoletrioTile = null; // Reset the current moletrio tile
    }
    else if (this == currPlantTile){
        gameOver = true;
        clearInterval(Moleint);
        clearInterval(Plantint);
        clearInterval(Moletrioint);
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
    }
}