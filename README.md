# Mountain climber

[The Game](https://aafmartins.github.io/mountain-climber/)

## Description

Climb on!

But beware, to get to the top of the mountain you'll need to dodge falling debris. The more debris you're able to avoid, the more points you'll earn, but you can only survive two hits! Catch the falling helmets to earn life points and increase your score.

Can you make it? And will you find any help along the way? 🥁 🥁 🥁

Let's climb!

## MVP

- Player moves horizontally at the bottom of the canvas;
- Upward movement is simulated by infinite scrolling background;
- Obstacles (rocks) fall at random from the top of the canvas;
- When player dodges a rock, they earn 5 points;
- When player gets hit, they loose 5 points;
- The player wins when they get to 100 points;
- If the player gets hit by more than 2 rocks, they loose, the game ends.

## Backlog

- Add bonus component: helmets fall at random from top of canvas, if caught, the player wins 5 points and 1 bonus point (i.e. an extra life).
- Add scored points and helmets caught to game state;
- Add player movement simulation by reversing image;
- Add sound effects:
  background music
  when player is hit
  when player looses
  when player wins
  when player catches a bonus component
- Add background image to game state
- Add name prompt to splash page
- Add personalization throughout the game
- Add high scores at game-over/game-won states

## Data structure

# script.js

- buildsplashScreen () {}
- buildgameScreen () {}
- buildgameoverScreen () {}
- buildwinScreen () {}

# game.js

- game () {}
- starLoop () {}
- drawCanvas () {}
- checkCollisions () {}
- updateCanvas () {}
- clearCanvas () {}
- gameOver () {}
- gameWon () {}

# background.js

- background () {
  this.ctx
  this.bgImgX
  this.bgImgY
  this.canvasWidth
  this.canvasHeight
  this.scrollSpeed
  }
- drawLoop () {}

# components.js

- components () {
  this.ctx
  this.image
  this.x
  this.y
  this.width
  this.height
  }
- draw () {}

# player.js

- extend components () {
  }
- move () {}

# obstacles.js

- extends components () {
  this.speed
  }
- move () {}

## States y States Transitions

- splashScreen
- gameScreen
- gameoverScreen
- winScreen

## Task

- script - buildDom
- script - buildSplashScreen
- background - drawLoop
- components - draw
- player - move
- obstacles - move
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- game - checkCollisions
- game - gameOver
- game - gameWon
- game - addEventListener
- script - addEventListener
- script - buildGameScreen
- script - buildGameOverScreen

## Additional Links

### Trello

[Link url](https://trello.com/b/E4fnjTZe/ih-p1-mountainclimber)

### Slides

[Link Slides.com](http://slides.com)
