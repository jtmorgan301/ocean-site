let tooltipElement = null;

export function createTooltip() {
  tooltipElement = document.createElement("div");
  tooltipElement.id = "tooltip";
  tooltipElement.style.position = "absolute";
  tooltipElement.style.display = "none";
  tooltipElement.style.background = "rgba(0,0,0,0.7)";
  tooltipElement.style.color = "white";
  tooltipElement.style.padding = "8px";
  tooltipElement.style.borderRadius = "6px";
  tooltipElement.style.pointerEvents = "none";

  document.body.appendChild(tooltipElement);
}

export function showTooltip(text, x, y) {
  if (!tooltipElement) return;

  tooltipElement.innerText = text;
  tooltipElement.style.left = x + 15 + "px";
  tooltipElement.style.top = y + 15 + "px";
  tooltipElement.style.display = "block";
}

export function hideTooltip() {
  if (!tooltipElement) return;

  tooltipElement.style.display = "none";
}