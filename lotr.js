/*
    Author: Mark Rice
    This is the JavaScript for my LOTR quotes page
    Allows users to fetch quotes from the LOTR trilogy movies
    You can select random quote from all movies and characters, or
    specify quotes from a specific movie or specific character.
*/

// Variables:

// Variables to fetch a random quote from all of the trilogy movies.
const allQuotesListURL = "https://the-one-api.dev/v2/quote";
const randomQuoteButton = document.getElementById("random-quote-button");
const randomQuote = document.getElementById("random-quote");


// Hardcoding the list of movies, as to only include the individual trilogy movies 
// and to sort them in chronological order. Otherwise it would populate with
// The Hobbit movies and the trilogy as a whole which have no quotes available.
const movies = [
    { id: "5cd95395de30eff6ebccde5b", name: "The Fellowship of the Ring" },
    { id: "5cd95395de30eff6ebccde5c", name: "The Two Towers" },
    { id: "5cd95395de30eff6ebccde5d", name: "The Return of the King" },
];

// Variables to fetch a quote from a specific trilogy movie from all characters.
const moviesList = document.getElementById("movies-list");
const randomMovieQuoteButton = document.getElementById("random-movie-quote-button");
const randomMovieQuote = document.getElementById("random-movie-quote");

// Hardcoding the list of characters, as to only include characters with quotes
// and to sort them in alphabetical order.
const characters = [
    { id: "5cd99d4bde30eff6ebccfbe6", name: "Aragorn II Elessar" },
    { id: "5cd99d4bde30eff6ebccfc07", name: "Arwen" },
    { id: "5cd99d4bde30eff6ebccfc38", name: "Bilbo Baggins" },
    { id: "5cd99d4bde30eff6ebccfc57", name: "Boromir" },
    { id: "5cd99d4bde30eff6ebccfc95", name: "Damrod" },
    { id: "5cd99d4bde30eff6ebccfc9a", name: "Denethor II" },
    { id: "5cd99d4bde30eff6ebccfca7", name: "Déagol" },
    { id: "5cd99d4bde30eff6ebccfcc8", name: "Elrond" },
    { id: "5cdbdecb6dc0baeae48cfa59", name: "Éowyn" },
    { id: "5cdbdecb6dc0baeae48cfa5a", name: "Éomer" },
    { id: "5cd99d4bde30eff6ebccfcef", name: "Faramir" },
    { id: "5cd99d4bde30eff6ebccfc15", name: "Frodo Baggins" },
    { id: "5cd99d4bde30eff6ebccfd06", name: "Galadriel" },
    { id: "5cd99d4bde30eff6ebccfd0e", name: "Gamling" },
    { id: "5cd99d4bde30eff6ebccfea0", name: "Gandalf" },
    { id: "5cd99d4bde30eff6ebccfd23", name: "Gimli" },
    { id: "5cd99d4bde30eff6ebccfe9e", name: "Gollum" },
    { id: "5cdbdecb6dc0baeae48cfa96", name: "Gothmog (Lieutenant of Morgul)" },
    { id: "5cd99d4bde30eff6ebccfd32", name: "Grimbold" },
    { id: "5cd99d4bde30eff6ebccfe9d", name: "Gríma Wormtongue" },
    { id: "5cd99d4bde30eff6ebccfd3f", name: "Haldir (Haladin)" },
    { id: "5cd99d4bde30eff6ebccfd66", name: "Háma" },
    { id: "5cd9d5cf844dc4c55e47aff0", name: "Irolas" },
    { id: "5cd99d4bde30eff6ebccfd81", name: "Legolas" },
    { id: "5cd99d4bde30eff6ebccfc7c", name: "Meriadoc Brandybuck" },
    { id: "5cdbdf477ed9587226e7949b", name: "Madril" },
    { id: "5cdbe49b7ed9587226e794a0", name: "Minor Character" },
    { id: "5cd9d5a0844dc4c55e47afef", name: "Mouth of Sauron" },
    { id: "5cd99d4bde30eff6ebccfe2e", name: "Peregrin Took" },
    { id: "5cd99d4bde30eff6ebccfc8f", name: "Rosie Cotton" },
    { id: "5cd99d4bde30eff6ebccfd0d", name: "Samwise Gamgee" },
    { id: "5cd99d4bde30eff6ebccfea4", name: "Saruman" },
    { id: "5cd9d533844dc4c55e47afed", name: "Treebeard" },
    { id: "5cd99d4bde30eff6ebccfe0d", name: "The King of the Dead" },
    { id: "5cd99d4bde30eff6ebccfe19", name: "Théoden" },
    { id: "5cd9d576844dc4c55e47afee", name: "Witch-King of Angmar" }
];

// Variables to fetch a quote from a specific character from all movies.
const charactersList = document.getElementById("characters-list");
const randomCharacterQuoteButton = document.getElementById("random-character-quote-button");
const randomCharacterQuote = document.getElementById("random-character-quote");


// When the page loads, populate the lists..
window.addEventListener("load", function() {
    updateLists();
});

// Populate the movies and characters dropdowns.
function updateLists() {
    // Populate the movie list.
    movies.forEach(movie => {
        let option = createOption(movie.name, movie.id);
        moviesList.appendChild(option);
    });

    // Populate the character list.
    characters.forEach(character => {
        let option = createOption(character.name, character.id);
        charactersList.appendChild(option);
    });
}

// Create an option element for the select lists.
function createOption(text, value) {
    let option = document.createElement("option");
    option.textContent = text;
    option.value = value; // Store the ID of the movie or character
    return option;
}

// Fetch and display a new random quote from all trilogy movies.
async function getRandomQuote() {
    const url = `${allQuotesListURL}`;
    return fetch(url, {
        headers: {
            Authorization: "Bearer DNvMjRjyE4YcedIfWS01"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.docs && data.docs.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.docs.length); // Generate a random quote
            const selectedQuote = data.docs[randomIndex]; // Assign the random quote
            return {
                quote: selectedQuote.dialog,
                movieName: movies.find(m => m.id === selectedQuote.movie).name, // Get the movie name
                characterName: characters.find(c => c.id === selectedQuote.character).name // Get the character name
            };
        
        } else {
            throw new Error("No quotes found.");
        }
    });
}

// Show random quote with loading indicator.
randomQuoteButton.addEventListener("click", function() {
    randomQuote.textContent = "Loading...";
    getRandomQuote()
        .then(data => {
            // Display the random quote with character and movie
            randomQuote.textContent = `"${data.quote}" - ${data.characterName} (${data.movieName})`; 
        })
        .catch(error => {
            // Api is limited to 100 fetches per 10 minutes
            if (error = "Error: HTTP error! Status: 429"){
                randomQuote.textContent = "Too many requests, please wait 10 minutes."
                console.error("Error fetching random character quote:", error);
            } else {
            randomCharacterQuote.textContent = "No quote available.";
            console.error("Error fetching random character quote:", error);
            }
        })
});

// Retrieve random quote from selected movie.
async function getRandomQuoteByMovie(movieId) {
    const url = `https://the-one-api.dev/v2/quote?movie=${movieId}`;
    return fetch(url, {
        headers: {
            Authorization: "Bearer DNvMjRjyE4YcedIfWS01"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.docs && data.docs.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.docs.length); // Generate a random quote
            const selectedQuote = data.docs[randomIndex]; // Assign the random quote
            return {
                quote: selectedQuote.dialog,
                movieName: movies.find(m => m.id === movieId).name, // Get the movie name
                characterName: characters.find(c => c.id === selectedQuote.character).name // Get the character name
            };
        } else {
            throw new Error("No quotes found for this movie.");
        }
    });
}

// Show random quote from selected movie with loading indicator.
randomMovieQuoteButton.addEventListener("click", function() {
    const selectedMovieId = moviesList.value;
    if (selectedMovieId) {
        randomMovieQuote.textContent = "Loading...";
        getRandomQuoteByMovie(selectedMovieId)
            .then(data => {
                // Display the random quote with character and movie
                randomMovieQuote.textContent = `"${data.quote}" - ${data.characterName} (${data.movieName})`; 
            })
            .catch(error => {
                // Api is limited to 100 fetches per 10 minutes
                if (error = "Error: HTTP error! Status: 429"){
                    randomMovieQuote.textContent = "Too many requests, please wait 10 minutes."
                    console.error("Error fetching random character quote:", error);
                } else {
                randomCharacterQuote.textContent = "No quote available.";
                console.error("Error fetching random character quote:", error);
                }
            })
    }
});

// Retrieve random quote from selected character.
async function getRandomQuoteByCharacter(characterId) {
    const url = `https://the-one-api.dev/v2/quote?character=${characterId}`;
    return fetch(url, {
        headers: {
            Authorization: "Bearer DNvMjRjyE4YcedIfWS01"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.docs && data.docs.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.docs.length); // Generate a random quote
            const selectedQuote = data.docs[randomIndex]; // Assign the random quote
            return {
                quote: selectedQuote.dialog,
                movieName: movies.find(m => m.id === selectedQuote.movie).name, // Get the movie name
                characterName: characters.find(c => c.id === characterId).name // Get the character name 
            };
        } else {
            throw new Error("No quotes found for this character.");
        }
    });
}

// Show random quote from selected character with loading indicator.
randomCharacterQuoteButton.addEventListener("click", function() {
    const selectedCharacterId = charactersList.value;
    if (selectedCharacterId) {
        randomCharacterQuote.textContent = "Loading...";
        getRandomQuoteByCharacter(selectedCharacterId) 
            .then(data => {
                // Display quote, character, and movie
                randomCharacterQuote.textContent = `"${data.quote}" - ${data.characterName} (${data.movieName})`; 
            })
            .catch(error => {
                // Api is limited to 100 fetches per 10 minutes
                if (error = "Error: HTTP error! Status: 429"){
                    randomCharacterQuote.textContent = "Too many requests, please wait 10 minutes."
                    console.error("Error fetching random character quote:", error);
                } else {
                randomCharacterQuote.textContent = "No quote available.";
                console.error("Error fetching random character quote:", error);
                }
            })
    }
});