// تب‌های منو
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // حذف کلاس active از همه تب‌ها
        tabBtns.forEach(btn => btn.classList.remove('active'));
        // اضافه کردن کلاس active به تب انتخاب شده
        btn.classList.add('active');
        
        // پنهان کردن همه دسته‌بندی‌ها
        menuCategories.forEach(category => category.classList.remove('active'));
        // نمایش دسته‌بندی انتخاب شده
        const categoryId = btn.getAttribute('data-category');
        document.getElementById(categoryId).classList.add('active');
    });
});

// سبد خرید
const cartBtn = document.querySelector('.cart-btn');
const closeCart = document.querySelector('.close-cart');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');

let cart = [];

// باز و بسته کردن سبد خرید
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// افزودن آیتم به سبد خرید
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const menuItem = btn.closest('.menu-item');
        const itemName = menuItem.querySelector('h4').textContent;
        const itemDesc = menuItem.querySelector('p').textContent;
        const itemPrice = parseInt(menuItem.querySelector('.item-price').textContent.replace(/,/g, ''));
        
        // بررسی وجود آیتم در سبد خرید
        const existingItem = cart.find(item => item.name === itemName);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: itemName,
                description: itemDesc,
                price: itemPrice,
                quantity: 1
            });
        }
        
        updateCart();
        
        // نمایش سبد خرید
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        
        // انیمیشن افزودن به سبد
        btn.textContent = '✓';
        btn.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            btn.textContent = '+';
            btn.style.backgroundColor = '';
        }, 1000);
    });
});

// آپدیت سبد خرید
function updateCart() {
    cartItemsContainer.innerHTML = '';
    
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <span>${item.quantity} × ${item.price.toLocaleString()} تومان</span>
            </div>
            <div class="cart-item-price">${(item.price * item.quantity).toLocaleString()} تومان</div>
            <button class="cart-item-remove" data-index="${index}"><i class="fas fa-trash"></i></button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // نمایش مجموع قیمت
    totalPriceElement.innerHTML = `${totalPrice.toLocaleString()} <span>تومان</span>`;
    
    // اضافه کردن ایونت به دکمه‌های حذف
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// تکمیل سفارش
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('سبد خرید شما خالی است!');
        return;
    }
    
    const orderDetails = cart.map(item => 
        `${item.name} (${item.quantity} عدد) - ${(item.price * item.quantity).toLocaleString()} تومان`
    ).join('\n');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    alert(`سفارش شما با موفقیت ثبت شد!\n\n${orderDetails}\n\nمجموع: ${total.toLocaleString()} تومان`);
    
    // خالی کردن سبد خرید
    cart = [];
    updateCart();
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});