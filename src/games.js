const urlBase = "https://api.balldontlie.io/v1/";

function getWinner(homeTeamScore, visitorTeamScore, homeTeam, visitorTeam) {
    if (homeTeamScore > visitorTeamScore) {
        return `
            <div class="game-result">
                ${homeTeam}
                <span class="winner">${homeTeamScore}</span>
                 VS 
                <span class="loser">${visitorTeamScore}</span>
                ${visitorTeam}
            </div>
        `;
    } else {
        return `
            <div class="game-result">
                ${homeTeam}
                <span class="loser">${homeTeamScore}</span>
                 VS 
                <span class="winner">${visitorTeamScore}</span>
                ${visitorTeam}
            </div>
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

    gameItem.innerHTML = getWinner(homeTeamScore, visitorTeamScore, homeTeam, visitorTeam);
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

    try {
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
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getAllPlayers();
});