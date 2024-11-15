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
          <td>
            <button id="boton-editar" class="btn btn-warning btn-sm" onclick="editSubscriber(${subscriber.id})"><i class="fa-regular fa-pen-to-square"></i> Editar</button>
            <button id="boton-borrar" class="btn btn-danger btn-sm" onclick="deleteSubscriber(${subscriber.id})"><i class="fa-solid fa-trash"></i> Borrar</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error cargando los suscriptores:", error));
}

function editSubscriber(id) {
  fetch(`/get_subscribers`)
    .then((response) => response.json())
    .then((data) => {
      const subscriber = data.find((sub) => sub.id === id);
      if (subscriber) {
        document.getElementById("editName").value = subscriber.name;
        document.getElementById("editEmail").value = subscriber.email;
        document.getElementById("editPhone").value = subscriber.phone;
        document.getElementById("editPaymentOption").value =
          subscriber.payment_option;
        document.getElementById("editPaymentMethod").value =
          subscriber.payment_method;
        document.getElementById("editCardType").value = subscriber.card_type;
        const cardTypeContainer = document.getElementById("cardTypeContainer");
        if (subscriber.payment_method === "tarjeta") {
          cardTypeContainer.style.display = "block";
        } else {
          cardTypeContainer.style.display = "none";
        }
        const modal = new bootstrap.Modal(
          document.getElementById("editSubscriberModal")
        );
        modal.show();
        document.getElementById("editSubscriberForm").onsubmit = function (
          event
        ) {
          event.preventDefault();

          const updatedSubscriber = {
            name: document.getElementById("editName").value,
            email: document.getElementById("editEmail").value,
            phone: document.getElementById("editPhone").value,
            paymentOption: document.getElementById("editPaymentOption").value,
            paymentMethod: document.getElementById("editPaymentMethod").value,
            cardType: document.getElementById("editCardType").value,
          };

          fetch(`/edit_subscriber/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedSubscriber),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert("Suscriptor actualizado correctamente.");
                updateSubscriberRow(id, updatedSubscriber);
                const modal = bootstrap.Modal.getInstance(
                  document.getElementById("editSubscriberModal")
                );
                modal.hide();
              } else {
                alert("Error al actualizar el suscriptor.");
              }
            })
            .catch((error) => {
              console.error("Error actualizando el suscriptor:", error);
              alert("Hubo un error al actualizar los datos.");
            });
        };
      }
    });
}

function updateSubscriberRow(id, updatedSubscriber) {
  const rows = document.getElementById("subscribersTableBody").rows;
  for (let row of rows) {
    if (row.cells[0].textContent == id) {
      row.cells[1].textContent = updatedSubscriber.name;
      row.cells[2].textContent = updatedSubscriber.email;
      row.cells[3].textContent = updatedSubscriber.phone;
      row.cells[4].textContent = updatedSubscriber.paymentOption;
      row.cells[5].textContent = updatedSubscriber.paymentMethod;
      row.cells[6].textContent = updatedSubscriber.cardType;
      break;
    }
  }
}

function deleteSubscriber(id) {
  if (confirm("¿Estás seguro de que deseas borrar este suscriptor?")) {
    fetch(`/delete_subscriber/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Suscriptor borrado con éxito.");
          loadSubscribers();
        } else {
          alert("Error al borrar el suscriptor.");
        }
      })
      .catch((error) => console.error("Error borrando el suscriptor:", error));
  }
}
