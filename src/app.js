import "./style.css";

window.onload = function() {

  //write your code here
  let cartasCreadas = [];

  const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const iconos = ['♠', '♣', '♥', '♦'];

  const iconoEstilos = {
    '♠': 'card-spade',
    '♣': 'card-club',
    '♥': 'card-heart',
    '♦': 'card-diamond'
  };

  function crearCarta() {
    const valor = valores[Math.floor(Math.random() * valores.length)];
    const icono = iconos[Math.floor(Math.random() * iconos.length)];
    const estilo = iconoEstilos[icono];
  
    const carta = document.createElement('div');
    carta.classList.add('poker-card', estilo);
  
    carta.innerHTML = `
      <div class="corner top-left">${icono}</div>
      <div class="number">${valor}</div>
      <div class="corner bottom-right">${icono}</div>
    `;
  
    return {
      valor: valor,
      icono: icono,
      elemento: carta
    };
  }

  function obtenerValorNumerico(valor) {
    if (valor === 'A') return 1;
    if (valor === 'J') return 11;
    if (valor === 'Q') return 12;
    if (valor === 'K') return 13;
    return parseInt(valor);
  }

  function imprimirLog(arreglo, paso = 0) {
    const logContainer = document.getElementById('logContainer');
  
    const pasoContainer = document.createElement('div');
    pasoContainer.style.display = 'flex';
    pasoContainer.style.alignItems = 'center';
    pasoContainer.style.marginBottom = '8px';
    pasoContainer.style.gap = '5px';
  
    const label = document.createElement('span');
    label.textContent = `${paso}:`;
    label.style.minWidth = '80px';
    label.style.color = 'black';
    pasoContainer.appendChild(label);
  
    arreglo.forEach(carta => {
      const estilo = iconoEstilos[carta.icono];
      const cartaDiv = document.createElement('div');
      cartaDiv.classList.add('poker-card', estilo);
  
      cartaDiv.innerHTML = `
        <div class="corner top-left">${carta.icono}</div>
        <div class="number">${carta.valor}</div>
        <div class="corner bottom-right">${carta.icono}</div>
      `;
  
      pasoContainer.appendChild(cartaDiv);
    });
  
    logContainer.appendChild(pasoContainer);
  }
  

  function ordenarCartas() {
    let wall = cartasCreadas.length - 1;
    let paso = 0;
  
    while (wall > 0) {
      for (let i = 0; i < wall; i++) {
        const valorActual = obtenerValorNumerico(cartasCreadas[i].valor);
        const valorSiguiente = obtenerValorNumerico(cartasCreadas[i + 1].valor);
  
        if (valorActual > valorSiguiente) {
          let temp = cartasCreadas[i];
          cartasCreadas[i] = cartasCreadas[i + 1];
          cartasCreadas[i + 1] = temp;
  
          imprimirLog(cartasCreadas, paso);
          //mostrarCartas(cartasCreadas);

          paso++;
        }
      }
      wall--;
    }
  }

  function mostrarCartas(cartas) {
    const contenedor = document.getElementById('cardContainer');
    contenedor.innerHTML = '';
  
    cartas.forEach(carta => {
      contenedor.appendChild(carta.elemento);
    });
  }
  

  document.getElementById('drawBtn').addEventListener('click', () => {
    const contenedor = document.getElementById('cardContainer');
    const cantidad = parseInt(document.getElementById('cardCounter').value);

    contenedor.innerHTML = '';
    document.getElementById('logContainer').innerHTML = '';
    cartasCreadas = [];

    for (let i = 0; i < cantidad; i++) {
      const nuevaCarta = crearCarta();
      cartasCreadas.push(nuevaCarta);
      contenedor.appendChild(nuevaCarta.elemento);
    }
    
    mostrarCartas(cartasCreadas);
        
  });

  document.getElementById('sortBtn').addEventListener('click', () => {
    ordenarCartas();
  });

};
