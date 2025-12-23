var FLIPBOOK = FLIPBOOK || {};

FLIPBOOK.PDFTools = function () {
  this.eventBus = new FLIPBOOK.EventBus();
  this.linkService = new FLIPBOOK.PDFLinkService({
    eventBus: this.eventBus,
  });
  this.linkService.externalLinkTarget = FLIPBOOK.LinkTarget.BLANK;
  this.canvas = document.createElement("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.ctx.fillStyle = "#000000";
  this.canvas2 = document.createElement("canvas");
  this.ctx2 = this.canvas2.getContext("2d");
  this.ctx2.fillStyle = "#000000";
  this.saving = false;
  this.convertedPages = [];
};

FLIPBOOK.PDFTools.prototype = {
  convertPDF: function (pdfDocument, options) {
    this.options = options;
    this.pdf = pdfDocument;
    this.numPages = pdfDocument.numPages; // use public API
    this.currentPage = 1;
    this.pdfPages = {};

    this.linkService.setDocument(pdfDocument);
    this._loadOutlineAndStart();
  },

  _loadOutlineAndStart: async function () {
    try {
      const outline = await this.pdf.getOutline();
      this.pdfOutline = outline || [];
      this.eventBus.dispatch("outlineloaded", { outline: this.pdfOutline });
      await this.convertPages();
    } catch (err) {
      this.onPDFError(err);
    }
  },

  onPDFError: function (error) {
    console.error(error);
    alert("An error occurred while processing the PDF: " + error.message);
  },

  getPage: async function (pageIndex) {
    if (this.pdfPages[pageIndex]) {
      return this.pdfPages[pageIndex];
    }
    const page = await this.pdf.getPage(pageIndex);
    this.pdfPages[pageIndex] = page;
    return page;
  },

  processAnnotaionDest: async function (dest) {
    let destArray =
      typeof dest === "string" ? await this.pdf.getDestination(dest) : dest;
    if (!Array.isArray(destArray)) {
      console.error(`Invalid destination array for dest=${dest}`);
      return;
    }
    const pageIndex = await this.pdf.getPageIndex(destArray[0]);
    return pageIndex;
  },

  convertPage: async function (index) {
    const page = await this.getPage(index);
    const tasks = [
      this.renderPageToCanvas(page),
      page.getAnnotations({ intent: "display" }),
    ];
    if (this.options.textLayer) {
      tasks.push(page.getTextContent());
    }
    const [renderedPage, annotations, textContent] = await Promise.all(tasks);

    const outer = document.createElement("div");
    renderedPage.htmlContent = outer;
    const h = document.createElement("div");
    h.style.transformOrigin = "0 0";
    h.style.position = "absolute";
    outer.appendChild(h);
    var viewport = page.getViewport({ scale: 1 });
    const scale = 1000 / viewport.height;
    h.style.width = `${(1000 * viewport.width) / viewport.height}px`;
    h.style.height = "1000px";
    h.style.setProperty("--scale-factor", scale);

    var textLayer = new FLIPBOOK.TextLayerBuilder();
    h.appendChild(textLayer.div);

    if (textContent) {
      textLayer.setTextContentSource(textContent);
      await textLayer.render(viewport);
    }

    if (annotations.length > 0) {
      var annotationLayer = new FLIPBOOK.AnnotationLayerBuilder({
        pageDiv: h,
        linkService: this.linkService,
        pdfPage: page,
      });
      await annotationLayer.render(viewport, "display");
      annotations.forEach(async (annotation) => {
        const annotationSection = h.querySelector(
          `[data-annotation-id="${annotation.id}"]`
        );
        const dest = annotation.dest;
        if (dest && annotationSection) {
          const annotationLink = annotationSection.firstChild;
          if (annotationLink) {
            const pageIndex = await this.processAnnotaionDest(dest);
            annotationLink.dataset.page = pageIndex + 1;
            annotationLink.classList.add("internalLink");
            annotationLink.href = "#";
          }
        }
      });
    }

    // Create a blob from the main canvas and thumbnail
    const imageType = "image/webp";
    const quality = this.options.quality;
    page.srcBlob = await new Promise((resolve) =>
      this.canvas.toBlob(resolve, imageType, quality)
    );
    page.thumbBlob = await this.renderThumbnail(
      page,
      this.options.thumbHeight,
      imageType,
      quality
    );

    return renderedPage;
  },

  convertPages: async function () {
    for (
      this.currentPageNumber = 1;
      this.currentPageNumber <= this.numPages;
      this.currentPageNumber++
    ) {
      const page = await this.convertPage(this.currentPageNumber);
      this.convertedPages.push(page);
      this.saveNextPage();
    }
  },

  saveNextPage: async function () {
    if (this.convertedPages.length && !this.saving) {
      const page = this.convertedPages.shift();
      this.saving = true;
      const savedPage = await this.savePage(page);
      this.onPageSaved(savedPage);
      this.saving = false;
      this.saveNextPage();
    }
  },

  savePage: async function (page) {
    try {
      const jsonString = JSON.stringify({
        data: encodeURIComponent(page.htmlContent.innerHTML),
      });
      const formData = new FormData();
      formData.append("security", this.options.security);
      formData.append("id", this.options.bookId);
      formData.append("action", "r3d_pdf_tools_save");
      formData.append("page", page._pageIndex + 1 + this.options.startIndex);
      formData.append("json", jsonString);
      formData.append("src", page.srcBlob);
      formData.append("thumb", page.thumbBlob);

      const response = await fetch(ajaxurl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      page.src = result.src;
      page.thumb = result.thumb;
      page.json = result.json;
      return page;
    } catch (error) {
      this.onPDFError(error);
    }
  },

  delay: function (duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  },

  onPageSaved: function (page) {
    this.converted++;
    this.eventBus.dispatch("pagesaved", {
      index: page._pageIndex,
      pageNumber: page._pageIndex + 1,
      src: page.src,
      thumb: page.thumb,
      json: page.json,
      converted: this.converted,
      total: this.numPages,
    });
    this.saveNextPage();
  },

  renderPageToCanvas: async function (page) {
    const viewport = page.getViewport({ scale: 1 });
    const scale = this.options.pageHeight / viewport.height;
    const vpScaled = page.getViewport({ scale });

    this.canvas.width = vpScaled.width;
    this.canvas.height = vpScaled.height;

    await page.render({ canvasContext: this.ctx, viewport: vpScaled }).promise;
    return page;
  },

  renderThumbnail: async function (page, height, type, quality) {
    const v = page.getViewport({ scale: 1 });
    const scale = height / v.height;
    const w = v.width * scale;

    this.canvas2.width = w;
    this.canvas2.height = height;
    const ctx = this.canvas2.getContext("2d");
    ctx.clearRect(0, 0, w, height);

    await page.render({
      canvasContext: ctx,
      viewport: page.getViewport({ scale }),
    }).promise;
    return new Promise((res) => this.canvas2.toBlob(res, type, quality));
  },
};
