let history = [];

const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
// const undoButton = document.getElementById("");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const fontSizePicker = document.getElementById("Font-Size");
// const textInput = document.getElementById("textInput");
// const fontPicker = document.getElementById("fontPicker");

const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

//event listener for color picker change
