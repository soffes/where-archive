mapboxgl.accessToken = "pk.eyJ1Ijoic29mZmVzIiwiYSI6IjFZZngwVDQifQ.2SwdR3e8-p_K50zm-hYwUg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-121.546596, 37.186381],
  zoom: 15
});

map.on("load", function () {
  map.loadImage("marker.png", function(error, image) {
    if (error) throw error;
    map.addImage("custom-marker", image);
  });

  map.addSource("markers", {
    type: "geojson",
    data: "./data.json"
  });

  // map.getSource("markers").setData("/data.json");

  map.addLayer({
    "id": "markers",
    "type": "symbol",
    "source": "markers",
    "layout": {
      "icon-image": "custom-marker"
    }
  });
});

