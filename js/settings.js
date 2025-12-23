"use strict";
(function ($) {
  $(document).ready(function () {
    $("#real3dflipbook-admin").show();

    $(".creating-page").hide();

    
    $(".r3d-pro").removeClass("r3d-pro");
    $(".r3d-pro-content").removeClass("r3d-pro-content");
    

    postboxes.save_state = function () {
      return;
    };
    postboxes.save_order = function () {
      return;
    };

    if (postboxes.handle_click && !postboxes.handle_click.guid)
      postboxes.add_postbox_toggles();

    //removeIf(!lite)
    function convertStrings(obj) {
      jQuery.each(obj, function (key, value) {
        if (typeof value == "object" || typeof value == "array") {
          convertStrings(value);
        } else if (!isNaN(value)) {
          if (obj[key] == "") delete obj[key];
          else if (key != "security") obj[key] = Number(value);
        } else if (value == "true") {
          obj[key] = true;
        } else if (value == "false") {
          obj[key] = false;
        }
      });
    }
    //endRemoveIf(!lite)
    var convertStrings = convertStrings || c.s;
    convertStrings(options);

    const allOptions = {
      
      general: [
        [
          "mode",
          "dropdown",
          "Mode",
          "<strong>normal</strong> - embedded in a container div<br/><strong>lightbox</strong> - opens in fullscreen overlay on click<br/><strong>fullscreen</strong> - covers entire page",
          ["normal", "lightbox", "fullscreen"],
        ],
        [
          "viewMode",
          "dropdown",
          "View mode",
          "<strong>webgl</strong> - realistic 3D page flip with lights and shadows<br/><strong>3d</strong> - CSS 3D flip<br/><strong>swipe</strong> - horizontal swipe<br/><strong>simple</strong> - no animation",
          ["webgl", "3d", "2d", "swipe", "scroll", "simple"],
        ],
        [
          "containerRatio",
          "text",
          "Container aspect ratio",
          "Width / height ratio of flipbook container",
        ],
        [
          "zoomMin",
          "text",
          "Initial zoom",
          "initial book zoom, recommended between 0.8 and 1",
        ],
        ["zoomStep", "text", "Zoom step", "between 1.1 and 4"],
        [
          "zoomSize",
          "text",
          "Zoom size",
          "Override maximum zoom, for example 4000 will zoom the page until page height on screen is 4000px)",
        ],
        [
          "zoomReset",
          "checkbox",
          "Reset Zoom",
          "Reset zoom after page flip, window resize, exit from fullscreen or toggle toc, thumbs, bookmarks, search",
        ],
        ["doubleClickZoom", "checkbox", "Double click zoom"],
        ["pageDrag", "checkbox", "Turn pages with click and drag"],
        [
          "singlePageMode",
          "checkbox",
          "Single page view",
          "display one page at a time",
        ],
        [
          "pageFlipDuration",
          "text",
          "Flip duration",
          "duration of flip animation, recommended between 0.5 and 2",
        ],
        ["sound", "checkbox", "Page flip sound"],
        ["backgroundMusic", "selectFile", "Background music .mp3"],
        [
          "startPage",
          "text",
          "Start page",
          "open flipbook at this page at start",
        ],
        [
          "deeplinking[enabled]",
          "checkbox",
          "Deep linking",
          "enable to use URL hash to link to specific page, for example #2 will open page 2",
        ],
        [
          "deeplinking[prefix]",
          "text",
          "Deep linking prefix",
          'custom deep linking prefix, for example "book1_", link to page 2 will have URL hash #book1_2',
        ],
        [
          "responsiveView",
          "checkbox",
          "Responsive view",
          "switching from two page layout to one page layout if flipbook width is below certain treshold",
        ],
        [
          "responsiveViewTreshold",
          "text",
          "Responsive view treshold",
          "Treshold (container width in px) under which responsive view is activated",
        ],
        [
          "responsiveViewRatio",
          "text",
          "Responsive view ratio",
          "Aspect ratio (container width / height) under which responsive view is activated",
        ],
        [
          "pageTextureSize",
          "text",
          "PDF page size (full)",
          "height of rendered PDF pages in px",
        ],
        [
          "pageTextureSizeSmall",
          "text",
          "PDF page size (small)",
          "height of rendered PDF pages in px",
        ],
        [
          "minPixelRatio",
          "text",
          "Minimum Pixel ratio",
          "Override device pixel ratio to force higher quality for WebGL.",
        ],
        [
          "pdfTextLayer",
          "checkbox",
          "PDF text layer",
          "Enable for text selection tool and text search, disable for faster page loading",
        ],
        [
          "pdfAutoLinks",
          "checkbox",
          "PDF auto links",
          "Automatically convert PDF text to links",
        ],
        [
          "disableRange",
          "checkbox",
          "Disable PDF Range requests",
          "Disable partial PDF download",
        ],
        ["linkColor", "color", "Page links color", ""],
        ["linkColorHover", "color", "Page links hover color", ""],
        ["linkOpacity", "text", "Page links opacity", ""],
        [
          "linkTarget",
          "dropdown",
          "Page links target",
          "Open PDF links in new window, same window or lightbox",
          [
            { display: "New Window", value: "_blank" },
            { display: "Same Window", value: "_self" },
            { display: "Spotlight (Lightbox)", value: "spotlight" },
          ],
        ],
        [
          "cover",
          "checkbox",
          "Front cover",
          "Disable cover for viewing only inner pages (1-2, 3-4, ...) ",
        ],
        ["backCover", "checkbox", "Back cover"],
        [
          "scaleCover",
          "checkbox",
          "Scale cover",
          "Force cover and spreads when all pages are the same size",
        ],

        ["pageCaptions", "checkbox", "Page Captions", "Show page captions"],

        [
          "searchResultsThumbs",
          "checkbox",
          "Show search results as thumbnails",
        ],
        ["thumbnailsOnStart", "checkbox", "Show Thumbnails on start"],
        ["contentOnStart", "checkbox", "Show Table of Contents on start"],
        [
          "tableOfContentCloseOnClick",
          "checkbox",
          "Close Table of Contents when page is clicked",
        ],
        [
          "thumbsCloseOnClick",
          "checkbox",
          "Close Thumbnails when page is clicked",
        ],
        ["autoplayOnStart", "checkbox", "Autoplay on start"],
        ["autoplayLoop", "checkbox", "Autoplay loop"],
        ["autoplayInterval", "text", "Autoplay interval (ms)"],
        [
          "rightToLeft",
          "checkbox",
          "Right to left mode",
          "flipping from right to left",
        ],
        [
          "thumbSize",
          "text",
          "Thumbnail size",
          "thumbnail height for thumbnails view",
        ],
        [
          "logoImg",
          "selectImage",
          "Logo image",
          "logo image that will be displayed inside the flipbook container",
        ],
        [
          "logoUrl",
          "text",
          "Logo link",
          "URL that will be opened on logo click",
        ],
        [
          "logoUrlTarget",
          "dropdown",
          "Logo link target",
          "Open in new window",
          ["_blank", "_self"],
        ],
        ["logoCSS", "textarea", "Logo CSS", "custom CSS for logo"],
        [
          "menuSelector",
          "text",
          "Menu CSS selector",
          'example "#menu" or ".navbar". Used with mode "fullscreen" so the flipbook will be resized correctly below the menu',
        ],
        [
          "zIndex",
          "text",
          "Container z-index",
          "set z-index of flipbook container",
        ],
        [
          "preloaderText",
          "text",
          "Preloader text",
          "text that will be displayed under the preloader spinner",
        ],
        [
          "googleAnalyticsTrackingCode",
          "text",
          "Google analytics tracking code",
        ],
        [
          "pdfBrowserViewerIfIE",
          "checkbox",
          "Download PDF instead of displaying flipbook if browser is Internet Explorer",
          "for PDF flipbook",
        ],
        [
          "arrowsAlwaysEnabledForNavigation",
          "checkbox",
          "Force keyboard arrows for navigation",
          "Enable keyboard arrows for navigation even if not fullscreen",
        ],
        [
          "arrowsDisabledNotFullscreen",
          "checkbox",
          "Disable arrows for navigation if not fullscreen",
          "Disable arrows for navigation if not fullscreen",
        ],
        [
          "touchSwipeEnabled",
          "checkbox",
          "Touch swipe to turn page",
          "Turn pages with touch & swipe or click & drag",
        ],
        [
          "fitToWidth",
          "checkbox",
          "Fit to width",
          "Fit flipbook to width (for scroll view mode)",
        ],
        [
          "rightClickEnabled",
          "checkbox",
          "Right click context menu",
          "Disable to prevent right click image download",
        ],
        [
          "access",
          "dropdown",
          "Access",
          "Direct access to flipbook (flipbook permalink)",
          ["full", "woo_subscription", "none"],
        ],
      ],
      mobile: [
        [
          "modeMobile",
          "dropdown",
          "Mode",
          "Override default mode for mobile",
          ["", "normal", "lightbox", "fullscreen"],
        ],
        [
          "viewModeMobile",
          "dropdown",
          "View mode",
          "Override default view mode for mobile",
          ["", "webgl", "3d", "2d", "swipe", "scroll", "simple"],
        ],
        [
          "mobile[containerRatio]",
          "text",
          "Container aspect ratio",
          "Width / height ratio of flipbook container",
        ],
        [
          "pageTextureSizeMobile",
          "text",
          "PDF page size (full)",
          "height of rendered PDF pages in px",
        ],
        [
          "pageTextureSizeMobileSmall",
          "text",
          "PDF page size (small)",
          "height of rendered PDF pages in px",
        ],
        [
          "mobile[pagesInMemory]",
          "text",
          "Pages in memory (webgl mode)",
          "Number of pages that will be kept in memory (webgl mode)",
        ],

        [
          "mobile[bitmapResizeHeight]",
          "text",
          "Bitmap resize height",
          "Resize image to this height before rendering (webgl mode)",
        ],
        [
          "mobile[bitmapResizeQuality]",
          "dropdown",
          "Bitmap resize quality",
          "Bitmap resize quality (webgl mode)",
          ["", "low", "medium", "heigh"],
        ],

        [
          "singlePageModeIfMobile",
          "checkbox",
          "Single page view",
          "display one page at a time",
        ],
        [
          "mobile[contentOnStart]",
          "checkbox",
          "Show Table of Contents on start",
        ],
        ["mobile[thumbnailsOnStart]", "checkbox", "Show Thumbnails on start"],
        ["logoHideOnMobile", "checkbox", "Hide logo"],
        ["mobile[currentPage][enabled]", "checkbox", "Current Page"],
      ],
      lightbox: [
        ["lightboxBackground", "color", "Overlay background", "CSS value"],
        [
          "lightboxBackgroundPattern",
          "selectImage",
          "Overlay background pattern",
          "Lightbox background image (repeated)",
        ],
        [
          "lightboxBackgroundImage",
          "selectImage",
          "Overlay background image",
          "Lightbox background image",
        ],
        ["lightboxContainerCSS", "textarea", "Thumbnail container CSS"],
        [
          "lightboxThumbnailHeight",
          "text",
          "Thumbnail height",
          "height of thumbnail that will be generated from PDF",
        ],
        ["lightboxThumbnailUrlCSS", "textarea", "Thumbnail CSS", "custom CSS"],
        [
          "lightboxThumbnailInfo",
          "checkbox",
          "Thumbnail info",
          "book info displayed over thumbnail",
        ],
        [
          "lightboxThumbnailInfoText",
          "text",
          "Thumbnail info text",
          "if not set book name will be used",
        ],
        [
          "lightboxThumbnailInfoCSS",
          "textarea",
          "Thumbnail info CSS",
          "custom CSS",
        ],
        [
          "lightboxText",
          "text",
          "Text link",
          "Text that will be displayed in place of shortcode",
        ],
        ["lightboxTextCSS", "textarea", "Text link CSS", "custom CSS"],
        [
          "lightboxTextPosition",
          "dropdown",
          "Text link position",
          "Text link above or below the thumbnail",
          ["top", "bottom"],
        ],
        [
          "lightBoxOpened",
          "checkbox",
          "Opened on start",
          "lightbox will open automatically on page load",
        ],
        [
          "lightBoxFullscreen",
          "checkbox",
          "Openes in fullscreen",
          "opening the lightbox will put lightbox element to real fullscreen",
        ],
        [
          "lightboxStartPage",
          "text",
          "Lightbox start page",
          "Open lightbox always as specific page, for example 1",
        ],
        ["showTitle", "checkbox", "Show title"],
        ["showDate", "checkbox", "Show date"],
        ["hideThumbnail", "checkbox", "Hide thumbnail"],
        [
          "lightboxMarginV",
          "text",
          "Vertical margin",
          "lightbox overlay vertical margin",
        ],
        [
          "lightboxMarginH",
          "text",
          "Horizontal margin",
          "lightbox overlay horizontal margin",
        ],
        ["lightboxLinkNewWindow", "checkbox", "Link opens in new window"],
      ],
      webgl: [
        [
          "pagesInMemory",
          "text",
          "Pages in memory",
          "Number of pages that will be kept in memory",
        ],
        [
          "lights",
          "checkbox",
          "Lights",
          "realistic lightning, disable for faster performance",
        ],
        ["lightPositionX", "text", "Light pposition x", "between -500 and 500"],
        ["lightPositionY", "text", "Light position y", "between -500 and 500"],
        ["lightPositionZ", "text", "Light position z", "between 1000 and 2000"],
        ["lightIntensity", "text", "Light intensity", "between 0 and 1"],
        [
          "shadows",
          "checkbox",
          "Shadows",
          "realistic page shadows, disable for faster performance",
        ],
        ["shadowOpacity", "text", "Shadow opacity", "between 0 and 1"],
        ["pageHardness", "text", "Page hardness", "between 1 and 5"],
        ["coverHardness", "text", "Cover hardness", "between 1 and 5"],
        ["pageRoughness", "text", "Page material roughness", "between 0 and 1"],
        ["pageMetalness", "text", "Page material metalness", "between 0 and 1"],
        ["pageSegmentsW", "text", "Page segments W", "between 3 and 20"],
        [
          "pageMiddleShadowSize",
          "text",
          "Page middle shadow size",
          "shadow in the middle of the book",
        ],
        ["pageMiddleShadowColorL", "color", "left page middle shadow color"],
        ["pageMiddleShadowColorR", "color", "right page middle shadow color"],
        [
          "antialias",
          "checkbox",
          "Antialiasing",
          "disable for faster performance",
        ],
        ["pan", "text", "Camera pan angle", "between -10 and 10"],
        ["tilt", "text", "Camera tilt angle", "between -30 and 0"],
        ["rotateCameraOnMouseDrag", "checkbox", "rotate camera on mouse drag"],
        ["panMax", "text", "Camera pan max angle", "between 0 and 20"],
        ["panMin", "text", "Camera pan min angle", "between -20 and 0"],
        ["tiltMax", "text", "Camera tilt max angle", "between -60 and 0"],
        ["tiltMin", "text", "Camera tilt min angle", "between -60 and 0"],
        [
          "cornerCurl",
          "checkbox",
          "Corner curl",
          "Corner curl animation on cover page",
        ],
        [
          "bitmapResizeHeight",
          "text",
          "Bitmap resize height",
          "Resize image to this height before rendering (webgl mode)",
        ],
        [
          "bitmapResizeQuality",
          "dropdown",
          "Bitmap resize quality",
          "Bitmap resize quality (webgl mode)",
          ["", "low", "medium", "heigh"],
        ],
      ],
      
      overrides: [
        [
          "convertPDFLinks",
          "checkbox",
          `Convert PDF links <code>a href='...pdf'</code>`,
          "Open all links to PDF files in Real3D lightbox flipbook instead of opening PDF in new tab",
        ],
        [
          "convertPDFLinksWithClass",
          "text",
          `Convert only PDF link with CSS class`,
          "Convert only PDF links that have following CSS class",
        ],
        [
          "convertPDFLinksWithoutClass",
          "text",
          `Convert only PDF link without CSS class`,
          "Convert only PDF links that don't have following CSS class",
        ],
        [
          "overridePDFEmbedder",
          "checkbox",
          "PDF Embedder",
          "Render shortcode <code>[pdf-embedder url='...']</code> with Real3D Flipook",
        ],
        [
          "overrideDflip",
          "checkbox",
          "DearFlip",
          "Render shortcode <code>[dflip source='...']</code> or <code>[dflip id='...']</code> with Real3D Flipook",
        ],
        [
          "overrideWonderPDFEmbed",
          "checkbox",
          "Wonder PDF Embed",
          "Render shortcode <code>[wonderplugin_pdf src='...']</code> with Real3D Flipook",
        ],
        [
          "override3DFlipBook",
          "checkbox",
          "3D Flipbook",
          "Render shortcode <code>[3d-flip-book pdf='...']</code> or <code>[3d-flip-book id='...']</code> with Real3D Flipook",
        ],
        [
          "overridePDFjsViewer",
          "checkbox",
          "PDF.js Viewer",
          "Render shortcode <code>[pdfjs-viewer url='...']</code> with Real3D Flipook",
        ],
      ],
      advanced: [
        
        [
          "manageFlipbooks",
          "dropdown",
          "Manage flipbooks",
          "User role that can manage flipbooks",
          ["", "Author", "Editor", "Administrator"],
        ],
        [
          "slug",
          "text",
          "Flipbook post slug",
          "Custom rewrite slug for flipbook post. After changing this setting, go to WordPress admin area > Settings > Permalinks and click Click 'Save Changes'",
        ],
        [
          "resumeReading",
          "checkbox",
          "Resume reading",
          "Save last viewed page, and resume flipbook from last page, for logged in users.",
        ],
        
      ],
      
      "share-buttons": [
        [
          "shareTitle",
          "text",
          "Share Title",
          "Title that will be used for sharing",
        ],
        [
          "shareUrl",
          "text",
          "Share URL",
          "URL that will be shared, if not set it will use the website URL",
        ],
        ["shareImage", "text", "Share Image", "URL of the image for sharing"],
        ["whatsapp[enabled]", "checkbox", "Whatsapp"],
        ["twitter[enabled]", "checkbox", "Twitter"],
        ["facebook[enabled]", "checkbox", "Facebook"],
        ["pinterest[enabled]", "checkbox", "Pinterest"],
        ["email[enabled]", "checkbox", "Email"],
        ["reddit[enabled]", "checkbox", "Reddit"],
        ["digg[enabled]", "checkbox", "Digg"],
        ["linkedin[enabled]", "checkbox", "LinkedIn"],
      ],
      "menu-bar-2": [
        ["menu2Background", "color", "Background color", "custom CSS"],
        ["menu2Shadow", "text", "Shadow", "custom CSS"],
        ["menu2Margin", "text", "Margin"],
        ["menu2Padding", "text", "Padding"],
        [
          "menu2OverBook",
          "checkbox",
          "Over book",
          "menu covers the book (overlay)",
        ],
        [
          "menu2Transparent",
          "checkbox",
          "Transparent",
          "menu has no background",
        ],
        [
          "menu2Floating",
          "checkbox",
          "Floating",
          "small menu floating over book, not full width",
        ],
      ],
      "menu-bar": [
        ["menuBackground", "color", "Background color", "custom CSS"],
        ["menuShadow", "text", "Shadow", "custom CSS"],
        ["menuMargin", "text", "Margin"],
        ["menuPadding", "text", "Padding"],
        [
          "menuOverBook",
          "checkbox",
          "Over book",
          "menu covers the book (overlay)",
        ],
        [
          "menuTransparent",
          "checkbox",
          "Transparent",
          "Menu has no background",
        ],
        [
          "menuFloating",
          "checkbox",
          "Floating",
          "small menu floating over book, not full width",
        ],
        ["hideMenu", "checkbox", "Hide menu", "hide menu completely"],
      ],
      "menu-buttons": [
        ["btnColor", "color", "Color"],
        ["btnColorHover", "color", "Hover color"],
        ["btnBackground", "color", "Background color"],
        ["btnBackgroundHover", "color", "Background hover color"],
        ["btnRadius", "text", "Radius", "px"],
        ["btnMargin", "text", "Margin", "px"],
        ["btnSize", "text", "Size", "between 8 and 20"],
        ["btnPaddingV", "text", "Padding vertical", "between 0 and 20"],
        ["btnPaddingH", "text", "Padding horizontal", "between 0 and 20"],
        ["btnShadow", "text", "Box shadow", "custom CSS"],
        ["btnTextShadow", "text", "Text shadow", "custom CSS"],
        ["btnBorder", "text", "Border", "custom CSS"],
      ],
      "side-buttons": [
        ["sideNavigationButtons", "checkbox", "Enabled", "Arrows on the sides"],
        [
          "menuNavigationButtons",
          "checkbox",
          "Arrows in the menu",
          "Show also the arrows in the menu",
        ],
        ["arrowColor", "color", "Color"],
        ["arrowColorHover", "color", "Hover Color"],
        ["arrowBackground", "color", "Background color"],
        ["arrowBackgroundHover", "color", "Background hover color"],
        ["arrowRadius", "text", "Radius", "px"],
        ["arrowMargin", "text", "Margin", "px"],
        [
          "arrowSize",
          "text",
          "Size",
          "Side buttons margin size, between 8 and 50",
        ],
        [
          "arrowPadding",
          "text",
          "Padding",
          "Side buttons padding, between 0 and 10",
        ],
        ["arrowTextShadow", "text", "Text shadow", "custom CSS"],
        ["arrowBorder", "text", "Border", "custom CSS"],
      ],
      "current-page": [
        [
          "currentPagePositionV",
          "dropdown",
          "Current page display vertical position",
          "Vertical position",
          ["top", "bottom"],
        ],
        [
          "currentPagePositionH",
          "dropdown",
          "Horizontal position",
          "Current page display horizontal position",
          ["left", "right"],
        ],
        ["currentPageMarginV", "text", "Vertical margin", "between 0 and 10"],
        ["currentPageMarginH", "text", "Horizontal margin", "between 0 and 10"],
      ],
      "menu-floating": [
        ["floatingBtnColor", "color", "Color", "CSS value"],
        ["floatingBtnColorHover", "color", "Hover color", "CSS value"],
        ["floatingBtnBackground", "color", "Background color", "CSS value"],
        [
          "floatingBtnBackgroundHover",
          "color",
          "Background hover color",
          "CSS value",
        ],
        ["floatingBtnSize", "text", "Size"],
        ["floatingBtnRadius", "text", "Radius"],
        ["floatingBtnBorder", "text", "Border", "CSS value"],
        ["floatingBtnMargin", "text", "Margin", "CSS value"],
        ["floatingBtnPadding", "text", "Padding", "CSS value"],
        ["floatingBtnShadow", "text", "Box shadow", "CSS value"],
        ["floatingBtnTextShadow", "text", "Text shadow", "CSS value"],
      ],
      translate: [
        ["strings[print]", "text", "Print"],
        ["strings[printLeftPage]", "text", "Print left page"],
        ["strings[printRightPage]", "text", "Print right page"],
        ["strings[printCurrentPage]", "text", "Print current page"],
        ["strings[printAllPages]", "text", "Print all pages"],
        ["strings[download]", "text", "Download"],
        ["strings[downloadLeftPage]", "text", "Download left page"],
        ["strings[downloadRightPage]", "text", "Download right page"],
        ["strings[downloadCurrentPage]", "text", "Download current page"],
        ["strings[downloadAllPages]", "text", "Download all pages"],
        ["strings[bookmarks]", "text", "Bookmarks"],
        ["strings[bookmarkLeftPage]", "text", "Bookmark left page"],
        ["strings[bookmarkRightPage]", "text", "Bookmark right page"],
        ["strings[bookmarkCurrentPage]", "text", "Bookmark current page"],
        ["strings[search]", "text", "Search"],
        ["strings[findInDocument]", "text", "Find in document"],
        ["strings[pagesFoundContaining]", "text", "pages found containing"],
        ["strings[noMatches]", "text", "No matches"],
        ["strings[matchesFound]", "text", "matches found"],
        ["strings[page]", "text", "Page"],
        ["strings[matches]", "text", "matches"],
        ["strings[thumbnails]", "text", "Thumbnails"],
        ["strings[tableOfContent]", "text", "Table of Contents"],
        ["strings[share]", "text", "Share"],
        ["strings[pressEscToClose]", "text", "Press ESC to close"],
        ["strings[password]", "text", "Password"],
        ["strings[addNote]", "text", "Add note"],
        ["strings[typeInYourNote]", "text", "Type in your note..."],
      ],
      "pdf-tools": [
        [
          "pdfTools[pageHeight]",
          "text",
          "Page height",
          "Height of page image, default 1500",
        ],
        [
          "pdfTools[thumbHeight]",
          "text",
          "Thumbnail height",
          "Height of thumbnail image, default 200",
        ],
        [
          "pdfTools[quality]",
          "text",
          "Image quality",
          "JPG quality, default 0.8...",
        ],
        [
          "pdfTools[textLayer]",
          "checkbox",
          "PDF Text layer",
          "Include PDF text layer in flipbook...",
        ],
      ],
      preview: [
        [
          "previewMode",
          "dropdown",
          "Show preview mode",
          "Show only first x number of pages in flipbook",
          [
            { value: "", display: "Never" },
            { value: "logged_out", display: "For logged out users" },
            {
              value: "woo_purchased_or_subscription",
              display:
                "If WooCommerce product not purchased and no active WooCommerce subscription",
            },
          ],
        ],
        [
          "previewPages",
          "text",
          "Number of pages",
          "Number of flipbook pages for preview mode",
        ],
      ],
      "close-button": [
        ["btnClose[color]", "color", "Color", "CSS value"],
        ["btnClose[background]", "color", "Background color", "CSS value"],
        ["btnClose[colorHover]", "color", "Hover color", "CSS value"],
        [
          "btnClose[backgroundHover]",
          "color",
          "Background hover color",
          "CSS value",
        ],
        ["btnClose[size]", "text", "Size", "px"],
        ["btnClose[border]", "text", "Border", "CSS value"],
        ["btnClose[radius]", "text", "Radius", "px"],
      ],
      ui: [
        [
          "layout",
          "dropdown",
          "UI Layout",
          "select one of premade UI layouts",
          ["1", "2", "3", "4"],
        ],
        [
          "skin",
          "dropdown",
          "Skin",
          "select one of premade skins",
          ["light", "dark", "gradient"],
        ],
        [
          "icons",
          "dropdown",
          "Icon set",
          "choose Font Awesome or Material icons",
          ["FontAwesome", "material"],
        ],
      ],
      skin: [
        ["skinColor", "color", "Color", "global UI color, CSS value"],
        [
          "skinBackground",
          "color",
          "Background color",
          "global UI background color, CSS value",
        ],
      ],
      bg: [
        [
          "backgroundColor",
          "color",
          "Color",
          "CSS value, example #333 or rgba(0,0,0,0.5)",
        ],
        [
          "backgroundPattern",
          "selectImage",
          "Image pattern (repeat)",
          "Flipbook container background pattern",
        ],
        [
          "backgroundImage",
          "selectImage",
          "Image",
          "Flipbook container background image",
        ],
        [
          "backgroundTransparent",
          "checkbox",
          "Transparent",
          "Flipbook container will have transparent background",
        ],
      ],
      sidebar: [
        ["sideMenuOverBook", "checkbox", "Over book layer"],
        ["sideMenuOverMenu", "checkbox", "Over bottom menu"],
        ["sideMenuOverMenu2", "checkbox", "Over top menu"],
      ],
      
    };

    const proOptions = {
      general: [
        "deeplinking[enabled]",
        "deeplinking[prefix]",
        "pdfTextLayer",
        "pdfAutoLinks",
        "disableRange",
        "linkColor",
        "linkColorHover",
        "linkOpacity",
        "linkTarget",
        "thumbnailsOnStart",
        "contentOnStart",
        "searchOnStart",
        "searchResultsThumbs",
        "tableOfContentCloseOnClick",
        "thumbsCloseOnClick",
        "googleAnalyticsTrackingCode",
        "rightClickEnabled",
        "access",
      ],
    };

    function addOption(section, name, type, desc, help, values) {
      function getNestedValue(obj, path) {
        return path.reduce(
          (current, key) =>
            current && current[key] !== undefined ? current[key] : undefined,
          obj
        );
      }

      let nameParts = name.split(/[\[\]]/).filter(Boolean);

      let val;

      if (nameParts.length > 1) {
        let base = options.globals[nameParts[0]];

        if (base) {
          val = getNestedValue(base, nameParts.slice(1));
        }
      } else {
        val = options[name];
      }

      if (typeof val == "strings") val = r3d_stripslashes(val);

      var table = $("#flipbook-" + section + "-options");
      var tableBody = table.find("tbody");
      var row = $('<tr valign="top"  class="field-row"></tr>').appendTo(
        tableBody
      );
      var th = $('<th scope="row">' + desc + "</th>").appendTo(row);
      var td = $("<td></td>").appendTo(row);
      var elem;

      switch (type) {
        case "text":
          elem = $('<input type="text" name="' + name + '">').appendTo(td);
          if (typeof val != "undefined") elem.attr("value", val);
          break;

        case "color":
          elem = $(
            '<input type="text" name="' + name + '" class="alpha-color-picker">'
          ).appendTo(td);
          elem.attr("value", val);
          break;

        case "textarea":
          elem = $('<textarea name="' + name + '"></textarea>').appendTo(td);
          if (typeof val != "undefined") {
            elem.attr("value", val);
            elem.text(val);
          }
          break;

        case "checkbox":
          elem = $('<select name="' + name + '"></select>').appendTo(td);
          const options = [
            { value: "", text: "Default" },
            { value: "true", text: "Enabled" },
            { value: "false", text: "Disabled" },
          ];

          options.forEach((option) => {
            $("<option>", {
              value: option.value,
              text: option.text,
              selected:
                val ===
                (option.value === "true"
                  ? true
                  : option.value === "false"
                  ? false
                  : val),
            }).appendTo(elem);
          });
          break;

        case "selectImage":
          elem = $(
            '<input type="hidden" name="' +
              name +
              '"><img name="' +
              name +
              '"><a class="select-image-button button-secondary button80" href="#">Select image</a><a class="remove-image-button button-secondary button80" href="#">Remove image</a>'
          ).appendTo(td);
          $(elem[0]).attr("value", val);
          $(elem[1]).attr("src", val);
          break;

        case "selectFile":
          elem = $(
            '<input type="text" name="' +
              name +
              '"><a class="select-image-button button-secondary button80" href="#">Select file</a>'
          ).appendTo(td);
          elem.attr("value", val);
          break;

        case "dropdown":
          elem = $('<select name="' + name + '"></select>').appendTo(td);
          $("<option>", {
            value: "",
            text: "Default",
            selected: typeof val === "undefined",
          }).appendTo(elem);

          values.forEach((option) => {
            $("<option>", {
              value: option.value || option, // Fallback if option is not an object
              text: option.display || option, // Fallback if option is not an object
              selected: val === (option.value || option),
            }).appendTo(elem);
          });
          break;
      }

      if (typeof help != "undefined")
        var p = $('<p class="description">' + help + "</p>").appendTo(td);
    }

    for (const key in allOptions) {
      allOptions[key].forEach(function (argsArray) {
        addOption(key, ...argsArray);
      });
    }

    function addMenuButton(name) {
      addOption(name, name + "[enabled]", "checkbox", "Enabled");

      addOption(name, name + "[title]", "text", "Title");

      addOption(name, name + "[vAlign]", "dropdown", "Vertical align", "", [
        "",
        "bottom",
        "top",
      ]);

      addOption(name, name + "[hAlign]", "dropdown", "Horizontal align", "", [
        "",
        "center",
        "right",
        "left",
      ]);

      addOption(name, name + "[order]", "text", "Order");
    }

    var menuButtonNames = [
      "currentPage",
      "btnAutoplay",
      "btnNext",
      "btnPrev",
      "btnFirst",
      "btnLast",
      "btnZoomIn",
      "btnZoomOut",
      "btnToc",
      "btnThumbs",
      "btnShare",
      "btnSound",
      "btnExpand",
      "btnDownloadPages",
      "btnDownloadPdf",
      "btnPrint",
      "btnSingle",
      "btnSearch",
      "search",
      "btnBookmark",
      "btnTools",
      "btnClose",
    ];

    menuButtonNames.forEach(function (buttonName) {
      addMenuButton(buttonName);
    });

    $("input.alpha-color-picker").alphaColorPicker();

    var ui_layouts = {
      default: {
        menuOverBook: false,
        menuFloating: false,
        menuBackground: "",
        menuShadow: "",
        menuMargin: 0,
        menuPadding: 0,
        menuTransparent: false,

        menu2OverBook: true,
        menu2Floating: false,
        menu2Background: "",
        menu2Shadow: "",
        menu2Margin: 0,
        menu2Padding: 0,
        menu2Transparent: true,

        btnMargin: 2,
        sideMenuOverMenu: false,
        sideMenuOverMenu2: true,

        currentPage: { hAlign: "left", vAlign: "top" },
        btnAutoplay: { hAlign: "center", vAlign: "bottom" },
        btnSound: { hAlign: "center", vAlign: "bottom" },
        btnExpand: { hAlign: "center", vAlign: "bottom" },
        btnZoomIn: { hAlign: "center", vAlign: "bottom" },
        btnZoomOut: { hAlign: "center", vAlign: "bottom" },
        btnSearch: { hAlign: "center", vAlign: "bottom" },
        btnBookmark: { hAlign: "center", vAlign: "bottom" },
        btnToc: { hAlign: "center", vAlign: "bottom" },
        btnThumbs: { hAlign: "center", vAlign: "bottom" },
        btnShare: { hAlign: "center", vAlign: "bottom" },
        btnPrint: { hAlign: "center", vAlign: "bottom" },
        btnDownloadPages: { hAlign: "center", vAlign: "bottom" },
        btnDownloadPdf: { hAlign: "center", vAlign: "bottom" },
      },
      1: {},
      2: {
        // bottom 2
        currentPage: { vAlign: "bottom", hAlign: "center" },
        btnAutoplay: { hAlign: "left" },
        btnSound: { hAlign: "left" },
        btnExpand: { hAlign: "right" },
        btnZoomIn: { hAlign: "right" },
        btnZoomOut: { hAlign: "right" },
        btnSearch: { hAlign: "left" },
        btnBookmark: { hAlign: "left" },
        btnToc: { hAlign: "left" },
        btnThumbs: { hAlign: "left" },
        btnShare: { hAlign: "right" },
        btnPrint: { hAlign: "right" },
        btnDownloadPages: { hAlign: "right" },
        btnDownloadPdf: { hAlign: "right" },
      },
      3: {
        // top
        menuTransparent: true,
        menu2Transparent: false,
        menu2OverBook: false,
        menu2Padding: 5,
        btnMargin: 5,
        currentPage: { vAlign: "top", hAlign: "center" },
        btnPrint: { vAlign: "top", hAlign: "right" },
        btnDownloadPdf: { vAlign: "top", hAlign: "right" },
        btnDownloadPages: { vAlign: "top", hAlign: "right" },
        btnThumbs: { vAlign: "top", hAlign: "left" },
        btnToc: { vAlign: "top", hAlign: "left" },
        btnBookmark: { vAlign: "top", hAlign: "left" },
        btnSearch: { vAlign: "top", hAlign: "left" },
        btnShare: { vAlign: "top", hAlign: "right" },
        btnAutoplay: { hAlign: "right" },
        btnExpand: { hAlign: "right" },
        btnZoomIn: { hAlign: "right" },
        btnZoomOut: { hAlign: "right" },
        btnSound: { hAlign: "right" },
        menuPadding: 5,
      },
      4: {
        // top 2
        menu2Transparent: false,
        menu2OverBook: false,
        sideMenuOverMenu2: false,
        currentPage: { vAlign: "top", hAlign: "center" },
        btnAutoplay: { vAlign: "top", hAlign: "left" },
        btnSound: { vAlign: "top", hAlign: "left" },
        btnExpand: { vAlign: "top", hAlign: "right" },
        btnZoomIn: { vAlign: "top", hAlign: "right" },
        btnZoomOut: { vAlign: "top", hAlign: "right" },
        btnSearch: { vAlign: "top", hAlign: "left" },
        btnBookmark: { vAlign: "top", hAlign: "left" },
        btnToc: { vAlign: "top", hAlign: "left" },
        btnThumbs: { vAlign: "top", hAlign: "left" },
        btnShare: { vAlign: "top", hAlign: "right" },
        btnPrint: { vAlign: "top", hAlign: "right" },
        btnDownloadPages: { vAlign: "top", hAlign: "right" },
        btnDownloadPdf: { vAlign: "top", hAlign: "right" },
      },
    };

    $('select[name="layout"]').change(function () {
      var name = this.value;

      var defaults = ui_layouts["default"];
      for (var key in defaults) {
        setOptionValue(key, defaults[key]);
      }

      var obj = ui_layouts[name];
      for (var key in obj) {
        setOptionValue(key, obj[key]);
      }

      setOptionValue("layout", name);
    });

    function updateSaveBar() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 50
      ) {
        $("#r3d-save").removeClass("r3d-save-sticky");
        $("#r3d-save-holder").hide();
      } else {
        $("#r3d-save").addClass("r3d-save-sticky");
        $("#r3d-save-holder").show();
      }
    }

    $("#real3dflipbook-admin .nav-tab").click(function (e) {
      e.preventDefault();
      $("#real3dflipbook-admin .tab-active").hide();
      $(".nav-tab-active").removeClass("nav-tab-active");
      var a = jQuery(this).addClass("nav-tab-active");
      var id = "#" + a.attr("data-tab");
      jQuery(id).addClass("tab-active").fadeIn();

      window.location.hash = a.attr("data-tab").split("-")[1];

      updateSaveBar();
    });

    $("#real3dflipbook-admin .nav-tab").focus(function (e) {
      this.blur();
    });

    if (
      window.location.hash &&
      $('.nav-tab[data-tab="tab-' + window.location.hash.split("#")[1] + '"]')
        .length
    ) {
      $(
        $(
          '.nav-tab[data-tab="tab-' + window.location.hash.split("#")[1] + '"]'
        )[0]
      ).trigger("click");
    } else {
      $($("#real3dflipbook-admin .nav-tab")[0]).trigger("click");
    }

    var $form = $("#real3dflipbook-options-form");

    $form.submit(function (e) {
      e.preventDefault();

      $form.find(".spinner").css("visibility", "visible");

      $form
        .find(".save-button")
        .prop("disabled", "disabled")
        .css("pointer-events", "none");
      $form
        .find(".create-button")
        .prop("disabled", "disabled")
        .css("pointer-events", "none");

      var data = "action=r3d_save_general&security=" + window.r3d_nonce[0];
      var arr = $form.serializeArray();

      arr.forEach(function (element, index) {
        if (element.value != "")
          data +=
            "&" + element.name + "=" + encodeURIComponent(element.value.trim());
      });

      $.ajax({
        type: "POST",
        url: $form.attr("action"), //.replace('admin-ajax','admin'),
        data: data,

        success: function (data, textStatus, jqXHR) {
          $(".spinner").css("visibility", "hidden");
          $(".save-button").prop("disabled", "").css("pointer-events", "auto");
          $(".create-button").hide();
          $(".save-button").show();
          $("#edit-flipbook-text").text("Edit Flipbook");

          removeAllNotices();
          addNotice("Settings updated");
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert("Status: " + textStatus);
          alert("Error: " + errorThrown);
        },
      });
    });

    /**
     * Create and show a dismissible admin notice
     */
    function addNotice(msg) {
      var div = document.createElement("div");
      $(div)
        .addClass("notice notice-info")
        .css("position", "relative")
        .fadeIn();

      var p = document.createElement("p");

      $(p).text(msg).appendTo($(div));

      var b = document.createElement("button");
      $(b).attr("type", "button").addClass("notice-dismiss").appendTo($(div));

      var bSpan = document.createElement("span");
      $(bSpan)
        .addClass("screen-reader-text")
        .text("Dismiss this notice")
        .appendTo($(b));

      var h1 = document.getElementsByTagName("h1")[0];
      h1.parentNode.insertBefore(div, h1.nextSibling);

      $(b).click(function () {
        div.parentNode.removeChild(div);
      });
    }

    function removeAllNotices() {
      $(".notice").remove();
    }

    $(".flipbook-reset-defaults").click(function (e) {
      e.preventDefault();

      if (confirm("Reset Global settings?")) {
        var data = "action=r3d_reset_general&security=" + window.r3d_nonce[0];

        $.ajax({
          type: "POST",
          url: "admin-ajax.php?page=real3d_flipbook_admin",
          data: data,

          success: function (data, textStatus, jqXHR) {
            location.href =
              location.origin +
              location.pathname +
              "?page=real3d_flipbook_settings";
          },

          error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
          },
        });
      }
    });

    $(window).scroll(function () {
      updateSaveBar();
    });

    $(window).resize(function () {
      updateSaveBar();
    });

    updateSaveBar();

    function unsaved() {
      // $('.unsaved').show()
    }

    // flipbook-options

    if (options.socialShare == null) options.socialShare = [];

    for (var i = 0; i < options.socialShare.length; i++) {
      var share = options.socialShare[i];
      var shareContainer = $("#share-container");
      var shareItem = createShareHtml(
        i,
        share.name,
        share.icon,
        share.url,
        share.target
      );
      shareItem.appendTo(shareContainer);
    }

    // $(".tabs").tabs();
    $(".ui-sortable").sortable();

    $("#add-share-button").click(function (e) {
      e.preventDefault();

      var shareContainer = $("#share-container");
      var shareCount = shareContainer.find(".share").length;
      var shareItem = createShareHtml(
        "socialShare[" + shareCount + "]",
        "",
        "",
        "",
        "",
        "_blank"
      );
      shareItem.appendTo(shareContainer);
    });

    function createShareHtml(prefix, id, name, icon, url, target) {
      if (typeof target == "undefined" || target != "_self") target = "_blank";

      var markup = $(
        '<div id="' +
          id +
          '"class="share">' +
          "<h4>Share button " +
          id +
          "</h4>" +
          '<div class="tabs settings-area">' +
          '<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">' +
          '<li><a href="#tabs-1">Icon name</a></li>' +
          '<li><a href="#tabs-2">Icon css class</a></li>' +
          '<li><a href="#tabs-3">Link</a></li>' +
          '<li><a href="#tabs-4">Target</a></li>' +
          "</ul>" +
          '<div id="tabs-1" class="ui-tabs-panel ui-widget-content ui-corner-bottom">' +
          '<div class="field-row">' +
          '<input id="page-title" name="' +
          prefix +
          '[name]" type="text" placeholder="Enter icon name" value="' +
          name +
          '" />' +
          "</div>" +
          "</div>" +
          '<div id="tabs-2" class="ui-tabs-panel ui-widget-content ui-corner-bottom">' +
          '<div class="field-row">' +
          '<input id="image-path" name="' +
          prefix +
          '[icon]" type="text" placeholder="Enter icon CSS class" value="' +
          icon +
          '" />' +
          "</div>" +
          "</div>" +
          '<div id="tabs-3" class="ui-tabs-panel ui-widget-content ui-corner-bottom">' +
          '<div class="field-row">' +
          '<input id="image-path" name="' +
          prefix +
          '[url]" type="text" placeholder="Enter link" value="' +
          url +
          '" />' +
          "</div>" +
          "</div>" +
          '<div id="tabs-4" class="ui-tabs-panel ui-widget-content ui-corner-bottom">' +
          '<div class="field-row">' + // + '<input id="image-path" name="'+prefix+'[target]" type="text" placeholder="Enter link" value="'+target+'" />'
          '<select id="social-share" name="' +
          prefix +
          '[target]">' + // + '<option name="'+prefix+'[target]" value="_self">_self</option>'
          // + '<option name="'+prefix+'[target]" value="_blank">_blank</option>'
          "</select>" +
          "</div>" +
          "</div>" +
          '<div class="submitbox deletediv"><span class="submitdelete deletion">x</span></div>' +
          "</div>" +
          "</div>" +
          "</div>"
      );

      var values = ["_self", "_blank"];
      var select = markup.find("select");

      for (var i = 0; i < values.length; i++) {
        var option = $(
          '<option name="' +
            prefix +
            '[target]" value="' +
            values[i] +
            '">' +
            values[i] +
            "</option>"
        ).appendTo(select);
        if (typeof options["socialShare"][id] != "undefined") {
          if (options["socialShare"][id]["target"] == values[i]) {
            option.attr("selected", "true");
          }
        }
      }

      return markup;
    }

    function getOptionValue(optionName, type) {
      var type = type || "input";
      var opiton = $(type + "[name='" + optionName + "']");
      return opiton.attr("value");
    }

    function getOption(optionName, type) {
      var type = type || "input";
      var opiton = $(type + "[name='" + optionName + "']");
      return opiton;
    }

    $(".select-image-button").click(function (e) {
      e.preventDefault();

      var $input = $(this).parent().find("input");
      var $img = $(this).parent().find("img");

      var pdf_uploader = wp
        .media({
          title: "Select file",
          button: {
            text: "Select",
          },
          multiple: false, // Set this to true to allow multiple files to be selected
        })
        .on("select", function () {
          // $('.unsaved').show()
          var arr = pdf_uploader.state().get("selection");
          var selected = arr.models[0].attributes.url;

          $input.val(selected);
          $img.attr("src", selected);
        })
        .open();
    });

    $(".remove-image-button").click(function (e) {
      e.preventDefault();

      var $input = $(this).parent().find("input");
      var $img = $(this).parent().find("img");

      $input.val("");
      $img.attr("src", "");
    });

    function setOptionValue(optionName, value, type) {
      if (typeof value == "object") {
        for (var key in value) {
          setOptionValue(optionName + "[" + key + "]", value[key]);
        }
        return null;
      }
      var type = type || "input";
      var $elem = $(type + "[name='" + optionName + "']")
        .attr("value", value)
        .prop("checked", value);

      if (value === true) value = "true";
      else if (value === false) value = "false";

      $("select[name='" + optionName + "']").val(value);
      $("input[name='" + optionName + "']")
        .val(value)
        .trigger("keyup");

      return $elem;
    }

    function setColorOptionValue(optionName, value) {
      var $elem = $("input[name='" + optionName + "']").attr("value", value);
      $elem.wpColorPicker();
      return $elem;
    }
  });
})(jQuery);

