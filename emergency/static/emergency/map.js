// map handling


var initialLocation;
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var eureka = new google.maps.LatLng(40.78376890000001,-124.1422455);
var los_angeles = new google.maps.LatLng(34.0695831, -118.2634431);
var browserSupportFlag =  new Boolean();
var mainMarker;
var markersArray = [];
var infoWindowsArray = [];
function initialize() {
  var myOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: los_angeles
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

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

}
google.maps.event.addDomListener(window, 'load', initialize);

function populateNearbyHospitals(coords, map) {
  googleGeoCodingQuery = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+coords.lat()+","+coords.lng()+"&sensor=false&key=AIzaSyDRuK7q0LbIkhjrs3EC7OMw_OBhYm_N3wQ&result_type=administrative_area_level_1";
  geoCodingRequest = $.ajax({
    url: googleGeoCodingQuery,
    type: 'GET',
    dataType: 'json',
  }).done(function (data){
    var locality = data.results[0].address_components[0]['short_name'];
    locality = locality.toUpperCase();
    getNearbyHospitals(locality, map);
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
