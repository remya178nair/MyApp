

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
