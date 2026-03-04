const menu = document.getElementById("menu");

// 12 cases fixes
let slots = new Array(12).fill(null);

// Liste des dossiers de jeux (à modifier quand tu ajoutes un jeu)
const games = ["mario", "zelda"];

Promise.all(
    games.map(folder =>
        fetch(`games/${folder}/main.txt`)
        .then(res => res.text())
        .then(text => {
            let data = {};
            text.split("\n").forEach(line => {
                let [key, value] = line.split("=");
                if(key && value) data[key.trim()] = value.trim();
            });
            data.folder = folder;
            return data;
        })
    )
).then(results => {

    results.forEach(game => {
        let position = parseInt(game.place) - 1;
        slots[position] = game;
    });

    slots.forEach(slot => {
        if(slot) {
            const div = document.createElement("div");
            div.className = "channel";
            div.innerHTML = `
                <img src="games/${slot.folder}/${slot.gif}">
                <p>${slot.name}</p>
            `;
            div.onclick = () => window.location.href = slot.link;
            menu.appendChild(div);
        } else {
            const empty = document.createElement("div");
            empty.className = "empty";
            menu.appendChild(empty);
        }
    });
});

// Horloge
function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText =
        now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

setInterval(updateClock, 1000);
updateClock();