objectname = "";
objects = [];

function setup(){
    canvas = createCanvas(350,250)
    canvas.position(590,400);

    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    video.play();
    ObjectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"

    objectname = document.getElementById("input").value;
    console.log(objectname)
}

function draw(){
    image(video,0,0,350,250)
        if(status != ""){
            ObjectDetector.detect(video,gotResult);
            console.log(objects.length);
                for(i=0;i<objects.length;i++){
                    document.getElementById("status").innerHTML = "Status : Detected Objects";
                    document.getElementById("found").innerHTML = objectname + " found";
                    fill('red');
                    percent = floor(objects[i].confidence * 100);
                    text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
                    noFill();
                    stroke('red');
                    rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
                    if(objects[i].label == objectname){
                        video.stop();
                        console.log("match found")
                        document.getElementById("found").innerHTML = objectname + " found";
                        synth = window.speechSynthesis;
                        utterThis = new SpeechSynthesisUtterance(objectname + "found");
                        synth.speak(utterThis);
                    }
                    else{
                        synth = window.speechSynthesis;
                        utterThis = new SpeechSynthesisUtterance("Object not found");
                        synth.speak(utterThis);
                        document.getElementById("found").innerHTML = objectname + " Not found";
                    }
                }
            }
        }


function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
        console.log(objects)
    }
}