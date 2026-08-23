document.addEventListener("click", async (event) => {
  const diagram = event.target.closest(".mermaid");
  if (!diagram) return;

  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await diagram.requestFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  const diagram = document.fullscreenElement;
  if (!diagram?.classList.contains("mermaid")) return;

  requestAnimationFrame(() => {
    diagram.scrollTo({ top: 0, left: 0 });
  });
});
