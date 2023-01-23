export function test() {
  console.log("test");
}
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
  if (isContent) {
    console.log(1);
    try {
      document.querySelector("#content").remove();
    } catch (err) {}
  
    const container = document.querySelector("#contentContainer");
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    let content = doc.querySelector("#content");
  
    container.appendChild(content);
  } else {
    console.log(2);
    const container = document.querySelector("#bottomBar");
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    let content = doc.querySelector("#content > div");
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
/*
function _appendContent(html) {
  try {
    document.querySelector("#content").remove();
  } catch (err) {}

  const container = document.querySelector("#contentContainer");
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, "text/html");
  let content = doc.querySelector("#content");

  container.appendChild(content);
}
*/