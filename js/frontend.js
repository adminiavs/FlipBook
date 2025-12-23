"use strict";

window.addEventListener("DOMContentLoaded", function () {
  r3d_frontend.options = flipbookOptions_global;
  const withClass = r3d_frontend.options.convertPDFLinksWithClass;
  const withoutClass = r3d_frontend.options.convertPDFLinksWithoutClass;

  function findIncludedLinks(withClass) {
    if (withClass) {
      return document.querySelectorAll(
        `.${withClass} a[href$=".pdf"], a.${withClass}[href$=".pdf"]`
      );
    } else {
      return document.querySelectorAll('a[href$=".pdf"]');
    }
  }

  function findExcludedLinks(withoutClass) {
    if (withoutClass) {
      return document.querySelectorAll(
        `.${withoutClass} a[href$=".pdf"], a.${withoutClass}[href$=".pdf"]`
      );
    } else {
      return [];
    }
  }

  const includedLinks = findIncludedLinks(withClass);
  const excludedLinks = findExcludedLinks(withoutClass);

  const includedLinksArray = Array.from(includedLinks);
  const excludedLinksSet = new Set(Array.from(excludedLinks));

  const pdfLinks = includedLinksArray.filter(
    (link) => !excludedLinksSet.has(link)
  );

  if (pdfLinks.length > 0) {
    const rootFolder = r3d_frontend.rootFolder;
    const options = r3d_frontend.options;

    function convertStrings(obj) {
      if (typeof obj === "object" && obj !== null) {
        Object.entries(obj).forEach(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            convertStrings(value);
          } else {
            if (!isNaN(value) && value !== "") {
              obj[key] = Number(value);
            } else if (value === "true") {
              obj[key] = true;
            } else if (value === "false") {
              obj[key] = false;
            } else if (value === "") {
              delete obj[key];
            }
          }
        });
      }
    }

    convertStrings(options);

    options.lightBox = true;
    options.assets = {
      preloader: rootFolder + "assets/images/preloader.jpg",
      left: rootFolder + "assets/images/left.png",
      overlay: rootFolder + "assets/images/overlay.jpg",
      flipMp3: rootFolder + "assets/mp3/turnPage.mp3",
      shadowPng: rootFolder + "assets/images/shadow.png",
      spinner: rootFolder + "assets/images/spinner.gif",
    };
    options.pdfjsworkerSrc = rootFolder + "js/libs/pdf.worker.min.js";
    options.flipbookSrc = rootFolder + "js/flipbook.min.js";
    options.cMapUrl = rootFolder + "assets/cmaps/";

    
    var a = options.s,
      b = 0;
    if (!a) {
      options.logoImg = rootFolder + "assets/images/logo_dark.png";
      options.logoUrl = "https://real3dflipbook.com";
      options.logoCSS =
        "position:absolute;width:200px;margin:20px;top:0;right:0;";
      options.logo = true;
      b = 1;
    }
    

    if (window.FLIPBOOK) {
      pdfLinks.forEach((link, index) => createFlipbook(link, index, options));
    } else {
      Promise.all([
        loadScript(
          rootFolder + "js/flipbook.min.js?ver=" + r3d_frontend.version
        ),
        loadCSS(
          rootFolder + "css/flipbook.min.css?ver=" + r3d_frontend.version
        ),
      ])
        .then(() => {
          pdfLinks.forEach((link, index) =>
            createFlipbook(link, index + 1, options)
          );
        })
        .catch((error) => {
          console.error(
            "An error occurred while loading the resources:",
            error
          );
        });
    }
  }

  function getOptionFromClass(element, optionName) {
    while (element) {
      if (element.classList) {
        const matchingClass = Array.from(element.classList).find((cls) =>
          cls.includes("r3d-" + optionName)
        );
        if (matchingClass) {
          return matchingClass.replace("r3d-" + optionName + "-", "");
        }
      }
      element = element.parentElement;
    }
    return false;
  }

  function createFlipbook(link, index, options) {
    options.pdfUrl = link.href;
    const deeplinkingPrefix = getOptionFromClass(link, "deeplinkingPrefix");
    if (deeplinkingPrefix) {
      options.deeplinkingPrefix = deeplinkingPrefix;
    } else if (options.deeplinking && options.deeplinking.enabled) {
      options.deeplinking.prefix = "book" + index + "_";
    }
    new FlipBook(link, options);
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      var prior = document.getElementsByTagName("script")[0];
      script.async = true;
      script.src = src;

      script.onload = script.onreadystatechange = function (_, isAbort) {
        if (
          isAbort ||
          !script.readyState ||
          /loaded|complete/.test(script.readyState)
        ) {
          script.onload = script.onreadystatechange = null;
          script = undefined;

          if (!isAbort) {
            resolve();
          }
        }
      };

      script.onerror = function (error) {
        reject(error);
      };

      prior.parentNode.insertBefore(script, prior);
    });
  }

  function loadCSS(href) {
    return new Promise(function (resolve, reject) {
      var link = document.createElement("link");
      var prior =
        document.getElementsByTagName("link")[0] ||
        document.getElementsByTagName("script")[0];
      link.rel = "stylesheet";
      link.href = href;

      link.onload = () => resolve();
      link.onerror = (error) => reject(error);

      if (prior) {
        prior.parentNode.insertBefore(link, prior);
      } else {
        document.head.appendChild(link);
      }
    });
  }
});
