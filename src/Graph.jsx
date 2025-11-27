import { AreaChart, Area, BarChart, LineChart, Line, XAxis, YAxis, Legend, Tooltip } from "recharts";
import "./styles/graph.css";
import { useState, useEffect } from "react";

function Graph() {

const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    fetch(`http://localhost:5000/graph?userId=${userId}`)
      .then(res => res.json())
      .then(jsonData => {
        const last7Dates = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          last7Dates.push(d.toISOString().slice(0, 10));
        }

        const labels = ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"];

        const newGraphData = last7Dates.map((date, index) => {
          const row = jsonData.find(r => r.date === date);
          return {
            day: labels[index],
            caught: row ? row.caught : 0
          };
        });

        setGraphData(newGraphData);
      })
  }, []);

    return (
        <div className="graphContainer">
            <h1>Your Weekly Activity</h1>
            <AreaChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={graphData}>
                <Area type="monotone" dataKey="caught" stroke="#DC143C" fill="#DC143C" name="Pokémon Caught"/>
                <XAxis dataKey="day" />
                <YAxis />
                <Legend />
                <Tooltip />
            </AreaChart>
        </div>
    )
}

export default Graph;