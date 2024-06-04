function goBack() {
    window.history.back();
}

function navigate() {
    window.location.href = 'index.html';
}

function incrementQuantity(inputId) {
    const input = document.getElementById(inputId);
    input.value = parseInt(input.value) + 1;
    updateSelectedItems(inputId);
}

function decrementQuantity(inputId) {
    const input = document.getElementById(inputId);
    const value = parseInt(input.value);
    if (value > 0) {
        input.value = value - 1;
        updateSelectedItems(inputId);
    }
}

function showCategory(category) {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        const itemCategory = item.dataset.category;
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function initializeCategories() {
    // Hide all items initially
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.style.display = 'none';
    });
    // Show items of the 'all' category by default
    showCategory('all');
}

// Define initial supply for each product
const initialSupply = {
    quantity1: 50, 
    quantity2: 50, 
    quantity3: 50,
    quantity4: 50,
    quantity5: 50,
    quantity6: 50,
    quantity7: 50,
    quantity8: 50,
    quantity9: 50, 
    quantity10: 50, 
    quantity11: 50, 
    quantity12: 50,
    quantity13: 50,
    quantity14: 50,
    quantity15: 50,
    quantity16: 50,
    quantity17: 50,
    quantity18: 50,
    quantity19: 50,
    quantity20: 50,
};

function updateSelectedItems(inputId) {
    const input = document.getElementById(inputId);
    const value = parseInt(input.value);
    const itemIndex = inputId.slice(-1); 

    const listItem = document.createElement('li');
    listItem.textContent = 'Product' + itemIndex + ': ' + value;

    const selectedItemsList = document.getElementById('selected-items-list');
    const existingListItem = document.querySelector(`#selected-items-list li[data-item-index="${itemIndex}"]`);

    if (value === 0 && existingListItem) {
        existingListItem.remove();
    } else if (value > 0 && existingListItem) {
        existingListItem.textContent = 'Product' + itemIndex + ': ' + value;
    } else if (value > 0) {
        listItem.dataset.itemIndex = itemIndex; // Assigning data attribute for easy identification
        selectedItemsList.appendChild(listItem);
    }

    // Update remaining supply
    const remainingSupply = initialSupply[inputId] - value;
    document.getElementById('supply' + itemIndex).textContent = 'Supply: ' + remainingSupply;
}

function placeOrder() {
    // Define an array to hold the prices of each item
    const itemPrices = [10, 40, 18, 29, 40, 56, 73, 26, 43, 33, 31, 45, 67, 200, 180, 110, 14, 19, 25, 23];

    let total = 0;

    // Iterate through all items
    for (let i = 1; i <= itemPrices.length; i++) {
        const quantity = parseInt(document.getElementById('quantity' + i).value);
        total += quantity * itemPrices[i - 1]; // Multiply quantity with the corresponding item price

        // Deduct ordered quantity from the supply
        initialSupply['quantity' + i] -= quantity;
    }

    // Generate receipt
    const receiptItems = [];
    for (let i = 1; i <= itemPrices.length; i++) {
        const quantity = parseInt(document.getElementById('quantity' + i).value);
        if (quantity > 0) {
            receiptItems.push(`Product${i}: ${quantity}`);
        }
    }

    // Apply discount if applicable
    const discountElement = document.querySelector('input[name="discount"]:checked');
    if (discountElement) {
        const discountValue = parseFloat(discountElement.value);
        total = total * (1 - discountValue / 100);
    }

    // Show receipt
alert(`Receipt:\n${receiptItems.join('\n')}\nTotal: $${total.toFixed(2)}`);}
