window.addEventListener('DOMContentLoaded', () => {
    homePage()
})

const GET = async () => {
    let result = await fetch('http://localhost:8000/api/meals')
    let data = await result.json()
    return data
}

const GETone = async (name) => {
    let result = await fetch(`http://localhost:8000/api/meals/${name}`)
    let data = await result.json()
    searchedItem(data)
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

const PATCH = async (meal, ingredients, prep_time, name) => {
    const obj = {
        "name": meal,
        "ingredients": ingredients,
        "prep_time": prep_time
    }
    console.log(obj)
    const meals = await fetch(`http://localhost:8000/api/meals/${name}`, 
    {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(obj)
    })
}

const DELETE = async (name) => {
    const meals = await fetch(`http://localhost:8000/api/meals/${name}`, 
    {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    })
}

const editter = () => {
    editMeal(document.querySelectorAll('#edit'))
    deleteMeal(document.querySelectorAll('#remove'))
}

const homePage = async () => {
    const data = await GET()
    createDiv(data.length)
    divContent(data)
    editter()
}

const shortPrep = async () => {
    const data = await GET()
    shortPrepData(data)
    editter()
}

const shortPrepData = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].prep_time < 60) {
            let obj = {};
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
    editter()
}

const mediumPrepData = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].prep_time >= 60 && data[i].prep_time < 120) {
            let obj = {};
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
    editter()
}

const longPrepData = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].prep_time >= 120) {
            let obj = {};
            obj.name = data[i].name
            obj.ingredients = data[i].ingredients
            obj.prep_time = data[i].prep_time
            arr.push(obj)
        }
    }
    createDiv(arr.length)
    divContent(arr)
    editter()
}

const searchedItem = (data) => {
    createDiv(data.length)
    console.log(data.name)
    let card = document.querySelectorAll('.card')
    for (let i = 0; i < card.length; i++) {
        let current = card[i]
        let h1 = document.createElement('h1')
        let p = document.createElement('p')
        let p2 = document.createElement('p')
        h1.textContent = data[0].name
        p.textContent = `Ingredients: ${data[0].ingredients}`
        p2.textContent = `Prep Time: ${data[0].prep_time} mins`

        current.appendChild(h1)
        current.appendChild(p)
        current.appendChild(p2)
    }
    editter()
}

const createDiv = (num) => {
    let content = document.querySelector('.container')
    for (let i = 1; i <= num; i++) {
        let cardContainer = document.createElement('div')
        let div = document.createElement('div')
        cardContainer.className = 'holder'
        cardContainer.id = 'meal' + i
        div.id = i
        div.className = 'card'
        cardContainer.appendChild(div)
        content.appendChild(cardContainer)
    }
    let holder = document.querySelectorAll('.holder')
    createOverlay(holder)
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

        current.appendChild(h1)
        current.appendChild(p)
        current.appendChild(p2)
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
const modal = document.getElementById('myModal')
create.addEventListener('click', (e) => {
    submitM(e);
})


const confirmButton = () => {
    const confirm = document.getElementById('confirm')
    const submit = document.getElementById('submit')
    submit.classList.add('invisible')
    confirm.classList.remove('invisible')
}

const submitButton = () => {
    const confirm = document.getElementById('confirm')
    const submit = document.getElementById('submit')
    confirm.classList.add('invisible')
    submit.classList.remove('invisible')
}

const search = document.getElementById('search')
search.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        let container = document.querySelector('.container')
        container.innerHTML = ''
        GETone(search.value)
        search.value = ''
    }
})

const span = document.getElementsByClassName("close")[0];
span.addEventListener('click', () => {
    document.querySelector('#meal-name').value = ''
    document.querySelector('#ingredients').value = ''
    document.querySelector('#prep-time').value = ''
    modal.style.display= "none";
})

const createOverlay = (holder) => {
    holder.forEach(elem => {
        let overlay = document.createElement('div')
        let edit = document.createElement('div')
        let remove = document.createElement('div')

        overlay.className = 'overlay'

        edit.className = 'change'
        edit.id = 'edit'
        edit.textContent = 'edit'

        remove.className = 'change'
        remove.id = 'remove'
        remove.textContent = 'delete'

        overlay.appendChild(edit)
        overlay.appendChild(remove)
        elem.appendChild(overlay)
    })
}

const submitM = (e) => {
    console.log(e.currentTarget)
    const modal = document.getElementById('myModal')
    modal.style.display = 'block'
    submitButton()
    addMeal()
}

const editMeal = (meal) => {
    meal.forEach(elem => {
        elem.addEventListener('click', (e) => {
            const modal = document.getElementById("myModal")
            modal.style.display = "block";
            confirmButton()
            const name = e.target.parentNode.parentNode.childNodes[0].childNodes[0].textContent
            const ing = e.target.parentNode.parentNode.childNodes[0].childNodes[1].textContent
            const prep = e.target.parentNode.parentNode.childNodes[0].childNodes[2].textContent
            parsingMeal(name, ing, prep)
        })
    })

}

const parsingMeal = (name, ing, prep) => {

    ing = ing.split(' ')
    for (let i = 0; i < ing.length; i++) {
        if (ing[i] === 'Ingredients:') {
            delete ing[i]
        }
        ing.join(' ')
    }

    prep = prep.split(' ')
    for (let i = 0; i < prep.length; i++) {
        if (prep[i] === 'Prep' || prep[i] === 'Time:' || prep[i] === 'mins') {
            delete prep[i]
        }
        prep.join(' ')
    }

    document.querySelector('#meal-name').value = name
    document.querySelector('#ingredients').value = ing.join(' ')
    document.querySelector('#prep-time').value = prep.join(' ')
    submitEdits(name)
}

const deleteMeal = (meal) => {
    meal.forEach(meals => {
        meals.addEventListener('click', (e) => {
            const name = e.target.parentNode.parentNode.childNodes[0].childNodes[0].textContent
            DELETE(name)
            {location.reload()}
        })
    })
}

const submitEdits = (name) => {
    const confirm = document.getElementById("confirm")
    confirm.addEventListener('click', (e) => {
        const meal = document.querySelector('#meal-name').value
        const ingredients = document.querySelector('#ingredients').value
        const prep_time = document.querySelector('#prep-time').value
        PATCH(meal, ingredients, prep_time, name)
        {location.reload()}
    })
}

const addMeal = () => {
    const submit = document.getElementById("submit")
    submit.addEventListener('click', (e) => {
        const meal = document.querySelector('#meal-name').value
        const ingredients = document.querySelector('#ingredients').value
        const prep_time = document.querySelector('#prep-time').value
        POST(meal, ingredients, prep_time)
    })
}