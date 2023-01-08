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
        _appendContent(res);
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
}
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
