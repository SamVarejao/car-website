import {
  LitElement,
  css,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import { goPage } from "../modules/commons.js";

export class SideMenu extends LitElement {

  constructor() {
    super();
    this.open = false;
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

  static styles = css`
    .side-menu {
      height: 100%;
      width: 0px;
      background-color: #212121e6;
      margin-top: var(--top-menu-height);
      overflow: hidden;
      transition: all 0.25s ease-out 0.1s;
      position: relative;
      z-index: 1;
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
      font-family: 'Open Sans', sans-serif;
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

  render() {
    return html`
      <div class="side-menu">
        <div>
          <div class="button-container">
            <div @click=${() => goPage("import")} class="button">
              Importação
            </div>
            <div @click=${() => goPage("restoration")} class="button">
              Restauração
            </div>
            <div @click=${() => goPage("maintenance")} class="button">
              Manutenção
            </div>
            <div @click=${() => goPage("achievement")} class="button">
              Conquistas
            </div>
            <div @click=${() => goPage("advertisement")} class="button">
              Stock
            </div>
            <div @click=${() => goPage("contact")} class="button">
              Contacto
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("side-menu", SideMenu);
