// تاریخ شمسی
$(document).ready(function() {
    $('.datepicker').persianDatepicker({
        format: 'YYYY/MM/DD',
        observer: true,
        initialValue: false,
        initialValueType: 'persian',
        autoClose: true,
        position: 'auto',
        minDate: new persianDate().valueOf(),
        maxDate: new persianDate().add('month', 3).valueOf(),
        toolbox: {
            calendarSwitch: {
                enabled: false
            }
        }
    });
});

// تابع محاسبه و نمایش قیمت
function updatePrice() {
    const guestsSelect = document.getElementById('guests');
    const tableTypeSelect = document.getElementById('table-type');
    const basePriceElement = document.querySelector('.base-price');
    const tablePriceElement = document.querySelector('.table-price');
    const totalPriceElement = document.querySelector('.total-price');
    
    // محاسبه هزینه پایه (به ازای هر نفر)
    const guestsCount = parseInt(guestsSelect.value) || 0;
    const basePricePerPerson = 100000; // قیمت پایه هر نفر
    const basePrice = guestsCount * basePricePerPerson;
    
    // محاسبه هزینه میز
    const tablePricePerPerson = parseInt(tableTypeSelect.selectedOptions[0].dataset.price) || 0;
    const tablePrice = guestsCount * tablePricePerPerson;
    
    // محاسبه مجموع
    const totalPrice = basePrice + tablePrice;
    
    // نمایش قیمت‌ها
    basePriceElement.textContent = basePrice.toLocaleString() + ' تومان';
    tablePriceElement.textContent = tablePrice.toLocaleString() + ' تومان';
    totalPriceElement.textContent = totalPrice.toLocaleString() + ' تومان';
    
    // نمایش تخفیف برای اولین رزرو
    if (totalPrice > 0) {
        const isFirstReservation = !localStorage.getItem('hasReservedBefore');
        if (isFirstReservation) {
            const discountElement = document.createElement('div');
            discountElement.className = 'discount-notice';
            discountElement.innerHTML = `
                <span>تخفیف اولین رزرو (10%):</span>
                <span class="discount-amount">${(totalPrice * 0.1).toLocaleString()} تومان</span>
            `;
            
            const priceDetails = document.querySelector('.price-details');
            const existingDiscount = document.querySelector('.discount-notice');
            
            if (!existingDiscount) {
                priceDetails.insertBefore(discountElement, priceDetails.querySelector('.total'));
            }
            
            // به‌روزرسانی قیمت نهایی با تخفیف
            totalPriceElement.textContent = (totalPrice * 0.9).toLocaleString() + ' تومان';
        }
    }
}

// اضافه کردن ایونت لیسنر به فیلدهای تعداد نفرات و نوع میز
document.getElementById('guests').addEventListener('change', updatePrice);
document.getElementById('table-type').addEventListener('change', updatePrice);

// اعتبارسنجی شماره تلفن
document.getElementById('phone').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// فرم رزرو
document.getElementById('reserve-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // جمع‌آوری داده‌های فرم
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        guests: document.getElementById('guests').value,
        tableType: document.getElementById('table-type').value,
        notes: document.getElementById('notes').value
    };
    
    // اعتبارسنجی
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests) {
        alert('لطفا فیلدهای الزامی را پر کنید');
        return;
    }
    
    // نمایش پیام موفقیت
    const successMessage = `
        رزرو میز با موفقیت ثبت شد!
        
        جزئیات رزرو:
        نام: ${formData.name}
        تلفن: ${formData.phone}
        تاریخ: ${formData.date}
        ساعت: ${formData.time}
        تعداد نفرات: ${formData.guests}
        ${formData.tableType ? 'نوع میز: ' + formData.tableType : ''}
        
        کد رهگیری شما: ${Math.floor(100000 + Math.random() * 900000)}
        
        یک پیامک تایید به شماره شما ارسال خواهد شد.
    `;
    
    alert(successMessage);
    
    // ذخیره اطلاعات رزرو
    localStorage.setItem('hasReservedBefore', 'true');
    
    // ریست فرم
    this.reset();
    updatePrice();
    
    // اسکرول به بالای فرم
    window.scrollTo({
        top: document.querySelector('.reservation').offsetTop - 80,
        behavior: 'smooth'
    });
});