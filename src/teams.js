const urlBase = "https://api.balldontlie.io/v1";

function renderTeam(team) {
    const list = document.querySelector("#teams-list");
    const li = document.createElement("li");
    li.textContent = `${team.full_name} (${team.conference} Conference)`;
    list.appendChild(li);
}

async function getTeams() {
    try {
        const res = await fetch(`${urlBase}/teams`, {
            headers: { "Authorization": "84e7b864-444b-41b0-86bd-47cdff99dcab" }
        });

        if (!res.ok) throw new Error("Erro na API");
        const data = await res.json();
        data.data.forEach(renderTeam);
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", getTeams);
