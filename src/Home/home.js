import { formatDate } from "../utils/dateFormatter.js";

const urlBase = "https://api.balldontlie.io/v1/";

function getWinner(homeTeamScore, visitorTeamScore, homeTeam, visitorTeam) {
    if (homeTeamScore > visitorTeamScore) {
        return `<h4>${homeTeam} <span class="winner">${homeTeamScore}</span> x <span class="loser">${visitorTeamScore}</span> ${visitorTeam}</h4>`;
    } else {
        return `<h4>${homeTeam} <span class="loser">${homeTeamScore}</span> x <span class="winner">${visitorTeamScore}</span> ${visitorTeam}</h4>`;
    }
}

function renderGameView(game) {
    const gamesList = document.querySelector("#games-list");
    const gameItem = document.createElement("li");
    const gameArticle = document.createElement("article");
    const homeTeam = game["home_team"]["full_name"];
    const visitorTeam = game["visitor_team"]["full_name"];
    const homeTeamScore = game["home_team_score"];
    const visitorTeamScore = game["visitor_team_score"];
    const gameDate = formatDate(game["date"]);

    gameArticle.innerHTML = `<h4>Match date: ${gameDate}</h4>` + getWinner(homeTeamScore, visitorTeamScore, homeTeam, visitorTeam);
    gameItem.appendChild(gameArticle);
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