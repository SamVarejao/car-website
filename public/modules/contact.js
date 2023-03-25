let bound;

export function binder() {
  let elements = [
    ...document.querySelectorAll("form input[type=text]"),
    ...document.querySelectorAll("form input[type=number]"),
    ...document.querySelectorAll("form input[type=email]"),
    ...document.querySelectorAll("form textarea"),
  ];
  elements.forEach((element) => {
    element.addEventListener("focus", function () {
      animation(element, true);
    });
    element.addEventListener("focusout", function () {
      animation(element, false);
    });
  });

  document
    .querySelector("input[type=button]")
    .addEventListener("click", sendMessage);
}
function animation(element, focus) {
  const name = element.getAttribute("name");
  const label = document.querySelector(`label[for="${name}"]`);

  label.removeEventListener("animationend", bound);

  bound = _labelPosition.bind(null, label, focus);

  label.addEventListener("animationend", bound);

  if (focus) {
    label.style.animation = "labelUpKF 0.09s ease-in 0.07s";
  } else if (element.value.replace(/\s/g, "") === "") {
    label.classList.remove("top-label");
    label.style.animation = "labelDownKF 0.09s ease-out";
  }
}
function _labelPosition(element, focus) {
  element.style.animation = "";
  if (focus) {
    element.classList.add("top-label");
  }
}
function sendMessage() {
  const warning = _validate();

  if (warning) {
    console.trace("An error ocurred");
    return false;
  }

  const elements = document.getElementsByClassName("formItem");

  const data = Array.from(elements).reduce((acc, element) => {
    const { name, value } = element;
    if (name) {
      acc[name] = value;
    }
    return acc;
  }, {});

  fetch("/sendMessage", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then((data) => {
      //console.log(data);
      displayNotification("Mensagem enviada.", 1);
    })
    .catch((err) => {
      //console.log(err)
        displayNotification("Ocorreu um erro, por favor tente novamente mais tarde.");
    });
}
function _validate() {
  let elements = [
    ...document.querySelectorAll("form input[type=text]"),
    ...document.querySelectorAll("form input[type=number]"),
    ...document.querySelectorAll("form input[type=email]"),
    ...document.querySelectorAll("form textarea"),
  ];

  let hasError = false;

  elements.forEach((element) => {
    const type = element.type;
    const value = element.value.replace(/\s/g, "");
    element.parentElement.classList.remove("form-error");

    if (value === "") {
      displayError(element, "*Deve preencher este campo.");
      hasError = true;
    }
    switch (type) {
      case "email":
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(value)) {
          displayError(element, "*Deve inserir um email válido.");
          hasError = true;
        }
        break;
      case "number":
        if (/[^0-9]/.test(value) || value.length !== 9) {
          displayError(element, "*Deve inserir um número de telemóvel válido.");
          hasError = true;
        }
        break;
    }
  });

  return hasError;
}

function displayError(element, message) {
  element.parentElement.dataset.error = message;
  element.parentElement.classList.add("form-error");
}

function displayNotification(message, type) {
  const notification = document.querySelector("#notification");
  if (type === 1) {
    notification.classList.add("success");
  } else {
    notification.classList.add("error");
  }
  document.querySelector("#notification >.text").textContent = message;
  document.querySelector("#contactForm").style.opacity = "0";
  notification.style.display = "flex";

  notification.addEventListener("animationend", function(){
    notification.style.bottom = "calc(100% - 110px)";
  });
  notification.style.animation = "notificationUP 0.3s ease-in";
}
