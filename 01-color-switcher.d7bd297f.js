!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body");function r(t,e){t.setAttribute("disabled",""),e.removeAttribute("disabled")}t.addEventListener("click",(function(){r(t,e);var a=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));n.style.background=t}),1e3);e.addEventListener("click",(function(){r(e,t),clearInterval(a)}))}))}();
//# sourceMappingURL=01-color-switcher.d7bd297f.js.map