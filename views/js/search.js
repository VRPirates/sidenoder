/*eslint no-unused-vars: ["error", {
  "varsIgnorePattern": "toggleSearch|sortItems"
}]*/

/**
 * A class that manages a search functionality with keyboard events.
 *
 * Usage:
 *   const findDialog = new FindDialog((text) => {
 *     console.log("text", text`)
 *   });
 */
class FindDialog {
  _handler = null;
  _onKeydown = null;
  _onResize = null;
  static instance = null;

  /**
   * Create a new FindDialog instance.
   *
   * @param {Function} handler A callback that will be called with the search text.
   */
  constructor(handler) {
    this._handler = handler;

    if (!FindDialog.exists) {
      this.#createDom();
      this.#addListeners();
      FindDialog.instance = this;
    }
  }

  /**
   * Toggle the visibility of the search box.
   *
   * @param {boolean} [display] Use true to show the element or false to hide it.
   *
   * @return {this} The instance of FindDialog.
   */
  toggle(display) {
    if (typeof display !== "undefined") {
      $(".find-box").toggle(display);
    } else {
      $(".find-box").toggle();
    }
    this.clear();

    if (FindDialog.isVisible) {
      this.dom.style.top = this.calcSearchTop;
      this.focus();
    }

    return this;
  }

  /**
   * Clear the search box and focus it.
   *
   * @return {this} The instance of FindDialog.
   */
  clear() {
    $(".find-input").val("").trigger("input").trigger("focus");
    return this;
  }

  /**
   * Focus the search box.
   *
   * @return {this} The instance of FindDialog.
   */
  focus() {
    $(".find-input").trigger("focus");
    return this;
  }

  /**
   * Get search box visibility
   *
   * @static
   * @readonly
   * @type {boolean} Is visible
   */
  static get isVisible() {
    const $findBox = $(".find-box");
    return $findBox.length > 0 && $findBox.css("display") !== "none";
  }
  /**
   * Get search box visibility
   *
   * @static
   * @readonly
   * @type {boolean} Exists
   */
  static get exists() {
    return $(".find-box").length > 0;
  }

  /**
   * Get search box DOM Node
   *
   * @readonly
   * @type {HTMLElement | null} Search box DOM node
   */
  get dom() {
    return $(".find-box")[0] ?? null;
  }

  /**
   * Calculates the top position of the search box, taking the height of the
   * top bar into account.
   *
   * @readonly
   * @type {string} Top position of the search box
   */
  get calcSearchTop() {
    const topBarHeight = $("#topbar").height();
    return `${topBarHeight + 52}px`;
  }

  /**
   * Destroys the FindDialog instance, removing all the event listeners.
   * This method is useful when you want to remove the search box from the
   * page.
   */
  destroy() {
    document.removeEventListener("keydown", this._onKeydown);
    document.removeEventListener("keydown", this._onResize);
    this._onResize = null;
    this._handler = null;
    FindDialog.instance = null;
  }

  /**
   * Adds the event listeners for the search box.
   *
   * Listens to the following events:
   * - keydown: toggles the search box visibility on Ctrl + F (or Cmd + F on Mac)
   *   and Escape.
   * - resize: updates the top position of the search box when the window
   *   is resized.
   * - newTemplate: clears the search box and hides it when the template is
   *   changed.
   */
  #addListeners() {
    if (!this._onResize) {
      this._onResize = () => {
        const navPanel = document.querySelector("#nav-panel");

        if (!navPanel) {
          if (!FindDialog.exists) {
            return;
          }

          this.destroy();
          return;
        }

        if (FindDialog.exists) {
          this.dom.style.top = this.calcSearchTop;
        }
      };

      this._onNewTemplate = () => {
        if (!FindDialog.exists) {
          return;
        }

        this.clear();
        this.toggle(false);
      };

      window.addEventListener("resize", this._onResize);
      $(document).on("newTemplate", this._onNewTemplate);
    }
  }

  /**
   * Get search box visibility
   * Create the search box DOM and append it to the body.
   * Return the created element.
   *
   * @return {JQuery<HTMLElement>} The created element
   */
  #createDom() {
    const $findBox = $("<div>", {
      class: "find-box",
    });

    const $findHandle = $("<i>", {
      class: "find-handle fa-solid fa-grip-vertical",
    });

    const $findInput = $("<input>", {
      class: "find-input",
      placeholder: "Search…",
    }).on(
      "input",
      this.#debounce(() => {
        const text = $findInput.val();
        this._handler(text);
      }),
    );

    const $findDelete = $("<i>", {
      class: "find-delete fa-solid fa-backspace",
    }).on("click", () => {
      this.clear();
    });

    const $findClose = $("<div>", {
      class: "find-close",
    }).on("click", () => {
      this.toggle();
    });

    const $closeBrtl = $("<div>", {
      class: "find-close-brtl",
    });
    const $closeBltr = $("<div>", {
      class: "find-close-bltr",
    });

    $findBox.append($findHandle, $findInput, $findDelete, $findClose);
    $findClose.append($closeBrtl, $closeBltr);

    $findBox.draggable({
      $findHandle,
      stop: () => this.focus(),
    });

    $("body").append($findBox);
    this.focus();

    return $findBox;
  }

  /**
   * Debounces a function, so that it will only be called after a given amount of time
   * has passed since the last call.
   *
   * @param {Function} fn The function to debounce.
   * @param {number} [delay=300] The amount of time (in milliseconds) that the function
   * should be debounced.
   * @returns {Function} A debounced version of the function.
   */
  #debounce(fn, delay = 300) {
    let timeoutId = null;

    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
}

/**
 * Opens the search dialog. If the dialog is already open, it will be toggled closed.
 * Otherwise, a new FindDialog will be created and opened.
 *
 * The FindDialog will search for the given text in the list items under the
 * ".browse-folder", ".card-simple-name", and ".package-name" elements. It will
 * also search for the given text in the installed apps table under the
 * "#intalledTable" element.
 *
 * The text is treated as a case-insensitive string, and the search is done
 * using the includes() method.
 */
function toggleSearch() {
  if (FindDialog.exists) {
    FindDialog.instance.toggle();
  } else {
    new FindDialog((searchText) => {
      searchText = searchText.toLowerCase();

      const items = [...document.querySelectorAll(".listitem")];
      items.map((item) => {
        const text = $(item)
          .find(".browse-folder,.card-simple-name,.package-name")
          .text()
          .toLowerCase();

        if (text.includes(searchText)) {
          item.removeAttribute("hidden");
        } else {
          item.setAttribute("hidden", "");
        }
      });

      const installedItems = [
        ...document.querySelectorAll("#intalledTable tr"),
      ];
      installedItems.map((item) => {
        const packageName = $(item).attr("data-packagename");
        const simpleName = $(item).attr("data-simplename");
        const text = `${packageName} ${simpleName}`.toLowerCase();

        if (text.includes(searchText)) {
          item.removeAttribute("hidden");
        } else {
          item.setAttribute("hidden", "");
        }
      });
    });
  }
}

document.addEventListener("keydown", (event) => {
  const { code, ctrlKey, metaKey } = event;
  const platform = remote.getGlobal("platform");

  // Ignore [Ctrl]+[f] on Mac
  if (ctrlKey && platform === "mac") {
    return;
  }

  // Toggle the search dialog on:
  //   1. [Meta]+[f] on a Mac
  //   2. [Ctrl]+[f] on Windows
  //   3. [Esc] on any platform if the search dialog is visible
  if (
    ((ctrlKey || metaKey) && code === "KeyF") ||
    (code === "Escape" && FindDialog.isVisible)
  ) {
    toggleSearch();
  }
});

/**
 * Sorts two elements by their data-key attribute in ascending or descending order
 * @param {String} key - the data-key attribute to sort by
 * @param {Boolean} asc - whether to sort in ascending or descending order
 * @returns {Function} - a function that takes two elements and returns a sort order
 */
function sortBy(key, asc) {
  return (a, b) => {
    var valA = $(a).data(key);
    var valB = $(b).data(key);
    if (valA < valB) {
      return asc ? -1 : 1;
    }

    if (valA > valB) {
      return asc ? 1 : -1;
    }

    return 0;
  };
}

/**
 * Sorts the browse and list tables by the given key in ascending or descending order
 * @param {String} key - the data-key attribute to sort by
 * @param {Boolean} asc - whether to sort in ascending or descending order
 */
function sortItems(key, asc) {
  sortElements($("#browseCardBody"), key, asc);
  sortElements($("#listTable"), key, asc);
}

/**
 * Sorts the given element by the given key in ascending or descending order
 * @param {JQuery<HTMLElement>} $element - the element to sort
 * @param {string} key - the data-key attribute to sort by
 * @param {boolean} [asc = true] - whether to sort in ascending or descending order
 */
function sortElements($element, key, asc = true) {
  const items = $element.find(".listitem");
  items.sort(sortBy(key, asc));
  $element.html(items);
}
