# Desafio Pokémon #  

## Começando a Nossa Jornada! ##
---

-  Para a execução do projeto basta efetuar o download de todos os arquivos e coloca-los dentro de uma pasta. você pode efetuar o download em  **ZIP** e depois extrair-los.

- Após todos os arquivos baixados basta abrir o arquivo **index.html**.


## Orientações ##
---
- Após a página ser iniciada um pouco abaixo, contém instruções para o seu manuseio.
- A aplicação contém um pequeno delay, **não precionar o botão diversas vezes**.
- Você pode efeutar uma nova consulta da mesma cidade, e um outro pokémon estará pronto para ser coletado!

## Funcionamento ## 
---

##  Weather API ## 

**Passo 1 - Configurando a API**
-
- Primeiro foi efetuado a criação de uma conta no site: https://openweathermap.org/api
- Após isso foi gerado o **APPID**, que é a chave necessária para efetuar a requisição do sistema. 
- Assim foi contruindo uma constante com os dados necessários para efetuar a requisição.

```js
const api = {
    key: "8f1813d6a8e6d28c808351458f9623c6",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}
```

**Passo 2 - Efetuando a Requisição**
-
- Para efetuar a requisição foi criando um gatilho inicial, gatilho este que é um botão presente na página WEB, quando este botão for precionado ele irá coletar os dados que foram descritos na caixa de texto e acionar uma função que execultará suas devidas instruções.

```js
//Click Button
search_button.addEventListener('click', function(){
    searchResult(search_input.value)
})
```
**Função searchResult()**
- Está função irá fazer a requisição atraves do **Fetch** passando como parâmetro os dados que forám definidos na constante **api**.
- Após isso transformará está resposta em um **JSON**.

- Assim efetuando a ultima função para a entrega das informações na página **HTML**.
```js
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
```

**Passo 3 - Resultados**
-

**Função displayResult()**
- Após todos os dados serem coletados, foram adicionados a página HTML nos seus respectivos lugares.

```js
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
```
**JSON**
- Abaixo é possivel ver como as informações foram coletadas.

```json
{
	"coord": {
		"lon": -47.0608,
		"lat": -22.9056
	},
	"weather": [
		{
			"id": 701,
			"main": "Mist",
			"description": "névoa",
			"icon": "50d"
		}
	],
	"base": "stations",
	"main": {
		"temp": 18.97,
		"feels_like": 19.46,
		"temp_min": 16.72,
		"temp_max": 22.06,
		"pressure": 1013,
		"humidity": 97
	},
	"visibility": 3800,
	"wind": {
		"speed": 3.09,
		"deg": 350
	},
	"clouds": {
		"all": 100
	},
	"dt": 1643567887,
	"sys": {
		"type": 1,
		"id": 8393,
		"country": "BR",
		"sunrise": 1643532405,
		"sunset": 1643579769
	},
	"timezone": -10800,
	"id": 3467865,
	"name": "Campinas",
	"cod": 200
}
```
---
##  POKÉAPI ## 
**Passo 1 - Configurando a API**
-
- Está API não necessita de uma chave, logo não é necessario a criação de nenhuma conta.
- Basta utilizar a URL: https://pokeapi.co e seus respectivos dados, para efetuar sua requisição.
- Como por exemplo na constante abaixo.


```js
const apiPoke = {
    baseType: "https://pokeapi.co/api/v2/type/",
    baseIMG: "https://pokeapi.co/api/v2/pokemon/"
}
```
**Passo 2 - Efetuando a Requisição**
-
- Para efetuar a requisição foi utilizado a mesma ideia do botão abordado anteriormente, assim efetuando o gatilho das funções.

```js
search_button.addEventListener('click', function(){

    setTimeout(function() {
        searchPokemon()
    },2000)
})
```
- Também foi criando uma função para definir o **Type do Pokémon** basendo-se na temperatura obtida atraves da API weather.


**Função filterPokemon()**
- Está função define qual é o **tipo de Pokémon** a ser pesquisado, se baseando na temperatura encontrada ou o clima que está a cidade ex: Sol, Chuva, Nublado etc..

```js
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
```

**Função pokemonRNG()**
- Outro paramêtro necessário para requisição, foi a criação de um função para números Random e que não se repitam. 
- Para isso foi utilizando o codígo pronto do seguinte site: https://www.fwait.com/how-to-generate-random-numbers-in-javascript-without-repetitions/. 
- Assim adptando o para a aplicação.
- utilizando como paramêtro o tamanho do Array gerado retornado pelo JSON, assim escolhendo um pokémon aléatorio entre está faixa de números. Ex: (1 a 10).

```js
function pokemonRNG(tamanho){

    let numbersArray = createArrayOfNumbers(1,tamanho);

    if(numbersArray.length == 0){
        console.log("acabou")
    }
    let randomIndex = getRandomNumber(0, numbersArray.length-1);
    let randomNumber = numbersArray[randomIndex];
    numbersArray.splice(randomIndex, 1)
    rngNumber = randomNumber
    console.log(randomNumber)
    console.log(temp_number)
}
```
- Com quase todos os paramêtros feitos podemos solicitar a requisição.

**Função searchPokemon()**
- Está função irá fazer a requisição atraves do **Fetch** passando como parâmetro os dados que forám definidos na constante **apiPoke**.
- Após isso transformará está resposta em um **JSON**.
- Assim efetuando a proxima função.
```js
//Requisição Json
function searchPokemon(){
    fetch(`${apiPoke.baseType}${type}`)
    .then(response => {
        return response.json();
    }).then( response => {
        resultPokemon(response)
    }) 
}
```
- Após a primeira requisição ser feita ela irá retorna alguns dados necessários, para efetuarmos outra requisição.
- Como o primeiro JSON retornado pela requisição feita utilizando os **Type's**, não se obtém os sprites(Imagens) dos Pokémons, por isso foi feito outra requisição para obte-las utilizando dos seus nomes, já obtidos pela primeira requisição feita. 

```js
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
```
**Exemplo JSON Type: Normal**
 
```json
{
			"pokemon": {
				"name": "pikipek",
				"url": "https://pokeapi.co/api/v2/pokemon/731/"
			},
			"slot": 1
		},
		{
			"pokemon": {
				"name": "trumbeak",
				"url": "https://pokeapi.co/api/v2/pokemon/732/"
			},
			"slot": 1
		},
		{
			"pokemon": {
				"name": "toucannon",
				"url": "https://pokeapi.co/api/v2/pokemon/733/"
			},
			"slot": 1
		},
		{
			"pokemon": {
				"name": "yungoos",
				"url": "https://pokeapi.co/api/v2/pokemon/734/"
			},
			"slot": 1
		},
		{
			"pokemon": {
				"name": "gumshoos",
				"url": "https://pokeapi.co/api/v2/pokemon/735/"
			},
			"slot": 1
		},
		{
			"pokemon": {
				"name": "stufful",
				"url": "https://pokeapi.co/api/v2/pokemon/759/"
			},
			"slot": 1
		},
		{
			"pokemon": {
				"name": "bewear",
				"url": "https://pokeapi.co/api/v2/pokemon/760/"
			},
			"slot": 1
		},
		{
			"pokemon": {
				"name": "oranguru",
				"url": "https://pokeapi.co/api/v2/pokemon/765/"
			},
			"slot": 1
		},
		{
			"pokemon": {
				"name": "type-null",
				"url": "https://pokeapi.co/api/v2/pokemon/772/"
			},
```

**Exemplo JSON Pokémon: Pikachu**
 
```json
name": "pikachu",
	"order": 35,
	"past_types": [],
	"species": {
		"name": "pikachu",
		"url": "https://pokeapi.co/api/v2/pokemon-species/25/"
	},
	"sprites": {
		"back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
		"back_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png",
		"back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
		"back_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/25.png",
		"front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
		"front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/25.png",
		"front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
		"front_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/25.png",
		"other": {
			"dream_world": {
				"front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
				"front_female": null
			},
```

**Passo 3 - Resultados**
-
**Função displayResult()**
- Após todos os dados serem coletados, foram adicionados a página HTML nos seus respectivos lugares.


```js
//Set da imagem do Pokémon e infos
function viewPokemon(pokemonJson){
    console.log(pokemonJson.sprites.front_default)
    pokemonImage = pokemonJson.sprites.front_default
    pokemon.src = pokemonImage

    pokemon_name.innerHTML = pokemonName
    pokemon_type.innerHTML = type
}
```
---


## Tecnologias Utilizadas ##
 
 - Photoshop: Para edição de partes da pokédex.
 - Insomnia: usado para olhar o retorno da requisições.
 - Visual Code: criação do código

 ---

