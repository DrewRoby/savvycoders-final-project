/* eslint-disable complexity, camelcase */
var coreShape = new C2S( 100, 200 );
var sstgShape = new C2S( 200, 200 );
var steamGeneratorShape = new C2S( 200, 200 );
var condenserShape = new C2S( 300,200 );
var rxCoolantPumpShape = new C2S( 100, 50 );
var feedPumpShape = new C2S( 100, 50 );
var piping1_1 = new C2S( 100, 400 );
var piping1_2 = new C2S( 300, 400 );
var piping2_1 = new C2S( 400, 200 );
var piping2_2 = new C2S( 400, 200 );

var core = {
    "tCold": 75,
    "tHot": 75,
    "tFuel": 75,
    "tSG": 75,
    "maxTemp": 5000,
    "pressure": 0,
    "rodHeight": 0,
    "shimSpeed": 1.0, // Do I need this?
    "currentPower": 0
};

// var pressurizer = {
//     "heatersOn": false,
//     "sprayOn": false
// }; // TODO:

var pumps = {
    "rxCoolant": {
        "availableSpeed": [ "idle","run" ],
        "currentSpeed": "idle"
    },
    "feed": {
        "availableSpeed": [ "idle","run" ],
        "currentSpeed": "idle"
    },
    // "condensate": {
    //     "availableSpeed": [ "idle","run" ],
    //     "currentSpeed": "idle"
    // } TODO
};

// var valves = {
//     "pressurizerSpray": {
//         "isOpen": false
//     },
//
//     "feed": {
//         "percentOpen": 0
//     },
//     "mainEngineThrottle": {
//         "percentOpen": 0
//     },
//     "tgThrottle": {
//         "percentOpen": 0
//     }
// }; TODO

var steamGenerator = {
    "waterLevel": 75, // in percent of total
    "temp": 75,
    "pressure": 0,
};

var turbineGenerator = {
    "percentSteamDemand": 0,
    "maxSteamDemand": 20,
    "rpmSpeed": 0,
    "maxSpeed": 100,
};

// var mainEngine = {
//     "percentSteamDemand": 0,
//     "maxSteamDemand": 80
// }; // TODO:

var condenser = {
    "waterLevel": 50 // in percent of total
};

var rxCoolantSwitch = document.querySelector( "#rxCoolantSwitch" );
var feedSwitch = document.querySelector( "#feedSwitch" );


function drawCore( ctx ){
    ctx.beginPath();
    ctx.moveTo( 0, 10 );
    ctx.lineTo( 0, 130 );
    ctx.arc( 50, 130, 50, Math.PI, 0, true );
    ctx.lineTo( 100,10 );
    ctx.lineTo( 90,10 );
    ctx.lineTo( 90,0 );
    ctx.lineTo( 10,0 );
    ctx.lineTo( 10,10 );
    ctx.lineTo( 0, 10 );
    ctx.moveTo( 45, 180 );
    ctx.lineTo( 45, 200 );
    ctx.moveTo( 55, 200 );
    ctx.lineTo( 55, 180 );
    // ctx.clip();
    ctx.closePath();
    ctx.stroke();
}

function drawSSTG( ctx ){
    ctx.beginPath();
    ctx.moveTo( 0, 40 );
    ctx.lineTo( 150, 0 );
    ctx.lineTo( 150, 145 );
    ctx.lineTo( 0, 95 );
    ctx.closePath();
    ctx.stroke();
}

function drawSteamGenerator( ctx ){
    ctx.beginPath();
    ctx.moveTo( 150,50 );
    ctx.arc( 100,50,50,0,Math.PI, true );
    ctx.lineTo( 50,100 );
    ctx.lineTo( 15, 100 );
    ctx.lineTo( 15, 120 );
    ctx.moveTo( 15, 130 );
    ctx.lineTo( 15, 170 );
    ctx.moveTo( 15, 180 );
    ctx.lineTo( 15,200 );
    ctx.lineTo( 150, 200 );
    ctx.arc( 150,150,50,Math.PI / 2,Math.PI * 1.5,true );
    ctx.lineTo( 150,50 );
    ctx.stroke();
}

function drawCondenser( ctx ){
    ctx.beginPath();
    ctx.moveTo( 75,0 );
    ctx.arc( 75, 75, 75, Math.PI * 1.5, Math.PI / 2, true );
    ctx.lineTo( 225, 150 );
    ctx.arc( 225, 75, 75, Math.PI / 2, Math.PI * 1.5, true );
    ctx.closePath();
    ctx.stroke();
}

function drawPiping1_1( ctx ){
    ctx.beginPath();
    // Above Rx
    ctx.moveTo( 45, 100 );
    ctx.lineTo( 45, 55 );
    ctx.arc( 50, 50, 5, Math.PI, Math.PI * 1.5, false );
    ctx.lineTo( 100, 45 );
    ctx.moveTo( 55, 100 );
    ctx.lineTo( 55, 55 );
    ctx.lineTo( 100, 55 );
    // Below Rx
    ctx.moveTo( 45, 300 );
    ctx.arc( 50, 305, 5, Math.PI, Math.PI / 2, true );
    ctx.lineTo( 100, 310 );
    ctx.moveTo( 100, 300 );
    ctx.lineTo( 55, 300 );
    ctx.stroke();
}

function drawPiping1_2( ctx ){
    // Outer side
    ctx.beginPath();
    ctx.moveTo( 0, 45 );
    ctx.lineTo( 45, 45 );
    ctx.arc( 50, 50, 5, Math.PI * 1.5, 0, false );
    ctx.lineTo( 55, 120 );
    ctx.lineTo( 250, 120 );
    ctx.arc( 250, 150, 30, Math.PI * 1.5, Math.PI * 0.5, false );
    ctx.lineTo( 55, 180 );
    ctx.lineTo( 55, 245 );
    ctx.lineTo( 125, 245 );
    ctx.arc( 125, 250, 5, Math.PI * 1.5, 0, false );
    ctx.lineTo( 130, 320 );
    ctx.arc( 125, 325, 5, 0, Math.PI / 2, false );
    ctx.lineTo( 100, 330 );
    // Inner side
    ctx.moveTo( 0, 55 );
    ctx.lineTo( 45, 55 );
    ctx.lineTo( 45, 120 );
    ctx.arc( 50, 125, 5, Math.PI, Math.PI / 2, true );
    ctx.lineTo( 250,130 );
    ctx.arc( 250, 150, 20, Math.PI * 1.5, Math.PI / 2,false );
    ctx.lineTo( 55, 170 );
    ctx.arc( 50, 175, 5, Math.PI * 1.5, Math.PI, true );
    ctx.lineTo( 45,245 );
    ctx.arc( 50, 250, 5, Math.PI, Math.PI / 2, true );
    ctx.lineTo( 120, 255 );
    ctx.lineTo( 120, 320 );
    ctx.lineTo( 100, 320 );
    ctx.stroke();
}

function drawPiping2_1( ctx ){
    ctx.beginPath();
    ctx.moveTo( 0,0 );
    ctx.lineTo( 210, 0 );
    ctx.arc( 210, 5, 5, Math.PI * 1.5, 0, false );
    ctx.lineTo( 215, 35 );
    ctx.moveTo( 30, 10 );
    ctx.lineTo( 205, 10 );
    ctx.lineTo( 205, 38 );

    ctx.moveTo( 340, 142 );
    ctx.lineTo( 340, 200 );
    ctx.moveTo( 330, 138 );
    ctx.lineTo( 330, 200 );
    ctx.stroke();
}

function drawPiping2_2( ctx ){
    ctx.beginPath();
    ctx.moveTo( 340, 150 );
    ctx.lineTo( 340, 170 );
    ctx.lineTo( 200, 170 );
    ctx.moveTo( 350, 150 );
    ctx.lineTo( 350, 170 );
    ctx.arc( 345, 175, 5, 0, Math.PI * 0.5, false );
    ctx.lineTo( 200, 180 );
    ctx.moveTo( 100, 150 );
    ctx.lineTo( 10, 150 );
    ctx.lineTo( 10, 0 );
    ctx.moveTo( 100, 160 );
    ctx.lineTo( 10,160 );
    ctx.arc( 5, 155, 5, Math.PI * 0.5, Math.PI, false );
    ctx.lineTo( 0,0 );
    ctx.stroke();
}

function drawRxCoolantPump( ctx ){
    ctx.beginPath();
    ctx.moveTo( 100, 30 );
    ctx.lineTo( 50, 30 );
    ctx.arc( 50, 25, 5, Math.PI * 0.5, Math.PI * 1.5, false );
    ctx.lineTo( 100, 20 );
    ctx.moveTo( 75, 20 );
    ctx.arc( 50, 25, 25, Math.PI * 1.9, Math.PI * 1.5, true );
    ctx.lineTo( 0, 0 );
    ctx.moveTo( 0, 10 );
    ctx.lineTo( 25, 10 );
    ctx.arc( 50, 25, 25, Math.PI * 1.2, Math.PI * 0.07, true );
    ctx.stroke();
}

function drawFeedPump( ctx ){
    ctx.beginPath();
    ctx.moveTo( 100, 30 );
    ctx.lineTo( 50, 30 );
    ctx.arc( 50, 25, 5, Math.PI * 0.5, Math.PI * 1.5, false );
    ctx.lineTo( 100, 20 );
    ctx.moveTo( 75, 20 );
    ctx.arc( 50, 25, 25, Math.PI * 1.9, Math.PI * 1.5, true );
    ctx.lineTo( 0, 0 );
    ctx.moveTo( 0, 10 );
    ctx.lineTo( 25, 10 );
    ctx.arc( 50, 25, 25, Math.PI * 1.2, Math.PI * 0.07, true );
    ctx.stroke();
}

function fillGradient( object, color1, color2 ){
    let gradient = object.getContext( "2d" ).createLinearGradient( object.width / 2,object.height,object.width / 2,0 );

    gradient.addColorStop( 0, color1 );
    gradient.addColorStop( 1, color2 );
}


drawCore( coreShape );
drawSSTG( sstgShape );
drawSteamGenerator( steamGeneratorShape );
drawCondenser( condenserShape );
drawRxCoolantPump( rxCoolantPumpShape );
drawFeedPump( feedPumpShape );
drawPiping1_1( piping1_1 );
drawPiping1_2( piping1_2 );
drawPiping2_1( piping2_1 );
drawPiping2_2( piping2_2 );

document.querySelector( "#core" ).innerHTML = coreShape.getSerializedSvg();
document.querySelector( "#sstg" ).innerHTML = sstgShape.getSerializedSvg();
document.querySelector( "#steamGenerator" ).innerHTML = steamGeneratorShape.getSerializedSvg();
document.querySelector( "#condenser" ).innerHTML = condenserShape.getSerializedSvg();
document.querySelector( "#rxCoolantPump" ).innerHTML = rxCoolantPumpShape.getSerializedSvg();
document.querySelector( "#feedPump" ).innerHTML = feedPumpShape.getSerializedSvg();
document.querySelector( "#piping1_1" ).innerHTML = piping1_1.getSerializedSvg();
document.querySelector( "#piping1_2" ).innerHTML = piping1_2.getSerializedSvg();
document.querySelector( "#piping2_1" ).innerHTML = piping2_1.getSerializedSvg();
document.querySelector( "#piping2_2" ).innerHTML = piping2_2.getSerializedSvg();



// Fun with Reactor Controls
var hotReadout = document.querySelector( "#tHot" );
hotReadout.innerHTML += "<h2>" + core.tHot + "</h2>";
var fuelReadout = document.querySelector( "#tFuel" );
fuelReadout.innerHTML += "<h2>" + core.tFuel + "</h2>";
var coldReadout = document.querySelector( "#tCold" );
coldReadout.innerHTML += "<h2>" + core.tCold + "</h2>";
var sgReadout = document.querySelector( "#tSG" );
sgReadout.innerHTML += "<h2>" + core.tSG + "</h2>";
var shimOutButton = document.getElementById( "shimOut" );
var shimInButton = document.getElementById( "shimIn" );
var rcpSwitch = document.querySelector( "#rxCoolantSwitch" );


function changeElementTemp(diff, coreElem){
    let targetTemp = core.rodHeight * 25 + 75;
    if( diff > 0 ){
      core[coreElem] += 1
    }
    else if( diff < 0 ){
      core[coreElem] -= 1
    }
}

const delay = ( ms ) => new Promise(resolve =>
  setTimeout( resolve, ms )
)

function calcTargetTemp(elem){
  let targetTemp = 0;

  if (elem == "tFuel"){
    targetTemp = core.rodHeight * 25 + 75;
  } else if (elem == "tHot") {
    if (core.rodHeight<2){
      targetTemp = core.tFuel

    }else {
      targetTemp = core.tFuel - 25
    }
  } else if (elem == "tCold"){
    targetTemp = core.tSG + 5
  } else if (elem == "tSG"){
    targetTemp = core.tHot - 10
  }
  return targetTemp;
}

const changeTemp = async function (ms, coreElem){
  let targetTemp = calcTargetTemp(coreElem)
  let diff = targetTemp - core[coreElem];

  while (diff !==  0){
    changeElementTemp(diff, coreElem);
    diff = targetTemp - core[coreElem];
    document.querySelector( "#"+coreElem ).innerHTML = "<h2>" + core[coreElem] + "</h2>";
    console.log(core.rodHeight, targetTemp, core[coreElem], diff)
    targetTemp = calcTargetTemp(coreElem)
    await delay(ms);

  }
}

shimOutButton.addEventListener( "click",function shimOut(){
  core.rodHeight += 1;
  changeTemp(250, "tFuel");
} );

shimInButton.addEventListener( "click",function shimIn(){
  if( core.rodHeight ){
    core.rodHeight -= 1;
    changeTemp(500, "tFuel")
  }
});


//Fun with Pump Controls
function changePumpSpeed( pumpID ){
  if( pumpID.currentSpeed === "idle" ){
    pumpID.currentSpeed = "run";
    changeTemp(750, "tHot");
    changeTemp(1000, "tSG");
    changeTemp(1250, "tCold");

    return "O";
  }
  pumpID.currentSpeed = "idle";

  return "X";
}


rcpSwitch.addEventListener("click",(_ => rcpSwitch.innerHTML = changePumpSpeed(pumps.rxCoolant)))
feedSwitch.addEventListener("click",(_ => feedSwitch.innerHTML = changePumpSpeed(pumps.rxCoolant)))

// rxCoolantSwitch.addEventListener( "click",rxCoolantSwitch.innerHTML = changePumpSpeed( pumps.rxCoolant ) );
// fillGradient( coreShape, "blue", "red" );
// coreShape.getContext( "2d" ).fillRect( 0, 0, 100, 200 );


// <graveyard>
// coreShape.getContext( "2d" ).fillStyle = gradient;
// let gradient = ctx.createLinearGradient( 50, 200, 50, 0 );
//
// gradient.addColorStop( 0, "blue" );
// gradient.addColorStop( 1, "red" );
// </graveyard>

// Could I add a shim function to a shimSwitch element that does shimOut/shimIn in a single function?
// function shimOut(){
//     document.querySelector("#shimSwitch").addEventListener
//     //increment core.rodHeight
// }
//
// function shimIn() {
//   document.querySelector("#shimSwitch").addEventListener
//   //decrement core.rodHeight
// }
//
//
// function adjustValve( input ){
//
// }

// rxCoolantSwitch.addEventListener( "onclick",changePumpSpeed( "rxCoolant" ) );
// feedSwitch.addEventListener( "onclick",changePumpSpeed( "feed" ) );
// condensateSwitch.addEventListener( "onclick",changePumpSpeed( "condensate" ) );
