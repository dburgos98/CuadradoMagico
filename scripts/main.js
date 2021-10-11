const form = document.getElementById("formCuadradoMagico");
let animaciones = true;

form.addEventListener("submit", (event) => {
  limpiarCuadradoMagico();
  generarCuadradoMagico();
  cambiarCantidadColumnasGrid();
  event.preventDefault();
});

function generarCuadradoMagico() {
  const tamanioColumnas = parseInt(document.querySelector("#inputTamanio").value);
  const cuadradoContainer = document.querySelector("#cuadrado-magico");

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < tamanioColumnas * tamanioColumnas; i++) {
    const div = document.createElement("div");     
    div.classList.toggle('casilla');
    fragment.appendChild(div);
  }

  cuadradoContainer.appendChild(fragment);  
  calcularPosicionesCuadrado(tamanioColumnas, cuadradoContainer);
  cambiarCantidadColumnasGrid(tamanioColumnas);

  mostrarDetalles(tamanioColumnas);
}

/**
 * Remueve las casillas pertenecientes al cuadrado magico del DOM 
 */
function limpiarCuadradoMagico() {
  const cuadradoContainer = document.querySelector("#cuadrado-magico");
  cuadradoContainer.textContent = "";
}

/**
 * Modifica la cantidad de columnas del cuadrado magico
 * @param {number} n cantidad de columnas del grid
 */
function cambiarCantidadColumnasGrid(n) {
  const grid = (document.getElementById(
    "cuadrado-magico"
  ).style.gridTemplateColumns = `repeat(${n}, 1fr)`);
}

/**
 * 
 * @param {number} n 
 * @param {Element} fragment 
 */
function calcularPosicionesCuadrado(n, fragment) {
  const a = 4;
  const b = 3;
  const c = 1;
  const d = -2;
  const e = 1;
  const f = -4;

  if (mcd(c * f - d * e, n) != 1)
    throw "Los numeros no son primos relativos";

  for (let k = 0; k < n * n; k++) {
    let i = (a + c * k + e * Math.floor(k / n)) % n;
    let j = (b + d * k + f * Math.floor(k / n)) % n;

    if (i < 0)
      i = i + n;
    if (j < 0)
      j = j + n;
        
    
    const div = fragment.childNodes[i * n + j];       
    setTimeout(() => {
      div.classList.toggle('casilla-resulta')
      div.textContent = k;    
    }, 500);        
  }
}

/**
 * Calcula el maximo comun divisor entre 2 numeros
 * @param {number} a entero n1
 * @param {number} b entero n2
 * @returns {number} maximo comun divisor de a y b
 */
 function mcd(a, b) {

  if (b == 0)
    return a;

  a = Math.abs(a);
  b = Math.abs(b);

  return mcd(b, a % b);
}

/**
 * Muestra los detalles del cuadrado mágico
 * @param {number} n tamanio 
 */
function mostrarDetalles(n) {
  const detalles = document.querySelector('details');
    
  detalles.classList.add('details-cuadrado');
  const sumaMagica = detalles.querySelector('.suma-magica');
  sumaMagica.textContent =  `Suma mágica: ${(n*(n*n - 1 ) / 2)}`;
}
