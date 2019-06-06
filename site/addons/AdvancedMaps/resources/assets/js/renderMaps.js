/* global google */

'use strict';

var defaultZoom = 10;

function renderGoogleMap({ address, zoom, mapElement }) {
  var defaultPosition = new google.maps.LatLng(40.67, -73.94); // New York
  var geocoder = new google.maps.Geocoder();
  var styles;

  try {
    styles = JSON.parse(mapElement.dataset.googleStyles);
  } catch (error) {}

  geocoder.geocode(
    {
      address: address,
    },
    function(results, status) {
      var position;

      try {
        position = results[0].geometry.location;
      } catch (error) {
        if (status !== 'OK') {
          console.error('Provided address', address, 'is invalid', status);
        } else {
          console.error('Provided address', address, 'could not be found');
        }
        position = defaultPosition;
      }

      renderMap(position);
    }
  );

  function renderMap(position) {
    var mapOptions = {
      zoom: zoom,
      disableDefaultUI: true,
      center: position,
      styles: styles,
    };

    var map = new google.maps.Map(mapElement, mapOptions);
    new google.maps.Marker({
      position: position,
      map: map,
    });
  }
}

function renderMapboxMap({ mapElement, zoom, address }) {
  var mapboxApiKey = mapElement.dataset.mapboxApiKey;
  var defaultPosition = { lon: -73.949, lat: 40.67 }; // New York
  var defaultStyle = 'mapbox://styles/mapbox/streets-v10';
  var style;
  try {
    style = JSON.parse(mapElement.dataset.mapboxStyles);
  } catch (error) {
    style = mapElement.dataset.mapboxStyles;
  } finally {
    style = style || defaultStyle;
  }

  mapboxgl.accessToken = mapboxApiKey;

  if (address) {
    geocodeAddress(address).then(position => renderMap({ position }));
  } else {
    renderMap({ position: defaultPosition });
  }

  function geocodeAddress(address) {
    return fetch(
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        address +
        '.json?access_token=' +
        mapboxApiKey
    )
      .then(response => response.json())
      .then(response => {
        return response.features[0].center;
      });
  }

  function renderMap({ position }) {
    var map = new mapboxgl.Map({
      container: mapElement,
      zoom: zoom,
      center: position,
      style: style,
    });
    new mapboxgl.Marker().setLngLat(position).addTo(map);
  }
}

(function() {
  function advancedMaps() {
    var mapElements = document.getElementsByClassName(
      'js-advanced-google-maps'
    );

    for (var i = 0; i < mapElements.length; i++) {
      var mapElement = mapElements.item(i);
      var zoom = Number(mapElement.dataset.zoom) || defaultZoom;
      var address = mapElement.dataset.address;
      var mapType = mapElement.dataset.mapType;

      if (mapType === 'google') {
        renderGoogleMap({ address, zoom, mapElement });
      } else {
        renderMapboxMap({ mapElement, zoom, address });
      }
    }
  }
  window.advancedMaps = advancedMaps;
})();
