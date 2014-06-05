// map handling


var initialLocation;
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var eureka = new google.maps.LatLng(40.78376890000001,-124.1422455);
var los_angeles = new google.maps.LatLng(34.0695831, -118.2634431);
var browserSupportFlag =  new Boolean();
var mainMarker;
var states = [];
var markersArray = [];
var infoWindowsArray = [];
var map;
function initialize() {
  var myOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: los_angeles
  };
  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      //initialLocation = newyork;
      map.setCenter(initialLocation);
      mainMarker = new google.maps.Marker({
        position: initialLocation, 
        map: map,
        title: "Your Location.",
        icon: "static/emergency/you-dot2.png"});
      mainMarker.setAnimation(google.maps.Animation.BOUNCE);
      populateNearbyHospitals(initialLocation, map);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      //alert("Please allow us to get your location, geolocation service failed.");
      initialLocation = los_angeles;
    } else {
      //alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      initialLocation = los_angeles;
    }
    map.setCenter(initialLocation);
  }
  google.maps.event.addListener(map, 'dragend', function() {
    populateNearbyHospitals(map.getCenter(), map);
  });

}
google.maps.event.addDomListener(window, 'load', initialize);


function populateNearbyHospitals(coords, map){
  var lat = coords.lat();
  var lng = coords.lng();
  var lat1 = lat + 0.4;
  var lat2 = lat - 0.4;
  var lng1 = lng + 0.4;
  var lng2 = lng - 0.4;
  var lat11 = lat + 0.2;
  var lat22 = lat - 0.2;
  var lng11 = lng + 0.2;
  var lng22 = lng - 0.2;
  var l1 = new google.maps.LatLng(lat1, lng);
  var l2 = new google.maps.LatLng(lat2, lng);
  var l3 = new google.maps.LatLng(lat, lng1);
  var l4 = new google.maps.LatLng(lat, lng2);
  var l5 = new google.maps.LatLng(lat11, lng11);
  var l6 = new google.maps.LatLng(lat11, lng22);
  var l7 = new google.maps.LatLng(lat22, lng11);
  var l8 = new google.maps.LatLng(lat22, lng22);
  populateNearbyHospitalsOfSingleLocation(l1, map); 
  populateNearbyHospitalsOfSingleLocation(l2, map); 
  populateNearbyHospitalsOfSingleLocation(l3, map); 
  populateNearbyHospitalsOfSingleLocation(l4, map); 
  populateNearbyHospitalsOfSingleLocation(l5, map); 
  populateNearbyHospitalsOfSingleLocation(l6, map); 
  populateNearbyHospitalsOfSingleLocation(l7, map); 
  populateNearbyHospitalsOfSingleLocation(l8, map); 
  //omgf i'm not proud of myself
}

function populateNearbyHospitalsOfSingleLocation(coords, map) {
  googleGeoCodingQuery = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+coords.lat()+","+coords.lng()+"&sensor=false&key=AIzaSyDRuK7q0LbIkhjrs3EC7OMw_OBhYm_N3wQ&result_type=administrative_area_level_1";
  geoCodingRequest = $.ajax({
    url: googleGeoCodingQuery,
    type: 'GET',
    dataType: 'json',
  }).done(function (data){
    var locality = data.results[0].address_components[0]['short_name'];
    locality = locality.toUpperCase();
    if (states.indexOf(locality) == -1) {
      states.push(locality);
      getNearbyHospitals(locality, map);
    }
  });
}

function getNearbyHospitals(city, map){
  var erScoutHospitalsQuery = "/api/v1/hospital/?limit=0&state="+city;
  hospitalGetRequest = $.ajax({
    url: erScoutHospitalsQuery,
    type: 'GET',
    dataType: 'json',
  }).done(function (data){
    var hospitals = data.objects;
    $.each(hospitals, function(i, item) { addMarker(item, map); });
    mainMarker.setAnimation(google.maps.Animation.DROP);
  });
}

function addMarker(item, map){
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(parseFloat(item.latitude), parseFloat(item.longitude)), 
    map: map,
    title : item.hospital_name,
    icon: "static/emergency/plus-icon.png"});
  marker.setAnimation(google.maps.Animation.DROP);
  var contentString = '<div class="infoWindow"><p><strong>'+item.hospital_name+'</strong></p><p><strong>Phone No:</strong> '+item.phone_number+'</p><p><strong>Waiting Time: </strong>'+item.door_to_diagnostic_eval+' mins</p></div>';
  var infoWindow = new google.maps.InfoWindow({
    content: contentString,
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map, marker);
  });
  markersArray.push(marker);
  infoWindowsArray.push(infoWindow);
}

var content = '<div id="hospitalContent"> <h1 id="hospitalName">NewYork State Hospital</h1> <p> Addr: askdjfksdja </p> <p> askdfjasdk </p> <p> Ph: 253190 </p> <p> email: asdfkajds@aksdfj </p> </div>'
