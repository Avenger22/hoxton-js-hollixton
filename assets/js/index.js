// #region "GLOBAL VARIABLES"

const sectionMenusEl = document.querySelector('section.container-menus')

// #endregion


// #region "STATE OBJECT"

const state = {

    store: [],
    users: [],
    newStore: [],
    girlsClicked: false,
    guysClicked: false,
    salesClicked: false

}

// #endregion


// #region "HELPER FUNCTIONS"

function listenToLogoEvent(logoElParam) {

    logoElParam.addEventListener('click', function(event) {
        event.preventDefault()
        console.log("Logo is Clicked")
        render()
    })

}

function listenToGirlsEvent(girlsElParam) {

    girlsElParam.addEventListener('click', function(event) {
        event.preventDefault()
        state.girlsClicked = true
        console.log("Girls is Clicked")

        state.newStore = state.store.filter(function(item) {
            return item.type === 'Girls'
        })

        render()
    })

}

function listenToGuysEvent(guysElParam) {

    guysElParam.addEventListener('click', function(event) {
        event.preventDefault()
        state.guysClicked = true
        console.log("Guys is Clicked")

        state.newStore = state.store.filter(function(item) {
            return item.type === 'Guys'
        })

        render()
    })

}

function listenToSalesEvent(salesElParam) {

    salesElParam.addEventListener('click', function(event) {
        event.preventDefault()
        state.salesClicked = true
        console.log("Sales is Clicked")

        state.newStore = state.store.filter(function(item) {
            return item.hasOwnProperty('discountedPrice')
        })

        render()
    })

}

function listenToSearchEvent(searchParam) {

}

function listenToUserEvent(userParam) {
    
}

function listenToBagEvent(bagParam) {
    
}

// #endregion


// #region "SERVER FUNCTIONS"

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

// #endregion


// #region "RENDER FUNCTIONS"

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

    listenToLogoEvent(liUl1_1)
    listenToGirlsEvent(liUl1_2)
    listenToGuysEvent(liUl1_3)
    listenToSalesEvent(liUl1_4)

    ulHeader1.append(liUl1_1, liUl1_2, liUl1_3, liUl1_4)

    const ulHeader2 = document.createElement('ul')
    ulHeader2.setAttribute('class', 'header-ul-2')

    const liUl2_1 = document.createElement('li')
    const liUl2_2 = document.createElement('li')
    const liUl2_3 = document.createElement('li')

    const aUl2_1 = document.createElement('a')
    aUl2_1.setAttribute('href', '#')

    const aUl2_2 = document.createElement('a')
    aUl2_2.setAttribute('href', '#')

    const aUl2_3 = document.createElement('a')
    aUl2_3.setAttribute('href', '#')

    const imgUl2_1 = document.createElement('img')
    imgUl2_1.setAttribute('src', './assets/icons/search.png')
    imgUl2_1.setAttribute('alt', '')

    const imgUl2_2 = document.createElement('img')
    imgUl2_2.setAttribute('src', './assets/icons/user.png')
    imgUl2_2.setAttribute('alt', '')

    const imgUl2_3 = document.createElement('img')
    imgUl2_3.setAttribute('src', './assets/icons/shopping-bag.png')
    imgUl2_3.setAttribute('alt', '')

    aUl2_1.append(imgUl2_1)
    aUl2_2.append(imgUl2_2)
    aUl2_3.append(imgUl2_3)

    liUl2_1.append(aUl2_1)
    liUl2_2.append(aUl2_2)
    liUl2_3.append(aUl2_3)

    //event listener holder and calling them
    listenToSearchEvent(liUl2_1)
    listenToUserEvent(liUl2_2)
    listenToBagEvent(liUl2_3)

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

        const spanEl1 = document.createElement('span')
        spanEl1.setAttribute('class', 'span-1 special-span')
        spanEl1.textContent = `£ ${item.price}`

        const spanEl2 = document.createElement('span')
        spanEl2.setAttribute('class', 'span-2')
        spanEl2.textContent = `£ ${item.discountedPrice}`

        const spanEl3 = document.createElement('span')
        spanEl3.setAttribute('class', 'span-3')
        spanEl3.textContent = `Stock: ${item.stock}`

        const spanEl4 = document.createElement('span')
        spanEl4.setAttribute('class', 'span-4')
        spanEl4.textContent = `Type For ${item.type}`

        //now we check if an propery in in the object to see discounted price or not
        if (item.hasOwnProperty('discountedPrice')) {
            divEl3.append(imgEl, h2El2, spanEl1, spanEl2, spanEl3, spanEl4)
            divEl2.append(divEl3)
        }

        else {
            spanEl1.style.color = '#000'
            spanEl1.style.textDecoration = 'none'

            divEl3.append(imgEl, h2El2, spanEl1, spanEl3, spanEl4)
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

    //destroy everything in the html and the page
    sectionMenusEl.innerHTML = ''

    if (state.girlsClicked === true && state.guysClicked === false && state.salesClicked === false) {
        //recreate everything in html every time render is called, basically rerendering
        renderHeader()
        renderMain(state.newStore)
        renderFooter()

        console.log('Changing here the state from true to false in order to achieve app functionality')
        state.girlsClicked = false
    }

    else if (state.girlsClicked === false && state.guysClicked === true && state.salesClicked === false) {
        //recreate everything in html every time render is called, basically rerendering
        renderHeader()
        renderMain(state.newStore)
        renderFooter()

        console.log('Changing here the state from true to false in order to achieve app functionality')
        state.guysClicked = false
    }

    else if (state.girlsClicked === false && state.guysClicked === false && state.salesClicked === true) {
        //recreate everything in html every time render is called, basically rerendering
        renderHeader()
        renderMain(state.newStore)
        renderFooter()

        console.log('Changing here the state from true to false in order to achieve app functionality')
        state.salesClicked = false
    }

    else {
        //recreate everything in html every time render is called, basically rerendering
        renderHeader()
        renderMain(state.store)
        renderFooter()
    }

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

// #endregion


// #region "APP START"

init()

// #endregion