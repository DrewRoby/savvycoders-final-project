/* eslint-ignore complexity*/
var sstgShape = document.getElementById( "sstg" );
var coreShape = document.getElementById( "core" );
var steamGeneratorShape = document.getElementById( "steamGenerator" );
var condenserShape = document.getElementById( "condenser" );
var rxCoolantPumpShape = document.getElementById( "rxCoolantPump" );
var piping1_1 = document.getElementById( "piping1_1" );
var piping1_2 = document.getElementById( "piping1_2" );
var piping2_1 = document.getElementById( "piping2_1" );
var piping2_2 = document.getElementById( "piping2_2" );
var feedPumpShape = document.getElementById( "feedPump" );

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
        ctx.moveTo( 0, 40 );
        ctx.lineTo( 150, 0 );
        ctx.lineTo( 150, 145 );
        ctx.lineTo( 0, 95 );
        ctx.closePath();
        ctx.stroke();
    }

    if( coreShape.getContext ){
        let ctx = coreShape.getContext( "2d" );

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
        ctx.closePath();
        ctx.stroke();
    }

    if( steamGeneratorShape.getContext ){
        let ctx = steamGeneratorShape.getContext( "2d" );

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

    if( condenserShape.getContext ){
        let ctx = condenserShape.getContext( "2d" );

        ctx.beginPath();
        ctx.moveTo( 75,0 );
        ctx.arc( 75, 75, 75, Math.PI * 1.5, Math.PI / 2, true );
        ctx.lineTo( 225, 150 );
        ctx.arc( 225, 75, 75, Math.PI / 2, Math.PI * 1.5, true );
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

    if( piping1_1.getContext ){
        let ctx = piping1_1.getContext( "2d" );

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

    if( piping1_2.getContext ){
        let ctx = piping1_2.getContext( "2d" );

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

    if( piping2_1.getContext ){
        let ctx = piping2_1.getContext( "2d" );

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

    if( piping2_2.getContext ){
        let ctx = piping2_2.getContext( "2d" );

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

    if( feedPumpShape.getContext ){
        let ctx = feedPumpShape.getContext( "2d" );

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
