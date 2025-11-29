import './PokemonDetails.css'
import PokemonDetailsModel from './models/PokemonDetailsModel'
function PokemonDetails({ pokemonDetails, pokemonSpecies, pokemon, setSelectedPokemonId, pokedexIds }) {
    if (!pokemonDetails || !pokemonSpecies) return null

    const model = new PokemonDetailsModel(pokemonDetails, pokemonSpecies)

    const currentIndex = pokedexIds.indexOf(model.id);

    const prevId = currentIndex > 0 ? pokedexIds[currentIndex - 1] : null;

    const nextId =
        currentIndex !== -1 && currentIndex < pokedexIds.length - 1
            ? pokedexIds[currentIndex + 1]
            : null;

    return (
        <div className={`pokemon-details-container ${model.containerClass}`}>
            <div className='pokemon-details-top'>
                <span className="material-symbols-outlined arrow-back" onClick={() => setSelectedPokemonId(null)}>arrow_back</span>
                <p className='pokemon-details-name'>{model.displayName}</p>
                <p className='pokemon-details-number subtitle-2'>#{model.id}</p>
            </div>
            <div className='pokemon-details-upper'>
                <span className="material-symbols-outlined chevron" onClick={() => prevId && setSelectedPokemonId(prevId)}
                    disabled={!prevId}>chevron_left</span>
                <img className='pokemon-sprite' src={model.artworkUrl} alt={model.displayName} />
                <span className="material-symbols-outlined chevron" onClick={() => nextId && setSelectedPokemonId(nextId)}
                    disabled={!nextId}>chevron_right</span>
            </div>
            <div className='pokemon-details-lower'>
                <div className='pokemon-details-lower-inner'>
                    <div className='pokemon-details-types'>
                        {
                            model.types.map((typeName) => (
                                <p className={`pokemon-details-type pokemon-details-type--${typeName}`}>{typeName.toUpperCase()}</p>
                            ))
                        }
                    </div>
                    <div>
                        <p className='subtitle-1 pokemon-details-about'>About</p>
                    </div>
                    <div className='pokemon-details-info-container'>
                        <div className='pokemon-details-info'>
                            <div className='pokemon-details-values'>
                                <span className="material-symbols-outlined">weight</span>
                                <p>{model.weightKg}kg</p>
                            </div>

                            <p className='caption'>Weight</p>
                        </div>
                        <div className='pokemon-details-info-border'></div>
                        <div className='pokemon-details-info' >
                            <div className='pokemon-details-values'>
                                <span className="material-symbols-outlined">height</span>
                                <p>{model.heightMeters}m</p>
                            </div>
                            <p className='caption'>Height</p>
                        </div>
                    </div>
                    <div className='pokemon-details-description'>
                        {model.description}
                    </div>
                    <div className='pokemon-details-all-stats'>
                        <p className='subtitle-1'>Base Stats</p>
                        <div className='pokemon-details-stat'>
                            <div className='pokemon-details-stat-labels'>
                                <p className='subtitle-3 pokemon-stat-label pokemon-stat-label--hp'>HP</p>
                                <p className='subtitle-3 pokemon-stat-label pokemon-stat-label--atk'>ATK</p>
                                <p className='subtitle-3 pokemon-stat-label pokemon-stat-label--def'>DEF</p>
                                <p className='subtitle-3 pokemon-stat-label pokemon-stat-label--satk'>SATK</p>
                                <p className='subtitle-3 pokemon-stat-label pokemon-stat-label--sdef'>SDEF</p>
                                <p className='subtitle-3 pokemon-stat-label pokemon-stat-label--spd'>SPD</p>
                            </div>
                            <div className='pokemon-details-border'>

                            </div>
                            <div>
                                {model.stats.map((s) => (
                                    <div className='pokemon-details-stat-right' key={s.name}>
                                        <p className='pokemon-details-stat-value'>
                                            {s.value}
                                        </p>
                                        <div className='pokemon-details-stat-line-wrapper'>
                                            <div className='pokemon-details-stat-line' style={{ width: `${s.percent}%`, backgroundColor: s.color }}></div>
                                        </div>

                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default PokemonDetails