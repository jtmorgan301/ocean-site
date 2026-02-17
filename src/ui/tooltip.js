export function showTooltip(text) {
  let box = document.getElementById("infoBox");

  if (!box) {
    box = document.createElement("div");
    box.id = "infoBox";
    document.body.appendChild(box);
  }

  box.innerText = text;
  box.style.position = "absolute";
  box.style.bottom = "20px";
  box.style.left = "20px";
  box.style.background = "rgba(0, 0, 0, 0.7)";
  box.style.color = "white";
  box.style.padding = "10px";
  box.style.borderRadius = "10px";
}
