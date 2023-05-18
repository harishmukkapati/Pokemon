const limit = 100;
const initialApiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
let pokedex = new Map();
let printedPokemon = [];
let printedPokemonURL = [];
let printedPokemonName = [];
let printedTypes = [];
let nextApiUrl;
let isDataLoading = false;



let typeColor = new Map();
typeColor.set('bug', '#3b9950');
typeColor.set('dark', '#040706');
typeColor.set('dragon', '#448b95');
typeColor.set('electric', '#9ACD32');
typeColor.set('fairy', '#971944');
typeColor.set('fighting', '#994025');
typeColor.set('fire', '#fd4c5a');
typeColor.set('flying', '#4a677d');
typeColor.set('ghost', '#33336b');
typeColor.set('grass', '#137a3d');
typeColor.set('ground', '#a9702c');
typeColor.set('ice', '#86d0f3');
typeColor.set('normal', '#73515a');
typeColor.set('poison', '#5e2d88');
typeColor.set('psychic', '#a22a69');
typeColor.set('rock', '#8b3e21');
typeColor.set('steel', '#5f756d');
typeColor.set('water', '#1552e2');



const buildPokemonTypeChips = (pokemonTypes) => {
    let pokemonTypesChips = "";
    for(const type of pokemonTypes) {
        const typeEl = `<div class="pokemon-type">${type.type.name}</div>`;
        pokemonTypesChips += typeEl;
    }
    return pokemonTypesChips;
}

const buildCard = (pokemonId, pokemonName, pokemonTypes, pokemonSpriteUrl) => {
    const typeColorKey = pokemonTypes[0].type.name;
    const color = typeColor.get(typeColorKey);

    const cardTemplate = `<div id="${pokemonTypes[0]}" class="card" style="background-color: ${color}" onclick="onCardClick(${pokemonId})">
        <div class="card-left">
            <div class="pokedex-number">#${pokemonId}</div>
            <div class="pokedex-entry">
                <div class="pokemon-name">${pokemonName}</div>
                <div class="type-area">
                    ${buildPokemonTypeChips(pokemonTypes)}
                </div>
            </div>
        </div>
        <div class="card-right">
            <div class="pokemon-picture">
                <img class="picture" src="${pokemonSpriteUrl}" alt="${pokemonName}">
            </div>
        </div>
    </div>`;

    printedPokemon.push(pokemonId);
    printedPokemonURL.push(pokemonSpriteUrl);
    printedPokemonName.push(pokemonName);
    printedTypes.push(pokemonTypes[0]);

    return cardTemplate;
};

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

const getEachPokemonData = async (pokedexData) => {
    for(const pokemon of pokedexData.results) {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        pokedex.set(pokemonData.id, pokemonData);
    }
}

async function getInitialPokemonData() {
    const response = await fetch(initialApiUrl);
    const pokedexData = await response.json();
    nextApiUrl = pokedexData.next;
    await getEachPokemonData(pokedexData);
    generatePage();
}

async function getNewPokemon() {
    if (nextApiUrl) {
        document.getElementById("loading-message").style.display = "block";
        const loading = loader();
        const removable = document.getElementById("loading-message").innerHTML += loading;
        const response = await fetch(nextApiUrl);
        const pokedexData = await response.json();
        nextApiUrl = pokedexData.next;
        console.log(pokedexData);
        await getEachPokemonData(pokedexData);
        generatePage();
        isDataLoading = false;
        document.getElementById('loadPoke').remove();
        document.getElementById("loading-message").style.display = "none";


    }
}

addEventListener("DOMContentLoaded", (e) => {
    getInitialPokemonData();
} );


function loader() {
    const randomPokemon = Math.floor(Math.random()*printedPokemonURL.length);
    const loadingCircle = '<img id = \'loadPoke\'' + ' src="' + printedPokemonURL[randomPokemon] + '" class="rotation-class" />';
    return loadingCircle;

}



window.onscroll = function(e) {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.8 && !isDataLoading) {
        isDataLoading =  true;
        // const loadingCircle = loader();
        /* Create loading circle of a random pokemon and 
           ensures that loading circle plays for designated period of time before 
           being erased and the new cards are generated
        */
        getNewPokemon();
    }
}; 

const onCardClick = (pokemonId) => {
    const poke = pokedex.get(parseInt(pokemonId));

    const name = poke.name;
    let abilities = poke.abilities.map(ability => ability.ability.name);
    let types = poke.types.map(type => type.type.name);
    const height = poke.height;

    const card = newCard(name, abilities, types, height);
    document.getElementById("mpopupBox").innerHTML += card;
    document.getElementById("mpopup").style.display = "block";
};

// The modal content is built here
function newCard(name, abilities, types, height) {
    let abilitiesDiv = abilities.map(ability => `<p>Ability: ${ability}</p>`).join("");
    let typesDiv = types.map(type => `<p>Type: ${type}</p>`).join("");

    const card = `
        <div class="modal-body">
            <h2>${name}</h2>
            <p>Height of Pokemon: ${height} decimeters</p>
            ${typesDiv}
            ${abilitiesDiv}
        </div>
        <div id="close-button-container">
            <button class="close-button" onclick="onPopup()">Close</button>
        </div>
    `;

    return card;
}




// The modal disappears when the exit button is clicked
const onPopup = () => {
    document.getElementById('mpopup').style.display = 'none';
    document.getElementById('mpopupBox').innerHTML = '';
};

let searchTimeout;

const searchPokemon = (value) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const pokedexEl = document.getElementById("pokedex");
    pokedexEl.innerHTML = "";

    const searchValue = value.toLowerCase();

    pokedex.forEach((pokemon) => {
      if (
        pokemon.name.toLowerCase().includes(searchValue) ||
        pokemon.id.toString().includes(searchValue) ||
        pokemon.types.some(
          (type) => type.type.name.toLowerCase().includes(searchValue)
        ) ||
        pokemon.abilities.some((ability) =>
          ability.ability.name.toLowerCase().includes(searchValue)
        )
      ) {
        const card = buildCard(
          pokemon.id,
          pokemon.name,
          pokemon.types,
          pokemon.sprites.front_default
        );
        pokedexEl.innerHTML += card;
      }
    });
  }, 300); // Debounce delay
};

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
  

