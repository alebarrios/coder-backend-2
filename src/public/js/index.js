const productsList = document.getElementById("products-list");
const btnRefreshProductsList = document.getElementById("btn-refresh-products-list");

const loadProductsList = async () => {
    const response = await fetch("/api/products", { method: "GET" });
    const data = await response.json();
    const products = data.payload.docs;

    productsList.innerHTML = `
    <tr>
        <th>Id</th>
        <th>Título</th>
        <th>Descripción</th>
        <th>Código</th>
        <th>Precio</th>
        <th>Estado</th>
        <th>Stock</th>
        <th>Categoría</th>
    </tr>`;

    products.forEach((product) => {
        productsList.innerHTML += `
        <tr>
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.code}</td>
        <td>${product.price}</td>
        <td>${product.status}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        </tr>`;
    });
};

const forms = document.querySelectorAll("form.btn-delete-product");
console.log("form: ", forms);

forms.forEach(form => {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("action: ", form.action);

        await fetch(form.action, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                // Redirección al cliente
                window.location.href = "/products"; // Cambia la URL a la nueva ruta
            } else {
                console.error("Error en la solicitud:", response.statusText);
            }
        })
        .catch(error => {
            console.error("Hubo un error:", error);
        });
    });
});