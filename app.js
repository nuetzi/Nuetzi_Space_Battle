var alienShipArray = [];

var alienShipCount = 8;  // Could prompt player for this input -- Need to fix prompt code

class ship {
    constructor(name, hull, firepower, accuracy, alive) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.alive = alive;
    }
}

class alienShip extends ship {
    constructor(name, hull, firepower, accuracy, alive) {
    super(name, hull, firepower, accuracy, alive);    
    }
}


// Function that generates the specified number of enemies with randomized stats
const generateEnemies = (alienShipCount) => {
    for (let i=0; i<alienShipCount; i++) {
        alienShipArray[i] = new alienShip (
        "Alien #" + [i+1],                              // Assign a name for the player to see
        Math.floor((Math.random() * 4) + 3),            // Generates a hull value of 3 - 6
        Math.floor((Math.random() * 3) + 2),            // Generates a firepower value of 2 - 4
        (Math.floor(Math.random() * 3) + 6) / 10,       // Generates an accuracy value of 0.6 - 0.8
        true                                            // Marks entity as alive
        );
    }
}


const playerShip = new ship ("USS Nuetzi", 20, 5, 0.7, true);
generateEnemies(alienShipCount);
var alienShipIndex = 0;
var alienTarget = alienShipArray[0];

beginBattle = () => {
    alienTarget = alienShipArray[alienShipIndex];
    document.querySelector("#enemyName").innerHTML = alienTarget.name

    do {
        if (playerShip.alive) {                          // Player attack phase
            if (Math.random() < playerShip.accuracy) {
                alienTarget.hull -= playerShip.firepower;
                if (alienTarget.hull > 0) {
                    alert("Attack successful! But " + alienTarget.name + " still has " + alienTarget.hull + " hull integrity remaining.");
                } else {
                    alienTarget.hull = 0;               // I don't like displaying negative values for health
                    alienTarget.alive = false;          // Mark ship as dead, so it will not attack
                    alert("Direct hit! " + alienTarget.name + " has been destroyed!");
                }
            }
            else {
                alert("Your attack missed.")
            }
        }
        
        
        if (alienTarget.alive && playerShip.alive) {                         // Alien's attack phase
            if (Math.random() < alienTarget.accuracy) {
                playerShip.hull -= alienTarget.firepower;
                if (playerShip.hull > 0) {
                    alert("You've been hit! " + playerShip.name + " has " + playerShip.hull + " hull integrity remaining." );
                } else {
                    playerShip.hull = 0;
                    playerShip.alive = false;
                    alert(playerShip.name + " has been destroyed! The aliens have conquered.");
                    alert("Game Over");  //Program needs to end here
                }
            }
            else {
                alert("You evaded the alien attack.")
            }
        }
        else if (playerShip.alive) {
            alienShipIndex++;
            if (alienShipIndex < alienShipArray.length) {
                let nextBattle = prompt("Continue battling? (Y/N)");      //    if yes: alienShipIndex++;
                if (nextBattle.toLowerCase() === "n" || nextBattle.toLowerCase() === "no" || nextBattle === null) {        //Opt-out to stop the game
                    playerShip.alive = false;
                    alienTarget.alive = false;
                    alert("You have chosen to retreat.")
                }
            }
            else alert("Congratulations! You have saved Earth from the alien invasion.");    
        }
    }
    while (alienTarget.alive && playerShip.alive);
}

/* -------------------------------------------------
// Generates user prompt. Input value determines number of alien ships
var alienShipCount = prompt("The aliens are attacking! How many of the alien invaders do you want to battle? (Enter a number between 1 and 10)");

// Ensure proper value is entered
while (isNaN(alienShipCount) || alienShipCount < 1 || alienShipCount > 10) {            <-------- Cancel button is broken
    var alienShipCount = prompt("Please enter a numerical value between 1 and 10");
}
-------------------------------------------------- */


/* -------------------------------------------------
// Targeted attack system - Allows user to select a target


attackEnemy = (target) => {
    target = Math.trunc(target);
    if (target < 1 || target > alienShipArray.length || isNaN(target)) {
        console.log("Invalid selection");
        return;
    }

    let alienTarget = alienShipArray[target-1];

    if (Math.random() < playerShip.accuracy) {
        alienTarget.hull -= playerShip.firepower; 
        console.log("Hit!");
        if (alienTarget.hull > 0) {
            console.log(alienTarget.name + " has " + alienTarget.hull + " health remaining.")
        } else {
            alienTarget.hull = 0;
            alienTarget.alive = false;
            console.log(alienTarget.name + " has been destroyed!")
        }

    }
    else console.log("Miss")
}
-------------------------------------------------- */


document.querySelector("#playerName").innerText = playerShip.name


document.querySelector('#engage').addEventListener('click', beginBattle);