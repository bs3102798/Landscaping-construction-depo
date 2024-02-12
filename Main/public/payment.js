document.addEventListener('DOMContentLoaded', function () {
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];

    displayCartOnPaymentPage(cart);

});

function displayCartOnPaymentPage(cart) {
    const paymentCartContainer = document.getElementById('paymentCart');
    const cartList = document.createElement('ul');

    cart.forEach(style => {
        const cartItem = document.createElement('li');
        const itemImage = document.createElement('img');

        itemImage.src = style.image;
        itemImage.alt = style.name;
        itemImage.classList.add('paymentItemImage')
        cartItem.appendChild(itemImage);

        const itemDetails = document.createElement('div');
        itemDetails.textContent = `${style.name} - Quantity: ${style.quantity} - Price: $${style.price * style.quantity}`;
        cartItem.appendChild(itemDetails);

        cartList.appendChild(cartItem);

    });

    const totalCost = calculateTotalCost(cart);

    const totalElement = document.createElement('div');
    totalElement.textContent = `Total Cost $${totalCost}`;

    paymentCartContainer.appendChild(cartList);
    paymentCartContainer.appendChild(totalElement);
}

function calculateTotalCost(cart) {
    let totalCost = 0;
    cart.forEach(style => {
        totalCost += style.price * style.quantity;
    });
    return totalCost
}

