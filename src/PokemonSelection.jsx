import { useState, useEffect } from 'react'
import './PokemonSelection.css'
import { useMusic } from "./MusicProvider";

function PokemonSelection({ token, userId, handleUseToken }) {

    const { setTrack } = useMusic();

    useEffect(() => {
        setTrack("mystery");
    }, [setTrack]);

    async function fetchRandomPokemon() {
        const res = await fetch(`http://localhost:5000/pokemonselection?userId=${userId}`)
        const data = await res.json()
        if (!data || data.length === 0) {
            return
        }

        // safety checks in case there are fewer than 3 left
        if (data[0]) {
            setCurrentPokemon1({
                id: data[0].id,
                name: data[0].name,
                img: `https://img.pokemondb.net/sprites/black-white/normal/${data[0].name}.png`,
                types: data[0].types,
            });
        }

        if (data[1]) {
            setCurrentPokemon2({
                id: data[1].id,
                name: data[1].name,
                img: `https://img.pokemondb.net/sprites/black-white/normal/${data[1].name}.png`,
                types: data[1].types,
            });
        }

        if (data[2]) {
            setCurrentPokemon3({
                id: data[2].id,
                name: data[2].name,
                img: `https://img.pokemondb.net/sprites/black-white/normal/${data[2].name}.png`,
                types: data[2].types,
            });
        }
        console.log(data[0])

        setFlipped1(false)
        setFlipped2(false)
        setFlipped3(false)
    }


    useEffect(() => {
        fetchRandomPokemon()
    }, [userId])

    const [flipped1, setFlipped1] = useState()
    const [currentPokemon1, setCurrentPokemon1] = useState()

    function startFlip1() {
        if (token <= 0) {
            console.warn("No tokens left, cannot select a Pokémon.");
            return;
        }
        setFlipped1(!flipped1)
        handleUseToken()
        addPokemonToPokedex(currentPokemon1.id);
    }

    const [flipped2, setFlipped2] = useState()
    const [currentPokemon2, setCurrentPokemon2] = useState()

    function startFlip2() {
        if (token <= 0) {
            console.warn("No tokens left, cannot select a Pokémon.");
            return;
        }
        setFlipped2(!flipped2)
        handleUseToken()
        addPokemonToPokedex(currentPokemon2.id);
    }

    const [flipped3, setFlipped3] = useState()
    const [currentPokemon3, setCurrentPokemon3] = useState()

    function startFlip3() {
        if (token <= 0) {
            console.warn("No tokens left, cannot select a Pokémon.");
            return;
        }
        setFlipped3(!flipped3)
        handleUseToken()
        addPokemonToPokedex(currentPokemon3.id);
    }

    async function addPokemonToPokedex(pokemonId) {
        if (!userId) return;

        try {
            const res = await fetch("http://localhost:5000/addpokemon", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, pokemonId }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                console.error(
                    "Failed to add Pokémon:",
                    errorData.error || res.statusText
                );
                return;
            }

            const data = await res.json();
            const pokemon =
                [currentPokemon1, currentPokemon2, currentPokemon3].find(
                    (p) => p && p.id === pokemonId
                );

            const name = pokemon?.name || "Pokémon";
            showToast(`${name.charAt(0).toUpperCase() + name.slice(1)} was added to your Pokédex!`);
            console.log("Add pokemon result:", data);
        } catch (err) {
            console.error("Error adding Pokémon:", err);
        }
    }

    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 2500);
    };


    if (!currentPokemon1) {
        return <p> Loading pokemon </p>
    }

    return (
        <>
            <div className='pokemon-selection-main'
                style=
                {{
                    backgroundImage: "url('/assets/Project3Selection.png')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100%",
                }}
            >
                <div className='pokedex-selection-header'>
                    <button onClick={() => {
                        if (token <= 0) {
                            alert("You don't have any tokens!");
                            return;
                        }
                        fetchRandomPokemon()
                        handleUseToken()
                    }} className="button">Reroll Pokemon (-1 token)</button>
                </div>
                <p className='pokemon-selection-text'>Pick to reveal your Pokemon and add them to your Pokedex! (costs 1 token)</p>
                <div className="pokemon-selection-group">
                    <div className={`pokemon-selection-box ${flipped1 ? 'flipped' : ''}`} onClick={startFlip1} >
                        <div className='inner'>
                            <div className='front'>
                                <img className='pokemon-selection-sprite' src={currentPokemon1.img} alt={currentPokemon1.name} />
                            </div>
                            <div className='back'>
                                <img className='pokemon-selection-sprite' src={currentPokemon1.img} alt={currentPokemon1.name} />
                            </div>
                        </div>
                    </div>
                    <div className={`pokemon-selection-box ${flipped2 ? 'flipped' : ''}`} onClick={startFlip2} >
                        <div className='inner'>
                            <div className='front'>
                                <img className='pokemon-selection-sprite' src={currentPokemon2.img} alt={currentPokemon2.name} />
                            </div>
                            <div className='back'>
                                <img className='pokemon-selection-sprite' src={currentPokemon2.img} alt={currentPokemon2.name} />
                            </div>
                        </div>
                    </div>
                    <div className={`pokemon-selection-box ${flipped3 ? 'flipped' : ''}`} onClick={startFlip3} >
                        <div className='inner'>
                            <div className='front'>
                                <img className='pokemon-selection-sprite' src={currentPokemon3.img} alt={currentPokemon3.name} />
                            </div>
                            <div className='back'>
                                <img className='pokemon-selection-sprite' src={currentPokemon3.img} alt={currentPokemon3.name} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {toastMessage && (
                <div className="toast">
                    {toastMessage}
                </div>
            )}
        </>
    )
}

export default PokemonSelection