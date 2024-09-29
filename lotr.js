/*
    Author: Mark Rice
    This is the JavaScript for my LOTR page
*/

// Variables
const allQuotesListURL = "https://the-one-api.dev/v2/quote";
const randomQuoteButton = document.getElementById("random-quote-button");
const randomQuote = document.getElementById("random-quote");

const movies = [
    { id: "5cd95395de30eff6ebccde5b", name: "The Fellowship of the Ring" },
    { id: "5cd95395de30eff6ebccde5c", name: "The Two Towers" },
    { id: "5cd95395de30eff6ebccde5d", name: "The Return of the King" },
];

const moviesList = document.getElementById("movies-list");
const randomMovieQuoteButton = document.getElementById("random-movie-quote-button");
const randomMovieQuote = document.getElementById("random-movie-quote");

const characters = [
    { id: "5cd99d4bde30eff6ebccfbe6", name: "Aragorn II Elessar"},
    { id: "5cd99d4bde30eff6ebccfc07", name: "Arwen"},
    { id: "5cd99d4bde30eff6ebccfc15", name: "Frodo Baggins" },
    { id: "5cd99d4bde30eff6ebccfc38", name: "Bilbo Baggins" },
    { id: "5cd99d4bde30eff6ebccfc57", name: "Boromir" },
    { id: "5cd99d4bde30eff6ebccfc7c", name: "Meriadoc Brandybuck" },
    { id: "5cd99d4bde30eff6ebccfc8f", name: "Rosie Cotton" },
    { id: "5cd99d4bde30eff6ebccfc95", name: "Damrod" },
    { id: "5cd99d4bde30eff6ebccfc9a", name: "Denethor II" },
    { id: "5cd99d4bde30eff6ebccfca7", name: "Déagol" },
    { id: "5cd99d4bde30eff6ebccfcc8", name: "Elrond" },
    { id: "5cd99d4bde30eff6ebccfcef", name: "Faramir" },
    { id: "5cd99d4bde30eff6ebccfd06", name: "Galadriel" },
    { id: "5cd99d4bde30eff6ebccfd0d", name: "Samwise Gamgee" },
    { id: "5cd99d4bde30eff6ebccfd0e", name: "Gamling" },
    { id: "5cd99d4bde30eff6ebccfd23", name: "Gimli" },
    { id: "5cd99d4bde30eff6ebccfd32", name: "Grimbold" },
    { id: "5cd99d4bde30eff6ebccfd3f", name: "Haldir (Haladin)" },
    { id: "5cd99d4bde30eff6ebccfd66", name: "Háma" },
    { id: "5cd99d4bde30eff6ebccfd81", name: "Legolas" },
    { id: "5cd99d4bde30eff6ebccfe0d", name: "The King of the Dead" },
    { id: "5cd99d4bde30eff6ebccfe19", name: "Théoden" },
    { id: "5cd99d4bde30eff6ebccfe2e", name: "Peregrin Took" },
    { id: "5cd99d4bde30eff6ebccfe9d", name: "Gríma Wormtongue" },
    { id: "5cd99d4bde30eff6ebccfe9e", name: "Gollum" },
    { id: "5cd99d4bde30eff6ebccfea0", name: "Gandalf" },
    { id: "5cd99d4bde30eff6ebccfea4", name: "Saruman" },
    { id: "5cd9d533844dc4c55e47afed", name: "Treebeard" },
    { id: "5cd9d576844dc4c55e47afee", name: "Witch-King of Angmar" },
    { id: "5cd9d5a0844dc4c55e47afef", name: "Mouth of Sauron" },
    { id: "5cd9d5cf844dc4c55e47aff0", name: "Irolas" },
    { id: "5cdbdecb6dc0baeae48cfa59", name: "Éowyn" },
    { id: "5cdbdecb6dc0baeae48cfa5a", name: "Éomer" },
    { id: "5cdbdecb6dc0baeae48cfa96", name: "Gothmog (Lieutenant of Morgul)" },
    { id: "5cdbdf477ed9587226e7949b", name: "Madril" }
];

const charactersList = document.getElementById("characters-list");
const randomCharacterQuoteButton = document.getElementById("random-character-quote-button");
const randomCharacterQuote = document.getElementById("random-character-quote");

// Mapping character IDs to movies
const characterToMovieMap = {
    "5cd99d4bde30eff6ebccfbe6": "The Fellowship of the Ring", // Aragorn II Elessar
    "5cd99d4bde30eff6ebccfc07": "The Fellowship of the Ring", // Arwen
    "5cd99d4bde30eff6ebccfc15": "The Fellowship of the Ring", // Frodo Baggins
    "5cd99d4bde30eff6ebccfc38": "The Fellowship of the Ring", // Bilbo Baggins
    "5cd99d4bde30eff6ebccfc57": "The Fellowship of the Ring", // Boromir
    "5cd99d4bde30eff6ebccfc7c": "The Fellowship of the Ring", // Meriadoc Brandybuck
    "5cd99d4bde30eff6ebccfc8f": "The Fellowship of the Ring", // Rosie Cotton
    "5cd99d4bde30eff6ebccfc95": "The Return of the King", // Damrod
    "5cd99d4bde30eff6ebccfc9a": "The Return of the King", // Denethor II
    "5cd99d4bde30eff6ebccfca7": "The Two Towers", // Déagol
    "5cd99d4bde30eff6ebccfcc8": "The Fellowship of the Ring", // Elrond
    "5cd99d4bde30eff6ebccfcef": "The Two Towers", // Faramir
    "5cd99d4bde30eff6ebccfd06": "The Fellowship of the Ring", // Galadriel
    "5cd99d4bde30eff6ebccfd0d": "The Return of the King", // Samwise Gamgee
    "5cd99d4bde30eff6ebccfd0e": "The Two Towers", // Gamling
    "5cd99d4bde30eff6ebccfd23": "The Two Towers", // Gimli
    "5cd99d4bde30eff6ebccfd32": "The Return of the King", // Grimbold
    "5cd99d4bde30eff6ebccfd3f": "The Fellowship of the Ring", // Haldir (Haladin)
    "5cd99d4bde30eff6ebccfd66": "The Two Towers", // Háma
    "5cd99d4bde30eff6ebccfd81": "The Two Towers", // Legolas
    "5cd99d4bde30eff6ebccfe0d": "The Return of the King", // The King of the Dead
    "5cd99d4bde30eff6ebccfe19": "The Return of the King", // Théoden
    "5cd99d4bde30eff6ebccfe2e": "The Two Towers", // Peregrin Took
    "5cd99d4bde30eff6ebccfe9d": "The Two Towers", // Gríma Wormtongue
    "5cd99d4bde30eff6ebccfe9e": "The Two Towers", // Gollum
    "5cd99d4bde30eff6ebccfea0": "The Fellowship of the Ring", // Gandalf
    "5cd99d4bde30eff6ebccfea4": "The Two Towers", // Saruman
    "5cd9d533844dc4c55e47afed": "The Two Towers", // Treebeard
    "5cd9d576844dc4c55e47afee": "The Return of the King", // Witch-King of Angmar
    "5cd9d5a0844dc4c55e47afef": "The Return of the King", // Mouth of Sauron
    "5cd9d5cf844dc4c55e47aff0": "The Return of the King", // Irolas
    "5cdbdecb6dc0baeae48cfa59": "The Return of the King", // Éowyn
    "5cdbdecb6dc0baeae48cfa5a": "The Two Towers", // Éomer
    "5cdbdecb6dc0baeae48cfa96": "The Return of the King", // Gothmog (Lieutenant of Morgul)
    "5cdbdf477ed9587226e7949b": "The Return of the King" // Madril
};

// When the page loads
window.addEventListener("load", updateLists);

// Populate the movies and characters dropdowns
function updateLists() {
    // Populate the movie list
    movies.forEach(movie => {
        let option = createOption(movie.name, movie.id);
        moviesList.appendChild(option);
    });

    // Populate the character list
    characters.forEach(character => {
        let option = createOption(character.name, character.id);
        charactersList.appendChild(option);
    });
}

// Create an option element for the select lists
function createOption(text, value) {
    let option = document.createElement("option");
    option.textContent = text;
    option.value = value; // Store the ID of the movie or character
    return option;
}

// Retrieve random quote based on selected character
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
        console.log("Character Quote Data:", data);  // Log the data for debugging
        if (data && data.docs && data.docs.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.docs.length);
            return {
                quote: data.docs[randomIndex].dialog, 
                movie: characterToMovieMap[characterId] // Get the movie from the mapping
            };
        } else {
            throw new Error("No quotes found for this character");
        }
    });
}

// Show random quote for selected character
randomCharacterQuoteButton.addEventListener("click", function() {
    const selectedCharacterId = charactersList.value;
    if (selectedCharacterId) {
        getRandomQuoteByCharacter(selectedCharacterId)
            .then(data => {
                randomCharacterQuote.textContent = `${data.quote} - ${data.movie}`; // Display the random quote with movie
            })
            .catch(error => {
                randomCharacterQuote.textContent = "No quote available.";
                console.error("Error fetching random character quote:", error);
            });
    }
});

// Retrieve random quote based on selected movie
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
        console.log("Movie Quote Data:", data);  // Log the data for debugging
        if (data && data.docs && data.docs.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.docs.length);
            const quote = data.docs[randomIndex].dialog; // Return random quote
            const characterId = data.docs[randomIndex].character; // Get character ID
            const characterName = characters.find(c => c.id === characterId).name; // Find character name from list
            return {
                quote: quote,
                character: characterName,
                movie: movies.find(m => m.id === movieId).name // Get movie name from list
            };
        } else {
            throw new Error("No quotes found for this movie");
        }
    });
}

// Show random movie quote
randomMovieQuoteButton.addEventListener("click", function() {
    const selectedMovieId = moviesList.value;
    if (selectedMovieId) {
        getRandomQuoteByMovie(selectedMovieId)
            .then(data => {
                randomMovieQuote.textContent = `${data.quote} - ${data.character} (${data.movie})`; // Display the random quote with character and movie
            })
            .catch(error => {
                randomMovieQuote.textContent = "No quote available.";
                console.error("Error fetching random movie quote:", error);
            });
    }
});

// Retrieve random quote from all sources
async function getRandomQuote() {
    const url = allQuotesListURL;
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
        console.log("Random Quote Data:", data);  // Log the data for debugging
        if (data && data.docs && data.docs.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.docs.length);
            const quote = data.docs[randomIndex].dialog;
            const characterId = data.docs[randomIndex].character; // Get character ID
            const characterName = characters.find(c => c.id === characterId).name; // Find character name from list
            const movieId = data.docs[randomIndex].movie; // Get movie ID
            const movieName = movies.find(m => m.id === movieId).name; // Find movie name from list
            return {
                quote: quote,
                character: characterName,
                movie: movieName
            };
        } else {
            throw new Error("No quotes found");
        }
    });
}

// Show random quote
randomQuoteButton.addEventListener("click", function() {
    getRandomQuote()
        .then(data => {
            randomQuote.textContent = `${data.quote} - ${data.character} (${data.movie})`; // Display the random quote with character and movie
        })
        .catch(error => {
            randomQuote.textContent = "No quote available.";
            console.error("Error fetching random quote:", error);
        });
});
