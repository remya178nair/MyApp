

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

  var modName = ev.target.dataItem.dataContext.name
  modName = modName.trim().split(" ").join("_");
  if (SC.includes(modName))
  {
  removeA(SC,modName)
  removeA(codes,ev.target.dataItem.dataContext.id)
  ev.target.isActive = !ev.target.isActive;
  colV = ""
  $(`#visited-${modName}`).remove()
  localStorage.removeItem(`v:${modName}`)
  localStorage.removeItem(`code:${ev.target.dataItem.dataContext.id}`)
  postMemory()
    if(SC.length == 0) {
        document.getElementById("warning-msg").style.display = "block"
    }
    } else {
    if (!SCBL.includes(modName)){
        ev.target.isActive = !ev.target.isActive;
        SC.push(modName);
        codes.push(ev.target.dataItem.dataContext.id);
        renderVisitedList()
        document.getElementById("warning-msg").style.display = "none"
    } else {
        duplicateCountry(modName)
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
home.align = "left  ";
//home.padding(10, 15, 10, 15);
//home.fillOpacity = 0.5;
//home.fontSize = 15;
home.events.on("hit", function(ev) {
  chart.goHome();
});

/*var button = chart.chartContainer.createChild(am4core.Button);
button.padding(5, 5, 5, 5);
button.width = 20;
button.align = "left";
button.marginRight = 15;
button.events.on("hit", function() {
  chart.goHome();
});
button.icon = new am4core.Sprite();
button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
*/

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

  var modName = ev.target.dataItem.dataContext.name
  modName = modName.trim().split(" ").join("_");
  if (SCBL.includes(modName))
  {
  removeA(SCBL,modName)
  ev.target.isActive = !ev.target.isActive;
  colV = ""
  $(`#bl-${modName}`).remove()
  localStorage.removeItem(`bl:${modName}`)
  postMemory()
    if(SCBL.length == 0) {
        document.getElementById("warning-msg-bl").style.display = "block"
    }

    }else{
    if (!SC.includes(modName)){
        ev.target.isActive = !ev.target.isActive;
        SCBL.push(modName);
        renderBucketLists()
        document.getElementById("warning-msg-bl").style.display = "none"
    } else {
        $('#exampleModal').modal('show')
        duplicateCountry(modName)
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

/*var buttonBL = chartBL.chartContainer.createChild(am4core.Button);
buttonBL.padding(5, 5, 5, 5);
buttonBL.width = 20
buttonBL.marginRight = 15
buttonBL.height = 20
buttonBL.align = "left";
buttonBL.marginRight = 15;
buttonBL.events.on("hit", function() {
  chartBL.goHome();
});
buttonBL.icon = new am4core.Sprite();
buttonBL.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
*/

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
  //$(this).tab('show')
  $('li.active').removeClass('active');
      $('this').addClass('active');
  document.getElementById("chartContainer").style.display = "block";
  document.getElementById("allMemory").style.display = "none";
  document.getElementById("bucketListTable").style.display = "none";
})

$('#tabs li:nth-child(2) a').on('click', function (e) {
  e.preventDefault()
  console.log("2")
  //$(this).tab('show')
      $('li.active').removeClass('active');
      $('this').addClass('active');
   document.getElementById("chartContainer").style.display = "none";
   document.getElementById("allMemory").style.display = "block";
   document.getElementById("bucketListTable").style.display = "none";
})

$('#tabs li:nth-child(3) a').on('click', function (e) {
  e.preventDefault()
  //$(this).tab('show')
  console.log("3")
  $('li.active').removeClass('active');
      $('this').addClass('active');
  document.getElementById("chartContainer").style.display = "none";
  document.getElementById("allMemory").style.display = "none";
  document.getElementById("bucketListTable").style.display = "block";
})

$('#tabs li:last-child a').on('click', function (e) {
  localStorage.removeItem("username")
 $(location).attr('href', 'http://websys3.stern.nyu.edu/websysF18/websysF184/MyApp/www/index.html')
});

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
    postMemory()
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
    postMemory()
});

/****On load ***/
$( document ).ready(function() {
    console.log( "ready!" );
    //deleteLocalStorage()
    fetch()
});

function renderVisitedOnLoad(parsedJson) {
    for (key in polygonSeries.mapPolygons.values) {
        var countryName = polygonSeries.mapPolygons.values[key].dataItem.dataContext.name
        countryName = countryName.trim().split(" ").join("_");
        if(SC.includes(countryName)){
            polygonSeries.mapPolygons.values[key].isActive = true
        }
    }

    for (key in SC) {
        if (parsedJson["v:" + SC[key]] != null){
            document.getElementById(`text-area-visited-${SC[key]}`).value = parsedJson["v:" + SC[key]]
        }
    }

    if (SC.length > 0){
        document.getElementById("warning-msg").style.display = "none"
    }
}

function renderBlOnLoad(parsedJson) {
    for (key in polygonSeriesBL.mapPolygons.values) {
            var countryName = polygonSeriesBL.mapPolygons.values[key].dataItem.dataContext.name
            countryName = countryName.trim().split(" ").join("_");
            if(SCBL.includes(countryName)){
                polygonSeriesBL.mapPolygons.values[key].isActive = true
            }
    }

    for (key in SCBL) {
        if (parsedJson != null && parsedJson["bl:" + SCBL[key]] != null) {
            document.getElementById(`text-area-${SCBL[key]}`).value = parsedJson["bl:" + SCBL[key]]
        } else if (localStorage.getItem("bl:" + SCBL[key]) != null) {
            document.getElementById(`text-area-${SCBL[key]}`).value = localStorage.getItem("bl:" + SCBL[key])
        }
    }

     if (SCBL.length > 0){
        document.getElementById("warning-msg-bl").style.display = "none"
    }
}

function deleteLocalStorage() {
    for (key in localStorage) {
        //if (key != "username") {
            localStorage.removeItem(key)
        //}
    }
}

/***Backend Calls****/
function postMemory() {
    var username = localStorage.getItem("username")
    var json = JSON.stringify(localStorage).trim()
    var loginString ="username="+username+"&payload="+json+"&save=";
    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: "http://websys3.stern.nyu.edu/websysF18/websysF184/MyApp/www/php/update.php",
        data: loginString,
        success: function(data){
            if (data == "success") {
                console.log("Succeeded!")
            } else {
                console.log(data)
            }
        }
    });
}

function fetch() {
    //var username = "remya@nyu.edu"
    var username = localStorage.getItem("username")
    var loginString ="username="+username+"&fetch=";
    $.ajax({
        type: "GET",crossDomain: true, cache: false,
        url: "http://websys3.stern.nyu.edu/websysF18/websysF184/MyApp/www/php/update.php",
        data: loginString,
        success: function(data){
            if (data != "failed") {
                var parsedJson = JSON.parse(data);
                console.log(parsedJson)
                for (key in parsedJson) {
                    if (key.includes("v:")) {
                        var name = key.split("v:")[1]
                        SC.push(name)
                        codes.push(parsedJson["code:" + name])
                        renderVisitedList(parsedJson)
                    } else if (key.includes("bl:")) {
                        SCBL.push(key.split("bl:")[1])
                    renderBucketLists(parsedJson)
                    }
            }

            renderVisitedOnLoad(parsedJson)
            renderBlOnLoad(parsedJson)
            } else {
                console.log("failed")
            }
        }
    });
}
