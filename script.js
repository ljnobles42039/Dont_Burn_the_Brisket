const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let interval, timeLeft
const poos = []
let counter = 0
let timeStart = 39
let walk
let aux = false
const startBtn = document.getElementById('startBtn')
const diego = document.getElementById('diego')
const startScreen = document.getElementById('startScreen')
const dog = document.getElementById('dog')
const human = document.getElementById('human')



function initialize () {
  startBtn.style.display = 'none'
  diego.style.display = 'none'
  startScreen.style.display = 'none'
  start()
}

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
      this.width = 50
      this.height = 100
      this.img = new Image()
      this.img.src =
        './images/player.png'
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    moveUp(){
      if (this.y - .5*this.height> board.y) {
        this.y -= 20
      } else {
        this.y += 0
      }
    }
    moveDown(){
      if (this.y + 1.5*this.height < board.height) {
        this.y += 20
      } else {
        this.y += 0
      }    
    }
    moveRight(){
      if (this.x + 1.5*this.width < board.width) {
        this.x += 20
      } else {
        this.x += 0
      }
    }
    moveLeft(){
      if (this.x > board.x + .5*this.width) {
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
      this.width = 40
      this.height = 40
      this.img = new Image()
      this.img.src =
        './images/french.png'
      this.img.onload = () => {
        this.draw()
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
      this.width = 20
      this.height = 20
      this.img = new Image()
      this.img.src =
        './images/poo_t.png'
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
      this.width = 120
      this.height = 85
      this.img = new Image()
      this.img.src =
        './images/grill.png'
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  };

  const board = new Board()
  const player = new Player(960, 610)
  const bosco = new Bosco(150, 80, 12, 8)
  const grill = new Grill(20, 20)
  const poo = new Poo(0,0)


  function drawScore() {
    if (frames % 20 === 0) {
      score += 1
    }
    ctx.font = '24px Courier'
    ctx.fillText(score, canvas.width / 2, 50)
  }

  function generatePoo() {
    if (frames % 60 === 0) {
    const randomx = Math.floor(Math.random() * board.width)
    const randomy = Math.floor(Math.random() * board.height)
    poos.push(new Poo(randomx, randomy))
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
    grillTime()
  }

  function start() {
    interval = setInterval(update, 1000 / 60)
  }

  function gameOver() {
    ctx.font = '50px Courier'
    ctx.fillText('Not Cool Bro!', canvas.width / 2 - 200, 100)
    ctx.fillText('This is your Brisket!', canvas.width / 2 -225 , 650)
    ctx.drawImage(poo.img, canvas.width / 2 - 300, canvas.height / 2 - 150, 600, 300) 
    clearInterval(interval)
  }

  function gameWon() {
    ctx.font = '50px Courier'
    ctx.fillText('Unlike the Brisket, Well Done!!😆', canvas.width / 2 - 550, 200)
    ctx.drawImage(grill.img, canvas.width / 2 - 300, canvas.height / 2 - 150, 600, 300)
    clearInterval(interval)  
  }

  function checkWin() {
        if (player.isTouching(grill)) return gameWon()
    }

  function checkCollition() {
    let dogFlag = true;
    let humanFlag = true 
    if (player.isTouching(bosco)) {
      if (dogFlag) {
        dog.pause();
        dog.currentTime = 0;
        dog.play();
        dogFlag = false
      }
        pauseFiveSec()
      }
        poos.forEach((poo,ind) => {
          if (player.isTouching(poo)) {
            if (humanFlag) {
              human.pause();
              human.currentTime = 0;
              human.play();
              humanFlag = false
            }
            poos.splice(ind,1)
            pauseTwoSec()
          }
        })  
  }

  function pauseFiveSec() {
    setTimeout(function(){
      ctx.font = '50px Courier'
      ctx.fillText('Puppy Time', canvas.width / 2 - 200, 100)
      freezeKeys5()
    }, 10); 
    setTimeout(function(){
      keyCommands()
    }, 5010); 
  }

  function pauseTwoSec() {
    setTimeout(function(){
      ctx.font = '50px Courier'
      ctx.fillText('Ahhh %$#%$', canvas.width / 2 - 200, 100)  
      freezeKeys2()
    }, 10); 
    setTimeout(function(){
      keyCommands()
    }, 2010); 
  }

  keyCommands()



  function keyCommands() { 
  document.onkeydown = event => {
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
  }
  function freezeKeys5() {

    document.onkeydown = event => {
      switch (event.keyCode) {
          case 1:
              player.moveUp()
              break
          case 1:
              player.moveDown()
              break
          case 1:
              player.moveLeft()
              break       
          case 1:
              player.moveRight()
              break
          default:
              break
      }
    }
  }

  function freezeKeys2() {
    ctx.font = '50px Courier'
    ctx.fillText('Ahhh %$#%$', canvas.width / 2 - 200, 100) 
    document.onkeydown = event => {
      switch (event.keyCode) {
          case 1:
              player.moveUp()
              break
          case 1:
              player.moveDown()
              break
          case 1:
              player.moveLeft()
              break       
          case 1:
              player.moveRight()
              break
          default:
              break
      }
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
    if(tastyTime % 8 === 0) drunkWalk()
    if(tastyTime == 0) gameOver()

    ctx.font = '64px Courier'
    ctx.fillText(tastyTime, canvas.width / 2, 50)

  }



  function drunkWalk() {

    walk = Math.floor(Math.random() * 9)
    console.log(walk)
    switch (walk) {
      case 1:
        drunkenMaster1()
          break
      case 2:
        drunkenMaster2()
          break
      case 3:
        drunkenMaster3()
          break       
      case 4:
        drunkenMaster4()
          break
      case 5:
        drunkenMaster5()
          break
      case 6:
        drunkenMaster6()
          break
      case 7:
        drunkenMaster7()
          break       
      case 8:
        drunkenMaster8()
          break
      case 0:
          //ctx.font = '60px Courier'
          //ctx.fillText('invalid key', 200, 60)
          break
    }
  }


  function drunkenMaster1() {
    document.onkeydown = event => {
      switch (event.keyCode) {
          case 37:
              player.moveUp()
              break
          case 40:
              player.moveDown()
              break
          case 38:
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
  }

  function drunkenMaster2() {
    document.onkeydown = event => {
      console.log(event.keyCode)
      switch (event.keyCode) {
          case 37:
              player.moveUp()
              break
          case 39:
              player.moveDown()
              break
          case 38:
              player.moveLeft()
              break       
          case 40:
              player.moveRight()
              break
          default:
              ctx.font = '60px Courier'
              ctx.fillText('invalid key', 200, 60)
              break
      }
    }
  }

  function drunkenMaster3() {
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
  }

  function drunkenMaster5() {
    document.onkeydown = event => {
      console.log(event.keyCode)
      switch (event.keyCode) {
          case 39:
              player.moveUp()
              break
          case 47:
              player.moveDown()
              break
          case 38:
              player.moveLeft()
              break       
          case 40:
              player.moveRight()
              break
          default:
              ctx.font = '60px Courier'
              ctx.fillText('invalid key', 200, 60)
              break
      }
    }
  }

  function drunkenMaster6() {
    document.onkeydown = event => {
      console.log(event.keyCode)
      switch (event.keyCode) {
          case 39:
              player.moveUp()
              break
          case 40:
              player.moveDown()
              break
          case 38:
              player.moveLeft()
              break       
          case 37:
              player.moveRight()
              break
          default:
              ctx.font = '60px Courier'
              ctx.fillText('invalid key', 200, 60)
              break
      }
    }
  }

  function drunkenMaster7() {
    document.onkeydown = event => {
      console.log(event.keyCode)
      switch (event.keyCode) {
          case 40:
              player.moveUp()
              break
          case 39:
              player.moveDown()
              break
          case 37:
              player.moveLeft()
              break       
          case 38:
              player.moveRight()
              break
          default:
              ctx.font = '60px Courier'
              ctx.fillText('invalid key', 200, 60)
              break
      }
    }
  }

  function drunkenMaster8() {
    document.onkeydown = event => {
      console.log(event.keyCode)
      switch (event.keyCode) {
          case 40:
              player.moveUp()
              break
          case 37:
              player.moveDown()
              break
          case 39:
              player.moveLeft()
              break       
          case 38:
              player.moveRight()
              break
          default:
              ctx.font = '60px Courier'
              ctx.fillText('invalid key', 200, 60)
              break
      }
    }
  }

  function drunkenMaster4() {
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
  }


  



