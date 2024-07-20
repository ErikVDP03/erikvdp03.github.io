document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: "Punch Cake OG", producer: "madrecan 18/1", price: 12, type: "Hybrid", thc: getRandomThc(), pharmacy: "Jiroo", image: "https://cbddiscounter.de/wp-content/uploads/2022/07/cbd-blueten-dr-lemon-spoon.jpg", rating: 0 },
        { name: "Green Magic", producer: "BioBroccoli", price: 18, type: "Sativa", thc: getRandomThc(), pharmacy: "Sanvivo Apotheke", image: "https://cannabis-shop.web.app/_flower-1.png", rating: 0 },
        { name: "Blue Dream", producer: "Organic Greens", price: 25, type: "Indica", thc: getRandomThc(), pharmacy: "Einhorn-Apotheke", image: "https://cbddiscounter.de/wp-content/uploads/2022/07/cbd-blueten-dr-lemon-spoon.jpg", rating: 0 },
        { name: "Golden Broccoli", producer: "Nature's Best", price: 15, type: "Hybrid", thc: getRandomThc(), pharmacy: "Jiroo", image: "https://cannabis-shop.web.app/_flower-1.png", rating: 0 },
        { name: "Purple Haze", producer: "Green Valley", price: 20, type: "Sativa", thc: getRandomThc(), pharmacy: "Sanvivo Apotheke", image: "https://cbddiscounter.de/wp-content/uploads/2022/07/cbd-blueten-dr-lemon-spoon.jpg", rating: 0 },
        { name: "Frosty Broccoli", producer: "Winter Greens", price: 22, type: "Indica", thc: getRandomThc(), pharmacy: "Einhorn-Apotheke", image: "https://cannabis-shop.web.app/_flower-1.png", rating: 0 },
        // Add remaining products...
    ];

    const productGrid = document.querySelector('.product-grid');

    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <p><strong>${product.name}</strong></p>
                <p>Producer: ${product.producer}</p>
                <p>Price: $${product.price}/g</p>
                <p>Type: ${product.type}</p>
                <p>THC: ${product.thc}%</p>
                <p>Pharmacy: ${product.pharmacy}</p>
                <input type="number" min="5" max="100" value="5">
                <button class="cart-button">Add to Cart 🛒</button>
            </div>
            <div class="star-rating" data-index="${index}">
                ${createStarElements(product.rating)}
            </div>
        `;

        productGrid.appendChild(productElement);
    });

    document.querySelectorAll('.star-rating span').forEach((star, index) => {
        star.addEventListener('click', () => rateProduct(index));
    });

    document.querySelectorAll('.cart-button').forEach((button, index) => {
        button.addEventListener('click', () => {
            const product = products[index];
            const quantity = parseInt(button.previousElementSibling.value);
            addToCart(product, quantity);
        });
    });

    function rateProduct(index) {
        const starElements = document.querySelectorAll(`.star-rating[data-index="${index}"] span`);
        starElements.forEach((star, starIndex) => {
            star.classList.toggle('active', starIndex <= index);
        });
        products[index].rating = index + 1;
    }
});

function getRandomThc() {
    return Math.floor(Math.random() * (34 - 8 + 1)) + 8;
}

function createStarElements(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += `<span class="${i < rating ? 'active' : ''}">★</span>`;
    }
    return stars;
}

let cart = [];

function addToCart(product, quantity) {
    const cartItem = { ...product, quantity };
    cart.push(cartItem);
    alert('Added to cart');
}

function viewCart() {
    window.location.href = 'cart.html';
}

function viewAccount() {
    window.location.href = 'account.html';
}

function searchStrains() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const name = product.querySelector('.product-details p strong').textContent.toLowerCase();
        product.style.display = name.startsWith(searchQuery) ? '' : 'none';
    });
}

function filterStrains() {
    const filter = document.getElementById('filter').value;
    const pharmacy = document.getElementById('pharmacy').value;
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const type = product.querySelector('.product-details p:nth-of-type(4)').textContent.split(': ')[1];
        const productPharmacy = product.querySelector('.product-details p:nth-of-type(6)').textContent.split(': ')[1];
        const typeMatch = filter === 'All' || type === filter;
        const pharmacyMatch = pharmacy === 'All' || productPharmacy === pharmacy;

        product.style.display = typeMatch && pharmacyMatch ? '' : 'none';
    });
}

function sortStrains() {
    const sort = document.getElementById('sort').value;
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(document.querySelectorAll('.product'));

    products.sort((a, b) => {
        if (sort === 'price') {
            const priceA = parseFloat(a.querySelector('.product-details p:nth-of-type(3)').textContent.split('$')[1]);
            const priceB = parseFloat(b.querySelector('.product-details p:nth-of-type(3)').textContent.split('$')[1]);
            return priceA - priceB;
        } else if (sort === 'reviews') {
            const ratingA = parseInt(a.querySelector('.star-rating').getAttribute('data-index'));
            const ratingB = parseInt(b.querySelector('.star-rating').getAttribute('data-index'));
            return ratingB - ratingA;
        } else if (sort === 'thc') {
            const thcA = parseFloat(a.querySelector('.product-details p:nth-of-type(5)').textContent.split('%')[0]);
            const thcB = parseFloat(b.querySelector('.product-details p:nth-of-type(5)').textContent.split('%')[0]);
            return thcB - thcA;
        }
    });

    products.forEach(product => productGrid.appendChild(product));
}
