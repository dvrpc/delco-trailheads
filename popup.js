const newPopup = () =>
  /**
   * Generate a new mapboxgl.Popup object
   */
  new mapboxgl.Popup({
    closeButton: false,
    className: "i-am-a-popup",
  });

const bindPopup = (map, html_msg, click) => {
  /**
   * Add a new popup to the map where the user clicked
   *
   * @param {mapboxgl.Map} map - The map object for the page
   * @param {string} html_msg - text that gets dropped into the popup, including HTML tags
   * @param click - The click event from the user's interaction
   */

  clearPopups();

  var popup = newPopup();
  popup.setLngLat(click.lngLat).setHTML(html_msg).addTo(map);
};

const clearPopups = () => {
  // Remove any popups that may exist
  var popup = document.getElementsByClassName("mapboxgl-popup");
  if (popup.length) {
    popup[0].remove();
  }
};

const use_pointer = (map, layername) => {
  // when hovering over the layer, show a pointer mouse
  map.on("mouseenter", layername, (e) => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", layername, (e) => {
    map.getCanvas().style.cursor = "";
  });
};

const click_on_trailheads = (map) => {
  use_pointer(map, "trailheads");
  map.on("click", "trailheads", (e) => {
    clearPopups();
    let props = e.features[0].properties;
    let msg = `<h3>Trailhead</h3><ul><li>Stakeholder Votes: ${props.votes}</li><li>Prioritization Score: ${props.final_scor}</li></ul>`;
    bindPopup(map, msg, e);
  });
};

export { click_on_trailheads };
