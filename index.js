// var context;
// var x=100;
// var y=200;
// var dx=5;
// var dy=5;


// //  Displays just the ball at 40px diameter ball at postition 100,100
// //   function init()
// //   {
// //     context= myCanvas.getContext('2d');
// //     context.beginPath();
// //     context.fillStyle="#0000ff";
// //     // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
// //     context.arc(100,100,20,0,Math.PI*2,true); context.closePath();
// //     context.fill();
// //   }


// function init()
// {
//   context= myCanvas.getContext('2d');
//   setInterval(draw,10);
// }

// function draw()
// {
//     context.clearRect(0,0, 300,300);
//     context.beginPath();
//     context.fillStyle="#0000ff";
//     // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
//     context.arc(x,y,20,0,Math.PI*2,true);
//     context.closePath();
//     context.fill();
//     // Boundary Logic
//   if( x<20 || x>280) dx=-dx; 
//   if( y<20 || y>280) dy=-dy; 
//   x+=dx; 
//   y+=dy;
//   }

var canvas = document.getElementById("my_canvas");
var c = canvas.getContext("2d");

//create te container that will hold the boincing balls.
var container = {
  x: 0,
  y: 0,
  width: 1200,
  height: 600
};

//create the container that will hold the boincing balls.
var obstacle = {
    x: 10,
    y: 40,
    width: 100,
    height: 40,
  };

//create the array of circles that will be animated
var circles = [{
  x: 50,
  y: 100,
  r: 10,
  vx: 1,
  vy: 2,
  color: 125
}, {
  x: 150,
  y: 80,
  r: 20,
  vx: 8,
  vy: 6,
  color: 205
}, {
  x: 90,
  y: 150,
  r: 5,
  vx: 12,
  vy: 8,
  color: 2
}, {
  x: 100,
  y: 50,
  r: 15,
  vx: 8,
  vy: 2,
  color: 1
}];

var player = {
    x: 20,
    y: 20,
    width: 20,
    height: 20,
  };





function animate() {
  //draw the container
  c.fillStyle = "green";
  c.fillRect(container.x, container.y, container.width, container.height);

   //draw obstacles
  c.fillStyle = 'red';
  c.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

  //loop throughj the circles array
  for (var i = 0; i < circles.length; i++) {
    //draw the circles
    c.fillStyle = 'black'
    c.beginPath();
    c.arc(circles[i].x, circles[i].y, circles[i].r, 0, Math.PI * 2, true);
    c.fill()

    //time to animate our circles ladies and gentlemen.
    if (circles[i].x - circles[i].r + circles[i].vx < container.x || circles[i].x + circles[i].r + circles[i].vx > container.x + container.width) {
      circles[i].vx = -circles[i].vx;
    }

    if (circles[i].y + circles[i].r + circles[i].vy > container.y + container.height || circles[i].y - circles[i].r + circles[i].vy < container.y) {
      circles[i].vy = -circles[i].vy;
    }

    // if (circles[i].x - circles[i].r + circles[i].vx < obstacle.x || circles[i].x + circles[i].r + circles[i].vx > obstacle.x + obstacle.width) {
    //     circles[i].vx = -circles[i].vx;
    // }
  
    // if (circles[i].y + circles[i].r + circles[i].vy > obstacle.y + obstacle.height || circles[i].y - circles[i].r + circles[i].vy < obstacle.y) {
    // circles[i].vy = -circles[i].vy;
    // }

    circles[i].x += circles[i].vx
    circles[i].y += circles[i].vy
    // circles[i].x += circles[i].vx
    // circles[i].y += circles[i].vy

      //draw obstacles
    c.fillStyle = 'blue';
    c.fillRect(player.x, player.y, player.width, player.height);


  }

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);




// ctx.fillStyle = '#FF0000'
// ctx.fillRect(100, 0, 50, 50)
// ctx.fillRect(300, 0, 50, 50)
// ctx.fillRect(500, 0, 50, 50)

// let speed1 = 0
// let speed2 = 0
// let speed3 = 0

// function clearCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)   
// }

// function updateState() {
//     speed1 += 1;
//     speed2 += 2;
//     speed3 += 3; 
// }

// function draw(){
//     ctx.fillRect(100, speed1, 50, 50)
//     ctx.fillRect(300, speed2, 50, 50)
//     ctx.fillRect(500, speed3, 50, 50) 
// }

// function update(){
//  //   1.  Set the speed or activate the state
//     updateState()

//  // Limpiar   
//     clearCanvas()

//  // dibujar   
//     draw()

//   // executar  
//     requestAnimationFrame(update)
// }
// requestAnimationFrame(update)


class Ghost{
    constructor() {
        this.x = 25
        this.y = 25
        this.width = 50
        this.height = 50
        this.img = new Image()
        this.img.src = "https://media.giphy.com/media/Qr8JE9Hvi7ave/200.gif"
        this.img.onload = () => {
            c.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }
    draw(){
        c.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    moveUp(){
        this.y -= 20
    }
    moveDown(){
        this.y += 20
    }
    moveRight(){
        this.x += 20
    }
    moveLeft(){
        this.x -= 20
    }
}
const ghost = new Ghost()

document.onkeydown = event => {
    console.log(event.keyCode)
    switch (event.keyCode) {
        case 38:
            ghost.moveUp()
            break
        case 40:
            ghost.moveDown()
            break
        case 37:
            ghost.moveLeft()
            break       
        case 39:
            ghost.moveRight()
            break
        default:
            ctx.font = '60px Courier'
            ctx.fillText('invalid key', 200, 60)
            break
    }
    updateCanvas()
}

function updateCanvas() {
    animate()
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillText(`Ghost x: ${ghost.x}`, 20, 40)
    c.fillText(`Ghost y: ${ghost.y}`, 20, 80)
    ghost.draw()
    
}

updateCanvas()