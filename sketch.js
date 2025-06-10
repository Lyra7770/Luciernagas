let luces = [];
let cantidad;

let paleta = [
  [34, 41, 64], // #222940
  [220, 227, 226], // #DCE3E2
  [78, 116, 166], // #4E74A6
  [132, 164, 191], // #84A4BF
  [21, 38, 18] // #152612
];

let fondo = paleta[0];
let texto = paleta[1];

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(displayDensity() > 1.5 ? 1 : displayDensity()); // evitar sobrecarga retina en móvil
  cantidad = windowWidth < 768 ? 40 : 80; // Menos luces en móvil

  for (let i = 0; i < cantidad; i++) {
    luces.push(new Luz());
  }

  textFont('Arial');
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(fondo[0], fondo[1], fondo[2], 50); // levemente translúcido para sensación suave

  for (let l of luces) {
    l.actualizar();
    l.mostrar();
  }

  mostrarTextoPoetico();
}

class Luz {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.dx = random(-0.4, 0.4);
    this.dy = random(-0.4, 0.4);
    this.c = random(paleta);
  }

  actualizar() {
    this.x += this.dx;
    this.y += this.dy;

    // Rebotan
    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
  }

  mostrar() {
    let distancia = dist(this.x, this.y, mouseX, mouseY);
    let tam = map(distancia, 0, 300, 10, 2);
    let brillo = map(distancia, 0, 300, 200, 50);

    fill(this.c[0], this.c[1], this.c[2], brillo);
    ellipse(this.x, this.y, tam, tam);
  }
}

function mostrarTextoPoetico() {
  fill(texto[0], texto[1], texto[2], 160);
  textAlign(CENTER);
  textSize(width < 600 ? 12 : 16); // texto más pequeño en móvil
  text("A veces, la luz vaga sin rumbo, buscando un recuerdo", width / 2, height - 40);
}


