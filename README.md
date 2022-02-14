# Space Battle lab assignment

---------------------------------
## SPECIFICATIONS

Build a game of battling alien spaceships using Javascript. Earth has been attacked by a horde of aliens! You are the captain of the USS Schwarzenegger, on a mission to destroy every last alien ship. Battle the aliens as you try to destroy them with your lasers. There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.

A game round would look like this: 

You attack the first alien ship - If the ship survives, it attacks you - If you survive, you attack the ship again - If it survives, it attacks you again - Etc. - If you destroy the ship, you have the option to **attack** the next ship or to **retreat** - If you retreat, the game is over, perhaps leaving the game open for further developments or options. - You win the game if you destroy all of the aliens. - You lose the game if you are destroyed.

---------------------------------
Ship Properties ===>

**hull** is the same as health. If hull reaches `0` or less, the ship is destroyed.
**firepower** is the amount of damage done to the **hull** of the target with a successful hit.
**accuracy** is the chance between 0 and 1 that the ship will hit its target. - Every time the ship will attack, calculate the chance that the damage will hit the opposing ship using `Math.random()` - If the ship's accuracy is `0.8` - then if the number generated from `Math.random()` is less than or equal to `0.8` then the attack will be successful. If the value is greater than `0.8` then the attack has missed. - Adjust the accuracy based on the specs for each ship **Your spaceship.

The USS Schwarzenegger should have the following properties:
* hull - 20
* firepower -5
* accuracy - .7

The alien ships should each have the following ranged properties determined randomly: 
* hull - between 3 and 6
* firepower - between 2 and 4 
* accuracy - between .6 and .8

You could be battling six alien ships each with unique values.
 
Get user input via the browser. `prompt()` is like an alert, but it opens up a window with a message AND a place to enter some text
The received input can be used in your program
Your app should run in the DOM. Users should see instructions through prompts, but the values of the enemy ship should change in the DOM.