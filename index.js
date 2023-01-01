// import * as googleTTS from 'google-tts-api'; // ES6 or TypeScript





const videoElement = document.getElementsByClassName('input_video')[0];
    const canvasElement = document.getElementsByClassName('output_canvas')[0];
    const canvasCtx = canvasElement.getContext('2d');

    let leftArmData;
    let leftShoulderRaw;
    let leftElbowRaw;
    let leftWristRaw;
    let leftknee;
    let leftankle;
    let leftwaist;
    let leftkneeData;

    let rightArmData;
    let rightShoulderRaw ;
     let rightElbowRaw ;
     let rightWristRaw;
     let rightknee;
     let rightankle;
     let rightwaist;
     let rightkneeData;


    // calculate angle between three points 
    // angle in radians : a,b,c are objects with x,y values
    function getAngleInRadians(A,B,C) {
      let BA = {
        x: A.x - B.x,
        y: A.y - B.y
      }

      let BC = {
        x: C.x - B.x,
        y: C.y - B.y
      }

      let UV = (BA.x * BC.x) + (BA.y * BC.y);
      let UVmod = Math.sqrt( Math.pow(BA.x, 2) + Math.pow(BA.y, 2)) +  Math.sqrt( Math.pow(BC.x, 2) + Math.pow(BC.y, 2))
      return Math.acos(UV/UVmod);
    }

function find_angle(A,B,C) {
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
}
function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}
    // const landmarkContainer = document.getElementsByClassName('landmark-grid-container')[0];
    // const grid = new LandmarkGrid(landmarkContainer);
    
    function onResults(results) {
      if (!results.poseLandmarks) {
        // grid.updateLandmarks([]);
        return;
      }
    
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.segmentationMask, 0, 0,
                          canvasElement.width, canvasElement.height);
    
      // Only overwrite existing pixels.
      canvasCtx.globalCompositeOperation = 'source-in';
       canvasCtx.fillStyle = "rgba(0, 0, 0, 0.1)"; // very low opacity
   
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-atop';
      canvasCtx.drawImage(
          results.image, 0, 0, canvasElement.width, canvasElement.height);
    
      canvasCtx.globalCompositeOperation = 'source-over';

      // all landmaks
     // console.log(results.poseLandmarks)












     leftShoulderRaw = results.poseLandmarks[11];
     leftElbowRaw = results.poseLandmarks[13];
     leftWristRaw = results.poseLandmarks[15];
     leftknee=results.poseLandmarks[25];
     leftankle=results.poseLandmarks[27];
     leftwaist=results.poseLandmarks[23];

     rightShoulderRaw=results.poseLandmarks[12];
     rightElbowRaw=results.poseLandmarks[14];
     rightWristRaw=results.poseLandmarks[16];
     rightknee=results.poseLandmarks[26];
     rightankle=results.poseLandmarks[28];
     rightwaist=results.poseLandmarks[24];


     leftArmData = [
      {
        x:leftShoulderRaw.x,
        y:leftShoulderRaw.y
      },
      {
        x:leftElbowRaw.x,
        y:leftElbowRaw.y
      },
      {
        x:leftWristRaw.x,
        y:leftWristRaw.y
      }
     ]


      let angle_arm = find_angle(leftArmData[0],leftArmData[1],leftArmData[2]);
     angle_arm=radians_to_degrees(angle_arm);

     rightArmData = [
      {
        x:rightShoulderRaw.x,
        y:rightShoulderRaw.y
      },
      {
        x:rightElbowRaw.x,
        y:rightElbowRaw.y
      },
      {
        x:rightWristRaw.x,
        y:rightWristRaw.y
      }
     ]

     let angle_arm_right=find_angle(rightArmData[0],rightArmData[1],rightArmData[2]);
     angle_arm_right=radians_to_degrees(angle_arm_right);






     leftkneeData = [
      {
        x:leftknee.x,
        y:leftknee.y
      },
      {
        x:leftankle.x,
        y:leftankle.y
      },
      {
        x:leftwaist.x,
        y:leftwaist.y
      }
     ]

     // console.log(leftArmData)

     let angle_knee = find_angle(leftkneeData[0],leftkneeData[1],leftkneeData[2]);
     angle_knee=radians_to_degrees(angle_knee);
     console.log(angle_knee);

     rightkneeData = [
      {
        x:rightknee.x,
        y:rightknee.y
      },
      {
        x:rightankle.x,
        y:rightankle.y
      },
      {
        x:rightwaist.x,
        y:rightwaist.y
      }
     ]
     let angle_knee_right = find_angle(rightkneeData[0],rightkneeData[1],rightkneeData[2]);
     angle_knee_right=radians_to_degrees(angle_knee);
    //  console.log(angle_knee_right);



    //  //THIS IS for KNEE ANGLEs
    //  if((angle_knee<=55 && angle_knee>36)|| (angle_knee_right<=55 && angle_knee_right>36)){
    //     document.getElementById("message").innerHTML="GOOD";
    //  }
    //  else{
    //     document.getElementById("message").innerHTML="not good ";
    //  }
    //  console.log(angle_knee);

     
    
    
    
    
    
    // AUDIO WALA PART
     
     
     if((angle_arm>165 || angle_arm_right>165) &&(angle_knee<=55 && angle_knee>36)|| (angle_knee_right<=55 && angle_knee_right>36) ){
            
            document.getElementById("message").innerHTML="Keep Up Soldier";
            var audio=new Audio("../public/audio/keepup.mp3")
            //   audio.play();

        
        var audio=new Audio("../public/audio/silence.wav");
        audio.play();
      setInterval(() => {
        
        
      }, 4000);
     }
     else{
      if(angle_arm<165 || angle_arm_right<165){
        
            document.getElementById("message").innerHTML="Fix Your Shoulder";
            var audio=new Audio("../public/audio/fixshoulder.mp3")
              audio.play();
        
        var audio=new Audio("../public/audio/silence.wav");
         audio.play();
      }
      else if (angle_knee>55 && angle_knee<36 || angle_knee_right>55 && angle_knee>36){
        
            document.getElementById("message").innerHTML="Watch your legs ";
            var audio=new Audio("../public/audio/watchlegs.mp3")
            //   audio.play();

        
        var audio=new Audio("../public/audio/silence.wav");
        audio.play();
      }
     }
     






     
    //  THIS IS FOR ARM ANGLE



    //  if(angle_arm>165 || angle_arm_right>165){
    //     document.getElementById("message").innerHTML="Nice ";
    //  }
    //  else{
    //     document.getElementById("message").innerHTML="HAHAHAAH ";
    //  }



















      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                     {color: '#FF4219', lineWidth: 4});
      drawLandmarks(canvasCtx, results.poseLandmarks,
                    {color: '#06FF76', lineWidth: 2});
      canvasCtx.restore();
    
      // grid.updateLandmarks(results.poseWorldLandmarks);
    }

    // for TTS 

    let text=document.getElementById("message");
    console.log(text);
    setInterval(() => {
        console.log(text);
    }, 1000);



  























    const pose = new Pose({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }});
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    pose.onResults(onResults);
    
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await pose.send({image: videoElement});
      },
      width: 1280,
      height: 720
    });
    camera.start();