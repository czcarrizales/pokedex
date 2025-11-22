import "./styles/tracker.css";
import { useEffect, useState } from "react";

function Tracker() {

    const [total, setTotal] = useState(0);
    const [userName, setUserName] = useState("");
    const [recent, setRecent] = useState(0);
    
    useEffect(() => {
        setUserName(sessionStorage.getItem("userName"));
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        fetch(`http://localhost:5000/count?userId=${userId}`)
            .then(res => res.json())
            .then(data => setTotal(data.total));
    }, [])

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        fetch(`http://localhost:5000/recent?userId=${userId}`)
            .then(res => res.json())
            .then(data => setRecent(data));
    })

    let cry;
    const playCry = () => {
        if (!cry) {
            cry = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${recent}.ogg`);
            cry.volume = 0.2;
        }
        cry.play();
    }

    return (
        <div className="trackerContainer">
            <h1>Pokémon Tracker</h1>
            <div className="trackerDivider">
                <div className="trackerLeft">
                    <p>Recently Caught</p>
                    <button className="trackerButton" onClick={playCry}>
                        <img className="trackerImage" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${recent}.gif`}/>
                    </button>
                </div>
                <div className="trackerRight">
                    <p>Total Pokémon Caught</p>
                    <p>{total} / 151</p>
                </div>
            </div>
        </div>
    );
}

export default Tracker;