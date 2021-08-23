# Mountain climber

[Link Deploy](https://github.com/aafmartins/mountain-climber)

## Description

Climb on!

But beware, to get to the top of the mountain you'll need to dodge falling debries. The more debries you're able to avoid, the more points you'll earn, but you can only survive two hits! Can you make it? And will you find any help along the way? 🥁 🥁 🥁

Let's climb!

## MVP

- Player moves horizontally at the bottom of the canvas;
- Upward movement is simulated by infinite scrolling background;
- Obstacles (rocks) fall at random from the top of the canvas;
- When player dodges a rock, they earn 5 points;
- When player gets hit, they loose 5 points;
- If the player dodges 20 rocks, they win, the game ends;
- If the player gets hit by more than 2 rocks, they loose, the game ends.

## Backlog

- Add bonus component: helmets fall at random from top of canvas, if caught, they will cancel the effect of the next rock.
- Add scored points amd helmets caught to game state;
- Add player movement simulation by reversing image
- Add sound effects:
  background music
  when player is hit
  when player looses
  when player wins
  when player catches a bonus (see below)
- Add foreground trees which disappear as the climber 'goes up'
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
