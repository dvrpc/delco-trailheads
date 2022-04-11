import { layers, data_sources } from "./data.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/dvrpcomad/ckz2y2ww2002714qmlx8k1q99",
  center: [-75.3987737375343, 39.91659678130318],
  zoom: 10,
});

map.on("load", () => {
  for (const src in data_sources) map.addSource(src, data_sources[src]);

  for (const lyr in layers) map.addLayer(layers[lyr]);

  //   use_pointer(map);
  //   click_on_trailheads(map);

  //   assign_form_logic(map);
});
