import { createRoom } from "./room.js";
import { createPlayerController } from "./player.js";

const canvas=document.getElementById("gameCanvas");
const message=document.getElementById("message");
const tapMarker=document.getElementById("tapMarker");

const engine=new BABYLON.Engine(canvas,true,{preserveDrawingBuffer:true,stencil:true});
const scene=new BABYLON.Scene(engine);
scene.clearColor=new BABYLON.Color4(.035,.04,.05,1);
scene.collisionsEnabled=true;

createRoom(scene);
const player=createPlayerController({scene,canvas,message,tapMarker});

engine.runRenderLoop(()=>{player.update();scene.render();});
window.addEventListener("resize",()=>engine.resize());
document.addEventListener("gesturestart",e=>e.preventDefault(),{passive:false});
