/*METODO POST */

//'Content-Type': '"multipart/form-data;'
//application/json
//enctype="multipart/form-data" method="post"
//  "Content-type": "application/json",
/* var form = document.forms.namedItem("formulario")*/

const form = document.getElementById("formulario");

let nombre = document.getElementById("nombre");
let descripcion = document.getElementById("descripcion");
let stock = document.getElementById("stock");
let precio = document.getElementById("precio");
let categoria_id = document.getElementById("categoria");
let imagen = document.getElementById("imagen");

const formIsValid = {
    nombre: false,
    precio: false,
    descripcion: false,
    stock: false,
    imagen: false,
    categoria_id: false
};

const Producto = {
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
    imagen: "",
    categoria_id: ""
};

form.addEventListener("submit", e => {
    e.preventDefault();
    validateForm();
});

nombre.addEventListener("change", e => {
    if (e.target.value.trim().length > 0) {
        formIsValid.nombre = true;
        Producto.nombre = e.target.value;
    }
});

precio.addEventListener("change", e => {
    if (e.target.value.trim().length > 0) {
        formIsValid.precio = true;
        Producto.precio = e.target.value;
    }
});
descripcion.addEventListener("change", e => {
    if (e.target.value.trim().length > 0) {
        formIsValid.descripcion = true;
        Producto.descripcion = e.target.value;
    }
});
stock.addEventListener("change", e => {
    if (e.target.value.trim().length > 0) {
        formIsValid.stock = true;
        Producto.stock = parseInt(e.target.value);
    }
});
imagen.addEventListener("change", e => {
    if (e.target.value != null) {
        formIsValid.imagen = true;
        const url = e.target.value;
        const encoded = encodeURI(url);
        Producto.imagen = encoded;
    }
});
categoria_id.addEventListener("change", e => {
    if (e.target.value.trim().length > 0) {
        formIsValid.categoria_id = true;
        categoria_id = parseInt(e.target.value);
        Producto.categoria_id = categoria_id;
    }
});

const validateForm = () => {
    const formValues = Object.values(formIsValid);
    const valid = formValues.findIndex(value => value == false);
    if (valid == -1) {
        form.submit();
        fetch("http://localhost:9000/producto/add", {
                method: "POST",
                body: JSON.stringify(Producto),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(res => res.json())
            .catch(error => console.error("Error:", error))
            .then(response => console.log("Success:", response.data))
            .then(data => console.log(data));
        alert("Producto añadido");
    } else alert("Form invalid");
};