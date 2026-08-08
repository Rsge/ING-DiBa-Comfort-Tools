// ==UserScript==
// @name           ING DiBa Comfort Tools
// @name:de        ING DiBa Komfort-Tools

// @description    A few tools to make the German DiBa sites more bearable. Refreshes login & stocks and tries to close ads.
// @description:de Ein paar Tools, um die DiBa-Webseiten erträglicher zu gestalten. Erneuert Login & Kurse und versucht, Werbung zu schließen.

// @version        1.0.0
// @author         Rsge
// @copyright      2026+, Jan G. (Rsge)
// @license        Mozilla Public License 2.0
// @icon           https://banking.ing.de/app/obligo/static/resource/icon-16x16-ver-34F56DF9647FC5EF3BBEFA31470B5827.png

// @namespace      https://github.com/Rsge
// @homepageURL    https://github.com/Rsge/ING-DiBa-Comfort-Tools
// @supportURL     https://github.com/Rsge/ING-DiBa-Comfort-Tools/issues

// @match          https://banking.ing.de/app/*
// @match          https://wertpapiere.ing.de/investieren/fondsportrait/*

// @grant          none
// ==/UserScript==

(function() {
  'use strict';
  const bankingURL = "banking.ing.de/app/";
  const wertpapierURL = "wertpapiere.ing.de/investieren/fondsportrait/";

  // Basic functions
  function sToMs(s) {
    return s * 1000;
  }
  function minToMs(min) {
    return sToMs(min * 60);
  }
  function isSite(site) {
    return window.location.href.startsWith("https://" + site)
    || window.location.href.startsWith("https://www." + site);
  }

  window.addEventListener('load', function() {
    // Restore console.log, because DiBa disable it for some reason.
    // They also disable every other method exept error, but I don’t need those.
    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.documentElement.appendChild(iframe);
    let cleanConsole = iframe.contentWindow.console;
    /*for (const method of ["log", "info", "warn", "debug"]) {
      window.console[method] = cleanConsole[method].bind(window.console);
    }*/
    window.console.log = cleanConsole.log.bind(window.console);
    console.log("Console logs restored.");

    // Wait a few seconds after load event to finish loading.
    setTimeout(function() {
      /*
      * Auto-Refreshers
      */
      let millisecondsToWait;
      if (isSite(bankingURL)) {
        // Automatic login refresh.
        millisecondsToWait = Math.floor(minToMs(4.5));
        let refreshButton = document.getElementsByTagName("ING-HEADER")[0].shadowRoot.querySelector("ING-SESSION-DIALOG").shadowRoot.children[0].querySelector("ING-BUTTON");
        window.setInterval(function () {
          refreshButton.click();
          console.log("Session extended.");
        }, millisecondsToWait);
      } else if (isSite(wertpapierURL)) {
        // Automatic stocks refresh.
        millisecondsToWait = Math.floor(minToMs(59));
        window.setInterval(function() {
          window.dispatchEvent(new MouseEvent("mousemove"));
          console.log("Mouse moved.");
        }, millisecondsToWait);
      }
      console.log("Refresher loaded.");

      // Remove top ad banner.
      if (isSite(bankingURL)) {
        let adBanner = document.getElementsByClassName("content-container__inner")[0].children[2];
        if (adBanner?.className.length == 0) { // Ad banner has no class name, real stuff does.
          adBanner.remove();
          console.log("Banner removed.");
        }
      }
    }, sToMs(3));
  });
})();
