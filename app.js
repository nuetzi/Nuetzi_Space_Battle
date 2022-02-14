var alienShipArray = [];    // Initialize array for storing alien ship objects
var alienShipCount = 6;     // Could prompt player for this input -- Need to fix prompt input code
var playerShip = {};
var alienShipIndex = 0;
var playerName = "Player";


class ship {
    constructor(name, hull, firepower, accuracy, alive) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.alive = alive;                                 // Boolean value which will determine whether a ship can attack
    }
}

class alienShip extends ship {                              // Making a specific subclass for enemy ships to use in an array
    constructor(name, hull, firepower, accuracy, alive) {
    super(name, hull, firepower, accuracy, alive);    
    }
}


const beginGame = () => {
    // Generates user prompt. Input value determines number of alien ships
    alienShipCount = prompt(`The aliens are attacking! How many of the alien invaders will you battle?
                        (Enter a number between 1 and 10)`);

    // Ensure usable value is entered
    if (isNaN(alienShipCount) || alienShipCount < 1 || alienShipCount > 10) {
        if (alienShipCount !== null) {
            do {
                alienShipCount = prompt("Please enter a numerical value between 1 and 10");
            }
            while ((isNaN(alienShipCount) || alienShipCount < 1 || alienShipCount > 10) && alienShipCount !== null);
            if (alienShipCount === null) {
                playerShip = new ship ("", 0, 0, 0, false);     // If player cancels, return a "null" ship to stop gameplay
                alert("Game aborted");
            }
        }
        else {
            playerShip = new ship ("", 0, 0, 0, false);         // If player cancels, return a "null" ship to stop gameplay
            alert("Game aborted");
        }
    }
    alienShipCount = Math.trunc(alienShipCount);                // Truncate any decimal numbers
    
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
    
    generateEnemies(alienShipCount);                        // Calls the function to create the array of alien ships
    alienShipIndex = 0;                                     // Sets the index to begin at the first ship 
    let alienTarget = alienShipArray[alienShipIndex];

    if (alienShipCount !== null && alienShipCount !== 0) {
        // Allow player to name their ship -- Need to add code to limit string length
        let playerName = prompt(`${alienShipCount} ships are approaching! Name the ship you will send to defend Earth.`)       
        if (playerName === null) {
            alert("Game aborted");
        }

        if (playerName !== null) {                                      // If player provides a name, generate the player ship
            playerShip = new ship (playerName, 20, 5, 0.7, true);  
        }
        else playerShip = new ship ("", 0, 0, 0, false);                // If player cancels, return a "null" ship


    // Initialize displays
    document.querySelector(".battleStatus").innerHTML = " ";
    document.querySelector(".playerName").innerHTML = playerShip.name;
    document.querySelector(".enemyName").innerHTML = alienTarget.name;
    document.querySelector(".playerStats").innerHTML = 
        `Hull : ${playerShip.hull} <br> Fire Power : ${playerShip.firepower} <br> Accuracy : ${playerShip.accuracy}`;
    document.querySelector(".enemyStats").innerHTML = 
        `Hull : ${alienTarget.hull} <br> Fire Power : ${alienTarget.firepower} <br> Accuracy : ${alienTarget.accuracy}`;
    }   
}



const beginBattle = () => {
    if (alienShipIndex < alienShipArray.length) {                           // Ensures the code does not pass the array
        alienTarget = alienShipArray[alienShipIndex];
    } 

    if (typeof alienTarget !== "undefined") {                               // Prevents certain errors (ex: when game is aborted)

        do {

            if (playerShip.alive) {                                         // Player attack phase -- Player ship must be alive
                if (Math.random() < playerShip.accuracy) {                  // Accuracy test
                    alienTarget.hull -= playerShip.firepower;               // Reduce enemy hull by player's firepower
                    if (alienTarget.hull > 0) {                             // If the enemy survives:
                        document.querySelector(".enemyStats").innerHTML = 
                            `Hull : ${alienTarget.hull} <br> Fire Power : ${alienTarget.firepower} <br> Accuracy : ${alienTarget.accuracy}`
                        document.querySelector(".battleStatus").innerHTML =
                            `Attack successful! But ${alienTarget.name} still has ${alienTarget.hull} hull integrity remaining.`;
                    } else {                                                // If the enemy is destroyed
                        alienTarget.hull = 0;                               // To avoid displaying negative values for health
                        alienTarget.alive = false;                          // Mark ship as dead, so it will not attack
                        document.querySelector(".enemyStats").innerHTML = 
                            `Hull : ${alienTarget.hull} <br> Fire Power : ${alienTarget.firepower} <br> Accuracy : ${alienTarget.accuracy}`
                        document.querySelector(".battleStatus").innerHTML =
                            `Direct hit! ${alienTarget.name} has been destroyed!`;
                    }
                }
                else if (alienTarget.alive) {                               // Prevents displays if user attacks dead ships after victory
                    document.querySelector(".battleStatus").innerHTML =
                        `Your attack missed.`
                }
            }


            if (alienTarget.alive && playerShip.alive) {                    // Alien's attack phase -- Both ships must be alive for this to occur
                if (Math.random() < alienTarget.accuracy) {                 // Accuracy test    
                    playerShip.hull -= alienTarget.firepower;               // Reduce player hull by enemy's firepower
                    if (playerShip.hull > 0) {                              // If the player survives:
                        document.querySelector(".playerStats").innerHTML = 
                            `Hull : ${playerShip.hull} <br> Fire Power : ${playerShip.firepower} <br> Accuracy : ${playerShip.accuracy}`
                        alert("You've been hit! " + playerShip.name + " has " + playerShip.hull + " hull integrity remaining." );

                    } else {                                                // If the player is destroyed
                        playerShip.hull = 0;                                // Avoid displaying negative health value
                        document.querySelector(".playerStats").innerHTML = 
                            `Hull : ${playerShip.hull} <br> Fire Power : ${playerShip.firepower} <br> Accuracy : ${playerShip.accuracy}`
                        playerShip.alive = false;                           // Mark player ship as dead
                        document.querySelector(".battleStatus").innerHTML = `${playerShip.name} has been destroyed! <br> The aliens have won the space battle.`;
                        alert(`                                 You have been defeated!
                                            GAME OVER`);                    // This line spacing roughly centers the display text
                    }
                }
                else {
                    alert("You evaded the alien attack.")
                }
            }

            else if (playerShip.alive) {                                    // If an alien ship is destroyed, this code will run
                alienShipIndex++;                                           // Proceed to next ship object in the array

                if (alienShipIndex < alienShipArray.length) {       
                    alienTarget = alienShipArray[alienShipIndex];           // Mark this new object as the target
                    document.querySelector(".enemyName").innerHTML = alienTarget.name
                    document.querySelector(".enemyStats").innerHTML = 
                        `Hull : ${alienTarget.hull} <br> Fire Power : ${alienTarget.firepower} <br> Accuracy : ${alienTarget.accuracy}`

                    let nextBattle = prompt("Another alien ship is approaching. Will you FIGHT or RETREAT?");

                    do {                                                    // I've put this in a do-while loop to check for valid input
                        if (nextBattle === null) {                          // If player clicks CANCEL, this ends the game
                            alert("Game aborted");                          // There's still an error in this part
                            playerShip.alive = false;
                            alienTarget.alive = false;
                        }
                        else if (nextBattle.toLowerCase() === "fight") {   // If player chooses ATTACK, end the loop and continue the game
                            return true;
                        }
                        else if (nextBattle.toLowerCase() === "retreat") {  // If player chooses RETREAT, end the loop and end the game
                            playerShip.alive = false;
                            alienTarget.alive = false;
                            document.querySelector(".battleStatus").innerHTML = "Live to fight another day..."
                            alert("You have chosen a tactical retreat. Thank you for playing.");
                            return true;                    
                        }
                        else nextBattle = prompt("Please choose FIGHT or RETREAT");
                    }
                    while (nextBattle.toLowerCase() !== "fight" && nextBattle.toLowerCase !== "retreat" && nextBattle !== null);
                }

                else {
                    document.querySelector(".battleStatus").innerHTML = "VICTORY! <br> The alien fleet has been destroyed."
                    alert("Congratulations! You have saved Earth from the alien invasion.");
                    playerShip.alive = false;                               // Prevents further running of the battle function after winning
                }    
            }
        }
        while (alienTarget.alive && playerShip.alive);
    }
}


// Button to begin or restart the game
document.querySelector('.resetButton').addEventListener('click', beginGame);

// Button for engaging in battle
document.querySelector('.engage').addEventListener('click', beginBattle);