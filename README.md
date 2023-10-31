# Pokémon
This is a web application that uses the external PokéAPI to fetch Pokémon data and present them in a card based layout.

### Javascript
1. Variables Initialization
   - The script starts with variable initialization. Variables like `limit`, `initialApiUrl`, `pokedex`, etc. are initializrd at the beginning
   - ```
     const limit = 100;
     const initialApiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
     let pokedex = new Map();
     let printedPokemon = [];
     let printedPokemonURL = [];
     let printedPokemonName = [];
     let printedTypes = [];
     let nextApiUrl;
     let isDataLoading = false;
     ```
2. TypeColor Map
   - A map to store colors corresponding to different Pokémon types.
   - ```
     let typeColor = new Map();
     typeColor.set('bug', '#3b9950');
     ...
     ```
3. buildPokemonTypeChips function
   - Creates a chip-like element for every type of Pokémon.
   - ```
     const buildPokemonTypeChips = (pokemonTypes) => {
     let pokemonTypesChips = "";
     for(const type of pokemonTypes) {
        const typeEl = `<div class="pokemon-type">${type.type.name}</div>`;
        pokemonTypesChips += typeEl;
     }
     return pokemonTypesChips;
     }
     ```
4. generatePage function
   - Appends Pokémon cards to the main`pokedex` element
Some things I could improve on for this project is enabling multi-word search functionality, providing more relevant information within the modal, using the SVG image instead of the PNG image when available for the sprite (so that resolution of image was always high, no matter how far the user zoomed in), and also making the modal more aesthetically pleasing as well. Another important thing I could do is make the search faster. I could also incorporate information such as the evolution timeline and other things within the modal (such as the different sprites available within the API call). I was trying this at first (as you may see with the arrow buttons at each side of the modal), but ultimately ceased progress on this project since I was satisfied with where the project was, and wanted to look into other things. Another important aspect to consider is ADA requirements. The one factor I must work on (according to Lighthouse) is improving contrast so that it is easier to see the buttons (such as the "Top of Pokédex, End of Pokédex, and the types that are listed under the Pokémon's name. This received a score of 89 for performance, 95 for accessibility, 92 for best practices, and 90 for search engine optimization. Following the suggested guidelines by Lighthouse can significantly improve this project.

## Harish
