type player = {
    playerName: string,
    season: number,
    team: string,
    playerId: string,
}

const urlBase: string = "http://rest.nbaapi.com/api";

async function getAllPlayers(): Promise<void> {
    const url: string = `${urlBase}/PlayerDataAdvanced/query`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getAllPlayers();
});