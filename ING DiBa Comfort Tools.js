// ==UserScript==
// @name           ING DiBa Comfort Tools

// @description    Automatically refreshes login on German DiBa site.
// @description:de Erneuert automatisch den Login auf der DiBa website.

// @version        0.1.0
// @author         Rsge
// @copyright      2023+, Jan G. (Rsge)
// @license        Mozilla Public License 2.0
// @icon           https://banking.ing.de/app/obligo/static/resource/icon-16x16-ver-34F56DF9647FC5EF3BBEFA31470B5827.png

// @namespace      https://github.com/Rsge
// @homepageURL    https://github.com/Rsge/ING-DiBa-Comfort-Tools
// @supportURL     https://github.com/Rsge/ING-DiBa-Comfort-Tools/issues

// @match          https://banking.ing.de/app/*
// @match          https://wertpapiere.ing.de/Investieren/*/Charts/*

// @grant          none
// ==/UserScript==

(function() {
  'use strict';

  // -- Auto-Refreshers --
  var millisecondsToWait
  const minsToMSMult = 60 * 1000
  // Automatic login refresh.
  millisecondsToWait = Math.floor(4.5 * minsToMSMult);
  window.setInterval(function () {window.dispatchEvent(new CustomEvent("ingde-sn:reset-timer"));}, millisecondsToWait);
})();
