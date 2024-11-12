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
    const birthdate = document.getElementById("birthdate").value;
    const gender = document.getElementById("gender").value;
    const country = document.getElementById("country").value;
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
    document.getElementById("successMessage").style.display = "block";
    if (paymentMethod === "tarjeta") {
      console.log("Tipo de Tarjeta:", cardType);
    }
    document.getElementById("subscriptionForm").reset();
    document.getElementById("cardTypeContainer").style.display = "none";
    setTimeout(() => {
      const modal = new bootstrap.Modal(
        document.getElementById("subscriptionModal")
      );
      modal.hide();
      document.getElementById("successMessage").style.display = "none";
      window.location.href = "index.html";
    }, 5000);
  });
