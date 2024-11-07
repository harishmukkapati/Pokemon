# Pokémon
This is a web application that uses the external PokéAPI to fetch Pokémon data and present them in a card based layout.


## Javascript
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
4. buildCard function
   - Constructs a card that dispays the Pokémon's details
   - ```
     const buildCard = (pokemonId, pokemonName, pokemonTypes, pokemonSpriteUrl) => {
     const typeColorKey = pokemonTypes[0].type.name;
     const color = typeColor.get(typeColorKey);
     ...
     ```
6.  generatePage function
   - Appends Pokémon cards to the main`pokedex` element
   - ```
     const generatePage = () => {
     const pokedexEl = document.getElementById("pokedex");
     pokedex.forEach((value, key) => {
        if(!printedPokemon.includes(value.id))
        {
            const card = buildCard(value.id, value.name, value.types, value.sprites.front_default);
            pokedexEl.innerHTML += card;
        }

     })
     };
     ```
7. getInitialPokemonData function
   - Fetches the first set of Pokémon details and initializes the Pokédex.
   - ```
     async function getInitialPokemonData() {
     const response = await fetch(initialApiUrl);
     const pokedexData = await response.json();
     nextApiUrl = pokedexData.next;
     await getEachPokemonData(pokedexData);
     generatePage();
     }
     ```
8. getNewPokemon function
   - Called when the user scrolls to the bottom of the pafg. This function fetches and displays the next set of Pokémon.
   - ```
     async function getNewPokemon() {
        if (nextApiUrl) {
           document.getElementById("loading-message").style.display = "block";
           const loading = loader();
           const removable = document.getElementById("loading-message").innerHTML += loading;
           const response = await fetch(nextApiUrl);
           const pokedexData = await response.json();
     ...
        }
     }
     ```
9. Event Listeners
    - Listeners are added for the DOM content loaded event and the window scroll event.
10. onCardClick function
    - Displays a modal with more detailed information about a clicked Pokémon.
11. newCard function
    - Constructs the detailed card for the modal.
12. onPopup function
    - Closes the modal.
13. searchPokemon function
    - Allows users to search for Pokémon by name, id, type, or ability.
    - ```
      let searchTimeout;
      const searchPokemon = (value) => {
         clearTimeout(searchTimeout);
         searchTimeout = setTimeout(() => {
         const pokedexEl = document.getElementById("pokedex");
         pokedexEl.innerHTML = "";
      ...
      ```
14. scrollToBottom & scrollToTop functions
    - Helper functions to quickly scroll to the bottom ot top of the page.

## HTML
1. Search bar
   - Contains buttons to scroll to the top and bottom, and an input for searching Pokémon.
2. display-area
   - Whre all the Pokémon cards get displayed.
3. mpopup
   - A modal that pops up when a Pokémon card is clicked to display more information regarding the Pokémon.
4. loading-message
   - Displays a loading message when fetching new Pokémon data.

## CSS
1. General styles
   - Styles for the body, text, buttons, and other elemetns.
2. Animation
   - Rotating and bounce animations for certain elements.
3. Card styles
   - Styles for the Pokémon cards.
4. Modal styles
   - Styles for the modal that pops up

## How to run this application
1. Download the **pokemon.zip** file.
2. Open the file.
3. Load index.html in your web browser.

### Note:
- The Pokémon API URL is hardcoded to fetch 100 Pokémon at a time. Depending on the API limits, this may or may not work.
- Some functionalities like `onModalNext` and `onModalPrevious` are referenced in the HTML but are not present in index.js. This might cause issues when you try to navigate to the next or previous Pokémon in the modal.
- Ensure to add error handling for API calls for a robust application

### How it could be improved
- Enable multi-word search functionality
- Provide more relavent information within the modal.
  - Incorporate information such as evolution timeline in the modal.
- Using SVG image instead of the PNG when available for the sprite.
- Make the modal more aesthetically pleasing and match the design of the rest of the page.
- Increase contrast so that items on page are even easier to distinctly see and so that site follows ADA requirements.
