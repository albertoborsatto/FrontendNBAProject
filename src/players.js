const urlBase = "https://api.balldontlie.io/v1";

function setPlayerInfos(player) {
    const playerInfo = {
        PlayerFirstName: player.first_name,
        PlayerLastName: player.last_name,
        Position: player.position,
        Height: player.height,  
        Weight: player.weight,  
        JerseyNumber: player.jersey_number
    };
    
    const playerInfoList = document.createElement("ul");
    playerInfoList.classList.add("players-info-list");
    
    Object.keys(playerInfo).forEach(key => {
        const li = document.createElement("li");
        li.textContent = `${key}: ${playerInfo[key]}`;
        playerInfoList.appendChild(li);
    });

    return playerInfoList;
}

function renderPlayer(player) {
    const list = document.querySelector("#players-list");
    const playerItem = document.createElement("li");
    const playerImage = document.createElement("img");
    playerImage.src = "https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png";
    playerItem.classList.add("player-list-item")
    const playerDiv = document.createElement("div");
    const playerInfo = setPlayerInfos(player);
    playerDiv.classList.add("player-container");

    playerDiv.appendChild(playerImage);
    playerDiv.appendChild(playerInfo);
    playerItem.appendChild(playerDiv);
    list.appendChild(playerItem);
}

async function getPlayers() {
    const params = new URLSearchParams({
        per_page: 50
    });

    try {
        const res = await fetch(`${urlBase}/players?${params}`, {
            headers: { "Authorization": "84e7b864-444b-41b0-86bd-47cdff99dcab" }
        });

        if (!res.ok) throw new Error("Erro na API");
        const data = await res.json();
        
        data.data.forEach(renderPlayer);
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getPlayers();
});
