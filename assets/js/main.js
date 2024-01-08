const pokemonList = document.getElementById('pokemonList')
const loadModeButton = document.getElementById('loadMoreButton')
const buttonSearch = document.getElementById('buttonSearch')
const inputSearch = document.getElementById('inputSearch')
const limit = 30;
let offset = 0;

buttonSearch.addEventListener('click', searchPokemon);

function searchPokemon() {
    const inputItem = inputSearch.value.toLowerCase();
    pokemonList.innerHTML = ''; 
    loadPokemonItems(0, limit, inputItem);
}

function loadPokemonItems(offset, limit, searchTerm = '') {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
            const newHtml = filteredPokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
            `).join('');
            pokemonList.innerHTML += newHtml;
        });
}
loadPokemonItems(offset, limit)

loadModeButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItems(offset, limit)
})

    

