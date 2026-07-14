export function createRoom(scene){
 const roomWidth=10,roomDepth=8,roomHeight=3.2,wallThickness=.18;

 const wallMaterial=new BABYLON.StandardMaterial("wallMaterial",scene);
 wallMaterial.diffuseColor=new BABYLON.Color3(.42,.38,.34);
 wallMaterial.specularColor=new BABYLON.Color3(.03,.03,.03);

 const floorMaterial=new BABYLON.StandardMaterial("floorMaterial",scene);
 floorMaterial.diffuseColor=new BABYLON.Color3(.22,.16,.12);
 floorMaterial.specularColor=new BABYLON.Color3(.06,.06,.06);

 const ceilingMaterial=new BABYLON.StandardMaterial("ceilingMaterial",scene);
 ceilingMaterial.diffuseColor=new BABYLON.Color3(.35,.35,.34);

 const floor=BABYLON.MeshBuilder.CreateGround("walkableFloor",{width:roomWidth,height:roomDepth},scene);
 floor.material=floorMaterial;floor.checkCollisions=true;floor.metadata={walkable:true};

 const ceiling=BABYLON.MeshBuilder.CreateBox("ceiling",{width:roomWidth,depth:roomDepth,height:wallThickness},scene);
 ceiling.position.y=roomHeight;ceiling.material=ceilingMaterial;ceiling.checkCollisions=true;

 function wall(name,width,depth,x,z){
   const m=BABYLON.MeshBuilder.CreateBox(name,{width,depth,height:roomHeight},scene);
   m.position.set(x,roomHeight/2,z);m.material=wallMaterial;m.checkCollisions=true;return m;
 }
 wall("northWall",roomWidth,wallThickness,0,roomDepth/2);
 wall("southWall",roomWidth,wallThickness,0,-roomDepth/2);
 wall("westWall",wallThickness,roomDepth,-roomWidth/2,0);
 wall("eastWall",wallThickness,roomDepth,roomWidth/2,0);

 const doorMat=new BABYLON.StandardMaterial("doorMaterial",scene);
 doorMat.diffuseColor=new BABYLON.Color3(.25,.13,.07);
 const door=BABYLON.MeshBuilder.CreateBox("door",{width:1.05,height:2.2,depth:.12},scene);
 door.position.set(2.7,1.1,roomDepth/2-.12);door.material=doorMat;door.checkCollisions=true;

 const glassMat=new BABYLON.StandardMaterial("glassMaterial",scene);
 glassMat.diffuseColor=new BABYLON.Color3(.08,.16,.23);glassMat.alpha=.72;
 const windowMesh=BABYLON.MeshBuilder.CreateBox("window",{width:2.2,height:1.25,depth:.08},scene);
 windowMesh.position.set(-2.4,1.8,roomDepth/2-.11);windowMesh.material=glassMat;

 const frameMat=new BABYLON.StandardMaterial("windowFrameMaterial",scene);
 frameMat.diffuseColor=new BABYLON.Color3(.12,.12,.13);

 const top=BABYLON.MeshBuilder.CreateBox("windowFrameTop",{width:2.35,height:.09,depth:.14},scene);
 top.position.set(-2.4,2.46,roomDepth/2-.13);top.material=frameMat;
 const bottom=top.clone("windowFrameBottom");bottom.position.y=1.14;

 const left=BABYLON.MeshBuilder.CreateBox("windowFrameLeft",{width:.09,height:1.4,depth:.14},scene);
 left.position.set(-3.53,1.8,roomDepth/2-.13);left.material=frameMat;
 const right=left.clone("windowFrameRight");right.position.x=-1.27;
 const center=left.clone("windowCenterBar");center.position.x=-2.4;

 const rugMat=new BABYLON.StandardMaterial("rugMaterial",scene);
 rugMat.diffuseColor=new BABYLON.Color3(.08,.17,.27);
 const rug=BABYLON.MeshBuilder.CreateGround("rug",{width:3.5,height:2.4},scene);
 rug.position.y=.012;rug.position.z=.4;rug.material=rugMat;rug.metadata={walkable:true};

 const couchMat=new BABYLON.StandardMaterial("couchPlaceholderMaterial",scene);
 couchMat.diffuseColor=new BABYLON.Color3(.32,.20,.14);
 const couch=BABYLON.MeshBuilder.CreateBox("couchPlaceholder",{width:3.4,height:.85,depth:1.2},scene);
 couch.position.set(-2.4,.425,-2.7);couch.material=couchMat;couch.checkCollisions=true;
 const couchBack=BABYLON.MeshBuilder.CreateBox("couchBackPlaceholder",{width:3.4,height:1,depth:.25},scene);
 couchBack.position.set(-2.4,1.05,-3.2);couchBack.material=couchMat;couchBack.checkCollisions=true;

 const hemi=new BABYLON.HemisphericLight("hemisphericLight",new BABYLON.Vector3(0,1,0),scene);
 hemi.intensity=.55;
 const warm=new BABYLON.PointLight("warmLight",new BABYLON.Vector3(-2.5,2.65,-1.6),scene);
 warm.diffuse=new BABYLON.Color3(1,.72,.48);warm.intensity=.85;warm.range=8;
 const cool=new BABYLON.PointLight("coolLight",new BABYLON.Vector3(2.8,2.4,2.2),scene);
 cool.diffuse=new BABYLON.Color3(.35,.55,1);cool.intensity=.45;cool.range=7;
}
