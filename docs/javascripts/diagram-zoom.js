document.addEventListener("click", async (event) => {
  const diagram = event.target.closest(".mermaid");
  if (!diagram) return;

  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await diagram.requestFullscreen();
  }
});
