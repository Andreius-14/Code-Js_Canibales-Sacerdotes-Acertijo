const personajes = document.querySelectorAll(".canibal , .sacerdote");
const contenedor = document.querySelector(".contenedor");
const ladoIzquierdo = document.querySelector(".lado.inicio");
const ladoDerecho = document.querySelector(".lado.fin");
const button = document.querySelector(".button");
const root = document.documentElement;
const padre = document.querySelector(".padre");

button.addEventListener("click", () => {
  if (contenedor.children.length>1) {
    contenedor.classList.toggle("orillaFinal");

    /*[■ Desabilita boton durante el Viaje]*/
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
      console.log("Llego");
      desenbarco();
      verificaLados();
    }, 5000);
  }
});

/*[🌱 Eventos a Personajes - Inserta a Barcos]*/

personajes.forEach((data) => {
  data.addEventListener("click", (e) => {
    console.log(e.target);
    insertarEnVote(e.target);
  });
});

function insertarEnVote(html) {
  if (contenedor.children.length < 3) {
    contenedor.appendChild(html);
  }
}

/*[🌱 Funciones Especiales]*/

async function desenbarco() {
  let valores = contenidoObjeto(contenedor);
  valores.shift();
  if (contenedor.classList.contains("orillaFinal")) {
    // Estas en la derecha
    valores.forEach((valor) => ladoDerecho.appendChild(valor));
  } else {
    // Estas en la Izquierda
    valores.forEach((valor) => ladoIzquierdo.appendChild(valor));
  }
}

function verificaLados() {
  console.log("Verifica Riesgo de Muerte");

  muerte(contenidoObjeto(ladoIzquierdo));
  muerte(contenidoObjeto(ladoDerecho));
}

/*[Intento de hacer un standar function que me trae los hijos de un lado como un array]*/
function contenidoObjeto(caja) {
  let hijosList = Array.from(caja.children);
  return hijosList;
}

function muerte(valorArray) {
  let titulos = valorArray.map((valor) => {
    return valor.getAttribute("title");
  });
  let nCanival = titulos.filter((valor) => valor === "canibal").length;
  let nSacerdote = titulos.filter((valor) => valor === "sacerdote").length;

  // console.log("Canival: "+nCanival + "sacerdote: "+nSacerdote)

  if (nCanival > nSacerdote && nSacerdote > 0) {
    // console.log("Error")
    setTimeout(() => {
      // alert("Muerte");
      const anuncio = document.createElement("div");
      anuncio.setAttribute("class", "anuncio");
      anuncio.innerHTML = `<img src="img/final.jpg" title="murio"/>`;
      document.body.insertBefore(anuncio, padre);
      console.log("DEAD DEAD");
      setTimeout(() => {
        
      location.reload();
      }, 3000);
      //
    }, 2000);
    // document.body.innerHTML="MUERTE"
  }
}
