const urlBase = "https://api.balldontlie.io/v1";

function getWinner(homeScore, visitorScore, homeTeam, visitorTeam) {
    if (homeScore > visitorScore) {
        return `${homeTeam} <span class="winner">${homeScore}</span> x <span class="loser">${visitorScore}</span> ${visitorTeam}`;
    } else {
        return `${homeTeam} <span class="loser">${homeScore}</span> x <span class="winner">${visitorScore}</span> ${visitorTeam}`;
    }
}

function renderGame(game) {
    const list = document.querySelector("#games-list");
    const li = document.createElement("li");
    li.innerHTML = getWinner(
        game.home_team_score,
        game.visitor_team_score,
        game.home_team.full_name,
        game.visitor_team.full_name
    );
    list.appendChild(li);
}

async function getGames() {
    const params = new URLSearchParams({
        "seasons[]": 2024,
        per_page: 20
    });

    try {
        const res = await fetch(`${urlBase}/games?${params}`, {
            headers: { "Authorization": "84e7b864-444b-41b0-86bd-47cdff99dcab" }
        });

        if (!res.ok) throw new Error("Erro na API");
        const data = await res.json();
        data.data.forEach(renderGame);
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", getGames);
