{

    /**
     * 
     * Mastermind
     * 
     * @author Javier Lopera Jiménez
     * 
    */

    let copia;

    let arrayNegrosYBlancos;

    let coloresElegidos = document.getElementsByClassName("colorElegido");

    let colores = ["rgb(255, 0, 0)", "rgb(0, 0, 255)", "rgb(128, 128, 128)", 
    "rgb(255, 192, 203)", "rgb(238, 130, 238)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(255, 255, 0)"];

    let check = document.getElementById("comprobar");
    let modal = document.getElementById("modal");

    let cajaPrincipal = document.getElementById("cajaPrincipal");

    let elegirColor = (colorFondo) => {

        for (let i = 0; i < coloresElegidos.length; i++) {

            if (window.getComputedStyle(coloresElegidos[i]).backgroundColor === "rgb(192, 192, 192)") {
                coloresElegidos[i].style.backgroundColor = colorFondo;
                break;
            }
        }
    }

    let borrarColor = (color) => {
        color.style.backgroundColor="rgb(192, 192, 192)";
    }

    let borrarBola = () =>{
        for (let i = 0; i < 4; i++) {
            
            document.getElementById("cajaPrincipal").getElementsByTagName("div")[0].getElementsByClassName("colorElegido")[i].addEventListener("click", function () {
                // borrarColor(coloresElegidos[i]);
                borrarColor(document.getElementsByClassName("coloresElegidos")[0].childNodes[i*2+1]); // El metodo childNodes devuelve el div en este orden: 1,3,5,7
            })
        }
    }

    let comprobar = () => {

        let arrayColorFondo = [window.getComputedStyle(coloresElegidos[0]).backgroundColor,
            window.getComputedStyle(coloresElegidos[1]).backgroundColor,
            window.getComputedStyle(coloresElegidos[2]).backgroundColor,
            window.getComputedStyle(coloresElegidos[3]).backgroundColor];


        if(arrayColorFondo[0] != "rgb(192, 192, 192)"
        && arrayColorFondo[1] != "rgb(192, 192, 192)"
        && arrayColorFondo[2] != "rgb(192, 192, 192)"
        && arrayColorFondo[3] != "rgb(192, 192, 192)"
        ){
            
            let arrayComprobados = document.getElementsByClassName("colorComprobado");
            
            arrayNegrosYBlancos = mastermind.comprobarCoincidencia([
                colores.indexOf(arrayColorFondo[0]),
                colores.indexOf(arrayColorFondo[1]),
                colores.indexOf(arrayColorFondo[2]),
                colores.indexOf(arrayColorFondo[3])
                ]
            );

            for (let i = 0; i < arrayNegrosYBlancos.length; i++) {
                
                if(arrayNegrosYBlancos[i] == 1){
                    arrayComprobados[i].style.backgroundColor = "rgb(0,0,0)";
                }
                else if(arrayNegrosYBlancos[i] == 0){
                    arrayComprobados[i].style.backgroundColor = "rgb(255,255,255)";
                }
                else{
                    arrayComprobados[i].style.backgroundColor = "rgb(192, 192, 192)";
                }
                
            }
            if (JSON.stringify(arrayNegrosYBlancos)==JSON.stringify([1, 1, 1, 1])) {
                modal.style.visibility="visible";
            }

            document.getElementById("juego").insertBefore(copia, document.getElementById("cajaPrincipal"));
            copia = document.getElementById("cajaPrincipal").cloneNode(true);
            
            borrarBola();
        }
    }

    let inicio = () => {

        let elementosColores = document.getElementsByClassName("colores");

        console.log("Dejo el mastermind.init en consola para que puedas hacer mejor las pruebas: ");
        mastermind.init();

        copia = document.getElementById("cajaPrincipal").cloneNode(true);

        console.log(mastermind.mostrar());  

        borrarBola();

        for (let i = 0; i < colores.length; i++) {
            
            elementosColores[i].addEventListener("click", function () {
                elegirColor(colores[i]);
            })
        }

        check.addEventListener("click", comprobar);
        
        document.getElementById("salir").addEventListener("click",function() {location.reload()});
        document.getElementById("seguirJugando").addEventListener("click",function() {modal.style.visibility="hidden"});
    }

    document.addEventListener("DOMContentLoaded", inicio);

}