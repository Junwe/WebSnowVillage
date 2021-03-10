var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const waveinfo = {
    y : canvas.height/1.5,
    length : 0.001,
    amplitude : 100,
    frequency : 0.05
}

const windInfo = {
    power : 0.05
}

class snow  {
    constructor()
    {
        this.dx = Math.random() * canvas.width;
        this.dy = 0;
        this.raidus = clamp(Math.random() * 2, 0.1, 2); ;
        this.FallingSpeed = clamp(Math.random() * 0.5, 0.1, 0.5) * 4;
        this.mass = clamp(Math.random() * 0.5, 0.1, 0.5);
        this.windDirection = Math.random() <= 0.5 ? -1 : 1;

        this.isFlatOnGround = false;

        this.red = Math.random() * 255
        this.green = Math.random() * 255
        this.blue = Math.random() * 255

        setInterval(function(){
            this.windDirection = Math.random() <= 0.5 ? -1 : 1;
    
        },1000);

    }

    FallingSnow()
    {
        this.dy += this.FallingSpeed;
    }

    DrawSnow()
    {
        drawCircle(this.dx,this.dy,this.raidus,
            format('rgba({0},{1},{2})',
            this.red,this.green,this.blue));
    }

    Collide()
    {
        let integerX = Math.floor(this.dx);
        if( (this.dy - this.raidus) > waveYPositionList[integerX] )
        {
            this.isFlatOnGround = true;
            this.dy = waveYPositionList[integerX] - this.raidus;
        }

        if((this.dx - this.raidus) <= 0)
        {
            this.dx = this.raidus;
        }

        if((this.dx + this.raidus) >= canvas.width)
        {
            this.dx = canvas.width - this.raidus;
        }
    }

    FlatOnGround()
    {
        let integerX = Math.floor(this.dx);
        this.dy = waveYPositionList[integerX] - this.raidus;
    }

    Flutter()
    {
        this.dx += this.windDirection * (windInfo.power + this.mass)
    }

    Update()
    {
        if(this.isFlatOnGround == false)
        {
            this.Flutter();
            this.FallingSnow();
            this.Collide();

            this.DrawSnow();
        }
        else
        {
            this.FlatOnGround();
            this.DrawSnow();

        }
    }
}

const snowObjectList = []
function Init()
{
    for(let i=0; i<1000;++i)
    {
        snowObjectList.push(new snow());
    }
}

let increment = waveinfo.frequency;
let waveYPositionList = []
function animate()
{
    requestAnimationFrame(animate);
    waveYPositionList = []
    c.clearRect(0,0,canvas.width,canvas.height);
    
    c.beginPath();
    c.moveTo(0,canvas.height/2);
    
    for(let i=0;i<canvas.width;++i)
    {
        c.lineTo(i, waveinfo.y + (Math.sin(i * waveinfo.length + increment) 
        * waveinfo.amplitude) );
        
        waveYPositionList.push( waveinfo.y + (Math.sin(i * waveinfo.length + increment) 
        * waveinfo.amplitude));
    }
    increment += waveinfo.frequency;
    
    c.stroke();
    
    snowObjectList.forEach(element => {
        element.Update();
    });
   
}

function drawCircle(dx,dy,raidus,color)
{
    c.beginPath();
    c.arc(dx,dy,raidus,0,2*Math.PI);
    c.fillStyle = color;
    c.strokeStyle = color;
    c.fill();
    c.stroke();

    c.strokeStyle = "black"
}

function clamp(num, min, max) 
{
    return num <= min ? min : num >= max ? max : num;
}

function format() 
{ var args = Array.prototype.slice.call (arguments, 1); 
    return arguments[0].replace (/\{(\d+)\}/g, function (match, index) { 
        return args[index]; 
    }); 
}




Init();
animate();