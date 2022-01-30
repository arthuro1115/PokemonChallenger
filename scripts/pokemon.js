/*
RULES: 
De acordo com as condições climáticas desta cidade deve-se exibir um Pokémon baseado em seu tipo (fogo, água, elétrico, etc) seguindo as seguintes regras:

Lugares onde a temperatura for menor (<) que 5ºC, deve-se retornar um pokémon de gelo (ice).
Lugares onde a temperatura estiver entre (>=) 5ºC e (<) 10ºC, deve-se retornar um pokémon do tipo água (water).
Lugares onde a temperatura estiver entre (>=) 12ºC e (<) 15ºC, deve-se retornar um pokémon do tipo grama (grass).
Lugares onde a temperatura estiver entre (>=) 15ºC e (<) 21ºC, deve-se retornar um pokémon do tipo terra (ground).
Lugares onde a temperatura estiver entre (>=) 23ºC e (<) 27ºC, deve-se retornar um pokémon do tipo inseto (bug).
Lugares onde a temperatura estiver entre (>=) 27ºC e 33ºC inclusive, deve-se retornar um pokémon do tipo pedra (rock).
Lugares onde a temperatura for maior que 33ºC, deve-se retornar um pokémon do tipo fogo (fire).

Para qualquer outra temperatura, deve-se retornar um pokémon do tipo normal.
E, no caso em que esteja chovendo na região um pokémon elétrico (electric) deve ser retornado, independente da temperatura.


O pokémon mostrado deve ser aleatório e não deve aparecer duas vezes consecutivas;
Após a consulta deve-se exibir na tela:

Temperatura atual da cidade em graus Celcius;
Se está chovendo ou não;
Nome do Pokémon seguindo as regras acima.
*/

const apiPoke = {
    baseType: "https://pokeapi.co/api/v2/type/",
    baseIMG: "https://pokeapi.co/api/v2/pokemon/"
}

const pokemon = document.getElementById("pokemon_slot")
const pokemon_name = document.getElementById("name_pokemon")
const pokemon_type = document.getElementById("type_pokemon")

var rngNumber = ''
var type = 'normal'
var pokemonName = ''
var pokemonImage = ''
var pokemonArrayLenght = ''

var pokemonList = [] 

console.log(type)

//Requisição Json
function searchPokemon(){
    fetch(`${apiPoke.baseType}${type}`)
    .then(response => {
        return response.json();
    }).then( response => {
        resultPokemon(response)
    }) 
}

//Dados Pokémon
function resultPokemon(pokemonJson){
    
    console.log('DATA')
    console.log(pokemonJson.pokemon)
    pokemonList = pokemonJson.pokemon

    console.log('Size Array')
    pokemonArrayLenght = pokemonList.length
    console.log(pokemonArrayLenght)

    //Passar Tamanho do Array e RNG
    pokemonRNG(pokemonArrayLenght)

    console.log(pokemonJson.pokemon[rngNumber].pokemon.name)
    pokemonName = pokemonJson.pokemon[rngNumber].pokemon.name

    fetch(`${apiPoke.baseIMG}${pokemonName}`)
    .then(response => {
        return response.json();
    })
    .then(response => {
        viewPokemon(response)
    })

    console.log(pokemonName)
}

//Set da imagem do Pokémon e infos
function viewPokemon(pokemonJson){
    console.log(pokemonJson.sprites.front_default)
    pokemonImage = pokemonJson.sprites.front_default
    pokemon.src = pokemonImage

    pokemon_name.innerHTML = pokemonName
    pokemon_type.innerHTML = type
}

//Filtro Type
function filterPokemon(temp , main){

if(main != 'Rain'){
    if(temp < 5){
        type = 'ice'
    }
    else if(temp >= 5 && temp < 10){
        type = 'water'
    }
    else if(temp >= 12 && temp < 15){
        type = 'grass'
    }
    else if(temp >= 15 && temp < 21){
        type = 'ground'
    }
    else if(temp >= 23 && temp < 27){
        type = 'bug'
    }
    else if(temp >= 27 && temp < 33){
        type = 'rock'
    }
    else if(temp > 33){
        type = 'fire'
    }else{
        type = 'normal'
    }

}else{
  type = 'electric'  
}
    console.log(type)
}

//RNG NUMBER
function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}
function createArrayOfNumbers(start, end){
    let myArray = [];
    for(let i = start; i <= end; i++) { 
        myArray.push(i);
    }
    console.log(myArray)
    return myArray; 
}
//--------------------------------------------------------------------------------------------------
function pokemonRNG(tamanho){

    let numbersArray = createArrayOfNumbers(1,tamanho);

    if(numbersArray.length == 0){
        console.log("cabo")
    }
    let randomIndex = getRandomNumber(0, numbersArray.length-1);
    let randomNumber = numbersArray[randomIndex];
    numbersArray.splice(randomIndex, 1)
    rngNumber = randomNumber
    console.log(randomNumber)
    console.log(temp_number)
}

search_button.addEventListener('click', function(){

    setTimeout(function() {
        searchPokemon()
        //filterPokemon(temp_int)
    },2000)
})

//Verificar o Type
setInterval(function() {
    filterPokemon(temp_int,temp_rain)
},1000)



