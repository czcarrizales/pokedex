import { useState } from "react";
import "./styles/change.css";

function ChangeUsername({ userId }) {
  const [username, setUsername] = useState("");

  const handleUpdate = async () => {
    const userId = sessionStorage.getItem("userId");

    const res = await fetch("http://localhost:5000/update-username", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: userId,
        username: username
      })
  });

  const data = await res.json();
  console.log(data);

  if (res.ok) {
    sessionStorage.setItem("userName", username);
    document.getElementById("input").value = "";
    alert("Username updated!");
  } else {
    alert("Error: " + data.error);
  }
};

  return (
    <div className="changeContainer">
      <input id="input" className="changeInput" type="text" placeholder="Enter new username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <button className="changeButton" onClick={handleUpdate}>Change Username</button>
    </div>
  );
}

export default ChangeUsername;