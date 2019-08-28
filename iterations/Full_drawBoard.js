const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let interval
const pipes = []

class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src =
      './backgrounddetailed1.png'
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
};

class Flappyoso {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 30
    this.height = 30
    this.img = new Image()
    this.img.src =
      './player1.png'
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
    isTouchingBall(obstacle) {
      return (
        this.x < obstacle.x  &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y  &&
        this.y + this.height > obstacle.y
      )  
  }
}

class Bosco {
  constructor(x, y, r, vx, vy) {
    this.x = x
    this.y = y
    this.r = r
    this.vx = vx
    this.vy = vy
    this.draw = function() {
      ctx.fillStyle = 'brown'
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill()
    }
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
    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill()
  }
};


class Poo {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 8
    this.height = 8
    this.img = new Image()
    this.img.src =
      './poo.png'
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
};

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
const flappy = new Flappyoso(700, 350)
const bosco = new Bosco(150, 80, 1000, 14, 12)
let poo = new Poo(490, 118)
const grill = new Grill(20, 20)


function drawScore() {
  if (frames % 50 === 0) {
    score += 1
  }
  ctx.font = '24px Courier'
  ctx.fillText(score, canvas.width / 2, 50)
}

// function generatePipes() {
//   const min = 20
//   const max = 100
//   const ventanita = 100
//   if (frames % 200 === 0) {
//     const randomHeight = Math.floor(Math.random() * (max - min))
//     pipes.push(new Pipe(0, 50, randomHeight, true))
//     pipes.push(new Pipe(randomHeight + ventanita, 50, canvas.height - randomHeight, false))
//   }
// }

// function drawPipes() {
//   pipes.forEach(pipe => {
//     pipe.draw()
//   })
// }

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  board.draw()
  flappy.draw()
  bosco.draw()
  bosco.animate()
  grill.draw()
  poo.draw()
  poo1.draw()
  poo2.draw()
  poo3.draw()
  poo4.draw()
  poo5.draw()
  poo6.draw()
  poo7.draw()
  poo8.draw()
  poo9.draw()
  poo10.draw()
  poo11.draw()
  poo12.draw()
  // generatePipes()
  // drawPipes()
  // checkCollition()
  drawScore()
}

function start() {
  interval = setInterval(update, 1000 / 60)
}

function gameOver() {
  ctx.font = '50px Courier'
  ctx.fillText('Really?!?😆', canvas.width / 2 - 100, 200)
  clearInterval(interval)
}

// function checkCollition() {
//   if (flappy.y > canvas.height - flappy.height) return gameOver()
//   pipes.forEach(pipe => {
//     if (flappy.isTouching(pipe)) return gameOver()
//   })
// }

start()

document.onkeydown = event => {
    console.log(event.keyCode)
    switch (event.keyCode) {
        case 38:
            flappy.moveUp()
            break
        case 40:
            flappy.moveDown()
            break
        case 37:
            flappy.moveLeft()
            break       
        case 39:
            flappy.moveRight()
            break
        default:
            ctx.font = '60px Courier'
            ctx.fillText('invalid key', 200, 60)
            break
    }
}
