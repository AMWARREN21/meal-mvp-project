window.addEventListener('DOMContentLoaded', () => {
    homePage()
})

const GET = async () => {
    let result = await fetch('http://localhost:8000/api/meals')
    let data = await result.json()
    return data
}

const POST = async (meal, ingredients, prep_time) => {
    const obj = {
        "name": meal,
        "ingredients": ingredients,
        "prep_time": prep_time
    }
    const meals = await fetch('http://localhost:8000/api/meals', 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(obj)
    })
}

const homePage = async () => {
    const data = await GET()
    createDiv(data.length)
    divContent(data)
}

const shortPrep = async () => {
    const data = await GET()
    shortPrepData(data)
}

const shortPrepData = (data) => {
    let obj = {};
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].prep_time < 60) {
            obj.name = data[i].name
            obj.ingredients = data[i].ingredients
            obj.prep_time = data[i].prep_time
            arr.push(obj)
        }
    }
    createDiv(arr.length)
    divContent(arr)
}

const mediumPrep = async () => {
    const data = await GET()
    mediumPrepData(data)
}

const mediumPrepData = (data) => {
    let obj = {};
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].prep_time >= 60 && data[i].prep_time < 120) {
            obj.name = data[i].name
            obj.ingredients = data[i].ingredients
            obj.prep_time = data[i].prep_time
            arr.push(obj)
        }
    }
    createDiv(arr.length)
    divContent(arr)
}

const longPrep = async () => {
    const data = await GET();
    longPrepData(data)
}

const longPrepData = (data) => {
    let obj = {};
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].prep_time >= 120) {
            obj.name = data[i].name
            obj.ingredients = data[i].ingredients
            obj.prep_time = data[i].prep_time
            arr.push(obj)
        }
    }
    createDiv(arr.length)
    divContent(arr)
}

const createDiv = (num) => {
    let content = document.querySelector('.container')
    for (let i = 1; i <= num; i++) {
        let div = document.createElement('div')
        div.id = i
        div.className = 'card'
        content.appendChild(div)
    }
}

const divContent = (data) => {
    let card = document.querySelectorAll('.card')
    for (let i = 0; i < card.length; i++) {
        let current = card[i]
        let h1 = document.createElement('h1')
        let p = document.createElement('p')
        let p2 = document.createElement('p')

        h1.textContent = data[i].name
        p.textContent = `Ingredients: ${data[i].ingredients}`
        p2.textContent = `Prep Time: ${data[i].prep_time} mins`

        p.appendChild(p2)
        h1.appendChild(p)
        current.appendChild(h1)
    }
}

const short = document.querySelector('#short')
short.addEventListener('click', () => {
    let container = document.querySelector('.container')
    container.innerHTML = ''
    shortPrep()
})

const medium = document.querySelector('#medium')
medium.addEventListener('click', () => {
    let container = document.querySelector('.container')
    container.innerHTML = ''
    mediumPrep()
})

const long = document.querySelector('#long')
long.addEventListener('click', () => {
    let container = document.querySelector('.container')
    container.innerHTML = ''
    longPrep()
})

const home = document.querySelector('#home')
home.addEventListener('click', () => {
    let container = document.querySelector('.container')
    container.innerHTML = ''
    homePage()
})

const create = document.querySelector('#create')
const modal = document.getElementById("myModal")
create.addEventListener('click', () => {
    modal.style.display = "block";
})

const span = document.getElementsByClassName("close")[0];
span.addEventListener('click', () => {
    modal.style.display= "none";
})

const submit = document.getElementById("submit")
submit.addEventListener('click', () => {
    const meal = document.querySelector('#meal-name').value
    const ingredients = document.querySelector('#ingredients').value
    const prep_time = document.querySelector('#prep-time').value
    POST(meal, ingredients, prep_time)
    reload()
})



