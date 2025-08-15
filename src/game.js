const urlBase = "https://api.balldontlie.io/v1/";

function fillTeamsInfos(gameInfo) {
    const team1 = document.querySelector("#team1");
    const team2 = document.querySelector("#team2");

    const team1Name = team1.querySelector("h3");
    const team2Name = team2.querySelector("h3");
    const team1Score = document.querySelector("#team1-score");
    const team2Score = document.querySelector("#team2-score");

    team1Name.innerHTML = gameInfo["home_team"]["full_name"];
    team2Name.innerHTML = gameInfo["visitor_team"]["full_name"];
    team1Score.innerHTML = gameInfo["visitor_team_score"];
    team2Score.innerHTML = gameInfo["home_team_score"];
}

async function getGameById() {
    const gameId = localStorage.getItem("gameId")
    const url = `${urlBase}/games/${gameId}`

    const loading = document.querySelector(".loading-container");


    try {
        loading.style.display = "fixed";
        const res = await fetch(url, {
            headers: { "Authorization": "84e7b864-444b-41b0-86bd-47cdff99dcab" }
        });

        if (!res.ok) throw new Error("Erro na API");

        const data = await res.json();
        fillTeamsInfos(data["data"]);
    } catch (error) {
        console.error(error);
    } finally {
        loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await getGameById();
});