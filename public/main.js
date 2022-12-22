window.onload = () => {
  goPage('home');
} 

function goPage(page) {
  fetch(`/${page}`)
    .then(function (res) {
      return res.text();
    })
    .then(function (res) {
      appendContent(res);
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
}

function appendContent(html) {
  try {
    document.querySelector("#content").remove();
  } catch (err) {}

  const container = document.querySelector("#content-container");
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, "text/html");
  let content = doc.querySelector("#content");

  container.appendChild(content);
}