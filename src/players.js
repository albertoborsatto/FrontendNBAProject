const urlBase = "https://api.balldontlie.io/v1";

function renderPlayer(player) {
    const list = document.querySelector("#players-list");
    const li = document.createElement("li");
    li.textContent = `${player.first_name} ${player.last_name} - ${player.team.full_name}`;
    list.appendChild(li);
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

document.addEventListener("DOMContentLoaded", getPlayers);
