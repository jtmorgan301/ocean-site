let tooltip;

export function createTooltip() {
  tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.bottom = "40px";
  tooltip.style.left = "40px";
  tooltip.style.padding = "12px 18px";
  tooltip.style.background = "rgba(0, 0, 0, 0.7)";
  tooltip.style.color = "white";
  tooltip.style.borderRadius = "12px";
  tooltip.style.fontFamily = "sans-serif";
  tooltip.style.fontSize = "14px";
  tooltip.style.display = "none";
  tooltip.style.backdropFilter = "blur(6px)";
  document.body.appendChild(tooltip);
}

export function showTooltip(text) {
  if (!tooltip) return;
  tooltip.innerText = text;
  tooltip.style.display = "block";
  
}

export function hideTooltip() {
  if (!tooltip) return;
  tooltip.style.display = "none";
}