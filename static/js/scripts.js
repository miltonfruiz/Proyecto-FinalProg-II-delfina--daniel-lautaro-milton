document.addEventListener("DOMContentLoaded", function () {
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

  document
    .getElementById("subscriptionForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const paymentOption = document.getElementById("paymentOption").value;
      const paymentMethod = document.getElementById("paymentMethod").value;
      const cardType = document.getElementById("cardType").value;
      const monthlyRate = 95;
      let totalAmount = 0;
      if (paymentOption === "mensual") {
        totalAmount = monthlyRate;
      } else if (paymentOption === "semestral") {
        totalAmount = monthlyRate * 6;
      } else if (paymentOption === "anual") {
        totalAmount = monthlyRate * 12;
      }
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
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            document.getElementById("successMessage").style.display = "block";
            setTimeout(() => {
              document.getElementById("successMessage").style.display = "none";
              const modal = bootstrap.Modal.getInstance(
                document.getElementById("subscriptionModal")
              );
              modal.hide();
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

      document.getElementById("subscriptionForm").reset();
      document.getElementById("cardTypeContainer").style.display = "none";
    });
});
