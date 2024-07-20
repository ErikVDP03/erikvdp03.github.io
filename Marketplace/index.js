document.addEventListener('DOMContentLoaded', () => {
    const products = JSON.parse(localStorage.getItem('strains')) || [
        { name: "Peach Cake OG", producer: "madrecan 18/1", price: 12, type: "Hybrid", thc: 18, pharmacy: "West Coast", image: "peach-cake-og.jpg", rating: 4 },
        { name: "Kaleen Magic", producer: "BioBroccoli", price: 18, type: "Sativa", thc: 22, pharmacy: "Herb Depot", image: "kaleen-magic.jpg", rating: 4 },
        { name: "Blue Dream", producer: "Organic Greens", price: 25, type: "Indica", thc: 19, pharmacy: "Green Pharm", image: "blue-dream.jpg", rating: 3 },
        { name: "Northern Broccoli", producer: "Nature's Best", price: 15, type: "Hybrid", thc: 21, pharmacy: "Cannabis World", image: "northern-broccoli.jpg", rating: 4.3 },
        { name: "Purple Haze", producer: "Green Valley", price: 20, type: "Sativa", thc: 23, pharmacy: "Sativa Central", image: "purple-haze.jpg", rating: 4.7 },
        { name: "Frosty Broccoli", producer: "Winter Greens", price: 22, type: "Indica", thc: 20, pharmacy: "Frosty Pharm", image: "frosty-broccoli.jpg", rating: 4.4 },
        { name: "Lemon Skunk", producer: "Citrus Farms", price: 18, type: "Sativa", thc: 22, pharmacy: "Sunny Dispensary", image: "lemon-skunk.jpg", rating: 4.6 },
        { name: "Cherry Pie", producer: "Sweet Treats", price: 20, type: "Hybrid", thc: 19, pharmacy: "Cherry Hill", image: "cherry-pie.jpg", rating: 4.2 },
        { name: "Pineapple Express", producer: "Tropical Farms", price: 25, type: "Sativa", thc: 21, pharmacy: "Island Dispensary", image: "pineapple-express.jpg", rating: 4.9 },
        { name: "OG Kush", producer: "West Coast Greens", price: 30, type: "Indica", thc: 24, pharmacy: "Kush Mart", image: "og-kush.jpg", rating: 4.8 },
        { name: "White Widow", producer: "Snowy Farms", price: 28, type: "Hybrid", thc: 23, pharmacy: "White House", image: "white-widow.jpg", rating: 4.7 },
        { name: "Green Crack", producer: "Energetic Greens", price: 22, type: "Sativa", thc: 20, pharmacy: "Crack House", image: "green-crack.jpg", rating: 4.5 }
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
        const rating = Array.from(starElements).indexOf(starElements[0]);
        starElements.forEach((star, starIndex) => {
            star.classList.toggle('active', starIndex <= rating);
        });
        products[index].rating = rating + 1;
        localStorage.setItem('strains', JSON.stringify(products));
    }
});
