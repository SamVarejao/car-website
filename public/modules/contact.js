let bound;

export function binder() {
  let elements = [
    ...document.querySelectorAll("form input[type=text]"),
    ...document.querySelectorAll("form input[type=number]"),
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
      console.log(data);
    })
    .catch((err) => console.log(err));
}
function validate() {
  let elements = [
    ...document.querySelectorAll("form input[type=text]"),
    ...document.querySelectorAll("form input[type=number]"),
    ...document.querySelectorAll("form textarea"),
  ];
  elements.forEach((element) => {
    console.log(element.type);
    const value = element.value.replace(/\s/g,'');
    if (value === "") {
      return 'Todos os campos devem ser preenchidos.'
    }
  });
}
