const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let interval, timeLeft
const poos = []
let counter = 0
let timeStart = 20

// Create the game board
class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src =
      './images/backgrounddetailed1.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
};

// Create the hero
class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 30
    this.height = 30
    this.img = new Image()
    this.img.src =
      './images/player1.png'
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  moveUp(){
    if (this.y > board.y) {
      this.y -= 20
    } else {
      this.y += 0
    }
  }
  moveDown(){
    if (this.y + this.height < board.height) {
      this.y += 20
    } else {
      this.y += 0
    }    
  }
  moveRight(){
    if (this.x + this.width < board.width) {
      this.x += 20
    } else {
      this.x += 0
    }
  }
  moveLeft(){
    if (this.x > board.x) {
      this.x -= 20
    } else {
      this.x += 0
    }
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
};

//Create Bosco the Anatagoanisg
class Bosco {
  constructor(x, y,vx, vy) {
    this.x = x
    this.y = y
    this.r = 0
    this.vx = vx
    this.vy = vy
    this.width = 20
    this.height = 20
    this.img = new Image()
    this.img.src =
      './images/boscp.png'
    this.animate = function(){
        //time to animate our circles ladies and gentlemen.
      if (this.x - this.r + this.vx < board.x || this.x + this.r + this.vx > board.x + board.width) {
        this.vx = -this.vx;
      }
  
      if (this.y + this.r + this.vy > board.y + board.height || this.y - this.r + this.vy < board.y) {
        this.vy = -this.vy;
      }
    
      this.x += this.vx
      this.y += this.vy   
    } 
  }
  draw() {
    ctx.beginPath();
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  // }
  // draw() {
  //   ctx.fillStyle = 'brown';
  //   ctx.beginPath();
  //   ctx.fillRect(this.x, this.y, 20, 20)
  // }
};

//Create the doggie presents
class Poo {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 8
    this.height = 8
    this.img = new Image()
    this.img.src =
      './images/poo.png'
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
};

//Create the endg
class Grill {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.width = 100
    this.height = 40
    this.draw = function (){
      ctx.fillStyle = 'black';
      ctx.fillRect(this.x, this.y, 100, 40)
    }
  }
  draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(20, 20, 100, 40)
  }
};
//   }
//   draw() {
//     this.x--
//     if (this.type) {
//       ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
//     } else {
//       ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
//     }
//   }
// }

const board = new Board()
const player = new Player(700, 350)
const bosco = new Bosco(150, 80, 1, 1)
const grill = new Grill(20, 20)


function drawScore() {
  if (frames % 20 === 0) {
    score += 1
 //   poo.draw()
  }
  ctx.font = '24px Courier'
  ctx.fillText(score, canvas.width / 2, 50)
}

function generatePoo() {
  if (frames % 500 === 0) {
  const randomx = Math.floor(Math.random() * board.width)
  const randomy = Math.floor(Math.random() * board.height)
  poos.push(new Poo(randomx, randomy))
//     pipes.push(new Pipe(randomHeight + ventanita, 50, canvas.height - randomHeight, false))
  }
}

function drawPoos() {
  poos.forEach(poo => {
    poo.draw()
  })
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  board.draw()
  player.draw()
  bosco.draw()
  bosco.animate()
  grill.draw()
  generatePoo()
  drawPoos()
  checkCollition()
  checkWin()
  drawScore()
  grillTime()
}

function start() {
  interval = setInterval(update, 1000 / 60)
}

function gameOver() {
  ctx.font = '50px Courier'
  ctx.fillText('Really?!?😆', canvas.width / 2 - 100, 200)
  clearInterval(interval)
}

function gameWon() {
  ctx.font = '50px Courier'
  ctx.fillText('Good Work😆', canvas.width / 2 - 100, 200)
  clearInterval(interval)  
}

function checkWin() {
  //   if (player.y > canvas.height - player.height) return gameOver()
      if (player.isTouching(grill)) return gameWon()
  }

 function checkCollition() {
//   if (player.y > canvas.height - player.height) return gameOver()
    if (player.isTouching(bosco)) return gameOver()
    poos.forEach(poo => {
    if (player.isTouching(poo)) return gameOver()
  })
}

start()

document.onkeydown = event => {
    console.log(event.keyCode)
    switch (event.keyCode) {
        case 38:
            player.moveUp()
            break
        case 40:
            player.moveDown()
            break
        case 37:
            player.moveLeft()
            break       
        case 39:
            player.moveRight()
            break
        default:
            ctx.font = '60px Courier'
            ctx.fillText('invalid key', 200, 60)
            break
    }
}

function grillTime () {
  var grillInterval = (setInterval(timeIt, 1000))/60
  function timeIt() {
    counter++;
    if (grillInterval == timeStart) {
      gameOver()
    }
  }
  var tastyTime = Math.floor(timeStart - grillInterval)+2
  ctx.font = '24px Courier'
  ctx.fillText(tastyTime, (canvas.width / 2 + 100), 50)

}


