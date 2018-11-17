function autocomplete(input, latInput, lngInput) {
    if(!input) return; // Skip this function from running if there is no address (input) on the page
    const dropdown = new google.maps.places.Autocomplete(input);

    // Most of these methods come from the Google Maps API
    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();
    });
    // If someone hits enter on the address field, don't submit the form!
    // .on is an alternative way to add an event listener, from bling.js - we import this in delicious-app.js
    input.on('keydown', (e) => {
        if(e.keyCode === 13) e.preventDefault();
    });
}

export default autocomplete;