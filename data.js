const data_sources = {
  "geojson-trailheads": {
    type: "geojson",
    data: "./data/trailheads-with-final-votes-and-priorities.geojson",
  },
  "geojson-trail-segments": {
    type: "geojson",
    data: "./data/trail-segments.geojson",
  },
  "geojson-focus-areas": {
    type: "geojson",
    data: "./data/focus-areas.geojson",
  },
  "tile-bounds": {
    type: "vector",
    url: "https://www.tiles.dvrpc.org/data/census_boundaries.json",
  },
};

const layers = {
  delco: {
    id: "delco-outline",
    type: "line",
    source: "tile-bounds",
    "source-layer": "county",
    paint: {
      "line-width": 2.5,
      "line-color": "#B0C4DE",
    },
    filter: ["==", "CNTY_NAME", "Delaware County"],
  },
  study: {
    id: "study",
    type: "fill",
    source: "geojson-focus-areas",
    paint: {
      "fill-color": "yellow",
      "fill-opacity": 0.6,
    },
  },
  existingtrailsegments: {
    id: "existing-trail-segments",
    type: "line",
    source: "geojson-trail-segments",
    filter: ["==", "Status_F_1", "Existing"],
    paint: {
      "line-color": "#00ae12",
      "line-width": 8,
      "line-opacity": 0.7,
    },
  },
  futuretrailsegments: {
    id: "future-trail-segments",
    type: "line",
    source: "geojson-trail-segments",
    filter: ["!=", "Status_F_1", "Existing"],
    paint: {
      "line-opacity": 0.7,
      "line-dasharray": [1, 1],
      "line-color": [
        "case",
        ["==", ["get", "status"], "Construction"],
        "#a416ff",
        ["==", ["get", "status"], "Design"],
        "#511aff",
        ["==", ["get", "status"], "Potential"],
        "#ff9f3d",
        ["==", ["get", "status"], "Proposed"],
        "#e60000",
        "black",
      ],
      "line-width": 3,
    },
  },
  trailheads: {
    id: "trailheads",
    type: "circle",
    source: "geojson-trailheads",
    paint: {
      "circle-radius": 5,
      "circle-opacity": 0.8,
      "circle-stroke-color": "black",
      "circle-stroke-width": 2,
      "circle-color": [
        "match",
        ["get", "trail_de_3"],
        "Yes",
        "blue",
        "Maybe",
        "orange",
        "No",
        "red",
        /* other */ "#ccc",
      ],
    },
  },
  selectedtrailheads: {
    id: "selected-trailheads",
    type: "circle",
    source: "geojson-trailheads",
    paint: {
      "circle-radius": 10,
      "circle-color": "yellow",
      "circle-stroke-color": "black",
      "circle-stroke-width": 2,
    },
    filter: ["==", "gid", "-1"],
  },
};

export { layers, data_sources };
