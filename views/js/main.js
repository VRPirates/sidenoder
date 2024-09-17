/* eslint
  no-unused-vars: [
    "error", {
      "varsIgnorePattern": "copyInput|backToTop"
    }
  ]
*/
function id(el_id) {
  return document.getElementById(el_id);
}

function $id(el_id) {
  return $(id(el_id));
}

function copyInput(el) {
  el.select();
  document.execCommand("copy");
  alert("Text copied to clipboard");
}

window.addEventListener("scroll", () => {
  // console.log(document.body.scrollTop, document.documentElement.scrollTop);
  const scroll = document.documentElement.scrollTop;
  if (scroll > 100) {
    $id("backToTop").fadeIn();
  } else {
    $id("backToTop").fadeOut();
  }
});

function backToTop() {
  // document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
