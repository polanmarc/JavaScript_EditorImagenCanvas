export class Canvas {

    #canvas;
    #padding;
    #context;
    #imagen;
    #arrComprobaciones

    constructor(padding = 10) {
        this.#canvas = document.querySelector("#canvas")
        this.#padding = padding;
        this.#context = this.#canvas.getContext("2d");
        this.#imagen = new Image();
        this.#arrComprobaciones = {imagenCargada: false};
        this.addImagenes();
        this.addFilter();
    }

    drawImage(src) {
        this.#imagen.src = src;
        this.#imagen.onload = () => {
            this.#canvas.width = (this.#imagen.width + this.#padding) * 2;
            this.#canvas.height = this.#imagen.height + this.#padding;
            this.#context.fillStyle = 'green';
            this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
            this.#context.drawImage(this.#imagen, this.#padding / 2, this.#padding / 2);
            this.#arrComprobaciones.imagenCargada = true;
        }
    }

    getContext() {
        return this.#context;
    }

    addImagenes() {
        const divImg = document.querySelector('#imagenes');
        divImg.addEventListener('click', (event) => {
            this.drawImage(event.target.src);
        });
    }

    addFilter() {
        const divFiltros = document.querySelector('#containerFiltros');
        divFiltros.addEventListener('click', (event) => {
            if (this.#arrComprobaciones.imagenCargada) {
                switch (event.target.id) {
                    case "aclarar":
                        const aclarar = new Aclarar(this.#canvas, this.#imagen, this.#context, this.#imagen.width, this.#imagen.height, this.#padding);
                        this.#arrComprobaciones.elemAparecerAclarar = true
                        this.aparecerElementosNecesarios();
                        break;
                    case "escalaGris" :
                        const escalaGris = new EscalaGris(this.#canvas, this.#imagen, this.#context, this.#imagen.width, this.#imagen.height, this.#padding);
                        this.eliminarElementosNecesarios();
                        break;
                    case "negativo" :
                        const negativo = new Negativo(this.#canvas, this.#imagen, this.#context, this.#imagen.width, this.#imagen.height, this.#padding);
                        this.eliminarElementosNecesarios();
                        break;
                    case "espejo" :
                        const espejo = new Espejo(this.#canvas, this.#imagen, this.#context, this.#imagen.width, this.#imagen.height, this.#padding);
                        this.eliminarElementosNecesarios();
                        break;
                    case "espejoInvertido" :
                        const espejoInvertido = new EspejoInvertido(this.#canvas, this.#imagen, this.#context, this.#imagen.width, this.#imagen.height, this.#padding);
                        this.eliminarElementosNecesarios();
                        break;
                    case "sepia":
                        const sepia = new Sepia(this.#canvas, this.#imagen, this.#context, this.#imagen.width, this.#imagen.height, this.#padding);
                        this.eliminarElementosNecesarios();
                        break;
                    case "saturacion":
                        const neon = new Saturacion(this.#canvas, this.#imagen, this.#context, this.#imagen.width, this.#imagen.height, this.#padding);
                        this.eliminarElementosNecesarios();
                        break;
                    case "frio" :
                        const frio = new Frio(this.#canvas, this.#imagen, this.#context, this.#imagen.width, this.#imagen.height, this.#padding);;
                        this.eliminarElementosNecesarios();
                        break;
                    case "calor":
                        const calor = new Calor(this.#canvas, this.#imagen, this.#context, this.#imagen.width, this.#imagen.height, this.#padding);
                        this.eliminarElementosNecesarios();
                        break;
                    case "eliminarFiltro":
                        const eliminarFiltro = new EliminarFiltro(this.#canvas, this.#imagen, this.#context, this.#imagen.width, this.#imagen.height, this.#padding);
                        this.eliminarElementosNecesarios();
                        break;
                    case "limpiar" :
                        const limpiar = new Limpiar(this.#canvas, this.#imagen, this.#context, this.#imagen.width, this.#imagen.height, this.#padding);
                        this.#arrComprobaciones = {imagenCargada: false};
                        this.eliminarElementosNecesarios();
                        break;
                    case "guardar" :
                        const guardar = new Save(this.#canvas, this.#imagen, this.#context, this.#padding);
                        break;
                }
            } else {
                window.alert('Por favor, carga una imagen antes de aplicar un filtro.');
            }
        });
    }

    aparecerElementosNecesarios() {
        const containerAclarar = document.querySelector('#containerFiltroAclarar');
        containerAclarar.classList.add('aparecer');
    }

    eliminarElementosNecesarios() {
        const containerAclarar = document.querySelector('#containerFiltroAclarar');
        containerAclarar.classList.remove('aparecer');
    }

    get getPadding() {
        return this.#padding;
    }

    get getCanvas() {
        return this.#canvas;
    }

    get getContext() {
        return this.#context;
    }

    get getImagen() {
        return this.#imagen;
    }

    set setPadding(newPadding) {
        this.#padding = newPadding;
    }

}

export class Filtros {

    constructor(canvas, imagen, context, width, height, padding) {
        this.canvas = canvas;
        this.context = context;
        this.padding = padding;
        this.imagen = imagen;
        this.width = width;
        this.height = height;
        this.imagenData = this.context.getImageData(this.padding / 2, this.padding / 2, this.imagen.width - (this.padding / 2), this.imagen.height);
        console.log(this.imagenData)
    }

    limpiarFiltroAnterior() {
        const segundaImagenX = this.imagen.width + (this.padding * 3) / 2;
        const segundaImagenY = this.padding / 2;
        this.context.clearRect(segundaImagenX, segundaImagenY, this.imagen.width, this.imagen.height);
        
        this.context.fillStyle = 'green';
        this.context.fillRect(segundaImagenX, segundaImagenY, this.imagen.width, this.imagen.height);
    }

}

export class Aclarar extends Filtros {

    constructor(canvas, imagen, context, width, height, padding) {
        super(canvas, imagen, context, width, height, padding);
        super.limpiarFiltroAnterior();
        this.aplicarFiltro();
    }

    aplicarFiltro() {
        const inpAclarar = document.querySelector('#inputAclarar');

        this.context.putImageData(this.imagenData, (this.padding * 2) + this.imagen.width, this.padding / 2);
    
        inpAclarar.addEventListener('input', () => {
            this.intensidad = parseInt(inpAclarar.value);
    
            let newData = new Uint8ClampedArray(this.imagenData.data);    // copia los datos de la imagen
    
            for (let i = 0; i < newData.length; i += 4) {
                newData[i] = Math.min(255, Math.max(0, newData[i] + this.intensidad));
                newData[i + 1] = Math.min(255, Math.max(0, newData[i + 1] + this.intensidad));
                newData[i + 2] = Math.min(255, Math.max(0, newData[i + 2] + this.intensidad));
            }
    
            const nuevaImagenData = new ImageData(newData, this.imagenData.width, this.imagenData.height);
    
            this.context.putImageData(nuevaImagenData, (this.padding * 2) + this.imagen.width, this.padding / 2);
        });
    }    

}

export class EscalaGris extends Filtros {

    constructor(canvas, imagen, context, width, height, padding) {
        super(canvas, imagen, context, width, height, padding);
        super.limpiarFiltroAnterior();
        this.aplicarFiltro();
    }

    aplicarFiltro() {
        for (let i = 0; i < this.imagenData.data.length; i += 4) {
            const gris = 0.299 * this.imagenData.data[i] + 0.587 * this.imagenData.data[i + 1] + 0.114 * this.imagenData.data[i + 2];
            this.imagenData.data[i] = gris;
            this.imagenData.data[i + 1] = gris;
            this.imagenData.data[i + 2] = gris;
        }
        this.context.putImageData(this.imagenData, (this.padding * 2) + this.imagen.width, this.padding / 2);
    }

}

export class Negativo extends Filtros {

    constructor(canvas, imagen, context, width, height, padding) {
        super(canvas, imagen, context, width, height, padding);
        super.limpiarFiltroAnterior();
        this.aplicarFiltro();
    }

    aplicarFiltro() {
        for (let i = 0; i < this.imagenData.data.length; i += 4) {
            this.imagenData.data[i] = 255 - this.imagenData.data[i];       
            this.imagenData.data[i + 1] = 255 - this.imagenData.data[i + 1];
            this.imagenData.data[i + 2] = 255 - this.imagenData.data[i + 2];
        }
        const segundaImagenX = this.imagen.width + (this.padding * 4) / 2;
        const segundaImagenY = this.padding / 2;
        this.context.putImageData(this.imagenData, segundaImagenX, segundaImagenY);
    }

}

export class Espejo extends Filtros {

    constructor(canvas, imagen, context, width, height, padding) {
        super(canvas, imagen, context, width, height, padding);
        super.limpiarFiltroAnterior();
        this.aplicarFiltro();
    }

    aplicarFiltro() {
        const segundaImagenX = this.imagen.width + (this.padding * 3) / 2;
        const segundaImagenY = this.padding / 2;
    
        this.context.save();
        this.context.translate(segundaImagenX + this.imagen.width, segundaImagenY);
        this.context.scale(-1, 1); 
        this.context.drawImage(this.imagen, 0, 0, this.imagen.width, this.imagen.height);
        this.context.restore();
    }

}

// Filtro Extra

export class EspejoInvertido extends Filtros {

    constructor(canvas, imagen, context, width, height, padding) {
        super(canvas, imagen, context, width, height, padding);
        super.limpiarFiltroAnterior();
        this.aplicarFiltro();
    }

    aplicarFiltro() {
        const segundaImagenX = this.imagen.width + (this.padding * 3) / 2;
        const segundaImagenY = this.padding / 2;

        this.context.save();
        this.context.translate(segundaImagenX, segundaImagenY + this.imagen.height);
        this.context.scale(1, -1);
        this.context.drawImage(this.imagen, 0, 0, this.imagen.width, this.imagen.height);
        this.context.restore();
    }

}

// Filtro Extra

export class Frio extends Filtros {

    constructor(canvas, imagen, context, width, height, padding) {
        super(canvas, imagen, context, width, height, padding);
        super.limpiarFiltroAnterior();
        this.aplicarFiltro();
    }

    aplicarFiltro() {
        for (let i = 0; i < this.imagenData.data.length; i += 4) {
            this.imagenData.data[i + 2] = Math.min(255, this.imagenData.data[i + 2] + 60);
        }
        this.context.putImageData(this.imagenData, (this.padding * 2) + this.imagen.width, this.padding / 2);
    }

}

// Filtro Extra

export class Calor extends Filtros {

    constructor(canvas, imagen, context, width, height, padding) {
        super(canvas, imagen, context, width, height, padding);
        super.limpiarFiltroAnterior();
        this.aplicarFiltro();
    }

    aplicarFiltro() {
        for (let i = 0; i < this.imagenData.data.length; i += 4) {
            this.imagenData.data[i] = Math.min(255, this.imagenData.data[i] + 60);
        }
        this.context.putImageData(this.imagenData, (this.padding * 2) + this.imagen.width, this.padding / 2);
    }

}

// Filtro Extra

export class Saturacion extends Filtros {
    constructor(canvas, imagen, context, width, height, padding) {
        super(canvas, imagen, context, width, height, padding);
        super.limpiarFiltroAnterior();
        this.aplicarFiltro();
    }

    aplicarFiltro() {
        const brillo = 70;
        const saturacion = 2;

        for (let i = 0; i < this.imagenData.data.length; i += 4) {
            const r = this.imagenData.data[i] + brillo;
            const g = this.imagenData.data[i + 1] + brillo;
            const b = this.imagenData.data[i + 2] + brillo;

            const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;
            const ns = (1 - saturacion) * grayscale;

            this.imagenData.data[i] = Math.min(255, Math.max(0, r + ns));
            this.imagenData.data[i + 1] = Math.min(255, Math.max(0, g + ns));
            this.imagenData.data[i + 2] = Math.min(255, Math.max(0, b + ns));
        }

        this.context.putImageData(this.imagenData, (this.padding * 2) + this.imagen.width, this.padding / 2);
    }
}

// Filtro Extra

export class Sepia extends Filtros {

    constructor(canvas, imagen, context, width, height, padding) {
        super(canvas, imagen, context, width, height, padding);
        super.limpiarFiltroAnterior();
        this.aplicarFiltro();
    }

    aplicarFiltro() {
        for (let i = 0; i < this.imagenData.data.length; i += 4) {
            const r = this.imagenData.data[i];
            const g = this.imagenData.data[i + 1];
            const b = this.imagenData.data[i + 2];

            const tr = 0.393 * r + 0.769 * g + 0.189 * b;
            const tg = 0.349 * r + 0.686 * g + 0.168 * b;
            const tb = 0.272 * r + 0.534 * g + 0.131 * b;

            this.imagenData.data[i] = Math.min(255, tr);
            this.imagenData.data[i + 1] = Math.min(255, tg);
            this.imagenData.data[i + 2] = Math.min(255, tb);
        }
        this.context.putImageData(this.imagenData, (this.padding * 2) + this.imagen.width, this.padding / 2);
    }

}

// Filtro Extra

export class EliminarFiltro extends Filtros {

    constructor(canvas, imagen, context, width, height, padding) {
        super(canvas, imagen, context, width, height, padding);
        super.limpiarFiltroAnterior();
    }

}


export class Limpiar extends Filtros {

    constructor(canvas, imagen, context, width, height, padding) {
        super(canvas, imagen, context, width, height, padding);
        this.limpiarCanvas();
    }

    limpiarCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = 300
        this.canvas.height = 170
        // window.location.reload();
    }

}

export class Save extends Filtros {

    constructor(canvas, imagen, context, padding) {
        super(canvas, imagen, context, canvas.width / 2, canvas.height, padding);
        this.confirmarGuardado();
        
    }

    confirmarGuardado() {
        if (window.confirm("Quieres descargar la imagen con el filtro aplicado?"))  {
            this.guardarImagen();
        } else {
            window.alert("Has cancelado la descarga de la imagen con el filtro aplicado.")
        }
    }

    guardarImagen() {     
        const tempCanvas = document.createElement('canvas');
        const tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = this.width;
        tempCanvas.height = this.height;
        tempContext.drawImage(this.canvas, this.width, 0, this.width, this.height, 0, 0, this.width, this.height);

        const dataURL = tempCanvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'filtroAplicado.png';
        downloadLink.click();
    }

}