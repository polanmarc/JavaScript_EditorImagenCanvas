import { Canvas, Filtros, Aclarar } from './modules/clases.js';

// Animaciones filtros

const inpAclarar = document.querySelector("#inputAclarar");
const output = document.querySelector("#outputAclarar");

const canvas = new Canvas(10);

output.textContent = inpAclarar.value;

inpAclarar.addEventListener("input", function () {
  output.textContent = inpAclarar.value;
});