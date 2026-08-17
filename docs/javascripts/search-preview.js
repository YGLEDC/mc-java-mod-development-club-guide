/* Turn Material's full-section search previews into compact, scannable cards. */
(function () {
  "use strict";

  function makeIcon(isPage) {
    var icon = document.createElement("span");
    icon.className = "search-card__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = isPage ? "" : "#";
    return icon;
  }

  function makeSnippet(match) {
    if (!match) return null;

    var source = match.closest("p, li, pre, code") || match.parentElement;
    var text = source.textContent.replace(/\s+/g, " ").trim();
    var word = match.textContent.trim();
    var position = text.toLocaleLowerCase().indexOf(word.toLocaleLowerCase());
    if (position < 0) position = 0;

    var start = Math.max(0, position - 72);
    var end = Math.min(text.length, position + word.length + 105);
    var excerpt = text.slice(start, end);
    var localPosition = position - start;

    var snippet = document.createElement("p");
    snippet.className = "search-card__snippet";
    if (start) snippet.append("…");
    snippet.append(excerpt.slice(0, localPosition));

    var highlight = document.createElement("mark");
    highlight.textContent = excerpt.slice(localPosition, localPosition + word.length);
    snippet.append(highlight, excerpt.slice(localPosition + word.length));
    if (end < text.length) snippet.append("…");
    return snippet;
  }

  function buildCards(results) {
    var pageTitle = "";

    results.querySelectorAll(".md-search-result__article").forEach(function (article) {
      var heading = article.querySelector("h1, h2, h3, h4, h5, h6");
      if (!heading) return;

      var isPage = heading.tagName === "H1";
      var titleText = heading.textContent.trim();
      if (isPage) pageTitle = titleText;
      if (article.dataset.searchCard === "true") {
        if (isPage) pageTitle = article.dataset.pageTitle || titleText;
        return;
      }

      var firstMatch = Array.from(article.querySelectorAll("mark"))
        .find(function (mark) { return !heading.contains(mark); });

      var title = document.createElement("div");
      title.className = "search-card__title";
      title.innerHTML = heading.innerHTML;

      var body = document.createElement("div");
      body.className = "search-card__body";

      if (!isPage && pageTitle) {
        var parent = document.createElement("div");
        parent.className = "search-card__page";
        parent.textContent = pageTitle;
        body.append(parent);
      }
      body.append(title);

      var snippet = makeSnippet(firstMatch);
      if (snippet) body.append(snippet);

      article.replaceChildren(makeIcon(isPage), body);
      article.classList.add("search-card");
      if (isPage) article.classList.add("search-card--page");
      article.dataset.searchCard = "true";
      article.dataset.pageTitle = pageTitle;
    });
  }

  function start() {
    var results = document.querySelector('[data-md-component="search-result"]');
    if (!results || results.dataset.cardSearch === "true") return;

    results.dataset.cardSearch = "true";
    buildCards(results);
    var renderTimer;
    new MutationObserver(function () {
      window.clearTimeout(renderTimer);
      // Material builds each result in stages; wait until its excerpt is ready.
      renderTimer = window.setTimeout(function () {
        buildCards(results);
      }, 80);
    }).observe(results, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
