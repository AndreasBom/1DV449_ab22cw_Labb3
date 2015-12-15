var lat = 61.5;
var lng = 14;
var zoomFactor = 5;
var map;
var markers = [];
var marker;


//initialize view
//Parameter: jsonstring with incidents
var init = function(data) {
    //Create map
    map = L.map('map', {
        center: [lat, lng],
        zoom: zoomFactor
    });
    
    //Render list, markers and map
    renderIncidentList(data, 100); //100 == All incidents
    showMarkersOnMap(data, 100);
    renderMap();
}

//App
var app = function (data) {
    //Initialize
    init(data);

    //Get selection from dropdown menu
    var selection = $('option:selected').val();

    //Show marker after click on incident list
    $(document).on('click', '.incident-layer', function (e) {
        showMarker(e.currentTarget.id, data);
    });

    //Dropdown menu selection
    $("#category").on('change', function (e) {
        selection = $('option:selected', e.currentTarget).val();
        renderIncidentList(data, selection);
        showMarkersOnMap(data, selection);
    });

    //$(markers).on('click', function(e) {
    //    lat = e.currentTarget._latlng.lat;
    //    lng = e.currentTarget._latlng.lng;
    //    zoomFactor = 10;

    //    map.setZoom(zoomFactor);
    //    map.setView([lat, lng]);
    //});

    $(document).on('click', '.btn-link', function (e) {
        zoomFactor = 5;
        map.setZoom(zoomFactor);
        $(".leaflet-popup-close-button")[0].click();
        //map.setView([lat, lng]);

    });

    //Link Show all incidents, list and markers
    $("#showAll").on('click', function() {
        showMarkersOnMap(data, 100);
        renderIncidentList(data, 100);
        $('#dropdownlist option:eq(0)').prop('selected', true);
    });

}

// VIEW 
//Render list of incidents
var renderIncidentList = function (listOfIncidents, selectedCategory) {
    $("#list").empty();

    listOfIncidents.forEach(function (incident) {
        if (selectedCategory == incident.Category || selectedCategory == 100) {
            $("#list").append("<div class='incident-layer' id='" + incident.Id + "' data-lat='" + incident.lat + "' data-lng='" + incident.lng + "'>" +
                renderIncidentHtml(incident)  +
            "</div>");
        }
    });
}

//Render HTML: Title, Date, Exact-Location and Description
var renderIncidentHtml = function(incident) {
    return "<h4>" + incident.Title + "<span class='created'> (" + (new Date(parseInt(incident.CreatedDate.substr(6)))).toLocaleDateString() + ")" +
        "<h5 class='exact-location'>" + incident.ExactLocation + "</h5>" +
        "<p class='message-body'>" + incident.Description + "</p>";
}

//Render HTML: Id, Category, Priority
var renderIncidentPopUp = function(incident) {
    return "<ul>" +
        "<li>ID: " + incident.Id + "</li>" +
        "<li>Kategori: " + incident.Category + " (" + incident.SubCategory + ") </li>" +
        "<li>Prioritet: " + incident.Priority + "</li>" +
        "<ul>";
    //"<button class='btn-link align-left'><span class='glyphicon glyphicon-search'></span>-</button>";
}

//Render Map
var renderMap = function () {
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

//Adds marker to map
var showMarker = function(id, list) {

    var obj = findIncident(id, list);
    map.setView([obj.Latitude, obj.Longitude]);
    map.setZoom(12);

    var marker = L.marker([obj.Latitude, obj.Longitude]);
    marker.addTo(map).bindPopup(renderIncidentHtml(obj) + renderIncidentPopUp(obj))
    .openPopup();

}

//Adds all markers to map
var showMarkersOnMap = function(data, selectedCategory) {

    map.setView([lat, lng]);
    map.setZoom(zoomFactor);

    markers.forEach(function(marker) {
        map.removeLayer(marker);
    });

    markers = [];

    data.forEach(function (obj) {
        if (selectedCategory == obj.Category || selectedCategory == 100) {
            var m = L.marker([obj.Latitude, obj.Longitude])
            .addTo(map).bindPopup(renderIncidentHtml(obj) + renderIncidentPopUp(obj));
            markers.push(m);
        }
    });
}


//UTIL
//find incident based on id
var findIncident = function(id, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].Id == id) {
            return list[i];
        }
    }
    return null;
}


