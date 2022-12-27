import {
  LitElement,
  css,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export class SideMenu extends LitElement {
  static styles = css`
    .side-menu {
      height: 100%;
      width: 0px;
      background-color: var(--main-gray);
      margin-top: var(--top-menu-height);
      overflow: hidden;
      transition: all 0.25s ease-out 0.1s;
      position: relative;
    }
    .side-menu > div {
      height: 100%;
      width: 250px;
      display: flex;
    }
    .button-container {
      width: 100%;
      margin: auto;
      padding-bottom: var(--top-menu-height);
    }
    .button {
      position: relative;
      font-family: "Catamaran", sans-serif;
      text-align: center;
      font-size: 16px;
      letter-spacing: 0;
      font-weight: bold;
      color: #fff;
      margin-bottom: 20px;
      cursor: pointer;
    }
    .button:before {
      content: "";
      position: absolute;
      top: 25px;
      height: 1.5px;
      width: 0%;
      left: 50%;
      background: var(--main-red);
      transition: all 0.3s ease;
    }
    .button:hover:before {
      width: 60%;
      left: 20%;
    }
    .open {
      width: 250px;
    }
  `;

  constructor() {
    super();
    this.open = false;
  }

  goPage(page) {
    const self = this;
    let route = page ? page : "home";

    fetch(`/${route}`)
      .then(function (res) {
        return res.text();
      })
      .then(function (res) {
        self.appendContent(res);
      })
      .catch(function (err) {
        console.warn("Something went wrong.", err);
      });
  }

  appendContent(html) {
    try {
      document.querySelector("#content").remove();
    } catch (err) {}

    const container = document.querySelector("#content-container");
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    let content = doc.querySelector("#content");

    container.appendChild(content);
  }

  toggle() {
    this.open = !this.open;
    this.requestUpdate();

    const element = this.shadowRoot.querySelector(".side-menu");
    if (this.open) {
      element.classList.add("open");
      return false
    }
    element.classList.remove("open");
  }

  getState(){
    return this.open;
  }

  render() {
    return html`
      <div class="side-menu">
        <div>
          <div class="button-container">
            <div @click=${() => this.goPage("import")} class="button">
              Importação
            </div>
            <div @click=${() => this.goPage("restoration")} class="button">
              Restauração
            </div>
            <div @click=${() => this.goPage("maintenance")} class="button">
              Manutenção
            </div>
            <div @click=${() => this.goPage("achievement")} class="button">
              Conquistas
            </div>
            <div @click=${() => this.goPage("advertisement")} class="button">
              Stock
            </div>
            <div @click=${() => this.goPage("contact")} class="button">
              Contacto
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("side-menu", SideMenu);
