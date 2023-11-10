const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const brushcolor = document.getElementById("color-picker");
const brushwidth = document.getElementById("range");
const eraser = document.querySelector(".eraser");
const brush = document.querySelector(".brush");
const clear = document.querySelector(".clear");
const save = document.querySelector(".save");
const rangevalue = document.querySelector(".rangevalue");
let isDrawing = false;
let currentcolor = "";
let currentsize = 5;
window.addEventListener("load", (e) => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function startdraw(e) {
  if (e.target.nodeName != "CANVAS") return;
  ctx.beginPath();
  ctx.lineWidth = currentsize;
  isDrawing = true;
}
function drawing(e) {
  if (!isDrawing || e.target.nodeName != "CANVAS") return (isDrawing = false);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = `${currentcolor}`;
  ctx.stroke();
}
function enddraw() {
  isDrawing = false;
}
window.addEventListener("mousedown", startdraw);
window.addEventListener("mousemove", drawing);
window.addEventListener("mouseup", enddraw);
// canvas.addEventListener("mousedown", startdraw);
// canvas.addEventListener("mousemove", drawing);
// canvas.addEventListener("mouseup", enddraw);

brushwidth.addEventListener("change", (e) => {
  currentsize = brushwidth.value;
  rangevalue.style.visibility = "visible";
  rangevalue.textContent = currentsize;
  setTimeout(() => {
    rangevalue.style.visibility = "hidden";
  }, 1500);
});
brushcolor.addEventListener("change", () => {
  currentcolor = brushcolor.value;
});
eraser.addEventListener("click", () => {
  currentcolor = "white";
  eraser.classList.add("active");
  brush.classList.remove("active");
});
brush.addEventListener("click", () => {
  currentcolor = brushcolor.value;
  eraser.classList.remove("active");
  brush.classList.add("active");
});
clear.addEventListener("click", () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
save.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = `${Date("YYYY - MM - DD")}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});
