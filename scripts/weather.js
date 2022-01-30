const api = {
    key: "8f1813d6a8e6d28c808351458f9623c6",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

const search_input = document.getElementById("city_input")
const search_button = document.getElementById("button_encontrar")
const city = document.querySelector('.cidade_text')
const temp_number = document.querySelector('.temperatura')
const state_weather = document.querySelector('.estado')

var temp_int = ''
var temp_rain = ''

//Click Button
search_button.addEventListener('click', function(){
    searchResult(search_input.value)
})

//Get JSON Info
function searchResult(){
        fetch(`${api.base}weather?q=${search_input.value}&lang=${api.lang}&units=${api.units}&appid=${api.key}`)
        .then(response => {
            console.log(response)
            if(!response.ok) {
                throw new Error(`http erro: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        })
}

//Mostrar na Tela Resultados
function displayResults(weather){

    console.log(weather)
    city.innerHTML = weather.name

    temp_int = weather.main.temp
    temp_number.innerHTML = temp_int.toPrecision(2)
    
    state_weather.innerHTML = weather.weather[0].description

    temp_rain = weather.weather[0].main
    console.log("Está Chovendo?" + temp_rain)
}
