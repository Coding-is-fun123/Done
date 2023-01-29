status="";
object=[];
function setup(){
    canvas=createCanvas(350,350);
    canvas.center();
    video= createCapture(VIDEO)
    video.size(350,350);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Object Not Found";
    input_box=document.getElementById("input").value;
    if(object[0].label==input_box){
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("status").innerHTML="Object Found!"
        utterThis= new SpeechSynthesisUtterance(input_box+"found");
        synth.speak(utterThis);
        
    }
    else{
        document.getElementById("status").innerHTML="Object NOT Found!" 
    }
}
function modelLoaded(){
    console.log("MODEL LOADED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    status=true;
}
function draw(){
    image(video,0,0,350,350);
        if(status!=""){
            objectDetector.detect(video,gotResult);
            for(i=0 ;i<object.length; i++){
               
                fill("white");
                percent= Math.floor(object[i].confidence * 100);
                text(object[i].label +" "+ percent + "%", object[i].x +20, object[i].y +20);
                noFill();
                stroke("white");
                rect(object[i].x,object[i].y, object[i].width,object[i].height);
            }
        }
    
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results)
    object=results;
}
