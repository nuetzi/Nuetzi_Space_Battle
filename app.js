var alienShipArray = [];
// var hullCalc = Math.floor((Math.random() * 4) + 3); //Returns 3 - 6
// var firepowerCalc = Math.floor((Math.random() * 3) + 2); //Returns 2 - 4
// var accuracyCalc = (Math.floor(Math.random() * 3) + 6) / 10 //Returns 0.6 - 0.8


class ship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

    attack(target) {
        if (Math.random() < target.accuracy) {
            target.hull -= target.hull - ship.firepower;
        }
        console.log(target)
    }
}

class alienShip extends ship {
    constructor(name, hull, firepower, accuracy) {
    super(name, hull, firepower, accuracy);    
    }
}

const playerShip = new ship ("USS Schwarzenegger", 20, 5, 0.7);

const generateEnemies = (alienShipCount) => {
    for (let i=0; i<alienShipCount; i++) {
        alienShipArray[i] = new alienShip (
        "Alien #" + [i+1], 
        Math.floor((Math.random() * 4) + 3), 
        Math.floor((Math.random() * 3) + 2), 
        (Math.floor(Math.random() * 3) + 6) / 10
        );
    }
}


// Generates user prompt. Input value determines number of alien ships
var alienShipCount = prompt("The aliens are attacking! How many of the alien invaders do you want to battle? (Enter a number between 1 and 10)");

// Ensure proper value is entered
while (isNaN(alienShipCount) || alienShipCount < 1 || alienShipCount > 10) {
    var alienShipCount = prompt("Please enter a numerical value between 1 and 10");
}

generateEnemies(alienShipCount);


console.log(alienShipArray);

// Targeted attack function
// 
// const attackEnemy = (alienTarget) => {
//     alienTarget = Math.trunc(alienTarget);
//     if (alienTarget < 1 || alienTarget > alienShipArray.length || isNaN(alienTarget)) {
//         console.log("Invalid selection");
//         return;
//     }
//     if (Math.random() < alienShipArray[(alienTarget-1)].accuracy) { console.log("Hit!") }
//     else console.log("Miss")
// }

// attackEnemy(1);