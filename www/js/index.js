

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
var codes = [];

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

  if (SC.includes(ev.target.dataItem.dataContext.name))
  {
  removeA(SC,ev.target.dataItem.dataContext.name)
  removeA(codes,ev.target.dataItem.dataContext.id)
  ev.target.isActive = !ev.target.isActive;
  colV = ""
  $(`#visited-${ev.target.dataItem.dataContext.name}`).remove()
  localStorage.removeItem(`v:${ev.target.dataItem.dataContext.name}`)
  localStorage.removeItem(`code:${ev.target.dataItem.dataContext.id}`)
    } else {
    if (!SCBL.includes(ev.target.dataItem.dataContext.name)){
        ev.target.isActive = !ev.target.isActive;
        SC.push(ev.target.dataItem.dataContext.name);
        codes.push(ev.target.dataItem.dataContext.id);
        renderVisitedList()
    } else {
        duplicateCountry(ev.target.dataItem.dataContext.name)
    }
  };
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

// Create an event to toggle "active" state
polygonTemplateBL.events.on("hit", function(ev) {

  if (SCBL.includes(ev.target.dataItem.dataContext.name))
  {
  removeA(SCBL,ev.target.dataItem.dataContext.name)
  ev.target.isActive = !ev.target.isActive;
  colV = ""
  $(`#bl-${ev.target.dataItem.dataContext.name}`).remove()
  localStorage.removeItem(`bl:${ev.target.dataItem.dataContext.name}`)
    }else{
    if (!SC.includes(ev.target.dataItem.dataContext.name)){
        ev.target.isActive = !ev.target.isActive;
        SCBL.push(ev.target.dataItem.dataContext.name);
        renderBucketLists()
    } else {
        $('#exampleModal').modal('show')
        duplicateCountry(ev.target.dataItem.dataContext.name)
   }
   }
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

function duplicateCountry(countryName) {
    var msg = document.getElementById("modalWarning").innerHTML
    var section =document.getElementById("toggleSwitch").checked ? "Visited" : "Bucket List"
    document.getElementById("modalWarning").innerHTML = `<p> ${countryName} already added in ${section} section !</p>`
    $('#exampleModal').modal('show')
}


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

/**** Dynamic construction of Visited ****/
function renderVisitedList() {
    var countryCode = codes[codes.length - 1].toLowerCase()
    var lastElement = SC[SC.length - 1]
    lastElement = lastElement.trim().split(" ").join("_");
    var visitedDiv = `<div class="column ${lastElement}" id="visited-${lastElement}">
                        <div class="content">
                            <img src="https://lipis.github.io/flag-icon-css/flags/4x3/${countryCode}.svg" style="display: block;  margin-left: auto;margin-right: auto;  width: 50%;">
                            </br>
                            <h4 style="text-align:center;">${lastElement}</h4>
                            <div id="editDiv">
                                <div class="form-group">
                                    <textarea class="form-control" id="text-area-visited-${lastElement}" rows="2"  placeholder="Enter memory..."></textarea>
                                </div>
                                <div class="row justify-content-center">
                                    <button type="button" class="btn btn-primary" id="saveMemory">Save for ${lastElement}</button>
                                </div>
                            </div>
                        </div>
                    </div>`
    $('#allMemory').append(visitedDiv);
    var key1 = "code:" + lastElement
    localStorage.setItem(key1, countryCode);
}

//var memoryDict = {}
$("#allMemory").on("click", "button#saveMemory", function(){
    var btnName = $(this).text()
    var key = btnName.substring(btnName.indexOf('for')+3).trim()
    var content = document.getElementById(`text-area-visited-${key}`).value
    var key1 = "v:" + key
    localStorage.setItem(key1, content);
    //memoryDict[key] = content
    //console.log(memoryDict)
});

/**** Dynamic construction of BucketList ****/
function renderBucketLists() {
    var lastElement = SCBL[SCBL.length-1]
    lastElement = lastElement.trim().split(" ").join("_");
    var firstDivStart = `<div class="card" id="bl-${lastElement}">`
    var cardHeader = `<div class="card-header" id="heading-${lastElement}">
                        <h5 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse-${lastElement}" aria-expanded="false" aria-controls="collapse-${lastElement}">
                                ${lastElement}
                            </button>
                        </h5>
                     </div>`
    var innerDiv = `<div id="collapse-${lastElement}" class="collapse" aria-labelledby="heading-${lastElement}" data-parent="#accordionExample">
                       <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="text-area-${lastElement}">Enter any notes about this bucket list location:</label>
                                <textarea class="form-control" id="text-area-${lastElement}" rows="2"  placeholder="Enter notes..."></textarea>
                            </div>
                            <button type="button" class="btn btn-primary btn-sm" id="save">Save for ${lastElement}</button>
                        </form>
                            <div id="skyscanner-${lastElement}"></div>
                       </div>
                   </div>`
    var firstDivClose = `</div>`
    //var divElem = '<div>' + lastElement + '</div>'
    $('#accordionExample').append(firstDivStart + cardHeader + innerDiv + firstDivClose);

    var skyscannerDiv = `   <meta name="originLocation" content="New York" />
                            <div data-skyscanner-widget="SearchWidget" data-origin-name="document.querySelector('meta[name=originLocation]').content" data-destination-name="'${lastElement}'"></div>
                            <script src="https://widgets.skyscanner.net/widget-server/js/loader.js" async></script>`
    $(`#skyscanner-${lastElement}`).append(skyscannerDiv);
    loadSkyScannerScript()

}

function loadSkyScannerScript() {
       var dynamicScripts = ["https://widgets.skyscanner.net/widget-server/js/loader.js"];

        for (var i = 0; i < dynamicScripts.length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
}

//var blDict = {}
$("#accordionExample").on("click", "button#save", function(){
    var btnName = $(this).text()
    var key = btnName.substring(btnName.indexOf('for')+3).trim()
    var content = document.getElementById(`text-area-${key}`).value
    //blDict[key] = content
    var key1 = "bl:" + key
    localStorage.setItem(key1, content);
});

/****On load ***/
$( document ).ready(function() {
    console.log( "ready!" );
    //deleteLocalStorage()
    for (key in localStorage) {
        console.log("ready: " + key)
        if (key.includes("v:")) {
            var name = key.split("v:")[1]
            SC.push(name)
            codes.push(localStorage.getItem("code:" + name))
            renderVisitedList()
        } else if (key.includes("bl:")) {
            SCBL.push(key.split("bl:")[1])
            renderBucketLists()
        }
    }

    renderVisitedOnLoad()
    renderBlOnLoad()
});

function renderVisitedOnLoad() {
    for (key in polygonSeries.mapPolygons.values) {
        var countryName = polygonSeries.mapPolygons.values[key].dataItem.dataContext.name
        countryName = countryName.trim().split(" ").join("_");
        if(SC.includes(countryName)){
            polygonSeries.mapPolygons.values[key].isActive = true
        }
    }

    for (key in SC) {
        if (localStorage.getItem("v:" + SC[key]) != null){
            document.getElementById(`text-area-visited-${SC[key]}`).value = localStorage.getItem("v:" + SC[key])
        }
    }
}

function renderBlOnLoad() {
    for (key in polygonSeriesBL.mapPolygons.values) {
            var countryName = polygonSeriesBL.mapPolygons.values[key].dataItem.dataContext.name
            countryName = countryName.trim().split(" ").join("_");
            if(SCBL.includes(countryName)){
                polygonSeriesBL.mapPolygons.values[key].isActive = true
            }
    }

    for (key in SCBL) {
        if (localStorage.getItem("bl:" + SCBL[key]) != null) {
            document.getElementById(`text-area-${SCBL[key]}`).value = localStorage.getItem("bl:" + SCBL[key])
        }
    }
}

function deleteLocalStorage() {
    for (key in localStorage) {
        localStorage.removeItem(key)
    }
}


