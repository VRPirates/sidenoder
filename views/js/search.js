const { FindInPage } = require('electron-find');
let search = false;

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.code == 'KeyF') openSearch();

/*  if (!search) return;
  if (e.code != 'F3') return;
  if (!e.shiftKey) return search.findNext(true);
  if (e.shiftKey) return search.findNext();*/
});

window.addEventListener('resize', () => {
  const navPanel = id('nav-panel');
  if (!navPanel) {
    if (!search) return;
    search.destroy();
    search = null;
    return;
  }

  navPanel.style.top = $id('topbar').height() + 'px'; // fix navbar position

  if (!search) return;
  $('.find-box')[0].style.top = calcSearchTop() + 'px';
});

function calcSearchTop() {
  return $id('topbar').height() + 52;
}

function openSearch() {
  if (search) {
    // search.update();
    // search.openFindWindow();
    // return;
    search.destroy();
    search = null;
  }

  search = new FindInPage(remote.getCurrentWebContents(), {
    // parentElement,
    duration: 1,
    offsetTop: calcSearchTop(),
    offsetRight: 20,
    boxBgColor: '#272b30',
    boxShadowColor: '#000',
    inputColor: '#aaa',
    inputBgColor: '#222',
    inputFocusColor: '#555',
    textColor: '#aaa',
    textHoverBgColor: '#555',
    caseSelectedColor: '#555',
  });

  search.openFindWindow();
}

function sortBy(key, asc) {
  return ((a, b) => {
    var valA = $(a).data(key);
    var valB = $(b).data(key);
    if (valA < valB) {
      return asc ? -1 : 1;
    }

    if (valA > valB) {
      return asc ? 1 : -1;
    }

    return 0;
  });
}


//sort
function sortItems(key, asc) {
  sortElements($id('browseCardBody'), key, asc);
  sortElements($id('listTable'), key, asc);
  $id('searchdropdownmenu').hide();
}

function sortElements(el, key, asc) {
  el.html(el.find('.listitem').sort(sortBy(key, asc)));
}