var core = {
  tIn: 75,
  tOut: 75,
  tFuel: 75,
  maxTemp: 5000,
  pressure: 0,
  rodHeight: 0.0,
  shimSpeed: 1.0, //Do I need this?
  currentPower: 0
}

var pressurizer = {
  heatersOn: false,
  sprayOn: false
}

var pumps = {
  rxCoolant: {
    availableSpeed: ["Idle","Slow","Fast"],
    currentSpeed: "Idle"
  },
  feed: {
    availableSpeed: ["Idle","Slow","Fast"],
    currentSpeed: "Idle"
  },
  condensate: {
    availableSpeed: ["Idle","Slow","Fast"],
    currentSpeed: "Idle"
  }
}

var valves = {
  pressurizerSpray: {
    isOpen: false
  },

  feed: {
    percentOpen: 0
  },
  mainEngineThrottle: {
    percentOpen: 0
  },
  tgThrottle: {
    percentOpen: 0
  }
}

var steamGenerator = {
  waterLevel: 75, //in percent of total
  temp: 75,
  pressure: 0,
}

var turbineGenerator = {
  percentSteamDemand: 0,
  maxSteamDemand: 20,
  rpmSpeed: 0,
  maxSpeed: 100,
}

var mainEngine = {
  percentSteamDemand: 0,
  maxSteamDemand: 80
}

var condenser = {
  waterLevel: 50 //in percent of total
}

// Could I add a shim function to a shimSwitch element that does shimOut/shimIn in a single function?
function shimOut() = {
    document.querySelector("#shimSwitch").addEventListener
    //increment core.rodHeight
}

function shimIn() = {
  document.querySelector("#shimSwitch").addEventListener
  //decrement core.rodHeight
}

function changePumpSpeed( input ){

}

function adjustValve( input ){

}

function 
