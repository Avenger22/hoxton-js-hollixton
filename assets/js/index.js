const sectionMenusEl = document.querySelector('section.container-menus')


//-----------------------------------------------STATE OBJECT---------------------------------------------------------------------------------

const state = {

    store: [],
    users: []

}

//--------------------------------------------END OF STATE OBJECT----------------------------------------------------------------


//--------------------------------------------SERVER FUNCTIONS-------------------------------------------------------------------------------

function getStoreArrayFromServer() {

    return fetch('http://localhost:3000/store')        
        .then(function (response) 
        {
            return response.json()
        })

}

function getUsersArrayFromServer() {

    return fetch('http://localhost:3000/users')        
        .then(function (response) 
        {
            return response.json()
        })

}

//------------------------------------------END OF SERVER FUNCTIONS---------------------------------------------------------------------



//---------------------------------------------RENDER FUNCTIONS------------------------------------------------------------------------------

function renderHeader() {

    const headerMenuEl = document.createElement('header')
    headerMenuEl.setAttribute('class', 'header-menu')

    const navEl = document.createElement('nav')
    navEl.setAttribute('class', 'header-nav')

    const ulHeader1 = document.createElement('ul')
    ulHeader1.setAttribute('class', 'header-ul-1')

    const liUl1_1 = document.createElement('li')
    const liUl1_2 = document.createElement('li')
    const liUl1_3 = document.createElement('li')
    const liUl1_4 = document.createElement('li')

    const aUl1_1 = document.createElement('a')
    aUl1_1.setAttribute('href', '#')
    aUl1_1.textContent = 'HOLLIXTON'

    const aUl1_2 = document.createElement('a')
    aUl1_2.setAttribute('href', '#')
    aUl1_2.textContent = 'Girls'

    const aUl1_3 = document.createElement('a')
    aUl1_3.setAttribute('href', '#')
    aUl1_3.textContent = 'Guys'

    const aUl1_4 = document.createElement('a')
    aUl1_4.setAttribute('href', '#')
    aUl1_4.textContent = 'Sales'
    
    liUl1_1.append(aUl1_1)
    liUl1_2.append(aUl1_2)
    liUl1_3.append(aUl1_3)
    liUl1_4.append(aUl1_4)

    ulHeader1.append(liUl1_1, liUl1_2, liUl1_3, liUl1_4)

    const ulHeader2 = document.createElement('ul')
    ulHeader2.setAttribute('class', 'header-ul-2')

    const liUl2_1 = document.createElement('li')
    const liUl2_2 = document.createElement('li')
    const liUl2_3 = document.createElement('li')

    const imgUl2_1 = document.createElement('img')
    imgUl2_1.setAttribute('src', './assets/icons/search.png')
    imgUl2_1.setAttribute('alt', '')

    const imgUl2_2 = document.createElement('img')
    imgUl2_2.setAttribute('src', './assets/icons/user.png')
    imgUl2_2.setAttribute('alt', '')

    const imgUl2_3 = document.createElement('img')
    imgUl2_3.setAttribute('src', './assets/icons/shopping-bag.png')
    imgUl2_3.setAttribute('alt', '')

    liUl2_1.append(imgUl2_1)
    liUl2_2.append(imgUl2_2)
    liUl2_3.append(imgUl2_3)

    ulHeader2.append(liUl2_1, liUl2_2, liUl2_3)

    navEl.append(ulHeader1, ulHeader2)
    headerMenuEl.append(navEl)

    sectionMenusEl.append(headerMenuEl)

}

function renderMain(storeArrayParam) {
    
    const mainMenuEl = document.createElement('main')
    mainMenuEl.setAttribute('class', 'main-menu')

    const divEl1 = document.createElement('div')
    divEl1.setAttribute('class', 'main-header')

    const h2El1 = document.createElement('h2')
    h2El1.setAttribute('class', 'h2-main')
    h2El1.textContent = 'Home'

    divEl1.append(h2El1)

    //here we create he item in the store 
    const divEl2 = document.createElement('div')
    divEl2.setAttribute('class', 'store-items-wrapper')

    for (const item of storeArrayParam) { //this is now the object in an array iteration

        const divEl3 = document.createElement('div')
        divEl3.setAttribute('class', 'store-item')

        const imgEl = document.createElement('img')
        imgEl.setAttribute('src', `${item.image}`)
        imgEl.setAttribute('alt', '')

        const h2El2 = document.createElement('h2')
        h2El2.textContent = item.name

        //now we check if an propery in in the object to see discounted price or not
        if (item.hasOwnProperty('discountedPrice')) {

            const spanEl1 = document.createElement('span')
            spanEl1.setAttribute('class', 'span-1 special-span')
            spanEl1.textContent = `£ ${item.price}`

            const spanEl2 = document.createElement('span')
            spanEl2.setAttribute('class', 'span-2')
            spanEl2.textContent = `£ ${item.discountedPrice}`

            divEl3.append(imgEl, h2El2, spanEl1, spanEl2)
            divEl2.append(divEl3)

        }

        else {

            const spanEl1 = document.createElement('span')
            spanEl1.setAttribute('class', 'span-1 special-span')
            spanEl1.textContent = `£ ${item.price}`
            spanEl1.style.color = '#000'
            spanEl1.style.textDecoration = 'none'

            divEl3.append(imgEl, h2El2, spanEl1)
            divEl2.append(divEl3)

        }

    }

    mainMenuEl.append(divEl1, divEl2)

    sectionMenusEl.append(mainMenuEl)

}

function renderFooter() {
    
    const footerMenuEl = document.createElement('footer')
    footerMenuEl.setAttribute('class', 'footer-menu')

    const ulFooter1 = document.createElement('ul')
    ulFooter1.setAttribute('class', 'footer-ul-1')

    const liUl1_1 = document.createElement('li')
    liUl1_1.textContent = 'HOLLIXTON'

    ulFooter1.append(liUl1_1)

    const ulFooter2 = document.createElement('ul')
    ulFooter2.setAttribute('class', 'footer-ul-2')

    const liUl2_1 = document.createElement('li')
    liUl2_1.textContent = 'GB'

    const liUl2_2 = document.createElement('li')
    liUl2_2.textContent = 'United Kingdom'

    ulFooter2.append(liUl2_1, liUl2_2)

    footerMenuEl.append(ulFooter1, ulFooter2)
    sectionMenusEl.append(footerMenuEl)

}

function render() {

    sectionMenusEl.innerHTML = ''

    renderHeader()
    renderMain(state.store)
    renderFooter()

}

function init() {

     //FETCHING AND STORING DATA FROM SERVER TO STATE both arrays from json server
    getStoreArrayFromServer().then(function (storeArrayFromServer) {
        state.store = storeArrayFromServer
        render()
    })

    getUsersArrayFromServer().then(function (usersArrayFromServer) {
        state.users = usersArrayFromServer
        render()
    })

    render()

}

//---------------------------------------END OF RENDER FUNCTIONS---------------------------------------------------------------

init()