import {
  LitElement,
  css,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

export class TopMenu extends LitElement {
  static styles = css`
    .top-menu {
      height: 56px;
      flex-grow: 1;
      min-width: 0;
      background: url("https://i.imgur.com/HkkLoKS.png");
      display: flex;
      margin-top: auto;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .button {
      cursor: pointer;
      flex-grow: 1;
      min-width: 0;
      text-align: center;
      margin: auto 5px;
      font-family: "Catamaran", sans-serif;
      font-size: 16px;
      letter-spacing: 0;
      font-weight: bold;
      color: #fff;
      text-shadow: 2px 2px #000000;
      position: relative;
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
      width: 80%;
      left: 10%;
    }
    .container {
      display: flex;
      width: 100%;
      height: var(--top-menu-height);
      position: absolute;
    }
    .icon {
      height: 330%;
      flex-grow: 1;
      flex-shrink: 1;
      min-width: 0;
      position: relative;
      top: -100%;
      cursor: pointer;
    }
    .hamburger-holder {
      display: none;
      width: 36px;
      height: 36px;
      margin-top: auto;
      margin-bottom: auto;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.8);
      box-shadow: 0 0 7px 9px rgba(0, 0, 0, 0.8);
    }
    .hamburger {
      width: 30px;
      height: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin: 3px;
      cursor: pointer;
    }
    .hamburger-line {
      height: 4px;
      background-color: white;
    }
    @media only screen and (max-width: 1200px) {
      .button {
        display: none;
      }
      .icon {
        max-width: 500px;
        margin: auto;
      }
      .hamburger-holder {
        display: block;
      }
    }
  `;

  constructor() {
    super();
    // Declare reactive properties
    this.name = "World";
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

  toggleSideMenu(){
    document.querySelector('#sideMenu').toggle();
  }

  render() {
    return html`
      <div class="container">
        <header class="top-menu">
          <div class="hamburger-holder">
            <div class="hamburger" @click=${this.toggleSideMenu}>
              <div class="hamburger-line"></div>
              <div class="hamburger-line"></div>
              <div class="hamburger-line"></div>
            </div>
          </div>
          <div @click=${() => this.goPage("import")} class="button">
            Importação
          </div>
          <div @click=${() => this.goPage("restoration")} class="button">
            Restauração
          </div>
          <div @click=${() => this.goPage("maintenance")} class="button">
            Manutenção
          </div>
          <img
            @click=${() => this.goPage("home")}
            class="icon"
            src="./../style/assets/logo-03-motors-v8.png"
          />
          <div @click=${() => this.goPage("achievement")} class="button">
            Conquistas
          </div>
          <div @click=${() => this.goPage("advertisement")} class="button">
            Stock
          </div>
          <div @click=${() => this.goPage("contact")} class="button">
            Contacto
          </div>
        </header>
      </div>
    `;
  }
}

customElements.define("top-menu", TopMenu);
