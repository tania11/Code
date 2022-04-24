const image = new Image();
image.src = "./images/panda.jpg";
image.crossOrigin = "Anonymous";
const particles = 5000;
let particlesArray = [];
let mappedImage = [];
image.addEventListener('load', () => {
  const imageCanvas = document.querySelector("#canvas_image");
  imageCanvas.width = 500;
  imageCanvas.height = 500;
  if (imageCanvas.getContext) {
    const context = imageCanvas.getContext('2d');
    context.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
    const pixels = context.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    for(let y = 0; y < imageCanvas.height; y++) {
      let row = [];
      for(let x = 0; x < imageCanvas.width; x++) {
        const red = pixels.data[(pixels.width * y * 4) + (x * 4)];
        const green = pixels.data[(pixels.width * y * 4) + (x * 4 + 1)];
        const blue = pixels.data[(pixels.width * y * 4) + (x * 4 + 2)];
        const brightness =  brightnessCalc(red, green, blue);
        const cell = [
          cellBrightness = brightness
        ];
        row.push(cell);
      }
      mappedImage.push(row);
    }
    init(imageCanvas, context);
  }
});

function brightnessCalc(r,g,b) {
  return Math.sqrt(
    (r * r) * 0.299 +
    (g * g) * 0.587 +
    (b * b) * 0.114
  )/100;
}

function init(canvas, ctxt, mappedImage) {
  for(let i = 0; i < particles; i++) {
    particlesArray.push(new Particle(canvas, ctxt));
  }
  animate(canvas, ctxt);
}

function animate(canvas, ctxt) {
  ctxt.globalAlpha = 0.05;
  ctxt.fillStyle = 'rgb(0, 0, 0)';
  ctxt.fillRect(0, 0, canvas.width, canvas.height);
  //ctxt.globalAlpha = 0.1;
  for(let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
   // ctxt.globalAlpha = particlesArray[i].speed/20;
  }
  requestAnimationFrame(function() {
    animate(canvas, ctxt);
  });

}

class Particle {
  constructor(canvas, ctx) {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.velocity = Math.random() * 0.5;
    this.size = Math.random() * 1.5 + 1;
    this.canvas = canvas;
    this.ctx = ctx;
    this.posX = Math.floor(this.x);
    this.posY = Math.floor(this.y);
    this.speed = 0;
  }

  update() {
    this.posX = Math.floor(this.x);
    this.posY = Math.floor(this.y);
   // console.log(mappedImage[this.posY][this.posX], this.posX, this.posY);
    this.speed = mappedImage[this.posY][this.posX][0];
    let movement = (2.7 - this.speed) + this.velocity;
    this.y += movement;
    if (this.y >= this.canvas.height) {
      this.y = 0;
      this.x = Math.random() * this.canvas.width;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
