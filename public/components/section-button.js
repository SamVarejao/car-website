import {
  LitElement,
  css,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

import { goPage } from "./commons.js";

export class SectionButton extends LitElement {
  static properties = {
    page: {},
    label: {},
    class: { type: String },
  };

  constructor() {
    super();
    this.page = "";
    this.label = "";
  }

  static styles = css`
    p {
      color: white;
      font-weight: bold;
    }
    .holder {
      width: 100%;
      position: relative;
      margin-bottom: 30px;
      cursor: pointer;
    }
    .holder:hover img{
      filter: saturate(0);
      transform: scale(1.1, 1.1);
    }
    .image-holder {
      width: 100%;
      position: relative;
      padding-top: 62.5%; /* Aspect Ratio */
    }
    .image-holder > div {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      filter: saturate(1);
      transition: all 0.5s;
      transition-property: filter, transform;
    }
    .label-container {
      height: 50px;
      width: 100%;
      position: absolute;
      bottom: 9px;
      right: 2px;
    }
    .label {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      padding: 0 20px;
      transform: skew(var(--angle));
      background-color: black;
    }
    .label > p {
      transform: skew(var(--angle-offset));
    }
    .icon-holder{
      background-color: var(--main-red);
      transform: skew(var(--angle));
      height: 40px;
      width: 45px;
      margin-right: 0;
      margin-left: auto;
      display: flex;
    }
  `;

  render() {
    return html`
      <div class="holder">
        <div class="image-holder" @click=${() => goPage(this.page)}>
          <div>
            <img src="./../style/assets/btn-${this.page}.jpg" />
          </div>
        </div>
        <div class="label-container">
          <div class="icon-holder">
            <slot name="icon"></slot>
          </div>
          <div class="label">
            <p>${this.label}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("section-button", SectionButton);
