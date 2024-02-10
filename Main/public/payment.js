document.addEventListener('DOMContentLoaded', function () {
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];

    displayCartOnPaymentPage(cart);

});

function displayCartOnPaymentPage(cart) {
    const paymentCartContainer = document.getElementById('paymentCart');
    const cartList = document.createElement('ul');

    cart.forEach(style => {

    })
}