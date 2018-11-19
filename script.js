    // class CartItem {
    //     name;
    //     quantity;
    //     unitPrice;
    //     totalPrice;
    //
    //     constructor(name, quantity, unitPrice) {
    //         this.name = name;
    //         this.quantity = quantity;
    //         this.unitPrice = unitPrice;
    //         this.totalPrice = quantity * unitPrice;
    //     }
    // }
    const cartElem = document.getElementById('cart');

    const cartItems = {};
    // const cartItem = {
    //     name: 'Product 1',
    //     quantity: 2,
    //     unitPrice: 19.9
    // };
    // cartItems.push(cartItem);
    function addToCart(id, name, unitPrice) {
        if (cartItems[id]) {
            updateQuantity(id, cartItems[id].quantity + 1);
        } else {
            const item = {
                id: id,
                name: name,
                quantity: 1,
                unitPrice: unitPrice
            };
            cartItems[id] = item;
            renderCart();
            // cartElem.appendChild(createCartItemRow(item));
        }
    }

    function createCartItemRow(item) {
        const rowElem = document.createElement('tr');
        rowElem.id = 'cartItem-' + item.id;

        // name
        const nameCellElem = document.createElement('td');
        nameCellElem.innerHTML = item.name;
        rowElem.appendChild(nameCellElem);

        // quantity
        const quantCellElem = document.createElement('td');
        const quantInputElem = document.createElement('input');
        quantInputElem.id = 'cartItem-quantity-' + item.id;
        quantInputElem.type = 'number';
        quantInputElem.min = 1;
        quantInputElem.value = item.quantity;
        quantInputElem.addEventListener('change', (event) => {
            updateQuantity(item.id, parseInt(event.target.value));
        });
        quantCellElem.appendChild(quantInputElem);
        rowElem.appendChild(quantCellElem);

        // price
        const priceCellElem = document.createElement('td');
        priceCellElem.innerHTML = '$' + Math.round((item.unitPrice * item.quantity) * 100) / 100;
        rowElem.appendChild(priceCellElem);

        // actions
        const actionCellElem = document.createElement('td');
        const removeBtnElem = document.createElement('button');
        removeBtnElem.innerHTML = 'Remove';
        removeBtnElem.style = 'border-radius: 5px; font-size: 11px; width: 50px; height: 16px; text-align: center;';
        removeBtnElem.addEventListener('click', () => {
            removeFromCart(item.id);
        });
        actionCellElem.appendChild(removeBtnElem);
        rowElem.appendChild(actionCellElem);
        return rowElem;
    }

    function removeFromCart(itemId) {
        delete cartItems[itemId];
        renderCart();
       
        // const rowElem = document.getElementById('cartItem-' + itemId);
        // if (rowElem) {
        //     cartElem.removeChild(rowElem);
        // }
        // cartElem.removeChild()
        // renderCart();
    }

    function updateQuantity(itemId, quantity) {
        if (cartItems[itemId]) {
            cartItems[itemId].quantity = quantity;
            renderCart();
            // const quantInputElem = document.getElementById('cartItem-quantity-' + itemId);
            // if (quantInputElem) {
            //     quantInputElem.value = quantity;
            // }
        }
    }

    function checkout(btnElem) {
        
            btnElem.value = '... Sending your order';
            btnElem.disabled = true;
    }

    function renderCart() {
        cartElem.innerHTML = '';
        for (let id in cartItems) {
            cartElem.appendChild(createCartItemRow(cartItems[id]));
        }
    }
