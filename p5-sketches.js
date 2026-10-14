// ==========================================
// SKETCH 1: DIBUJO ESTÁTICO (Paisaje Nocturno)
// ==========================================
const sketchEstatico = (p) => {
    p.setup = function() {
        let canvas = p.createCanvas(400, 300);
        canvas.parent('sketch-estatico');
        p.noLoop(); // Detenemos el bucle draw, solo dibujamos una vez
    };

    p.draw = function() {
        // Fondo: Cielo nocturno (azul oscuro)
        p.background(20, 24, 40);

        // Luna (Círculo blanco/amarillo)
        p.fill(255, 255, 200);
        p.noStroke();
        p.ellipse(320, 80, 60, 60);

        // Estrellas (Puntos pequeños)
        p.fill(255);
        p.ellipse(50, 50, 3, 3);
        p.ellipse(150, 30, 4, 4);
        p.ellipse(250, 100, 2, 2);
        p.ellipse(80, 150, 3, 3);
        p.ellipse(350, 180, 2, 2);

        // Montañas (Triángulos)
        p.fill(40, 50, 60);
        p.triangle(0, 300, 150, 150, 300, 300); // Montaña izquierda
        p.fill(30, 40, 50);
        p.triangle(200, 300, 350, 120, 500, 300); // Montaña derecha

        // Suelo (Rectángulo verde oscuro)
        p.fill(20, 60, 30);
        p.rect(0, 250, 400, 50);
    };
};

new p5(sketchEstatico);


// ==========================================
// SKETCH 2: ANIMACIÓN INTERACTIVA
// ==========================================
const sketchAnimado = (p) => {
    let x = 0;
    let velocidad = 3;

    p.setup = function() {
        let canvas = p.createCanvas(400, 300);
        canvas.parent('sketch-animado');
    };

    p.draw = function() {
        // Fondo con un tono que cambia ligeramente
        p.background(30, 30, 50, 20);

        // Movimiento del círculo
        x += velocidad;

        // Rebote en los bordes
        if (x > p.width || x < 0) {
            velocidad *= -1;
        }

        // Dibujamos un círculo que sigue el movimiento
        p.fill(255, 100, 100);
        p.noStroke();
        p.ellipse(x, p.height / 2, 50, 50);

        // Texto explicativo
        p.fill(255);
        p.textSize(12);
        p.text("Mueve el mouse: " + p.mouseX + ", " + p.mouseY, 10, 20);

        // Rectángulo que sigue al mouse
        p.fill(100, 100, 255, 150);
        p.rect(p.mouseX - 25, p.mouseY - 25, 50, 50);
    };
};

new p5(sketchAnimado);