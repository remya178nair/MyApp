

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Mercator();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#000000");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#000000");

// Remove Antarctica
polygonSeries.exclude = ["AQ"];

// Create active state
var activeState = polygonTemplate.states.create("active");
//activeState.properties.fill = chart.colors.getIndex(3).brighten(-0.5);
activeState.properties.fill = am4core.color("#339933");
/*visitedState.properties.active = true;
visitedState.properties.down = true;

var bucketState = polygonTemplate.states.create("bucket");
bucketState.properties.fill = am4core.color("#ff9933");
visitedState.properties.active = true;
visitedState.properties.down = true;*/

/* Add legend */
var legend = new am4maps.Legend();
legend.parent = chart.chartContainer;
legend.background.fill = am4core.color("#000");
legend.background.fillOpacity = 0.05;
legend.width = 100;
legend.align = "right";
legend.padding(10, 15, 10, 15);
legend.data = [
{
  "name": "No Interest",
  "fill": "#000000"
},
{
  "name": "Visited",
  "fill":"#339933"
}/*, {
  "name": "BucketList",
  "fill": "#ff9933"
}, {
  "name": "Current",
  "fill": "#ffff99"
},*/

];
legend.itemContainers.template.clickable = false;
legend.itemContainers.template.focusable = false;

var legendTitle = legend.createChild(am4core.Label);
legendTitle.text = "Legend:";

var SC = [];

//https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}


// Create an event to toggle "active" state
polygonTemplate.events.on("hit", function(ev) {

  if (SC.includes(ev.target.dataItem.dataContext.id))
  {
  removeA(SC,ev.target.dataItem.dataContext.id)
  ev.target.isActive = !ev.target.isActive;
  colV = ""

    }else{
    ev.target.isActive = !ev.target.isActive;
    //var cat = prompt("Please enter category: Visited or BucketList");

/*if (cat == null || cat == "") {
  txt = "User cancelled the prompt.";
} else if(cat == "Visited") {
  colV = "#339933"
  //console.log(ev.target.states.getKey("visited"))
  ev.target.setState("active");
  console.log(ev.target.states.getKey("active"));
} else if(cat == "BucketList") {
   colV = "#ff9933"
   //console.log(ev.target.getKey("default"));
   ev.target.setState("bucket");
   console.log(ev.target.states.getKey("bucket"));
}*/
   //ev.target.isActive = !ev.target.isActive;

  SC.push(ev.target.dataItem.dataContext.id);
  document.getElementById("exampleModalLabel").innerHTML = "Save Memory: " + ev.target.dataItem.dataContext.name;
  $('#exampleModal').modal('show');

  };
  console.log(SC);



  //console.log("Series name: ", ev.target.series.name);
  //console.log("Country ISO2 id: ", ev.target.dataItem.dataContext.id);
 // console.log("Country ISO2 name: ", ev.target.dataItem.dataContext.name);
});

// Create a zoom control
var zoomControl = new am4maps.ZoomControl();
chart.zoomControl = zoomControl;
zoomControl.slider.height = 100;

// Add button to zoom out
var home = chart.chartContainer.createChild(am4core.Button);
home.label.text = "Home";
home.align = "left";
home.events.on("hit", function(ev) {
  chart.goHome();
});

/****BUCKET LIST****/


// Create map instance
var chartBL = am4core.create("chartdivBL", am4maps.MapChart);

// Set map definition
chartBL.geodata = am4geodata_worldLow;

// Set projection
chartBL.projection = new am4maps.projections.Mercator();

// Create map polygon series
var polygonSeriesBL = chartBL.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeriesBL.useGeodata = true;

// Configure series
var polygonTemplateBL = polygonSeriesBL.mapPolygons.template;
polygonTemplateBL.tooltipText = "{name}";
polygonTemplateBL.fill = am4core.color("#000000");

// Create hover state and set alternative fill color
var hsBL = polygonTemplateBL.states.create("hover");
hsBL.properties.fill = am4core.color("#000000");

// Remove Antarctica
polygonSeriesBL.exclude = ["AQ"];


// Create active state
var activeStateBL = polygonTemplateBL.states.create("active");
//activeState.properties.fill = chart.colors.getIndex(3).brighten(-0.5);
activeStateBL.properties.fill = am4core.color("#ff9933");
/*visitedState.properties.active = true;
visitedState.properties.down = true;

var bucketState = polygonTemplate.states.create("bucket");
bucketState.properties.fill = am4core.color("#ff9933");
visitedState.properties.active = true;
visitedState.properties.down = true;*/


/* Add legend */
var legendBL = new am4maps.Legend();
legendBL.parent = chartBL.chartContainer;
legendBL.background.fill = am4core.color("#000");
legendBL.background.fillOpacity = 0.05;
legendBL.width = 100;
legendBL.align = "right";
legendBL.padding(10, 15, 10, 15);
legendBL.data = [
{
  "name": "No Interest",
  "fill": "#000000"
},
/*{
  "name": "Visited",
  "fill":"#339933"
},*/ {
  "name": "BucketList",
  "fill": "#ff9933"
}/*, {
  "name": "Current",
  "fill": "#ffff99"
},*/

];
legendBL.itemContainers.template.clickable = false;
legendBL.itemContainers.template.focusable = false;

var legendTitleBL = legendBL.createChild(am4core.Label);
legendTitleBL.text = "Legend:";

var SCBL = [];

//https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

// Create an event to toggle "active" state
polygonTemplateBL.events.on("hit", function(ev) {

  if (SCBL.includes(ev.target.dataItem.dataContext.id))
  {
  removeA(SCBL,ev.target.dataItem.dataContext.id)
  ev.target.isActive = !ev.target.isActive;
  colV = ""

    }else{
    ev.target.isActive = !ev.target.isActive;
    //var cat = prompt("Please enter category: Visited or BucketList");

/*if (cat == null || cat == "") {
  txt = "User cancelled the prompt.";
} else if(cat == "Visited") {
  colV = "#339933"
  //console.log(ev.target.states.getKey("visited"))
  ev.target.setState("active");
  console.log(ev.target.states.getKey("active"));
} else if(cat == "BucketList") {
   colV = "#ff9933"
   //console.log(ev.target.getKey("default"));
   ev.target.setState("bucket");
   console.log(ev.target.states.getKey("bucket"));
}*/
   //ev.target.isActive = !ev.target.isActive;

  SCBL.push(ev.target.dataItem.dataContext.id);
  };
  console.log(SCBL);


  //console.log("Series name: ", ev.target.series.name);
  //console.log("Country ISO2 id: ", ev.target.dataItem.dataContext.id);
 // console.log("Country ISO2 name: ", ev.target.dataItem.dataContext.name);
});

// Create a zoom control
var zoomControlBL = new am4maps.ZoomControl();
chartBL.zoomControl = zoomControlBL;
zoomControlBL.slider.height = 100;

// Add button to zoom out
var homeBL = chartBL.chartContainer.createChild(am4core.Button);
homeBL.label.text = "Home";
homeBL.align = "left";
homeBL.events.on("hit", function(ev) {
  chartBL.goHome();
});


/****Events****/

var memoryDict = {}

$( "#savedMemory" ).click(function() {
    var tempKey = document.getElementById("exampleModalLabel").innerHTML
    var key = tempKey.substring(tempKey.indexOf(':') + 1).trim()
    memoryDict[key] = document.getElementById("message-text").value
    console.log(memoryDict)
    document.getElementById("message-text").value = ""
    $('#exampleModal').modal('hide')
});

$("#showMemories").click(function() {
    document.getElementById("chartdiv").style.display = "none";
    document.getElementById("chartdivBL").style.display = "none";
    document.getElementById("allMemory").style.display = "block";
});

$('#tabs li:first-child a').on('click', function (e) {
  e.preventDefault()
  console.log("1")
  $(this).tab('show')
  document.getElementById("chartContainer").style.display = "block";
  document.getElementById("allMemory").style.display = "none";
  document.getElementById("bucketListTable").style.display = "none";
})

$('#tabs li:nth-child(2) a').on('click', function (e) {
  e.preventDefault()
  console.log("2")
  $(this).tab('show')
   document.getElementById("chartContainer").style.display = "none";
   document.getElementById("allMemory").style.display = "block";
   document.getElementById("bucketListTable").style.display = "none";
})

$('#tabs li:last-child a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
  console.log("3")
  document.getElementById("chartContainer").style.display = "none";
  document.getElementById("allMemory").style.display = "none";
  document.getElementById("bucketListTable").style.display = "block";
})

