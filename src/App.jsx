// HOOKS
import { useState, useEffect } from 'react';
// COMPONENTS
import { Button } from './Components/Button';
import { Card } from './Components/Card';
// STYLES
import './SASS/App.scss';
// ICONS
import { TiArrowLeftOutline } from 'react-icons/ti';
import { TiArrowRightOutline } from 'react-icons/ti';

const App = () => {
  function previewClick() {
    setPokemonNumber === 1
      ? setPokemonNumber(1)
      : setPokemonNumber(pokemonNumber - 1);
  }

  function nextClick() {
    setPokemonNumber(pokemonNumber + 1);
  }

  const [pokemonNumber, setPokemonNumber] = useState(1);
  const [allPokemonEvolutions, setAllPokemonEvolutions] = useState([]);

  useEffect(() => {
    getEvolutions(pokemonNumber);
  }, [pokemonNumber]);

  async function getEvolutions(id) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${id}/`
    );

    const data = await response.json();

    let pokemonEvolutionArray = [];

    let firstEvolutionPokemon = data.chain.species.name;
    let firstEvolutionPokemonImg = await getPokemonImages(firstEvolutionPokemon);
    pokemonEvolutionArray.push([firstEvolutionPokemon, firstEvolutionPokemonImg,]);

    if (data.chain.evolves_to.length !== 0) {
      let secondEvolutionPokemon = data.chain.evolves_to[0].species.name;
      let secondEvolutionPokemonImg = await getPokemonImages(secondEvolutionPokemon);
      pokemonEvolutionArray.push([secondEvolutionPokemon, secondEvolutionPokemonImg,]);

      if (data.chain.evolves_to[0].evolves_to.length !== 0) {

        let thirdEvolutionPokemon = data.chain.evolves_to[0].evolves_to[0].species.name;
        let thirdEvolutionPokemonImg = await getPokemonImages(thirdEvolutionPokemon);
        pokemonEvolutionArray.push([thirdEvolutionPokemon, thirdEvolutionPokemonImg,]);
      }
    }
    setAllPokemonEvolutions(pokemonEvolutionArray);
  }

  async function getPokemonImages(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await response.json();
    return data.sprites.other['official-artwork'].front_default;
  }

  // function increaseNumber() {
  //   setPokemonNumber(pokemonNumber + 1);
  //   console.log('VALOR ANTES DEL NUEVO RENDER: ' + pokemonNumber);
  // }

  // useEffect(() => {
  //   console.log('VALOR AL ACTUALIZAR EL ESTADO: ' + pokemonNumber);
  // fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`)
  //   .then((result) => result.json())
  // .then((data) => setPokemonName(data.name))

  //   searchPokemon(pokemonNumber)
  // }, [pokemonNumber]);

  // let searchPokemon = async(pokemonNumber) => {
  //   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`)
  //     const data = await response.json()
  //     setPokemonName(data.name)
  // }
  return (
    <div className = 'App'>
      <div className = { `card-container card${allPokemonEvolutions.length}` } >
        {allPokemonEvolutions.map(pokemon =>  
        <Card 
        key = {pokemon[0]}
        name = {pokemon[0]}
        img = {[pokemon[1]]}
        /> 
        )}
      </div>

      <div className='buttons__container'>
        <Button icon={<TiArrowLeftOutline />} handleClikc={previewClick} />
        <Button icon={<TiArrowRightOutline />} handleClikc={nextClick} />
      </div>
      {/* <div> { pokemonNumber } - { pokemonName } </div> */}
    </div>
  );
};

export { App };
