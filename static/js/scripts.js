document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("paymentMethod")
    .addEventListener("change", function () {
      const cardTypeContainer = document.getElementById("cardTypeContainer");
      cardTypeContainer.style.display =
        this.value === "tarjeta" ? "block" : "none";
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          paymentOption,
          paymentMethod,
          cardType,
          totalAmount,
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
  const modalButton = document.querySelector(
    '[data-bs-target="#subscribersModal"]'
  );
  if (modalButton) {
    modalButton.addEventListener("click", loadSubscribers);
  }
});
function loadSubscribers() {
  fetch("/get_subscribers")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("subscribersTableBody");
      tableBody.innerHTML = "";
      data.forEach((subscriber) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${subscriber.id}</td>
          <td>${subscriber.name}</td>
          <td>${subscriber.email}</td>
          <td>${subscriber.phone}</td>
          <td>${subscriber.payment_option}</td>
          <td>${subscriber.payment_method}</td>
          <td>${subscriber.card_type}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error cargando los suscriptores:", error));
}
