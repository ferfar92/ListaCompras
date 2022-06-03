
let contador =0; //Asignamos una variable para el contador de productos y total
let costoTotal = 0; //Asignamos una variable para sumar el costo por la cantidad
let totalEnProductos=0;
//Arreglo global para almacenar la lista de compras
let datos = [];

let element = document.getElementById("totalPrecio"); //Obtenemos el ID del texto "Total precio"
element.innerHTML = "Total de precio"; //Modificamos el texto

let txtNombre = document.getElementById("Name");
//txtNombre.value = "Leche Entera"; // En value para ingresar un valor por defecto
//console.log(txtNombre.value);
let txtNumber = document.getElementById("Number"); //Traer el id de number

let total = document.getElementById("precioTotal"); //Obtenemos el ID del total de precios

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

function validarNombre() //Validar Nombre
{
    if (txtNombre.value.length < 3 )
    {
        return false;
    };
    return true;
};
function validarCantidad() //Validad Cantidad
{
    if(txtNumber.value.length==0) {
        return false;
    }// if

    if (isNaN(txtNumber.value)) //Validad si es un número
    {
        return false;
    };
    if (parseFloat(txtNumber.value) <=0) // Validad si es mayor o igual a cero
    {
        return false;
    };
    return true;
};


let agregar = document.getElementById("btnAgregar");

agregar.addEventListener("click", (event) => 
    {
        event.preventDefault(); //Si no es un nombre o número devuelve un false
        if((!validarNombre()) || (!validarCantidad()))
        {
            let lista="";

            if(!validarNombre())
            {
                // console.log(txtNombre.style.border);
                txtNombre.style.border="red thin solid"; //Da estilo de borde rojo a Nombre
                lista+="<li>Se debe escribir un nombre válido</li>"
            };

            if(!validarCantidad)
            {
                // console.log(txtNumber.style.border);
                txtNumber.style.border="red thin solid"; //Da estilo de borde a cantidad
                lista+="<li>Se debe escribir un cantidad válida</li>"

            };

            document.getElementById("alertValidacionesTexto").innerHTML=`Los campos deben ser llenados correctamente.
            <ul>${lista}</ul>`;
            document.getElementById("alertValidaciones").style.display="block";

            setTimeout(function() //Funció que da un tiempo para desaparecer la alerta
            {
                document.getElementById("alertValidaciones").style.display="none";

            }, 
                5000
            );

            return false;
        };
        txtNumber.style.border=""; //Reestablecer el borde de cantidad
        txtNombre.style.border=""; //Reestablecer el borde de Nombre
        document.getElementById("alertValidaciones").style.display="none";

        contador++;
        document.getElementById("contadorProductos").innerHTML=contador;
        localStorage.setItem("contadorProducos", contador); //Guarda el valor del contador de productos

        let precio = (Math.floor((Math.random() * 50)*100))/100;
        let cantidad = parseFloat(txtNumber.value);
        totalEnProductos += (cantidad<1)?Math.ceil(cantidad):parseInt(cantidad);
        document.getElementById("productosTotal").innerHTML= totalEnProductos;
        localStorage.setItem("productosTotal", totalEnProductos); //Guarda el valor de productos

        costoTotal += (precio * cantidad);
        total.innerHTML = `$ ${costoTotal.toFixed(2)}`;
        localStorage.setItem("precioTotal", costoTotal.toFixed(2)); //Guarda el total del costo

        //JASON
        //Definición de objeto     "Comillas ya que es una cadena"
       let elemento = `{"id":${contador}, "nombre":"${txtNombre.value}", "cantidad":${txtNumber.value}, "precio":${precio}}`;
        // string-number                    string-cadena                   string-number               string-cadena

        datos.push(JSON.parse(elemento)); //parse: Convertimos la cadena elemento en un objeto
        localStorage.setItem("elementosTabla", JSON.stringify(datos)); //Combierte el objeto en string para ponerlo en storage como cadena por elemento

        console.log(datos);

        let tmp = `<tr>
            <th scope="row">${contador}</th>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>`;
        console.log(tmp);
        cuerpoTabla[0].innerHTML += tmp;
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus(); //Pone el puntero en el campo nombre
    }
);

txtNombre.addEventListener("blur", (event)=>
{
    event.target.value = event.target.value.trim();

}
);

txtNumber.addEventListener("blur", (event)=>
{
    event.target.value = event.target.value.trim();

}
);

window.addEventListener("load", function()
    {
        if(localStorage.getItem("contadorProducos")!=null)
        {
            contador = parseInt(localStorage.getItem("contadorProducos"));
            this.document.getElementById("contadorProductos").innerHTML = contador;
        };

        if(localStorage.getItem("productosTotal"))
        {
            totalEnProductos = parseInt(localStorage.getItem("productosTotal"));
            this.document.getElementById("productosTotal").innerHTML = totalEnProductos;
        };

        if(localStorage.getItem("precioTotal"))
        {
            costoTotal = parseInt(localStorage.getItem("precioTotal"));
            this.document.getElementById("precioTotal");
            total.innerHTML = costoTotal
        };

        if(this.localStorage.getItem("lementosTabla")!=null)
        {
            datos= JSON.parse(this.localStorage.getItem("elementosTabla"));
            datos.forEach(element => 
            {
                cuerpoTabla[0].innerHTML += 
                `<tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.nombre}</td>
                    <td>${element.cantidad}</td>
                    <td>${element.precio}</td>
                </tr>`;
            });
        }
    }
);