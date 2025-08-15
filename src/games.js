const urlBase = "https://api.balldontlie.io/v1/";

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

function renderGameView(game) {
    const gamesList = document.querySelector(".games-list");
    const gameItem = document.createElement("article");
    const homeTeam = game["home_team"]["full_name"];
    const visitorTeam = game["visitor_team"]["full_name"];
    const homeTeamScore = game["home_team_score"];
    const visitorTeamScore = game["visitor_team_score"];
    const gameId = game["id"]

    gameItem.innerHTML = getWinner(gameId, homeTeamScore, visitorTeamScore, homeTeam, visitorTeam);
    gamesList.appendChild(gameItem);
}

function populateSideBar(games) {
    games.forEach((game) => {
        renderGameView(game);
    });
}

async function getAllPlayers() {
    const params = new URLSearchParams({
        "seasons[]": 2024,
        per_page: 100
    });

    const url = `${urlBase}/games?${params}`;

    const loading = document.querySelector(".loading-container");

    try {
        loading.style.display = "fixed";

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "84e7b864-444b-41b0-86bd-47cdff99dcab"
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        const games = data["data"];
        
        populateSideBar(games);

    } catch (error) {
        console.error(error);
    } finally {
        loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await getAllPlayers();
    const gameLinks = document.querySelectorAll(".game-link");

    gameLinks.forEach(game => {
        game.addEventListener("click", () => storeGameId(game.id));
    });
});