let luces = [];
let cantidad = 80;

// Paleta exacta de colores
let paleta = [
  [34, 41, 64],     // #222940
  [220, 227, 226],  // #DCE3E2
  [78, 116, 166],   // #4E74A6
  [132, 164, 191],  // #84A4BF
  [21, 38, 18]      // #152612
];

let fondo = paleta[0];
let texto = paleta[1];

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < cantidad; i++) {
    luces.push(new Luz());
  }
  textFont('Arial', 16);
}

function draw() {
  background(fondo[0], fondo[1], fondo[2], 40); // fondo con transparencia

  for (let l of luces) {
    l.actualizar();
    l.mostrar();
  }

  mostrarTextoPoetico();
}

class Luz {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.dx = random(-0.5, 0.5);
    this.dy = random(-0.5, 0.5);
    this.c = random(paleta);
  }

  actualizar() {
    this.x += this.dx + random(-0.3, 0.3);
    this.y += this.dy + random(-0.3, 0.3);

    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
  }

  mostrar() {
    let distancia = dist(this.x, this.y, mouseX, mouseY);
    let tam = map(distancia, 0, 300, 12, 3);
    let brillo = map(distancia, 0, 300, 255, 50);

    fill(this.c[0], this.c[1], this.c[2], brillo);
    noStroke();
    ellipse(this.x, this.y, tam, tam);
  }
}

function mostrarTextoPoetico() {
  fill(texto[0], texto[1], texto[2], 180);
  textAlign(CENTER);
  textSize(16);
  text("A veces, la luz vaga sin rumbo, buscando un recuerdo", width / 2, height - 40);
}