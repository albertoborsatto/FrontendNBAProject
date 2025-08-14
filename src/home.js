const urlBase = "https://api.balldontlie.io/v1";

function getWinner(homeScore, visitorScore, homeTeam, visitorTeam) {
    if (homeScore > visitorScore) {
        return `
            <div class="game-result">
                ${homeTeam}
                <span class="winner">${homeScore}</span>
                 VS 
                <span class="loser">${visitorScore}</span>
                ${visitorTeam}
            </div>
        `;
    } else {
        return `
            <div class="game-result">
                ${homeTeam}
                <span class="loser">${homeScore}</span>
                 VS 
                <span class="winner">${visitorScore}</span>
                ${visitorTeam}
            </div>
        `;
    }
}

function renderGame(game) {
    const list = document.querySelector(".om-games");
    const article = document.createElement("article");
    article.innerHTML = getWinner(
        game.home_team_score,
        game.visitor_team_score,
        game.home_team.full_name,
        game.visitor_team.full_name
    );
    list.appendChild(article);
}

async function getGames() {
    const params = new URLSearchParams({
        "seasons[]": 2024,
        per_page: 3
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
