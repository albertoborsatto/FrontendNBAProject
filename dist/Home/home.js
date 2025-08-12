"use strict";
async function getAllPlayers() {
    const url = "http://rest.nbaapi.com/api/PlayerDataAdvanced/query";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    getAllPlayers();
});
