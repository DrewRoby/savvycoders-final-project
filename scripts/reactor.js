/* eslint-ignore complexity*/
var sstgShape = document.getElementById( "sstg" );
var coreShape = document.getElementById( "core" );
var steamGeneratorShape = document.getElementById( "steamGenerator" );
var condenserShape = document.getElementById( "condenser" );
var rxCoolantPumpShape = document.getElementById( "rxCoolantPump" );

var core = {
    "tIn": 75,
    "tOut": 75,
    "tFuel": 75,
    "maxTemp": 5000,
    "pressure": 0,
    "rodHeight": 0.0,
    "shimSpeed": 1.0, // Do I need this?
    "currentPower": 0
};

var pressurizer = {
    "heatersOn": false,
    "sprayOn": false
};

var pumps = {
    "rxCoolant": {
        "availableSpeed": [ "idle","run" ],
        "currentSpeed": "idle"
    },
    "feed": {
        "availableSpeed": [ "idle","run" ],
        "currentSpeed": "idle"
    },
    "condensate": {
        "availableSpeed": [ "idle","run" ],
        "currentSpeed": "idle"
    }
};

var valves = {
    "pressurizerSpray": {
        "isOpen": false
    },

    "feed": {
        "percentOpen": 0
    },
    "mainEngineThrottle": {
        "percentOpen": 0
    },
    "tgThrottle": {
        "percentOpen": 0
    }
};

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

var mainEngine = {
    "percentSteamDemand": 0,
    "maxSteamDemand": 80
};

var condenser = {
    "waterLevel": 50 // in percent of total
};

var rxCoolantSwitch = document.querySelector( "#rxCoolantSwitch" );
var feedSwitch = document.querySelector( "#feedSwitch" );
var condensateSwitch = document.querySelector( "#condensateSwitch" );

function draw(){
    if( sstgShape.getContext ){
        let ctx = sstgShape.getContext( "2d" );

        ctx.beginPath();
        ctx.moveTo( 0, 33 );
        ctx.lineTo( 100, 0 );
        ctx.lineTo( 100, 100 );
        ctx.lineTo( 0, 67 );
        ctx.closePath();
        ctx.stroke();
    }

    if( coreShape.getContext ){
        let ctx = coreShape.getContext( "2d" );

        ctx.beginPath();
        ctx.moveTo( 0, 10 );
        ctx.lineTo( 0, 140 );
        ctx.quadraticCurveTo( 50,200, 100,140 );
        ctx.lineTo( 100,10 );
        ctx.lineTo( 90,10 );
        ctx.lineTo( 90,0 );
        ctx.lineTo( 10,0 );
        ctx.lineTo( 10,10 );
        ctx.closePath();
        ctx.stroke();
    }

    if( steamGeneratorShape.getContext ){
        let ctx = steamGeneratorShape.getContext( "2d" );

        ctx.beginPath();
        ctx.moveTo( 150,50 );
        ctx.arc( 100,50,50,0,Math.PI, true );
        ctx.lineTo( 50,100 );
        ctx.arc( 50,150,50,Math.PI * 1.5,Math.PI / 2,true );
        ctx.lineTo( 150, 200 );
        ctx.arc( 150,150,50,Math.PI / 2,Math.PI * 1.5,true );
        ctx.closePath();
        ctx.stroke();
    }

    if( condenserShape.getContext ){
        let ctx = condenserShape.getContext( "2d" );

        ctx.beginPath();
        ctx.moveTo( 50,0 );
        ctx.quadraticCurveTo( -50, 100, 50, 200 );
        ctx.lineTo( 250, 200 );
        ctx.quadraticCurveTo( 350, 100, 250, 0 );
        ctx.closePath();
        ctx.stroke();
    }

    if( rxCoolantPumpShape.getContext ){
        let ctx = rxCoolantPumpShape.getContext( "2d" );

        ctx.beginPath();
        ctx.moveTo( 100, 30 );
        ctx.lineTo( 50, 30 );
        ctx.arc( 50, 25, 5, Math.PI * 0.5, Math.PI * 1.5, false );
        ctx.lineTo( 100, 20 );
        ctx.moveTo( 75, 20 );
        ctx.arcTo( 75, 0, 0, 0, 20 );
        ctx.lineTo( 0, 0 );
        ctx.moveTo( 0, 10 );
        ctx.lineTo( 25, 10 );
        ctx.arcTo( 25, 150, 75, 25, 25 );
        ctx.stroke();
    }
}

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
// function changePumpSpeed( pumpID ){
//   document.querySelector(pumpID){
//     if(pumps.${pumpID}.currentSpeed==="idle"){
//       pumps.${pumpID}.currentSpeed = "run";
//     }else {
//       pumps.${pumpID}.currentSpeed = "idle"
//     }
//   }
// }
//
// function adjustValve( input ){
//
// }

rxCoolantSwitch.addEventListener( "onclick",changePumpSpeed( "rxCoolant" ) );
feedSwitch.addEventListener( "onclick",changePumpSpeed( "feed" ) );
condensateSwitch.addEventListener( "onclick",changePumpSpeed( "condensate" ) );
