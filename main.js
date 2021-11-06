nose_x = 0;
nose_y = 0;
difference = 0;
left_w_X = 0;
right_w_X = 0;
//no Y positions are required because wrists are only moving horizontally
function setup() {
    canvas = createCanvas(350, 300)
    canvas.position(100, 300)


    video = createCapture(VIDEO);
    video.size(350, 340);
    video.position(900, 260);

    //posenet starts here
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', getPoses)
}

function modelLoaded() {
    console.log("Posenet Loaded")
}
//results is an array as it stores 17 body parts
function getPoses(results) {
    if (results.length > 0) {
        console.log(results);
        nose_x= results[0].pose.nose.x;
        nose_y= results[0].pose.nose.y;
        left_w_X= results[0].pose.leftWrist.x;
        right_w_X= results[0].pose.rightWrist.x;
        difference= floor(left_w_X-right_w_X);
        console.log(difference);
        }

}

function draw() {
background("#94ded6");
    document.getElementById("size").innerHTML= difference + "px";
    fill("tomato")
    stroke("black")
    strokeWeight(5)
    square(nose_x, nose_y, difference)
}