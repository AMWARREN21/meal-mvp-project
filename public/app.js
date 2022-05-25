window.addEventListener('DOMContentLoaded', () => {
    homePage()
    GET()
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

const PATCH = async (meal, ingredients, prep_time, index) => {
    const obj = {
        "name": meal,
        "ingredients": ingredients,
        "prep_time": prep_time
    }
    const meals = await fetch(`http://localhost:8000/api/meals/${index}`, 
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


const homePage = async () => {
    const data = await GET()
    createDiv(data.length)
    divContent(data)
    editMeal(document.querySelectorAll('#edit'))
    deleteMeal(document.querySelectorAll('#remove'))
}

const shortPrep = async () => {
    const data = await GET()
    shortPrepData(data)
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
    addOverlay(holder)
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
    addMeal(e);
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

const addOverlay = (holder) => {
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

        overlay.appendChild(remove)
        overlay.appendChild(edit)
        elem.appendChild(overlay)
    })
}

const editMeal = (meal) => {
    meal.forEach(meals => {
        meals.addEventListener('click', (e) => {
            const div = meals.parentNode.parentNode.childNodes[0]
            values(div)
            console.log(e.target)
            //console.log(document.getElementById('1').childNodes[0])
            const modal = document.getElementById("myModal")
            modal.style.display = "block";
        })
    })

}

const values = (div) => {
    const name = document.getElementById('1').childNodes[0].textContent
    const ingredients = document.getElementById('1').childNodes[1].textContent
    const prepTime = document.getElementById('1').childNodes[2].textContent
    document.querySelector('#meal-name').value = name
    document.querySelector('#ingredients').value = ingredients
    document.querySelector('#prep-time').value = prepTime
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

// const addMeal = () => {
//     const create = document.querySelector('#create')
//     const modal = document.getElementById("myModal")
//     create.addEventListener('click', () => {
//     modal.style.display = "block"
// })
// }

//create a function for creating a meal
//add
const addMeal = (e) => {
    console.log(e.currentTarget)
    const modal = document.getElementById('myModal')
    modal.style.display = 'block'
}