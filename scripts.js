const tablaProductos = document.getElementById("cuerpoTabla");
let textoBusqueda = document.getElementById("textoBusqueda");
textoBusqueda.value = "";
let filaProducto = "";

/* */

/* */

let cargarDatos = () => {
    fetch("http://localhost:9000/producto/all?size=33")
        .then(res => (res.ok ? Promise.resolve(res) : Promise.reject(res)))
        .then(res => res.json())
        .then(res => {
            res.content.forEach(element => {
                if (!document.getElementById(`${element.producto_id}`))
                    filaProducto += `<tr id=${element.producto_id}><td>${element.producto_id} </td> <td>${element.nombre}</td> <td>${element.descripcion}</td> <td>${element.stock}</td><td><img src='${element.imagen}'/></td> <td>${element.nombreCategoria}</td> <td>${element.precio}</td> </tr>`;
            });
            tablaProductos.innerHTML += filaProducto;

            /* */

            /* */
        });
};

textoBusqueda.addEventListener("keyup", () => {
    if (textoBusqueda.value.length >= 3) {
        fetch(`http://localhost:9000/producto/?nombre=${textoBusqueda.value}`, {
                method: "get"
            })
            .then(res => (res.ok ? Promise.resolve(res) : Promise.reject(res)))
            .then(res => res.json())
            .then(res => {
                filaProducto = "";
                res.content.forEach(element => {
                    if (!document.getElementById(`${element.producto_id}`))
                        filaProducto += `<tr id=${element.producto_id}><td>${element.producto_id} </td> <td>${element.nombre}</td> <td>${element.descripcion}</td> <td>${element.stock}</td><td><img src='./resources/images/vector-medicines-icon.jpg'/></td> <td>${element.nombreCategoria}</td> <td>${element.precio}</td> </tr>`;
                });
                tablaProductos.innerHTML += filaProducto;
            });
    } else {
        tablaProductos.innerHTML = "";
    }
});
document.getElementById("textoBusqueda").addEventListener("focusout", () => {
    if (document.getElementById("textoBusqueda").value === "") {
        tablaProductos.innerHTML = "";
        cargarDatos();
    }
});

window.onload = cargarDatos();