async function fetchAPI() {
    try {
        const response = await fetch("https://restcountries.com/v3/all")
        const countries = await response.json()

        //limpiar datos
         const countryInformation = countries.map(country => {
            return {
                flag: country.flags[0],
                name: country.name.official,
                capital: country.capital,
                population: country.population,
                side: country.car.side
            }
        })

        //ordenar alfabeticamente
        countryInformation.sort((a,b) => {
            if(a.name.toUpperCase() > b.name.toUpperCase()){
                return 1
            }else return -1
        }) 

        const countriesContainer = document.getElementById("countries-list")
        const detailContainer = document.createElement("div")
        detailContainer.classList.add("detail-container")
        detailContainer.style.display = "none"
        document.body.appendChild(detailContainer)
        
        //pintar banderas y nombres
        countryInformation.forEach(country => {
            const countryContainer = document.createElement("div")
            countryContainer.classList.add("country-container")
            countryContainer.innerHTML = `
            <img src="${country.flag}" alt="${country.name}" class="flag"/>
            <p>${country.name}</p>`
            countriesContainer.appendChild(countryContainer)
            
            countryContainer.addEventListener("click", () => {
                console.log("click")
                showDetail(country)
            })
        })

        //mostrar vista detalle
        function showDetail(country) {
            detailContainer.innerHTML = `
            <img src="${country.flag}" alt="${country.name}" class="flag"/>
            <p>${country.name}</p>
            <p>Capital: ${country.capital}</p>
            <p>Población: ${country.population}</p>
            <p>Lado de la carretera: ${country.side}</p>
            <button id="closeButton">Cerrar</button>`
        
            detailContainer.style.display = "block"

            const closeButton = detailContainer.querySelector("#closeButton");
            closeButton.addEventListener("click", () => {
                detailContainer.style.display = "none";
            })
        }
    }catch(error){
        console.error('Error fetching countries:', error)
    }
}

fetchAPI()