console.log("hola mundo - cartDetail.js");

const form = document.getElementById("btn-empty-cart");
    form.addEventListener("click", async (event) => {
        //event.preventDefault();
        console.log("Formulario de vaciar carrito");

        const cartId = form.action.slice(-24); // me quedo con el id del cart
        console.log("Result: ", cartId);
        const response = await fetch(form.action, {
            method: "DELETE",
        });
        console.log("response: ", response);
    });
