"use strict";
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var books = document.querySelectorAll(".real3dflipbook");
    if (books.length > 0) {
      books.forEach(function (bookElement) {
        var o = window["flipbookOptions_" + bookElement.id];
        var o_global = window["flipbookOptions_global"];

        function convertStrings(obj) {
          Object.keys(obj).forEach(function (key) {
            var value = obj[key];
            if (
              value === null ||
              value === undefined ||
              (Array.isArray(value) && value.length == 0)
            )
              delete obj[key];
            else if (typeof value === "object") {
              convertStrings(value);
            } else if (!isNaN(value)) {
              if (obj[key] === "") delete obj[key];
              else obj[key] = Number(value);
            } else if (value === "true") {
              obj[key] = true;
            } else if (value === "false") {
              obj[key] = false;
            }
          });
        }

        convertStrings(o);
        convertStrings(o_global);

        function r3d_stripslashes(str) {
          return (str + "").replace(/\\(.?)/g, function (s, n1) {
            switch (n1) {
              case "\\":
                return "\\";
              case "0":
                return "\u0000";
              case "":
                return "";
              default:
                return n1;
            }
          });
        }

        function decode(obj) {
          Object.keys(obj).forEach(function (key) {
            if (typeof obj[key] === "string")
              obj[key] = r3d_stripslashes(obj[key]);
            else if (typeof obj[key] === "object") obj[key] = decode(obj[key]);
          });
          return obj;
        }

        o = decode(o);
        o_global = decode(o_global);

        
        var a = o.s;
        if (!a) {
          o.logoImg = o.rootFolder + "assets/images/logo_dark.png";
          o.logoUrl = "https://real3dflipbook.com";
          o.logoCSS =
            "position:absolute;width:200px;margin:20px;top:0;right:0;";
          o.logo = true;
        }
        

        if (o.pages) {
          if (!Array.isArray(o.pages)) {
            var pages = [];
            Object.keys(o.pages).forEach(function (key) {
              pages[key] = o.pages[key];
            });
            o.pages = pages;
          }

          o.pages.forEach(function (page) {
            if (page.htmlContent) page.htmlContent = unescape(page.htmlContent);
            if (page.items) {
              page.items.forEach(function (item, itemIndex) {
                if (item.url) item.url = unescape(item.url);
              });
            }
          });
        }

        o = FLIPBOOK.extend(true, {}, o_global, o);

        o.assets = {
          preloader: o.rootFolder + "assets/images/preloader.jpg",
          left: o.rootFolder + "assets/images/left.png",
          overlay: o.rootFolder + "assets/images/overlay.jpg",
          flipMp3: o.rootFolder + "assets/mp3/turnPage.mp3",
          shadowPng: o.rootFolder + "assets/images/shadow.png",
          spinner: o.rootFolder + "assets/images/spinner.gif",
        };

        o.pdfjsworkerSrc =
          o.rootFolder + "js/libs/pdf.worker.min.js?ver=" + o.version;
        o.flipbookSrc = o.rootFolder + "js/flipbook.min.js?ver=" + o.version;
        o.cMapUrl = o.rootFolder + "assets/cmaps/";

        o.social = [];

        if (o.btnDownloadPages && o.btnDownloadPages.url) {
          o.btnDownloadPages.url = o.btnDownloadPages.url.replace(/\\/g, "/");
        }

        if (o.btnDownloadPdf) {
          if (o.btnDownloadPdfUrl)
            o.btnDownloadPdf.url = o.btnDownloadPdfUrl.replace(/\\/g, "/");
          else if (o.btnDownloadPdf && o.btnDownloadPdf.url)
            o.btnDownloadPdf.url = o.btnDownloadPdf.url.replace(/\\/g, "/");
          else if (o.pdfUrl)
            o.btnDownloadPdf.url = o.pdfUrl.replace(/\\/g, "/");
        }

        var bookContainer = bookElement;
        var parentContainer = bookContainer.parentNode;

        var isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ) ||
          (navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2 &&
            /MacIntel/.test(navigator.platform));

        o.mode = isMobile && o.modeMobile ? o.modeMobile : o.mode;

        o.doubleClickZoomDisabled = !o.doubleClickZoom;
        o.pageDragDisabled = !o.pageDrag;

        //options from url parameters
        function getUrlVars() {
          var vars = {};
          var parts = window.location.href.replace(
            /[?&]+([^=&]+)=([^&]*)/gi,
            function (m, key, value) {
              vars[key] = value.split("#")[0];
            }
          );
          return vars;
        }

        var urlParams = getUrlVars();

        Object.keys(urlParams).forEach(function (key) {
          if (key.indexOf("r3d-") !== -1)
            o[key.replace("r3d-", "")] = decodeURIComponent(urlParams[key]);
        });

        o.shareImage = o.shareImage || o.lightboxThumbnailUrl;

        var book;

        switch (o.mode) {
          case "normal":
            bookContainer.className += "-" + bookContainer.id;
            o.lightBox = false;
            bookElement.style.position = "relative";
            bookElement.style.display = "block";
            bookElement.style.width = "100%";

            let width = bookContainer.getBoundingClientRect().width;
            if (width < o.responsiveViewTreshold) {
              bookContainer.style.height = width / 0.65 + "px";
            } else {
              bookContainer.style.height = width / 1.3 + "px";
            }

            book = new FlipBook(bookElement, o);
            break;
          case "lightbox":
            bookElement.style.display = "inline";
            o.lightBox = true;

            bookContainer.className += "-" + bookContainer.id;
            bookElement.setAttribute("style", o.lightboxContainerCSS);

            if (o.hideThumbnail) o.lightboxThumbnailUrl = "";

            o.lightboxText = o.lightboxText || "";

            if (o.showTitle) o.lightboxText += o.name;
            if (o.showDate) o.lightboxText += o.date;

            if (o.lightboxThumbnailUrl) {
              if (location.protocol === "https:")
                o.lightboxThumbnailUrl = o.lightboxThumbnailUrl.replace(
                  "http://",
                  "https://"
                );
              else if (location.protocol === "http:")
                o.lightboxThumbnailUrl = o.lightboxThumbnailUrl.replace(
                  "https://",
                  "http://"
                );

              var thumbWrapper = document.createElement("div");
              thumbWrapper.setAttribute("style", "position: relative;");
              bookElement.appendChild(thumbWrapper);

              var thumb = document.createElement("img");
              thumb.setAttribute("src", o.lightboxThumbnailUrl);
              thumbWrapper.appendChild(thumb);
              thumb.setAttribute("style", o.lightboxThumbnailUrlCSS);

              if (o.thumbAlt) thumb.setAttribute("alt", o.thumbAlt);

              if (o.lightboxThumbnailInfo) {
                var defaultLightboxThumbnailInfoCSS =
                  "position: absolute; display: grid; align-items: center; text-align: center; top: 0;  width: 100%; height: 100%; font-size: 16px; color: #000; background: rgba(255,255,255,.8); ";

                var thumbInfo = document.createElement("span");
                thumbWrapper.appendChild(thumbInfo);
                thumbInfo.setAttribute(
                  "style",
                  defaultLightboxThumbnailInfoCSS + o.lightboxThumbnailInfoCSS
                );
                thumbInfo.textContent = o.lightboxThumbnailInfoText || o.name;
                thumbInfo.style.display = "none";

                thumbWrapper.addEventListener("mouseenter", function () {
                  thumbInfo.style.display = "block";
                });

                thumbWrapper.addEventListener("mouseleave", function () {
                  thumbInfo.style.display = "none";
                });
              }
            }

            if (o.lightboxText && o.lightboxText !== "") {
              var text = document.createElement("span");
              text.textContent = o.lightboxText;
              var style = "text-align:center; padding: 10px 0;";
              style += o.lightboxTextCSS;

              if (o.lightboxTextPosition === "top") {
                bookElement.insertBefore(text, bookElement.firstChild);
              } else {
                bookElement.appendChild(text);
              }
              text.setAttribute("style", style);
            }

            if (!o.lightboxCssClass || o.lightboxCssClass === "") {
              o.lightboxCssClass = bookContainer.className;
            } else {
              bookElement.classList.add(o.lightboxCssClass);
            }

            if (o.lightboxLink) {
              document
                .querySelectorAll("." + o.lightboxCssClass)
                .forEach(function (el) {
                  el.addEventListener("click", function () {
                    var target = o.lightboxLinkNewWindow ? "_blank" : "_self";
                    window.open(o.lightboxLink, target);
                  });
                });
            } else {
              book = new FlipBook(
                document.querySelectorAll("." + o.lightboxCssClass),
                o
              );
            }
            break;

          case "fullscreen":
            o.lightBox = false;
            document.body.appendChild(bookElement);
            bookElement.classList.add("flipbook-browser-fullscreen");
            if (
              !(
                "fullscreenEnabled" in document ||
                "webkitFullscreenEnabled" in document ||
                "mozFullScreenEnabled" in document
              )
            ) {
              o.btnExpand = { enabled: false };
            }

            book = new FlipBook(bookElement, o);
            document.body.style.overflow = "hidden";

            if (o.menuSelector) {
              var menu = document.querySelector(o.menuSelector);
              var height = window.innerHeight - menu.offsetHeight;
              bookElement.style.top = menu.offsetHeight + "px";
              bookElement.style.height = height + "px";

              window.onresize = function () {
                height = window.innerHeight - menu.offsetHeight;
                bookElement.style.top = menu.offsetHeight + "px";
                bookElement.style.height = height + "px";
              };
            }
            break;
        }

        
        if (book && book.on) {
          book.on("r3d-update-note", function (e) {
            sendAjax({ note: e.note }, "r3d_update_note");
          });

          book.on("r3d-delete-note", function (e) {
            sendAjax({ note: e.note }, "r3d_delete_note");
          });

          if (book.options.resumeReading) {
            bookElement.addEventListener("pagechange", function (e) {
              sendAjax({ page: e.page.split("-")[0] }, "r3d_last_page");
            });
          }
        }

        function sendAjax(obj, action) {
          var data = {
            bookId: book.options.bookId,
            action: action,
            nonce: r3d.nonce,
          };
          Object.keys(obj).forEach(function (key) {
            data[key] = obj[key];
          });

          var xhr = new XMLHttpRequest();
          xhr.open("POST", r3d.ajax_url, true);
          xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );

          var params = Object.keys(data)
            .map(function (key) {
              return (
                encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
              );
            })
            .join("&");

          xhr.send(params);
        }
        
      });
    }
  });
})();
