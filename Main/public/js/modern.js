let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');

let listCart = document.querySelector('.listCart');

let cart = [];

const stylesData = [
    {
        "id": 1,
        "name": "modern Look",
        "price": 478,
        "image": "../img/modern/modern_land-1.jpg",
    },
    {
        "id": 2,
        "name": "modern Look",
        "price": 560,
        "image": "../img/modern/modern_land-2.jpg",
    },
    {
        "id": 3,
        "name": "modern Look",
        "price": 900,
        "image": "../img/modern/modern_land-3.jpg",
    },
    {
        "id": 4,
        "name": "modern Look",
        "price": 1200,
        "image": "../img/modern/modern_land-4.jpg",
    }




]

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
    displayCart();

});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
    document.getElementById('cartModal').style.display = 'none';
})

function addToCart(style) {
    const existingItem = cart.find(item => item.id === style.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const newItem = {
            id: style.id,
            name: style.name,
            price: style.price,
            image: style.image,
            quantity: 1
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

function displayCart() {
    const storedCart = localStorage.getItem('cart');
    cart = storedCart ? JSON.parse(storedCart) : [];

    const cartList = document.getElementById('cartItems');
    cartList.innerHTML = '';

    cart.forEach(style => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('item');

        const itemImage = document.createElement('img')
        itemImage.src = style.image;
        itemImage.alt = style.name;

        const itemName = document.createElement('div');
        itemName.classList.add('name');
        itemName.textContent = style.name;

        const itemPrice = document.createElement('div');
        itemPrice.classList.add('totalPrice');
        itemPrice.textContent = `$${style.price}`;

        const quantity = document.createElement('div')
        quantity.classList.add('quanity');

        const minusButton = createButton('-', () => {
            handleQuantityChange(style, -1);

        });
        const quantityCounter = document.createElement('span');
        quantityCounter.textContent = style.quantity;

        const plusButton = createButton('+', () => {
            handleQuantityChange(style, 1)
        });

        quantity.appendChild(minusButton);
        quantity.appendChild(quantityCounter);
        quantity.appendChild(plusButton);

        cartItem.appendChild(itemImage);
        cartItem.appendChild(itemName);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(quantity);

        cartList.appendChild(cartItem);
    });

    const totalCost = calculateTotalCost(cart);

    const totalElement = document.createElement('div');
    totalElement.textContent = `Total Cost: $${totalCost}`;
    cartList.appendChild(totalElement);

    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'block';
}

function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
}

function handleQuantityChange(style, change) {
    style.quantity += change;

    if (style.quantity < 1) {
        const index = cart.indexOf(style);
        if (index !== -1) {
            cart.splice(index, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();

    const totalCost = calculateTotalCost();

    const totalElement = document.createElement('div');
    totalElement.classList.add('totalPrice');
    totalElement.textContent = `$${style.price * style.quantity}`

    const cartList = document.getElementById('cartItems');
    const existingTotalElement = cartList.querySelector('.totalPrice');

    if (existingTotalElement) {
        cartList.replaceChild(totalElement, existingTotalElement);
    } else {
        cartList.appendChild(totalElement);
    }


}


createStyleElement(stylesData)