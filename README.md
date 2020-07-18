### Demo
Classic Tic Tac Toe ([here](https://viruz.dev/tttgame/))

7x7 Tic Tac Toe with 5 in a row win condition ([here](https://viruz.dev/tttgame/?size=7&win=5))

# Changes

## Optimizing the code
I've Removed all the duplicated codes and remove the need to keep using jQuery to check for the html state.
This would reduce the amount of times jQuery would need to search the entire site to check the board state.

Win conditions are only check on the **row**, **columns** and **diagonals** of the last clicked position instead of the
 entire board thus avoiding unnecessary checks.


![Scanning Pattern](https://viruz.dev/tttgame/img/scanning%20pattern.png "Scanning Pattern")


# Scalability
Created a base class `TTTBoard` for the main logic of the game. This allows for scalability by having the options
to set board `size` and a `winCondition`. The board only needs a container with a unique board id to 
tell it where to render the board.

This creates an additional benefit of storing the state of multiple boards. If I want to create a Tic Tac Toe game
that can store the state of past rounds, I can just create a class, or a function that creates new `TTTBoard`
for each rounds and store them in an array for later use.

Also created a sub class `TTTGame` to expand the board logic and to actually use it with the UX. 
Able to set your own score ids, reset button id and alert id if needed.

Also added a query string that accepts `size` and `win` to control the game mode. 
With `size`, you can control how big the grid is. Making playing a 6x6 game of Tic Tac Toe possible.
With `win`, you can set the win condition.
By just those 2 parameters, it is possible to play a 6x6 Tic Tac Toe with a win condition of 4 in a row.

## Game
* Change first player starting as `X` instead of `O`
    * First player is usually `X`
* Removed all Alert
    * Alerts are annoying and removed the immersion from the game
* Added persistent info bar to display status and who's turn it is 

## html - index.html
* Remove ul li to create board
    * Using bootstrap's grid system
* Fixed html structure to make full use of bootstrap 

## JavaScript - js/index.js
* Updated Javascript version
##### Rewrite Tic Tac Toe Logic to be more dynamic
* Each Board is its own class container
    * Able to create multiple boards
* Replace hardcoded win check condition to dynamic win check condition
    * Win condition are now dynamic, able to set win condition for larger Tic Tac Toe board
* Dynamic board grid size
* Added 2 new classes:
    * TTTBoard
        * Main board logic, it is in its own class for future scalability,
        new `TTTBoard` class can be created to store the state of the previous games 
    * TTTGame
        * Example on how to use the `TTTBoard` class, 
        can be used as a parent class and expand on the functionality of the game   

### CSS - css/style.css
* Updated bootstrap version
* Rename `disable` to `disabled`
    * Bootstrap `disabled` will actually disabled the button
* Removed not needed css
    * Simplify the css as most of them are already in bootstrap or not needed 
