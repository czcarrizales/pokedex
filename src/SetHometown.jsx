import "./styles/set.css";

function setHomeModal({ onSelectTown }) {
    return(
        <div className="homeContainer">
            <p>Choose your hometown below!</p>
            <div class="homeGrid">
                <button className="homeButton" onClick={() => onSelectTown("Pallet Town", "Kanto Region")}>Pallet Town</button>
                <button className="homeButton" onClick={() => onSelectTown("New Bark Town", "Johto Region")}>New Bark Town</button>
                <button className="homeButton" onClick={() => onSelectTown("Littleroot Town", "Hoenn Region")}>Littleroot Town</button>
                <button className="homeButton" onClick={() => onSelectTown("Twinleaf Town", "Sinnoh Region")}>Twinleaf Town</button>
                <button className="homeButton" onClick={() => onSelectTown("Nuvema Town", "Unova Region")}>Nuvema Town</button>
                <button className="homeButton" onClick={() => onSelectTown("Vaniville Town", "Kalos Region")}>Vaniville Town</button>
            </div>
        </div>
    )
}

export default setHomeModal;