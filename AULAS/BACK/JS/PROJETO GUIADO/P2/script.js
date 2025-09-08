const cidadeIpnut = document.getElementById('cidadeInput');
const buscarBtn = document.getElementById('buscarBtn');
const container = document.getElementById('container');

document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        buscarBtn.click()
    }
})

buscarBtn.addEventListener('click', () => {
    const nomeCidade = cidadeIpnut.value.trim();
    if (nomeCidade === '') {
        alert('por favor, digite o nome de uma cidade')
        return;
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${nomeCidade}&format=jsonv2`

    container.innerHTML = `<p>Buscando...</p>`

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Lamento irmão, mas cidade não encontrada")
            }
            return response.json();
        })

        .then(data => {
            const cidades = data[0];
            const lat = cidades.lat;
            const lon = cidades.lon;
            const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}}&current=temperature_2m,is_day`
            fetch(url2)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const meteo = data;

                    container.innerHTML = `
                <h2>${cidades.display_name}</h2>
                <p>${cidades.lat.toLocaleString()}</p>
                <p>${meteo.current.temperature_2m}</p>
                <p>${meteo.current.is_day}</p>
                `
                    cidadeIpnut.value = "";
                })
        })
        .catch(error => {
            console.error(error)
            container.innerHTML = `<p style="color: red;">${error.message}</p>`
            cidadeIpnut.value = ""
        })

})