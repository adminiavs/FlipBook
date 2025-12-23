"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const copyTextInput = document.createElement("input");
  copyTextInput.type = "text";
  copyTextInput.id = "copy-text-hidden";
  copyTextInput.style.position = "absolute";
  copyTextInput.style.left = "-9999px";
  document.body.appendChild(copyTextInput);

  const copyToClipboard = (text) => {
    copyTextInput.value = text;
    copyTextInput.select();
    document.execCommand("copy");
    copyTextInput.blur();
    console.log("Text copied to clipboard");
  };

  const copyButtons = document.querySelectorAll(".copy-shortcode");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.id;
      const shortcode = `[real3dflipbook id='${id}']`;
      copyToClipboard(shortcode);
    });
  });
});
