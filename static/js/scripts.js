document.addEventListener("DOMContentLoaded", function () {
  // Mostrar u ocultar el campo de tipo de tarjeta dependiendo del método de pago
  document
    .getElementById("paymentMethod")
    .addEventListener("change", function () {
      const cardTypeContainer = document.getElementById("cardTypeContainer");
      if (this.value === "tarjeta") {
        cardTypeContainer.style.display = "block";
      } else {
        cardTypeContainer.style.display = "none";
      }
    });

  // Manejar el formulario de suscripción
  document
    .getElementById("subscriptionForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevenir la recarga de la página al enviar el formulario

      // Obtener los valores del formulario
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const paymentOption = document.getElementById("paymentOption").value;
      const paymentMethod = document.getElementById("paymentMethod").value;
      const cardType = document.getElementById("cardType").value;
      const monthlyRate = 95; // Monto mensual
      let totalAmount = 0; // Monto total

      // Calcular el total según la opción de pago seleccionada
      if (paymentOption === "mensual") {
        totalAmount = monthlyRate;
      } else if (paymentOption === "semestral") {
        totalAmount = monthlyRate * 6;
      } else if (paymentOption === "anual") {
        totalAmount = monthlyRate * 12;
      }

      // Enviar los datos al servidor utilizando fetch
      fetch("/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          paymentOption: paymentOption,
          paymentMethod: paymentMethod,
          cardType: cardType,
          totalAmount: totalAmount,
        }),
      })
        .then((response) => response.json()) // Procesar la respuesta del servidor
        .then((data) => {
          if (data.success) {
            // Mostrar mensaje de éxito
            document.getElementById("successMessage").style.display = "block";
            setTimeout(() => {
              document.getElementById("successMessage").style.display = "none";
              // Ocultar el modal de suscripción
              const modal = bootstrap.Modal.getInstance(
                document.getElementById("subscriptionModal")
              );
              modal.hide();
              // Redirigir al inicio después de 5 segundos
              window.location.href = "/";
            }, 5000);
          } else {
            alert("¡Error en la suscripción! Por favor, inténtelo de nuevo.");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          alert("Hubo un error al procesar la suscripción.");
        });

      // Limpiar el formulario y ocultar el campo del tipo de tarjeta
      document.getElementById("subscriptionForm").reset();
      document.getElementById("cardTypeContainer").style.display = "none";
    });
});
