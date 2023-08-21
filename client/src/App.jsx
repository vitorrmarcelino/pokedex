/* eslint-disable no-console */
/* eslint-disable dot-notation */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import pokedexImg from './assets/img/pokedex.png';

const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const prev = document.querySelector('.btnPrev');
const next = document.querySelector('.btnNext');

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  const data = await APIResponse.json();

  return data;
};

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);

  pokemonName.innerHTML = data.name;
  pokemonNumber.innerHTML = data.id;
  pokemonNumber.value = data.id;

  pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif`;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  renderPokemon(input.value);

  input.value = '';
});

prev.addEventListener('click', (event) => {
  event.preventDefault();

  const pokemonId = Number(pokemonNumber.value);

  renderPokemon(pokemonId - 1);
});

next.addEventListener('click', (event) => {
  event.preventDefault();

  const pokemonId = Number(pokemonNumber.value);

  renderPokemon(pokemonId + 1);
});

function App() {
  return (

    <main>
      <img src={pokedexImg} alt="pokedex" className="pokedex" />

      <img src="#" alt="pokemon" className="pokemonImage" />

      <h1 className="podemonData">
        <span className="pokemonNumber"> </span>
        <span>-</span>
        <span className="pokemonName"> </span>
      </h1>

      <form className="form">
        <input
          type="search"
          className="inputSearch"
          placeholder="Name or Number"
          required
        />
      </form>

      <div className="buttons">
        <button className="button btnPrev">Prev &lt; </button>

        <button className="button btnNext">Next &gt; </button>
      </div>

    </main>
  );
}

export default App;