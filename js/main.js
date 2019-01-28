let convas = document.getElementById("game");
let context = convas.getContext("2d");

let brid = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

let gap = 90;

//создание блока 

let pipe = [];

pipe[0] = {
    x: convas.width,
    y: 0
}

//При нажатие на кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
}

//Position brid
let xPos = 10;
let yPos = 150;
let grav = 1.5;


brid.src = "../img/bird.png";
bg.src = "../img/bg.png";
fg.src = "../img/fg.png";
pipeUp.src = "../img/pipeUp.png";
pipeBottom.src = "../img/pipeBottom.png";

function draw() {

    context.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: convas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if (xPos + brid.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            ||  yPos + brid.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + brid.height >= convas.height - fg.height ) {
            location.reload();
        }
    }

    context.drawImage(fg, 0, convas.height - fg.height);
    context.drawImage(brid, xPos, yPos);

    yPos += grav;
    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;