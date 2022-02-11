var alienShipArray = [];
var alienShipIndex = 0;

var alienShipCount = 6;  // Could prompt player for this input -- Need to fix prompt code

class ship {
    constructor(name, hull, firepower, accuracy, alive) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.alive = alive;
    }

    beginBattle = () => {
        let alienTarget = alienShipArray[alienShipIndex];

        do {
            if (playerShip.alive) {                          // Player attack phase
                if (Math.random() < playerShip.accuracy) {
                    alienTarget.hull -= playerShip.firepower; 
                    console.log("Attack successful!");
                    if (alienTarget.hull > 0) {
                        console.log(alienTarget.name + " has " + alienTarget.hull + " hull integrity remaining.");
                    } else {
                        alienTarget.hull = 0;               //I don't like displaying negative values for health
                        alienTarget.alive = false;
                        console.log(alienTarget.name + " has been destroyed!");
                    }
                }
                else {
                    console.log("Your attack missed.")
                }
            }
            
            
            if ((alienTarget.hull > 0) && playerShip.alive) {                         // Alien's attack phase
                if (Math.random() < alienTarget.accuracy) {
                    playerShip.hull -= alienTarget.firepower;
                    console.log("You've been hit!");
                    if (playerShip.hull > 0) {
                        console.log(playerShip.name + " has " + playerShip.hull + " hull integrity remaining." );
                    } else {
                        playerShip.hull = 0;
                        playerShip.alive = false;
                        console.log(playerShip.name + " has been destroyed!");
                        console.log("Game Over");  //Program needs to end here
                    }
                }
                else {
                    console.log("You evaded the alien attack.")
                }
            }
            else if (playerShip.alive) {
                alienShipIndex++;
                if (alienShipIndex < alienShipArray.length) {
                    console.log("Continue battling?");      //    if yes: alienShipIndex++;
                }
                else console.log("Congratulations! You have saved Earth from the alien invasion.");    
            }
        }
        while (alienTarget.alive && playerShip.alive);
    }
}

class alienShip extends ship {
    constructor(name, hull, firepower, accuracy, alive) {
    super(name, hull, firepower, accuracy, alive);    
    }
}

const playerShip = new ship ("USS Schwarzenegger", 20, 5, 0.7, true);

const generateEnemies = (alienShipCount) => {
    for (let i=0; i<alienShipCount; i++) {
        alienShipArray[i] = new alienShip (
        "Alien #" + [i+1], 
        Math.floor((Math.random() * 4) + 3), 
        Math.floor((Math.random() * 3) + 2), 
        (Math.floor(Math.random() * 3) + 6) / 10,
        true
        );
    }
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



generateEnemies(alienShipCount);
console.log(alienShipArray[alienShipIndex]);
playerShip.beginBattle();
playerShip.beginBattle();
playerShip.beginBattle();
playerShip.beginBattle();
playerShip.beginBattle();
playerShip.beginBattle();