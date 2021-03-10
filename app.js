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

const snowInfo = {
    downSpeed : 0.01
}

class snow  {
    constructor()
    {
        this.dx = Math.random() * canvas.width;
        this.dy = 100;
        this.raidus = 1.5;
        this.FallingSpeed = clamp(Math.random(), 0.1, 1);

        this.isFlatOnGround = false;
    }

    FallingSnow()
    {
        this.dy += this.FallingSpeed;
    }

    DrawSnow()
    {
        drawCircle(this.dx,this.dy,this.raidus);
    }

    Collide()
    {
        let integerX = Math.floor(this.dx);
        if( (this.dy - this.raidus) > waveYPositionList[integerX] )
        {
            this.isFlatOnGround = true;
            this.dy = waveYPositionList[integerX] - this.raidus;
        }
    }

    FlatOnGround()
    {
        let integerX = Math.floor(this.dx);
        this.dy = waveYPositionList[integerX] - this.raidus;
    }

    Update()
    {
        if(this.isFlatOnGround == false)
        {
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
    for(let i=0; i<100;++i)
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

function drawCircle(dx,dy,raidus)
{
    c.beginPath();
    c.arc(dx,dy,raidus,0,2*Math.PI);

    c.fill();
    c.stroke();
}

function clamp(num, min, max) 
{
    return num <= min ? min : num >= max ? max : num;
}

Init();
animate();