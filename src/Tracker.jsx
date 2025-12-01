import "./styles/tracker.css";
import { useEffect, useState } from "react";
import { PieChart, Pie, RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

function Tracker() {

    const [total, setTotal] = useState(0);
    const [userName, setUserName] = useState("");
    const [recent, setRecent] = useState(0);
    const [pokemonName, setPokemonName] = useState("");
    
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

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${recent}`)
            .then(res => res.json())
            .then(data => setPokemonName(data.name))
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
            <h1>Pokémon Collection</h1>
            <div className="trackerDivider">
                <div className="trackerLeft">
                    <p><b>Recently Caught</b></p>
                    <button className="trackerButton" onClick={playCry}>
                        <img style={{ borderRadius: 15 }}className="trackerImage" src={total !== 0 ? `https://play.pokemonshowdown.com/sprites/ani/${pokemonName}.gif` : `https://media.tenor.com/ihqN6a3iiYEAAAAM/pikachu-shocked-face-stunned.gif`}/>
                    </button>
                </div>
                <div className="trackerRight">
                    <p><b>Total Pokémon Caught</b></p>
                    <div className="pieContainer">
                        <PieChart
                        width={125}
                        height={125}
                        data={[{ name: "Caught", value: total, fill: "#4caf50" }, { name: "Max", value: 200 - total, fill: "white" }]}
                        >
                            <Pie
                                background={{ fill: "white" }}
                                dataKey="value"
                                innerRadius="70%"
                                outerRadius="100%"
                                startAngle={90}
                                endAngle={-270}
                            />
                        </PieChart>
                        <p className="pieText">{total} / 200</p>
                    </div>
                </div>
            </div>
            <p>Keep up the good work, {userName}!</p>
        </div>
    );
}

export default Tracker;