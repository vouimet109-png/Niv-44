const games = [
    "mario",
    "zelda"
];

const menu = document.getElementById("wii-menu");

games.forEach(folder => {
    fetch(`games/${folder}/main.txt`)
    .then(res => res.text())
    .then(text => {
        let data = {};
        text.split("\n").forEach(line => {
            let [key, value] = line.split("=");
            if(key && value) data[key.trim()] = value.trim();
        });

        const channel = document.createElement("div");
        channel.className = "channel";
        channel.style.order = data.place;

        channel.innerHTML = `
            <img src="games/${folder}/${data.gif}">
            <p>${data.name}</p>
        `;

        channel.onclick = () => {
            window.location.href = data.link;
        };

        menu.appendChild(channel);
    });
});