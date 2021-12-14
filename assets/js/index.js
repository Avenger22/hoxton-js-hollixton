// #region "-----GLOBAL VARIABLES-----"
const sectionMenusEl = document.querySelector('section.container-menus')

const divEl1 = document.createElement('div')
divEl1.setAttribute('class', 'modal-container')

const divEl2 = document.createElement('div')
divEl2.setAttribute('class', 'modal-container-2')

const divEl3 = document.createElement('div')
divEl3.setAttribute('class', 'modal-container-3')

let spanHolderEl = null

//super crucial for catching each name and passing it in render in else if, problem is because the filter function had param and passing was hard so this solved
let searchCatcher = []
let userCatcher = [] 
// #endregion


// #region "-----STATE OBJECT-----"
//Everything is here everything is retrieveed from state, every filters updates the state then rerenders, state answers app questions concept
const state = {
    store: [],
    users: [],
    bagItems: [],
    userName: null,
    userShowClass: null,
    girlsClicked: false,
    guysClicked: false,
    salesClicked: false,
    searchClicked: false,
    userClicked: false,
    bagClicked: false
}
// #endregion


// #region "-----HELPER FUNCTIONS-----"

// #region "EVENT LISTENER FUNCTIONS

// #region "EVENT LISTENER LINKS"
function listenToLogoEvent(logoElParam) {

    logoElParam.addEventListener('click', function(event) {
        event.preventDefault()
        console.log("Logo is Clicked")

        getDeffaultLogoFilter()

        render()
    })

}

function listenToGirlsEvent(girlsElParam) {

    girlsElParam.addEventListener('click', function(event) {
        event.preventDefault()
        console.log("Girls is Clicked")

        getGirlsFromStateFilter()

        state.girlsClicked = true //UPDATE THE STATE THEN RERENDER THE APP
        render()
    })

}

function listenToGuysEvent(guysElParam) {

    guysElParam.addEventListener('click', function(event) {
        event.preventDefault()
        console.log("Guys is Clicked")

        getGuysFromStateFilter()

        state.guysClicked = true //UPDATE THE STATE THEN RERENDER THE APP
        render()
    })

}

function listenToSalesEvent(salesElParam) {

    salesElParam.addEventListener('click', function(event) {
        event.preventDefault()
        console.log("Sales is Clicked")

        getSalesFromStateFilter()

        state.salesClicked = true //UPDATE THE STATE THEN RERENDER THE APP
        render()
    })

}
// #endregion

// #region 'EVENT LISTENER SEARCH'
function listenToSearchEvent(searchElParam) {

    searchElParam.addEventListener('click', function(event) {
        event.preventDefault()
        divEl1.classList.add('show')
        // render()
    })

}

function listenToRemoveSearch(buttonElParam) {

    buttonElParam.addEventListener('click', function(event) {
        event.preventDefault()
        divEl1.classList.remove('show')
        // render()
    })

}

function listenToSubmitSearch(formElParam) {

    formElParam.addEventListener('submit', function(event) {
        event.preventDefault()
        console.log("Sumbit search is Clicked or sumbit")
        state.searchClicked = true

        searchCatcher = getNameSearchFromStateFilter(formElParam.search.value)

        state.searchClicked = true //UPDATE THE STATE THEN RERENDER THE APP
        render()
    })
    
}

// #endregion

// #region 'EVENT LISTENER USER'
function listenToUserEvent(userElParam) {
    
    userElParam.addEventListener('click', function(event) {
        event.preventDefault()
        divEl2.classList.add('show')
        // render()
    })

}

function listenToRemoveUser(buttonElParam) {

    buttonElParam.addEventListener('click', function(event) {
        event.preventDefault()
        divEl2.classList.remove('show')
        // render()
    })

}

function listenToSubmitUser(formElParam) {

    formElParam.addEventListener('submit', function(event) {

        event.preventDefault()
        console.log("Submit user is Clicked or sumbit")

        userCatcher.pop()
        userCatcher.push(getUserCredentialsFromStateFilter(formElParam.email.value, formElParam.password.value))

        if(userCatcher.length === 0) {
            alert('No email or user found with these credentials')
        }

        else {
            alert(`The email is : ${userCatcher[0][0].id} and also the password is : ${userCatcher[0][0].password}`)
        }

        spanHolderEl.classList.add('show')

        state.userClicked = true
        state.userShowClass = 'show'
        state.userName = userCatcher[0][0].firstName
        spanHolderEl.textContent = state.userName //fixed this BUG LINKING STATE AND DOM THEN RERENDER

        render()

    })
    
}

function getSpanEl(spanElParam) {
    return spanElParam
}
// #endregion

// #region 'EVENT LISTENER BAG'
function listenToBagEvent(bagElParam) {
    
    bagElParam.addEventListener('click', function(event) {
        event.preventDefault()
        divEl3.classList.add('show')
        // render()
    })

}

function listenToRemoveBag(buttonElParam) {

    buttonElParam.addEventListener('click', function(event) {
        event.preventDefault()
        divEl3.classList.remove('show')
        // render()
    })

}
// #endregion

// #endregion

// #region "FILTER FUNCTIONS"
function getDeffaultLogoFilter() {

    let stateLogoDeffaultArray = []
    return stateLogoDeffaultArray = state.store.filter(function(item) {
        return item
    })

}

function getGirlsFromStateFilter() {

    let stateGirlsArray = []
    return stateGirlsArray = state.store.filter(function(item) {
        return item.type === 'Girls'
    })

}

function getGuysFromStateFilter() {

    let stateGuysArray = []
    return stateGuysArray = state.store.filter(function(item) {
        return item.type === 'Guys'
    })

}

function getSalesFromStateFilter() {

    let stateSalesArray = []
    return stateSalesArray = state.store.filter(function(item) {
        return item.hasOwnProperty('discountedPrice')
    })

}

function getNameSearchFromStateFilter(InputValueParam) {

    let nameSearchArray = []
    return nameSearchArray = state.store.filter(function(item) {
        return item.name === InputValueParam
    })

}

function getUserCredentialsFromStateFilter(emailParam, passwordParam) {

    let userCredentialsArray = []
    return userCredentialsArray = state.users.filter(function(item) {
        return item.id === emailParam && item.password === passwordParam
    })

}
// #endregion

// #endregion


// #region "-----SERVER FUNCTIONS-----"

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


// #region "-----RENDER FUNCTIONS-----"

// #region "RENDERING MODALS"
function renderSearchModal() {

    const divEl1Modal = document.createElement('div')
    divEl1Modal.setAttribute('class', 'modal')

    const divHeaderSearch = document.createElement('div')
    divHeaderSearch.setAttribute('class', 'header-search')

    const formSearch = document.createElement('form')
    formSearch.setAttribute('class', 'form-search')

    const h3El = document.createElement('h3')
    h3El.textContent = 'Seach for your favourite items!'

    const inputEl = document.createElement('input')
    inputEl.setAttribute('class', 'search-input')
    inputEl.setAttribute('name', 'search')
    inputEl.setAttribute('required', 'true')
    inputEl.setAttribute('type', 'text')
    inputEl.placeholder = 'Search ....'

    const btnSumbitEl = document.createElement('button')
    btnSumbitEl.textContent = 'Submit'

    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'X'

    divHeaderSearch.append(h3El, removeBtn)
    formSearch.append(inputEl, btnSumbitEl)
    divEl1Modal.append(divHeaderSearch, formSearch)
    divEl1.append(divEl1Modal)
    sectionMenusEl.append(divEl1)

    listenToRemoveSearch(removeBtn)
    listenToSubmitSearch(formSearch)

}

function renderUserModal() {

    const divEl2Modal = document.createElement('div')
    divEl2Modal.setAttribute('class', 'modal-2')

    const divHeaderUser = document.createElement('div')
    divHeaderUser.setAttribute('class', 'header-user-modal')

    const divInputUser = document.createElement('div')
    divInputUser.setAttribute('class', 'input-user-modal')

    const divBtnUser = document.createElement('div')
    divBtnUser.setAttribute('class', 'button-user-modal')

    const h3el = document.createElement('h3')
    h3el.textContent = 'Sign In'

    const spanEl1 = document.createElement('span')
    spanEl1.setAttribute('class', 'span-user-1')
    spanEl1.textContent = 'Email:'

    const inputEl1 = document.createElement('input')
    inputEl1.setAttribute('class', 'email-input-user')
    inputEl1.setAttribute('name', 'email')
    inputEl1.setAttribute('required', 'true')
    inputEl1.setAttribute('type', 'email')
    inputEl1.placeholder = 'Enter Email'

    const spanEl2 = document.createElement('span')
    spanEl1.setAttribute('class', 'span-user-2')
    spanEl2.textContent = 'Password:'

    const inputEl2 = document.createElement('input')
    inputEl2.setAttribute('class', 'password-input-user')
    inputEl2.setAttribute('name', 'password')
    inputEl2.setAttribute('required', 'true')
    inputEl2.setAttribute('type', 'password')
    inputEl2.placeholder = 'Enter Password'

    const btnSignInEl = document.createElement('button')
    btnSignInEl.textContent = 'Sign In'

    const btnRemoveEl = document.createElement('button')
    btnRemoveEl.textContent = 'X'

    const formUser = document.createElement('form')
    formUser.setAttribute('class', 'form-user')

    divHeaderUser.append(h3el)
    divInputUser.append(spanEl1, inputEl1, spanEl2, inputEl2)
    divBtnUser.append(btnSignInEl, btnRemoveEl)
    formUser.append(divInputUser, divBtnUser)
    divEl2Modal.append(divHeaderUser, formUser)
    divEl2.append(divEl2Modal)
    sectionMenusEl.append(divEl2)

    listenToRemoveUser(btnRemoveEl)
    listenToSubmitUser(formUser)

}

function renderBagModal() {

    const divEl3Modal = document.createElement('div')
    divEl3Modal.setAttribute('class', 'modal-3')

    const divHeaderEl = document.createElement('div')
    divHeaderEl.setAttribute('class', 'header-bag')

    const divModalWrapper = document.createElement('div')
    divModalWrapper.setAttribute('class', 'modal-wrapper-3')

    const h3El = document.createElement('h3')
    h3El.textContent = 'Bag'
    divHeaderEl.append(h3El)

    const divItemEl = document.createElement('div')
    divItemEl.setAttribute('class', 'item-bag') 

    const imgEl = document.createElement('img')
    imgEl.setAttribute('src', '')
    imgEl.setAttribute('alt', '')

    const h4El = document.createElement('h4')
    h4El.textContent = 'Name of item'

    const spanEl1 = document.createElement('span')
    spanEl1.setAttribute('class', 'span-1-bag')
    spanEl1.textContent = '$40'

    const spanEl2 = document.createElement('span')
    spanEl2.setAttribute('class', 'span-2-bag')
    spanEl2.textContent = '$21.99'

    const spanEl3 = document.createElement('span')
    spanEl3.setAttribute('class', 'span-3-bag')
    spanEl3.textContent = '(x3)'

    const btnRemoveItem = document.createElement('button')
    btnRemoveItem.textContent = 'Remove'

    divItemEl.append(imgEl, h4El, spanEl1, spanEl2, spanEl3, btnRemoveItem)

    const divRemovingEl = document.createElement('div')
    divRemovingEl.setAttribute('class', 'removing-bag')

    const btnRemoveModal = document.createElement('button')
    btnRemoveModal.textContent = 'X'

    const btnPay = document.createElement('button')
    btnPay.textContent = 'Pay now ....'

    divRemovingEl.append(btnPay, btnRemoveModal)
    divModalWrapper.append(divHeaderEl, divItemEl, divRemovingEl)
    divEl3Modal.append(divModalWrapper)
    divEl3.append(divEl3Modal)
    sectionMenusEl.append(divEl3)

    listenToRemoveBag(btnRemoveModal)

}
// #endregion

// #region "RENDERING PAGE HTML"
function renderHeader() {

    const headerMenuEl = document.createElement('header')
    headerMenuEl.setAttribute('class', 'header-menu')

    const navEl = document.createElement('nav')
    navEl.setAttribute('class', 'header-nav')

    // #region "CREATING UL HEADER 1"
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
    // #endregion

    // #region "CREATING UL HEADER 2"
    const ulHeader2 = document.createElement('ul')
    ulHeader2.setAttribute('class', 'header-ul-2')

    const liUl2_1 = document.createElement('li')
    const liUl2_2 = document.createElement('li')
    const liUl2_3 = document.createElement('li')

    const btnUl2_1 = document.createElement('button')
    btnUl2_1.setAttribute('href', '#')

    const btnUl2_2 = document.createElement('button')
    btnUl2_2.setAttribute('href', '#')

    const btnUl2_3 = document.createElement('button')
    btnUl2_3.setAttribute('href', '#')

    const imgUl2_1 = document.createElement('img')
    imgUl2_1.setAttribute('src', './assets/icons/search.png')
    imgUl2_1.setAttribute('alt', '')

    const imgUl2_2 = document.createElement('img')
    imgUl2_2.setAttribute('src', './assets/icons/user.png')
    imgUl2_2.setAttribute('alt', '')

    const spanUl2_2 = document.createElement('span')
    spanUl2_2.setAttribute('class', `span-user-login ${state.userShowClass}`)
    spanUl2_2.textContent = state.userName

    const imgUl2_3 = document.createElement('img')
    imgUl2_3.setAttribute('src', './assets/icons/shopping-bag.png')
    imgUl2_3.setAttribute('alt', '')

    btnUl2_1.append(imgUl2_1)
    btnUl2_2.append(imgUl2_2)
    btnUl2_3.append(imgUl2_3)

    liUl2_1.append(btnUl2_1)
    liUl2_2.append(btnUl2_2, spanUl2_2)
    liUl2_3.append(btnUl2_3)

    //event listener holder and calling them
    listenToSearchEvent(btnUl2_1)
    listenToUserEvent(btnUl2_2)
    listenToBagEvent(btnUl2_3)
    spanHolderEl = getSpanEl(spanUl2_2)

    ulHeader2.append(liUl2_1, liUl2_2, liUl2_3)
    // #endregion

    navEl.append(ulHeader1, ulHeader2)
    headerMenuEl.append(navEl)
    sectionMenusEl.append(headerMenuEl)

}

function renderMain(storeArrayParam) {
    
    const mainMenuEl = document.createElement('main')
    mainMenuEl.setAttribute('class', 'main-menu')

    // #region "CREATING THE MAIN HEADER"
    const divEl1 = document.createElement('div')
    divEl1.setAttribute('class', 'main-header')

    const h2El1 = document.createElement('h2')
    h2El1.setAttribute('class', 'h2-main')
    h2El1.textContent = 'Home'

    divEl1.append(h2El1)
    // #endregion

    // #region "CREATING THE CART ITEM IN THE STORE IN DIV"
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

        const btnItemEl = document.createElement('button')
        btnItemEl.textContent = 'Add to bag'

        //now we check if an propery in in the object to see discounted price or not
        if (item.hasOwnProperty('discountedPrice')) {
            divEl3.append(imgEl, h2El2, spanEl1, spanEl2, spanEl3, spanEl4, btnItemEl)
            divEl2.append(divEl3)
        }

        else {
            spanEl1.style.color = '#000'
            spanEl1.style.textDecoration = 'none'

            divEl3.append(imgEl, h2El2, spanEl1, spanEl3, spanEl4, btnItemEl)
            divEl2.append(divEl3)
        }

    }
    // #endregion

    mainMenuEl.append(divEl1, divEl2)
    sectionMenusEl.append(mainMenuEl)

}

function renderFooter() {
    
    const footerMenuEl = document.createElement('footer')
    footerMenuEl.setAttribute('class', 'footer-menu')

    // #region "CREATING UL FOOTER 1"
    const ulFooter1 = document.createElement('ul')
    ulFooter1.setAttribute('class', 'footer-ul-1')

    const liUl1_1 = document.createElement('li')
    liUl1_1.textContent = 'HOLLIXTON'

    ulFooter1.append(liUl1_1)
    // #endregion

    // #region "CREATING UL FOOTER 2"
    const ulFooter2 = document.createElement('ul')
    ulFooter2.setAttribute('class', 'footer-ul-2')

    const liUl2_1 = document.createElement('li')
    liUl2_1.textContent = 'GB'

    const liUl2_2 = document.createElement('li')
    liUl2_2.textContent = 'United Kingdom'

    ulFooter2.append(liUl2_1, liUl2_2)
    // #endregion

    footerMenuEl.append(ulFooter1, ulFooter2)
    sectionMenusEl.append(footerMenuEl)

}
// #endregion

// #region "RENDER AND INIT"
function render() {

    //destroy everything in the html and the page, also destroyd the modals
    sectionMenusEl.innerHTML = ''
    divEl1.innerHTML = ''
    divEl2.innerHTML = ''
    divEl3.innerHTML = ''

    // #region "CONDITIONAL FOR GIRLS CLICKED"
    if (state.girlsClicked === true && state.guysClicked === false && state.salesClicked === false && state.searchClicked === false) {

        const girlsArrayValue = getGirlsFromStateFilter()
        //recreate everything in html every time render is called, basically rerendering
        renderHeader()
        renderMain(girlsArrayValue)
        renderFooter()
        renderSearchModal()
        renderUserModal()
        renderBagModal()

        console.log('Changing here the state from true to false in order to achieve app functionality')
        state.girlsClicked = false

    }
    // #endregion

    // #region "CONDITIONAL FOR NAME SEARCH CLICKED"
    else if (state.girlsClicked === false && state.guysClicked === false && state.salesClicked === false && state.searchClicked === true) {

        let searchArray = searchCatcher

        //recreate everything in html every time render is called, basically rerendering
        renderHeader()
        renderMain(searchArray)
        renderFooter()
        renderSearchModal()
        renderUserModal()
        renderBagModal()

        console.log('Changing here the state from true to false in order to achieve app functionality also search wihtin')
        state.searchClicked = false

    }
    // #endregion

    // #region "CONDITIONAL FOR GUYS CLICKED"
    else if (state.girlsClicked === false && state.guysClicked === true && state.salesClicked === false && state.searchClicked === false) {

        guysArrayValue = getGuysFromStateFilter()
        //recreate everything in html every time render is called, basically rerendering
        renderHeader()
        renderMain(guysArrayValue)
        renderFooter()
        renderSearchModal()
        renderUserModal()
        renderBagModal()

        console.log('Changing here the state from true to false in order to achieve app functionality')
        state.guysClicked = false

    }
    // #endregion

    // #region "CONDITIONAL FOR SALES CLICKED"
    else if (state.girlsClicked === false && state.guysClicked === false && state.salesClicked === true && state.searchClicked === false) {

        salesArrayValue = getSalesFromStateFilter()
        //recreate everything in html every time render is called, basically rerendering
        renderHeader()
        renderMain(salesArrayValue)
        renderFooter()
        renderSearchModal()
        renderUserModal()
        renderBagModal()

        console.log('Changing here the state from true to false in order to achieve app functionality')
        state.salesClicked = false

    }
    // #endregion

    // #region "CONDITIONAL FOR NORMAL RENDERING NO CLICKING FROM STATE"
    else if(state.girlsClicked === false && state.guysClicked === false && state.salesClicked === false && state.searchClicked === false) {
        deffaultArrayValue = getDeffaultLogoFilter()
        //recreate everything in html every time render is called, basically rerendering
        renderHeader()
        renderMain(deffaultArrayValue)
        renderFooter()
        renderSearchModal()
        renderUserModal()
        renderBagModal()
    }
    // #endregion

}

function init() {

    render()

     //FETCHING AND STORING DATA FROM SERVER TO STATE both arrays from json server
    getStoreArrayFromServer().then(function (storeArrayFromServer) {
        state.store = storeArrayFromServer
        render()
    })

    getUsersArrayFromServer().then(function (usersArrayFromServer) {
        state.users = usersArrayFromServer
        render()
    })

}
// #endregion

// #endregion


// #region "-----APP START-----"
init()
// #endregion