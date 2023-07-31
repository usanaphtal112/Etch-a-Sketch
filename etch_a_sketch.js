// Get the canvas and its context
const canvas = document.getElementById("etch-a-sketch");
const ctx = canvas.getContext("2d");

// Set the movement step for the cursor
const stepSize = 5;

// Set the default color
let currentColor = "black";

// Array of rainbow colors
const rainbowColors = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#9400D3",
];

let isDrawing = false;

// Draw the cursor at its current position
function drawCursor() {
  if (currentColor === "rainbow") {
    const rainbowIndex = Math.floor(Math.random() * rainbowColors.length);
    ctx.fillStyle = rainbowColors[rainbowIndex];
  } else {
    ctx.fillStyle = currentColor;
  }

  ctx.fillRect(cursorX, cursorY, 5, 5);

  if (isDrawing) {
    requestAnimationFrame(drawCursor);
  }
}

// Clear the canvas and redraw the cursor
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCursor();
}

// Handle mouse movement to draw on the canvas
canvas.addEventListener("mousemove", function (event) {
  const rect = canvas.getBoundingClientRect();
  cursorX = event.clientX - rect.left;
  cursorY = event.clientY - rect.top;

  // Start drawing as soon as the cursor enters the canvas area
  if (isDrawing) {
    drawCursor();
  }
});

// Handle mouseenter event to start drawing
canvas.addEventListener("mouseenter", function (event) {
  isDrawing = true;
  drawCursor();
});

// Handle mouseleave event to stop drawing
canvas.addEventListener("mouseleave", function (event) {
  isDrawing = false;
});

// Set initial cursor position
let cursorX = canvas.width / 2;
let cursorY = canvas.height / 2;

// Draw the cursor initially
drawCursor();

// Function to set the current drawing color
function setColor(color) {
  if (color === "rainbow") {
    currentColor = "rainbow";
  } else {
    currentColor = color;
  }
}
