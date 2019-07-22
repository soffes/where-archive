mapboxgl.accessToken = "pk.eyJ1Ijoic29mZmVzIiwiYSI6IjFZZngwVDQifQ.2SwdR3e8-p_K50zm-hYwUg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-121.52214179909288, 37.178702023907505],
  zoom: 13.5
});

map.on("load", function () {
  map.loadImage("/assets/pin@2x.png", function(error, image) {
    if (error) throw error;
    map.addImage("custom-marker", image, { pixelRatio: 2 });
  });

  map.addSource("route", {
    type: "geojson",
    data: "/route.json"
  });

  map.addLayer({
    "id": "route",
    "type": "line",
    "source": "route",
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      "line-color": "#6506F1",
      "line-width": 4
    }
  });

  map.addSource("points", {
    type: "geojson",
    data: "/points.json"
  });

  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": "points",
    "layout": {
      "icon-image": "custom-marker"
    }
  });
});

