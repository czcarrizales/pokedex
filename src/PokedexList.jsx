import { useState, useEffect } from 'react'
import './PokedexList.css'
import PokemonDetails from './PokemonDetails'
import PokemonModel from './models/PokemonModel'
import { useMusic } from "./MusicProvider";

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function PokedexList() {

    const [pokemon, setPokemon] = useState([])
    const [selectedPokemondId, setSelectedPokemonId] = useState(null)
    const [pokemonDetails, setPokemonDetails] = useState(null)
    const [pokemonSpecies, setPokemonSpecies] = useState(null)
    const [pokedexIds, setPokedexIds] = useState([]);

    const { setTrack } = useMusic();

    useEffect(() => {
        setTrack("pokedex");
    }, [setTrack]);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        fetch(`http://localhost:5000/pokedex?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                const models = data.map((row) => new PokemonModel(row))
                setPokemon(models)
                const ids = models.map(p => p.id)
                setPokedexIds(ids)
            })
    }, [])

    useEffect(() => {
        if (!selectedPokemondId) {
            setPokemonDetails(null)
            return
        }

        Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemondId}`).then(res => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemondId}`).then(res => res.json())
        ])
            .then(([detailsJson, speciesJson]) => {
                setPokemonDetails(detailsJson);
                setPokemonSpecies(speciesJson);

                new Audio(
                    `https://play.pokemonshowdown.com/audio/cries/${detailsJson.name.toLowerCase()}.ogg`
                )
                    .play()
                    .catch(() => {

                    });
            })
            .catch(err => {
                console.error("Error loading Pokémon:", err);
            });
    }, [selectedPokemondId])

    return (
        <>
            <div className='pokedex-list-parent'>
                <div className='pokedex-list-main'>
                    {
                        pokemon.map((p) => {
                            return (
                                <button key={p.id} className={`pokemon-box type-${p.primaryType}`} onClick={() => setSelectedPokemonId(p.id)}>
                                    <p className='pokemon-number'>{p.id}</p>
                                    <div className='pokemon-sprite-wrapper'>
                                        <img id='pokedex-sprite' src={p.animatedSpriteUrl} />
                                    </div>

                                    <p className='pokemon-name'>{capitalize(p.displayName)}</p>
                                </button>
                            )
                        })
                    }
                </div>
                {
                    selectedPokemondId && (
                        <div className="pokemon-overlay" onClick={() => setSelectedPokemonId(null)}>
                            <div
                                className="pokemon-modal-shell"
                                onClick={(e) => e.stopPropagation()}
                            >


                                {pokemonDetails && (
                                    <PokemonDetails pokemonDetails={pokemonDetails} pokemonSpecies={pokemonSpecies} pokemon={pokemon} setSelectedPokemonId={setSelectedPokemonId} pokedexIds={pokedexIds} />
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
