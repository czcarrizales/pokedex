import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PokedexList.css'
import PokemonDetails from './PokemonDetails'

function PokedexList() {

    const [pokemon, setPokemon] = useState([])
    const [selectedPokemondId, setSelectedPokemonId] = useState(null)
    const [pokemonDetails, setPokemonDetails] = useState(null)
    const [pokemonSpecies, setPokemonSpecies] = useState(null)

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        fetch(`http://localhost:5000/pokedex?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPokemon(data)
            })

        console.log(pokemon)
    }, [])

    useEffect(() => {
        if (!selectedPokemondId) {
            setPokemonDetails(null)
            return
        }

        fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemondId}`)
            .then(res => res.json())
            .then(json => setPokemonDetails(json));
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemondId}`)
            .then(res => res.json())
            .then(json => setPokemonSpecies(json));
    }, [selectedPokemondId])

    return (
        <>
            <div className='pokedex-list-main'>
                <div>
                    {
                        pokemon.map((p) => {
                            return (
                                <button key={p.id} className='pokemon-box' onClick={() => setSelectedPokemonId(p.id)}>
                                    <p className='pokemon-number'>{p.id}</p>
                                    <img id='pokedex-sprite' src={`https://play.pokemonshowdown.com/sprites/ani/${p.name}.gif`} />
                                    <p>{p.name}</p>
                                </button>
                            )
                        })
                    }
                </div>
                {
                    selectedPokemondId && (
                        <div className="pokemon-overlay">
                            <div
                                className="pokemon-modal-shell"
                                onClick={(e) => e.stopPropagation()}
                            >
                                

                                {pokemonDetails && (
                                    <PokemonDetails pokemonDetails={pokemonDetails} pokemonSpecies={pokemonSpecies} />
                                )}
                            </div>
                        </div>
                    )
                }
            </div>

        </>
    )
}

export default PokedexList
