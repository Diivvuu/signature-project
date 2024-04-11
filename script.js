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
colorPicker.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.strokeStyle = e.target.value;
});
//event listener for  canvas background color change
canvasColor.addEventListener('change', (e)=>{
    // setting background color to selected color
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

//event listening for mouse down on canvas
canvas.addEventListener('mousedown', (e)=>{
    //start drawing
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY
});

//event listener for mouse move on canvas
canvas.addEventListener('mousemove', (e)=>{
    //draw line for last point to current point
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        //update last coordinates to current coordinates
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});
//prevent context menu from appearing on right-click
canvas.addEventListener('contextmenu', (e)=>{
    e.preventDefault();
});
//event listener for mouse up on canvas
canvas.addEventListener('mouseup', (e)=>{
    //stopdrawing
    isDrawing = false;
});
//event listener for line width picker change
fontSizePicker.addEventListener('change', (e)=>{
    ctx.lineWidth = e.target.value;
});
//event listener for clear button click
clearButton.addEventListener('click', ()=>{
    //clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
//event listener for save button click
saveButton.addEventListener('click', ()=>{
    //save canvas image to local storage
    localStorage.setItem('canvasContents', canvas.toDataURL());

    //create a new <a> element to trigger download
    let link = document.createElement('a');
    link.download = 'my-signature.png';
    link.href = canvas.toDataURL();

    //Dispatch a click event on the <a> element to trigger download
    link.click();
})

//event listener for retrieve button click
retrieveButton.addEventListener('click',()=>{
    //retrieve saved canvas images data from local storage
    let savedCanvas = localStorage.getItem('canvasContents');
    if(savedCanvas){
        //create a new image element and set its source to saved canvas data
        let img = new Image();
        img.src = savedCanvas;

        //Draw the image onto the canvas
        img.onload = ()=>{
            ctx.drawImage(img, 0, 0);
        };
    }
});