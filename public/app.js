window.addEventListener('DOMContentLoaded', () => {
    homePage()
})

const homePage = async () => {
    let result = await fetch('http://localhost:8000/api/meals')
    let data = await result.json()
    createDiv(data.length)
    divContent(data)
}

const createDiv = (num) => {
    let content = document.querySelector('.content')
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
        let h1 = document.createElement('h1')
        let p = document.createElement('p')
        let p2 = document.createElement('p')

        h1.textContent = data[i].name
        p.textContent = `Ingredients: ${data[i].ingredients}`
        p2.textContent = `Prep Time: ${data[i].prep_time} mins`

        p.appendChild(p2)
        h1.appendChild(p)
        card[i].appendChild(h1)
    }
}

