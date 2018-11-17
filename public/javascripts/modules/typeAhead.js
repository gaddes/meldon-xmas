import axios from 'axios';
import dompurify from 'dompurify';

function searchResultsHTML(stores) {
    return stores.map(store => {
        return `
            <a href="/store/${store.slug}" class="search__result">
                <strong>${store.name}</strong>
            </a>
        `;
    }).join('');
};

function typeAhead(search) {
    if (!search) return;

    const searchInput = search.querySelector('input[name="search"]');
    const searchResults = search.querySelector('.search__results');

    // .on is just a shortcut for addEventListener!
    searchInput.on('input', function() {
        
        // This logs the results of the search query to the console as the user types in the searchbox - very cool for seeing how this event listener works!
        console.log(this.value);

        // If there is no value, quit it!
        if (!this.value) {
            searchResults.style.display = 'none';
            return; // Stop!
        }
        
        // Show the search results!
        searchResults.style.display = 'block';
        searchResults.innerHTML = dompurify.sanitize('');

        axios
            .get(`/api/search?q=${this.value}`)
            .then(res => {
                // Type the word 'coffee' and notice how an empty array is returned for the first five letters...
                // When we type the sixth letter and complete the word 'coffee', we are given an array of stores that match the search query!
                console.log(res.data);

                if (res.data.length) {
                    searchResults.innerHTML = dompurify.sanitize(searchResultsHTML(res.data));
                    return;
                }
                // Tell them nothing came back
                searchResults.innerHTML = dompurify.sanitize(`<div class="search__result">No results for ${this.value} found!</div>`);
            })
            .catch(err => {
                console.error(err);
            });
    });

    // Handle keyboard inputs (scroll up and down list with arrow keys)
    searchInput.on('keyup', (e) => {
        // If they aren't pressing up, down or enter, who cares!
        if (![38, 40, 13].includes(e.keyCode)) {
            return; // Skip it!
        }

        // This block of code handles the 'active' store (in the dropdown list)
        // It also handles the situation where the user clicks 'down arrow' at the end of the list
        // Or clicks 'up arrow' at the top!
        // KEYCODE --> UP = 38
        // KEYCODE --> DOWN = 40
        // KEYCODE --> ENTER = 13
        const activeClass = 'search__result--active';
        const current = search.querySelector(`.${activeClass}`);
        const items = search.querySelectorAll('.search__result');
        let next;
        if (e.keyCode === 40 && current) {
            next = current.nextElementSibling || items[0];
        } else if (e.keyCode === 40) {
            next = items[0];
        } else if (e.keyCode === 38 && current) {
            next = current.previousElementSibling || items[items.length - 1];
        } else if (e.keyCode === 38) {
            next = items[items.length - 1];
        } else if (e.keyCode === 13 && current.href) {
            window.location = current.href;
            return;
        }
        if (current) {
            current.classList.remove(activeClass);
        }
        next.classList.add(activeClass);
    });
};

export default typeAhead;