import { TopMenu } from "./components/top-menu.js";
import { SideMenu } from "./components/side-menu.js";
import { SectionButton } from "./components/section-button.js";
import { goPage } from "./modules/commons.js";
import { cookie } from "./modules/cookies.js";

window.onload = () => {
  /*
  const observer = new MutationObserver(function(mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        console.log("New content added!");
      }
      for (let addedNode of mutation.addedNodes) {
        console.log(addedNode);
      }
      console.log("Elements removed:");
      for (let removedNode of mutation.removedNodes) {
        console.log(removedNode);
      }
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
*/
  //let savedPage = cookie.read("savedPage") === null ? "home" : cookie.read("savedPage");
  //goPage("");
};