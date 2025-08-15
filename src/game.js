const urlBase = "https://api.balldontlie.io/v1/";

async function getGameById() {
    const gameId = localStorage.getItem("gameId")
    const url = `${urlBase}/games/${gameId}`

    try {
        const res = await fetch(url, {
            headers: { "Authorization": "84e7b864-444b-41b0-86bd-47cdff99dcab" }
        });

        if (!res.ok) throw new Error("Erro na API");

        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await getGameById();
});