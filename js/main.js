const canvas = document.getElementById("gameCanvas");

const engine = new BABYLON.Engine(canvas, true);

function createScene() {

    const scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color4(
        0.05,
        0.06,
        0.07,
        1
    );

    const camera = new BABYLON.UniversalCamera(
        "Player",
        new BABYLON.Vector3(
            0,
            1.7,
            -4
        ),
        scene
    );

    camera.setTarget(
        new BABYLON.Vector3(
            0,
            1.5,
            0
        )
    );

    camera.attachControl(canvas, true);

    camera.speed = 0.25;

    const light = new BABYLON.HemisphericLight(
        "Light",
        new BABYLON.Vector3(
            0,
            1,
            0
        ),
        scene
    );

    light.intensity = 0.95;

    const floor = BABYLON.MeshBuilder.CreateGround(
        "Floor",
        {
            width:10,
            height:10
        },
        scene
    );

    const mat = new BABYLON.StandardMaterial(
        "FloorMaterial",
        scene
    );

    mat.diffuseColor = new BABYLON.Color3(
        0.25,
        0.20,
        0.16
    );

    floor.material = mat;

    return scene;
}

const scene = createScene();

engine.runRenderLoop(function(){

    scene.render();

});

window.addEventListener("resize",function(){

    engine.resize();

});