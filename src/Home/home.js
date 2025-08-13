const urlBase = "https://api.balldontlie.io/v1/";

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

        console.log(data);

    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getAllPlayers();
});