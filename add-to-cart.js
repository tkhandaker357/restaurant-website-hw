var cartCount = 0;
var totalPrice = 0.0;
var items = [];

function recalcTotals() {
    cartCount = items.reduce((sum, it) => {
        return sum + (it.qty || 0);
    }, 0);
    totalPrice = items.reduce((sum, it) => {
        return sum + (it.price || 0) * (it.qty || 0);
    }, 0);
}

function addToCart(itemName, itemPrice) {
    itemPrice = Number(itemPrice) || 0;
    const idx = items.findIndex(it => {
        return it.name === itemName;
    });
    if (idx > -1) {
        items[idx].qty = (items[idx].qty || 0) + 1;
    } else {
        items.push({ name: itemName, price: itemPrice, qty: 1 });
    }
    recalcTotals();
    saveCartToStorage();
    updateCartDisplay();
}

function removeFromCart(itemName) {
    const idx = items.findIndex(it => {
        return it.name === itemName;
    });
    if (idx === -1) return;
    // remove one quantity; if qty becomes 0 remove the item entirely
    if ((items[idx].qty || 0) > 1) {
        items[idx].qty -= 1;
    } else {
        items.splice(idx, 1);
    }
    recalcTotals();
    saveCartToStorage();
    updateCartDisplay();
}

function updateCartDisplay() {
    const itemsInCart = document.getElementById('cart-count');
    const priceTotal = document.getElementById('total-price');
    const cartItems = document.getElementById('cart-items');
    if (itemsInCart) {
        itemsInCart.textContent = 'Items in Cart: ' + cartCount;
    }
    if (priceTotal) {
        priceTotal.textContent = 'Total Price: $' + totalPrice.toFixed(2);
    }

    if (cartItems) {
        cartItems.innerHTML = '';
        if (items.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'Your cart is empty.';
            cartItems.appendChild(p);
        } else {
            items.forEach(it => {
                const row = document.createElement('div');
                row.className = 'cart-item';

                const nameEl = document.createElement('span');
                nameEl.className = 'cart-item-name';
                nameEl.textContent = it.name;

                const qtyEl = document.createElement('span');
                qtyEl.className = 'cart-item-qty';
                qtyEl.textContent = ' x' + (it.qty || 0);

                const priceEl = document.createElement('span');
                priceEl.className = 'cart-item-price';
                priceEl.textContent = ' $' + ((it.price || 0) * (it.qty || 0)).toFixed(2);

                const removeBtn = document.createElement('span');
                removeBtn.className = 'remove-item';
                removeBtn.setAttribute('role', 'button');
                removeBtn.setAttribute('tabindex', '0');
                removeBtn.dataset.name = it.name;
                removeBtn.textContent = 'Remove';


                removeBtn.addEventListener('click', function (e) {
                    const name = e.currentTarget.dataset.name;
                    removeFromCart(name);
                });
                removeBtn.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
                        e.preventDefault();
                        e.currentTarget.click();
                    }
                });

                row.appendChild(nameEl);
                row.appendChild(qtyEl);
                row.appendChild(priceEl);
                row.appendChild(removeBtn);
                cartItems.appendChild(row);
            });
        }
    }
    updateCartBadge();
}

// add or remove a small red dot on any <a href="...cart.html"> links when cartCount > 0
function updateCartBadge() {
    try {
        // match links that end with cart.html or contain /cart.html
        const links = Array.from(document.querySelectorAll('a[href$="cart.html"], a[href*="/cart.html"]'));
        links.forEach(a => {
            var badge = a.querySelector('.cart-badge');
            if (cartCount > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'cart-badge';
                    badge.setAttribute('aria-hidden', 'true');
                    a.appendChild(badge);
                }
            } else {
                if (badge) a.removeChild(badge);
            }
        });
    } catch (err) {
        console.warn('Could not update cart badge', err);
    }
}

function saveCartToStorage() {
    // saves data to "restaurantCart" in localStorage
    try {
        const data = { items: items, cartCount: cartCount, totalPrice: totalPrice };
        localStorage.setItem('restaurantCart', JSON.stringify(data));
    } catch (err) {
        console.warn('Could not save cart to localStorage', err);
    }
}

function loadCartFromStorage() {
    try {
        const raw = localStorage.getItem('restaurantCart');
        if (raw) {
            const data = JSON.parse(raw);
            if (Array.isArray(data.items)) items = data.items;
            // recalc totals from items to ensure consistency
            recalcTotals();
            if (typeof data.cartCount === 'number') cartCount = data.cartCount; // optional override
            if (typeof data.totalPrice === 'number') totalPrice = data.totalPrice; // optional override
        }
    } catch (err) {
        console.warn('Could not load cart from localStorage', err);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadCartFromStorage();

    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(function (el) {
        if (!el.hasAttribute('role'))
            el.setAttribute('role', 'button');
        if (!el.hasAttribute('tabindex'))
            el.setAttribute('tabindex', '0');

        el.addEventListener('click', function (e) {
            const name = e.currentTarget.dataset.name;
            const price = parseFloat(e.currentTarget.dataset.price) || 0;
            if (typeof addToCart === 'function') {
                addToCart(name, price);
            } else {
                console.warn('addToCart is not defined', name, price);
            }
        });

        el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space') {
                e.preventDefault();
                e.currentTarget.click();
            }
        });
    });

    updateCartDisplay();
});