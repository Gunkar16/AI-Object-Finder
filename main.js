function setup(){
    canvas = createCanvas(350,250)
    canvas.center();
    canvas.position(590,350);
    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video,0,0,350,250)
}