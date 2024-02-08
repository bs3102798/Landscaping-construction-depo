let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');

let listCart = document.querySelector('.listCart');

let cart = [];

const stylesData = [
    {
        "id": 1,
        "name": "modern Look",
        "price": 90,
        "image": "../img/tropical/tropical_1.jpg",
    },
    {
        "id": 2,
        "name": "modern Look",
        "price": 90,
        "image": "../img/tropical/tropical_2.jpg",
    },
    {
        "id": 3,
        "name": "modern Look",
        "price": 90,
        "image": "../img/tropical/tropical_3.jpg",
    },
    {
        "id": 4,
        "name": "modern Look",
        "price": 90,
        "image": "../img/tropical/tropical_4.jpg",
    }

]

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');

});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
    document.getElementById('cartModal').style.display = 'none';
});

function addToCart(style) {
    const existingItem = cart.find(item => item.id === style.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const newItem = {
            id: style.id,
            name: style.name,
            price: style.price,
            image: style.image
        };
        cart.push(newItem)
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(`style ${style.name} has been added to cart`);
    console.log('Updated Cart', cart);

}

function calculateTotalCost() {
    let totalCost = 0;
    cart.forEach(style => {
        totalCost += style.price * style.quantity;
    });

    return totalCost
}

function createStyleElement(style) {
    const stylesContainer = document.getElementById('modern');

    style.forEach(style => {
        const styleDiv = document.createElement('div');
        styleDiv.classList.add('style');

        const nameElement = document.createElement('h3');
        nameElement.textContent = style.name;

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: $${style.price}`;

        const imageElement = document.createElement('img');
        imageElement.src = style.image;
        imageElement.alt = style.name;

        const buttonElement = document.createElement('button')
        buttonElement.textContent = `AddToCart ${style.id}`;

        buttonElement.addEventListener('click', () => {
            addToCart(style);
        })


        styleDiv.appendChild(imageElement);
        styleDiv.appendChild(nameElement);
        styleDiv.appendChild(priceElement);
        styleDiv.appendChild(buttonElement);


        stylesContainer.appendChild(styleDiv);

    })
}


createStyleElement(stylesData)

