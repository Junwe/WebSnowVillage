var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let MouseX = 0;
let MouseY = 0;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

class DotObject 
{
    constructor(x,y)
    {
        // 날리는 힘.
        this.throwPowerX = getRandomArbitrary(-5,5);
        this.throwPowerY = getRandomArbitrary(-4,-2);

        // 움직임 감소량
        this.DiminishX = getRandomArbitrary(-0.01,0.01);
        this.DiminishY = getRandomArbitrary(0.05,0.2);

        this.radius = getRandomArbitrary(5,8);
        //this.DiminishX = getRandomArbitrary(0.1,0.2);

        this.x = x;
        this.y = y;

        this.color = getRandomColor();
    }

    Update()
    {
        this.x += this.throwPowerX;
        this.y += this.throwPowerY;

        this.radius -= 0.01;
        this.throwPowerX -= this.DiminishX;
        this.throwPowerY += this.DiminishY;

        if(this.radius <= 0)
            this.radius = 0;
    }

    Render()
    {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI);
        c.fillStyle = this.color;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.strokeStyle = this.color;
        c.shadowColor = this.color;
        c.shadowBlur = getRandomArbitrary(5,10);
        c.fill();
        c.stroke();
    }
}   

function DrawBackGround()
{
    let backgroundHeight = canvas.height/3;

    c.fillStyle="rgb(255,154,48)";
    c.fillRect(0,0,canvas.width,backgroundHeight);

    c.fillStyle="rgb(255,255,255)";
    c.fillRect(0,backgroundHeight, canvas.width,backgroundHeight*2);

    c.fillStyle="rgb(9,137,1)";
    c.fillRect(0,backgroundHeight*2, canvas.width,backgroundHeight*3);

    c.beginPath();
    c.lineWidth = 5;
    c.strokeStyle="rgb(0,0,137)";
    c.arc(canvas.width/2,backgroundHeight*1.5,
        100,0,2*Math.PI);
    c.stroke();
    c.closePath();

    c.beginPath();
    c.fillStyle="rgb(0,0,137)";
    c.arc(canvas.width/2,backgroundHeight*1.5,
        20,0,2*Math.PI);
    c.stroke();
    c.fill();
    c.closePath();
}

const dotObjectList = [];
function animate()
{
    requestAnimationFrame(animate);

    //DrawBackGround();

    dotObjectList.forEach(element => {
        
        element.Update();
    });

    dotObjectList.forEach(element => {
        element.Render();
    });
}

function Init()
{
    DrawBackGround();
    canvas.addEventListener("click", onClick, false);
}

function onClick(e) {
    var element = canvas;
    var offsetX = 0, offsetY = 0

        if (element.offsetParent) {
      do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
    }

    MouseX = e.pageX - offsetX;
    MouseY = e.pageY - offsetY;

    for(let i=0;i<getRandomArbitrary(10,30);++i)
    {
        let createPositionX = MouseX + getRandomArbitrary(10,20);
        let createPositionY = MouseY + getRandomArbitrary(10,20);
        dotObjectList.push(new DotObject(createPositionX,createPositionY));
    }
}


Init();
animate();