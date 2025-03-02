const form = document.getElementById("btn-empty-cart");
form.addEventListener("click", async (event) => { // me quedo con el id del cart
    await fetch(form.action, {
        method: "DELETE",
    });
});
