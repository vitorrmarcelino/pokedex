/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import pokedexImg from './assets/img/pokedex.png';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonNumber, setPokemonNumber] = useState('');
  const [pokemonImageSrc, setPokemonImageSrc] = useState('');

  const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  };

  const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    if (data) {
      setPokemonName(data.name);
      setPokemonNumber(data.id);
      setPokemonImageSrc(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif`);
    } else {
      setPokemonName('Not Found Bro');
      setPokemonNumber('');
      setPokemonImageSrc('');
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    renderPokemon(event.target.inputSearch.value.toLowerCase());
  };

  const handlePrev = () => {
    const pokemonId = Number(pokemonNumber);
    renderPokemon(pokemonId - 1);
  };

  const handleNext = () => {
    const pokemonId = Number(pokemonNumber);
    renderPokemon(pokemonId + 1);
  };

  renderPokemon('1');

  return (
    <main>
      <img src={pokedexImg} alt="pokedex" className="pokedex" />

      <img src={pokemonImageSrc} alt="pokemon" className="pokemonImage" />

      <h1 className="podemonData">
        <span className="pokemonNumber">{pokemonNumber}</span>
        <span>-</span>
        <span className="pokemonName">{pokemonName}</span>
      </h1>

      <form className="form" onSubmit={handleSearch}>
        <input
          type="search"
          className="inputSearch"
          name="inputSearch"
          placeholder="Name or Number"
          required
        />
      </form>

      <div className="buttons">
        <button className="button btnPrev" onClick={handlePrev}>Prev &lt;</button>
        <button className="button btnNext" onClick={handleNext}>Next &gt;</button>
      </div>
    </main>
  );
}

export default App;