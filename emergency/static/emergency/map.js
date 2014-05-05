// map handling


var initialLocation;
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var eureka = new google.maps.LatLng(40.78376890000001,-124.1422455);
var los_angeles = new google.maps.LatLng(34.0695831, -118.2634431);
var browserSupportFlag =  new Boolean();
var markersArray = []
function initialize() {
  var myOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: los_angeles
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
  marker = new google.maps.Marker({
    position: los_angeles, 
    map: map,
    icon: "static/emergency/you-dot2.png"});
  marker.setAnimation(google.maps.Animation.BOUNCE);

  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      initialLocation = los_angeles;
      map.setCenter(initialLocation);
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
  googleGeoCodingQuery = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+coords.lat()+","+coords.lng()+"&sensor=false&key=AIzaSyDRuK7q0LbIkhjrs3EC7OMw_OBhYm_N3wQ&result_type=postal_code|locality";
  geoCodingRequest = $.ajax({
    url: googleGeoCodingQuery,
    type: 'GET',
    dataType: 'json',
  }).done(function (data){
    var locality = data.results[0].address_components[0]['long_name'];
    locality = locality.toUpperCase();
    getNearbyHospitals(locality, map);
  });
}

function getNearbyHospitals(city, map){
  var erScoutHospitalsQuery = "http://ec2-54-196-92-53.compute-1.amazonaws.com:8000/api/v1/hospital/?city=LOS%20ANGELES";
  hospitalGetRequest = $.ajax({
    url: erScoutHospitalsQuery,
    type: 'GET',
    dataType: 'json',
  }).done(function (data){
    var hospitals = data.objects;
    $.each(hospitals, function(i, item) { addMarker(item, map); });
  });
}

function addMarker(item, map){
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(parseFloat(item.latitude), parseFloat(item.longitude)), 
    map: map,
    icon: "static/emergency/blue-dot-state.png"});
  marker.setAnimation(google.maps.Animation.DROP);
  markersArray.push(marker);
}

var content = '<div id="hospitalContent"> <h1 id="hospitalName">NewYork State Hospital</h1> <p> Addr: askdjfksdja </p> <p> askdfjasdk </p> <p> Ph: 253190 </p> <p> email: asdfkajds@aksdfj </p> </div>'
