import mapboxgl from 'mapbox-gl';

const key = "pk.eyJ1IjoibW9uaWNhOTIiLCJhIjoiY2tqcmFnMmp0MXRtMDMwbDludTdsNHVodCJ9.2zYEk_dhE3bPFkME_-639Q";
const addressInput = document.querySelector("#address");
const submitButton = document.querySelector("#submitButton");
const coordinates = document.querySelector("#coordinates");


submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(addressInput.value);
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressInput.value}.json?access_token=${key}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data.features);
      coordinates.innerHTML = "";
      const query = data.features[0].geometry.coordinates;
      console.log(query);
      coordinates.insertAdjacentHTML("beforeend", `<h5>${query[0]} - ${query[1]}</h5>`);
      mapboxgl.accessToken = key;

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: query,
        zoom: 12
      });
      new mapboxgl.Marker()
        .setLngLat(query).addTo(map);
    });
});
