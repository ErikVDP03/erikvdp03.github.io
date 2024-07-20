document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Producer: ${item.producer}</p>
            <p>Price: $${item.price}/g</p>
            <p>Type: ${item.type}</p>
            <p>THC: ${item.thc}%</p>
            <p>Pharmacy: ${item.pharmacy}</p>
            <p>Quantity: ${item.quantity}g</p>
        `;

        cartContainer.appendChild(cartItem);
    });
});

function addToCart(product, quantity) {
    const cartItem = { ...product, quantity };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
}
