export function createPlayerController({scene,canvas,message,tapMarker}){
 const camera=new BABYLON.UniversalCamera("playerCamera",new BABYLON.Vector3(0,1.65,-1.5),scene);
 camera.minZ=.05;camera.speed=0;camera.angularSensibility=100000;
 camera.checkCollisions=true;camera.applyGravity=false;
 camera.ellipsoid=new BABYLON.Vector3(.35,.82,.35);
 camera.ellipsoidOffset=new BABYLON.Vector3(0,-.82,0);
 scene.activeCamera=camera;

 let destination=null,activePointerId=null,startX=0,startY=0,lastX=0,lastY=0,dragging=false;
 const dragThreshold=8,lookSensitivity=.004,moveSpeed=.055,stopDistance=.16;

 function showMarker(x,y){
   tapMarker.style.left=`${x}px`;tapMarker.style.top=`${y}px`;tapMarker.style.opacity="1";
   setTimeout(()=>tapMarker.style.opacity="0",300);
 }

 function pickWalkPoint(x,y){
   const rect=canvas.getBoundingClientRect();
   const pick=scene.pick(x-rect.left,y-rect.top,m=>Boolean(m.metadata?.walkable),false,camera);
   if(!pick?.hit||!pick.pickedPoint)return;
   destination=pick.pickedPoint.clone();destination.y=camera.position.y;
   showMarker(x,y);message.textContent="Walking...";
 }

 function down(e){
   if(activePointerId!==null)return;
   activePointerId=e.pointerId;startX=lastX=e.clientX;startY=lastY=e.clientY;dragging=false;
   canvas.setPointerCapture?.(e.pointerId);
 }
 function move(e){
   if(e.pointerId!==activePointerId)return;
   const totalX=e.clientX-startX,totalY=e.clientY-startY;
   if(Math.hypot(totalX,totalY)>dragThreshold)dragging=true;
   if(!dragging)return;
   const dx=e.clientX-lastX,dy=e.clientY-lastY;
   camera.rotation.y+=dx*lookSensitivity;
   camera.rotation.x+=dy*lookSensitivity;
   camera.rotation.x=BABYLON.Scalar.Clamp(camera.rotation.x,-1.15,1.15);
   lastX=e.clientX;lastY=e.clientY;
 }
 function up(e){
   if(e.pointerId!==activePointerId)return;
   if(!dragging)pickWalkPoint(e.clientX,e.clientY);
   activePointerId=null;dragging=false;canvas.releasePointerCapture?.(e.pointerId);
 }

 canvas.addEventListener("pointerdown",down);
 canvas.addEventListener("pointermove",move);
 canvas.addEventListener("pointerup",up);
 canvas.addEventListener("pointercancel",up);

 function update(){
   if(!destination)return;
   const offset=destination.subtract(camera.position);offset.y=0;
   const distance=offset.length();
   if(distance<=stopDistance){
     destination=null;message.textContent="Drag to look. Tap the floor to walk.";return;
   }
   const movement=offset.normalize().scale(Math.min(moveSpeed,distance));
   camera.moveWithCollisions(movement);
 }

 return {camera,update};
}
