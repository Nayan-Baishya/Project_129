if(condition){
    counter++
}

if(stroke=='black'||stroke=='red'){
    line(30,40,25,50)
}

function setup() {
    cnavas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload() {


    classifier = ml5.imageClassifier('DoodleNet');
}


function clearCanvas() {

    background("white")
}

function draw() {


  // Set stroke wieght to 13
  strokeWeight(13);
  // Set stroke color to black
  stroke(0);
  // If mouse is pressed, draw line between previous and current mouse positions
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(reults);
  document.getElementById('label').innerHTML = 'label: ' + results[0].label;
  

  document.getElementById('confidence').innerHTML = 'confidence: ' + Math.round(results[0].confidence * 100) + '%';


  utterThis = new SpeechSynthesisUtterance(results[0],label);
  synth.speak(utterThis);
}