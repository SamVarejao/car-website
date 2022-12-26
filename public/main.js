import { TopMenu } from "./components/top-menu.js";
import {SideMenu} from "./components/side-menu.js"

window.onload = () => {
  document.querySelector("#topMenu").updateComplete.then(() => {
    document.querySelector("#topMenu").goPage();
  });
};
