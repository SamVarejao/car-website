import { TopMenu } from "./components/top-menu.js";
import { SideMenu } from "./components/side-menu.js";
import { SectionButton } from "./components/section-button.js";
import { goPage } from "./components/commons.js";

window.onload = () => {
  goPage("contact");
};

let bound;

function labelAnimation(element, focus) {
  const name = element.getAttribute("name");
  const label = document.querySelector(`label[for="${name}"]`);

  label.removeEventListener("animationend", bound);

  bound = labelPosition.bind(null, label, focus);

  label.addEventListener("animationend", bound);

  if (focus) {
    label.style.animation = "labelUpKF 0.09s ease-in 0.07s";
  } else if (element.value.replace(/\s/g, "") === "") {
    label.classList.remove("top-label");
    label.style.animation = "labelDownKF 0.09s ease-out";
  }
}

function labelPosition(element, focus) {
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

window.labelAnimation = labelAnimation;
window.sendMessage = sendMessage;
