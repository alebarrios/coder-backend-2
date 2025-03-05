
const form = document.getElementById("btn-delete-product");
form?.addEventListener("submit", async (event) => {
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