const sectionMenusEl = document.querySelector('section.container-menus')


//------------------------------STATE OBJECT-------------------------------------

const state = {

    items: []

}

//----------------------------END OF STATE OBJECT----------------------------


//----------------------------SERVER FUNCTIONS-------------------------------------


//----------------------------END OF SERVER FUNCTIONS-------------------------------------



//----------------------------RENDER FUNCTIONS-------------------------------------

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

function renderMain() {
    
    const mainMenuEl = document.createElement('main')
    mainMenuEl.setAttribute('class', 'main-menu')

    const divEl1 = document.createElement('div')
    divEl1.setAttribute('class', 'main-header')

    const h2El1 = document.createElement('h2')
    h2El1.setAttribute('class', 'h2-main')
    h2El1.textContent = 'Home'

    const divEl2 = document.createElement('div')
    divEl2.setAttribute('class', 'store-items-wrapper')

    const divEl3 = document.createElement('div')
    divEl3.setAttribute('class', 'store-item')

    const imgEl = document.createElement('img')
    imgEl.setAttribute('src', 'https://img.hollisterco.com/is/image/anf/KIC_359-1220-1911-805_prod1?policy=product-small')
    imgEl.setAttribute('alt', '')

    const h2El2 = document.createElement('h2')
    h2El2.textContent = 'Shirt'

    const spanEl1 = document.createElement('span')
    spanEl1.setAttribute('id', 'span-1')
    spanEl1.textContent = '50$'

    const spanEl2 = document.createElement('span')
    spanEl2.setAttribute('id', 'span-2')
    spanEl2.textContent = '20$'

    divEl3.append(imgEl, h2El2, spanEl1, spanEl2)

    divEl2.append(divEl3)

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

    // sectionMenusEl.innerHTML = ''

    renderHeader()
    renderMain()
    renderFooter()

}

//----------------------------END OF RENDER FUNCTIONS-------------------------------------

render()