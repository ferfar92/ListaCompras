

let element = document.getElementById("totalPrecio");
element.innerHTML = "Total de precio";

let txtNombre = document.getElementById("Name");
//txtNombre.value = "Leche Entera"; // En value para ingresar un valor por defecto
//console.log(txtNombre.value);
let txtNumber = document.getElementById("Number"); //Traer el id de number

// Campos

// let campos = document.getElementsByClassName("campos");
// campos[0].value = "Leche descremada deslactosada light=agua";
// console.log( campos[0].value);
// console.log(campos);

// for(let i=0; i<campos.length; i++)
// {
//     campos[i].style.border = "red thin solid" ;
// };

// let spans = document.getElementsByTagName("span"); //Trae los elementos de la etiqueta span
// for(let i=0; i<spans.length; i++)
// {
//     console.log(spans[i].textContent);
// };

//tablaListaCompras

let tabla=document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");

// cuerpoTabla[0].innerHTML = ` <tr>
//     <th scope="row">1</th>
//     <td>Leche descremada</td>
//     <td>3</td>
//     <td>$ 23.00</td>
//     </tr> `;

    //botón

let agregar = document.getElementById("btnAgregar");

agregar.addEventListener("click", (event) => 
    {
        let precio = Math.random() * 50;
        let tmp = `<tr>
            <th scope="row">1</th>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>`;
        console.log(tmp);
        cuerpoTabla[0].innerHTML += tmp;
        txtNombre.value="";
        txtNombre.value="";
        txtNombre.focus(); //Pone el puntero en el campo nombre
    }
);

