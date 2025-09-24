const cidadeInput = document.getElementById("cidadeInput");
const buscarBtn = document.getElementById("buscarBtn");
const container = document.getElementById("container");


document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        buscarBtn.click()

    }
})

buscarBtn.addEventListener('click', () => {
    const nomeCidade = cidadeInput.value.trim();
    if (nomeCidade === "") {
        alert("Por favor, digite o nome de uma cidade")
        return;
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${nomeCidade}&format=jsonv2`


    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Country not found!!!")
            }
            return response.json();
        })

        .then(data => {
            const cidade = data[0]
            const lat = cidade.lat;
            const lon = cidade.lon;

            const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day`

            fetch(url2)
                .then(response => {
                    return response.json();
                })

                .then(data => {
                    const local = data;
                    const is_day = local.current.is_day;
                    let displayDay = ""

                    if (is_day) {
                        displayDay = "dia";
                        backgroundColor = "#7ccfff";
                        cor = "#000000ff"
                    }
                    else {
                        displayDay = "noite";
                        backgroundColor = "rgba(78, 11, 159, 1)";
                        cor = "#ffffffff"
                    }

                    container.style.backgroundColor = backgroundColor;
                    container.style.color = cor;

                    container.innerHTML = `
        <p><strong>Cidade:</strong> ${cidade.name} </p>
        <h2>${local.current.temperature_2m} °C</h2>
        <p>${displayDay} </p>

        `

                })
            cidadeInput.value = "";
        })
        .catch(error => {
            console.error(error)
            container.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`
            cidadeInput.value = "";
        })


})