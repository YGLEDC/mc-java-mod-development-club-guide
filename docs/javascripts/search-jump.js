/* Move a visitor from a search result's section heading to the first match. */
(function () {
  "use strict";

  function findRelevantMatch() {
    var params = new URLSearchParams(window.location.search);
    if (!params.get("h")) return null;

    var matches = Array.from(
      document.querySelectorAll(".md-content mark[data-md-highlight]")
    );
    if (!matches.length) return null;

    if (!window.location.hash) return matches[0];

    var target;
    try {
      target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    } catch (_error) {
      target = document.getElementById(window.location.hash.slice(1));
    }
    if (!target) return matches[0];

    var targetTop = target.getBoundingClientRect().top + window.scrollY;
    return matches.find(function (match) {
      return match.getBoundingClientRect().top + window.scrollY >= targetTop - 2;
    }) || matches[0];
  }

  function jumpToMatch() {
    var match = findRelevantMatch();
    if (!match) return false;

    match.scrollIntoView({ behavior: "smooth", block: "center" });
    match.classList.remove("search-jump-target");
    // Restart the visual cue when revisiting a result on the same page.
    void match.offsetWidth;
    match.classList.add("search-jump-target");
    window.setTimeout(function () {
      match.classList.remove("search-jump-target");
    }, 1400);
    return true;
  }

  function scheduleJump() {
    if (!new URLSearchParams(window.location.search).get("h")) return;

    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (jumpToMatch() || attempts >= 20) window.clearInterval(timer);
    }, 50);
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(scheduleJump);
  } else {
    document.addEventListener("DOMContentLoaded", scheduleJump);
  }
})();
