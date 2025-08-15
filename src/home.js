const urlBase = "https://api.balldontlie.io/v1";

function storeGameId(gameId) {
    localStorage.setItem("gameId", gameId);
}

function getWinner(id, homeScore, visitorScore, homeTeam, visitorTeam) {
    if (homeScore > visitorScore) {
        return `
        <a href="/game.html" class="game-link" id=${id}>
            <div class="game-result">
                ${homeTeam}
                <span class="winner">${homeScore}</span>
                 VS 
                <span class="loser">${visitorScore}</span>
                ${visitorTeam}
            </div>
        </a>
        `;
    } else {
        return `
        <a href="/game.html" class="game-link" id=${id}>
            <div class="game-result">
                ${homeTeam}
                <span class="loser">${homeScore}</span>
                 VS 
                <span class="winner">${visitorScore}</span>
                ${visitorTeam}
            </div>
        </a>
        `;
    }
}

function renderGame(game) {
    const list = document.querySelector(".om-games");
    const article = document.createElement("article");
    article.innerHTML = getWinner(
        game.id,
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
    
    const loading = document.querySelector(".loading-container");
    
    try {
        loading.style.display = "fixed";

        const res = await fetch(`${urlBase}/games?${params}`, {
            headers: { "Authorization": "84e7b864-444b-41b0-86bd-47cdff99dcab" }
        });

        if (!res.ok) throw new Error("Erro na API");
        const data = await res.json();
        data.data.forEach(renderGame);
    } catch (err) {
        console.error(err);
    } finally {
        loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await getGames();
    const gameLinks = document.querySelectorAll(".game-link");

    gameLinks.forEach(game => {
        game.addEventListener("click", () => storeGameId(game.id));
    });

});
