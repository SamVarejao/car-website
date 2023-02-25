export function goPage(page) {
  let route = page ? page : "home";

  fetch(`/${route}`)
    .then(function (res) {
      return res.text();
    })
    .then(function (res) {
      _appendContent(res, true);
    })
    .then(function (res) {
      _getBottomBar();
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
}
function _appendContent(html, isContent) {
  const parser = new DOMParser();

  if (isContent) {
    try {
      document.querySelector("#content").remove();
    } catch (err) {}

    //append content
    const container = document.querySelector("#contentContainer");
    const doc = parser.parseFromString(html, "text/html");
    const content = doc.querySelector("#content");
    container.appendChild(content);

    //append script
    const script = document.querySelector("#content > script");
    if(script){
      const string = script.innerHTML;
      script.remove();
      const newScript = document.createElement("script");
      newScript.type = 'module';
      newScript.innerHTML = string;
      content.appendChild(newScript);
    }

  } else {
    //append bottom bar
    const container = document.querySelector("#bottomBar");
    const doc = parser.parseFromString(html, "text/html");
    const content = doc.querySelector("#content > div");
    container.appendChild(content);
  }
}
function _getBottomBar() {
  fetch(`/bottomBar`)
    .then(function (res) {
      return res.text();
    })
    .then(function (res) {
      _appendContent(res, false);
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
}
