document.addEventListener('DOMContentLoaded', function () {
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];

    displayCartOnPaymentPage(cart);

})