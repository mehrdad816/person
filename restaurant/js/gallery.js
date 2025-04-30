// فیلتر تصاویر گالری
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // حذف کلاس active از همه دکمه‌ها
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // اضافه کردن کلاس active به دکمه انتخاب شده
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // نمایش تصاویر بر اساس فیلتر
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// مودال نمایش تصویر
const modal = document.querySelector('.image-modal');
const modalImg = document.querySelector('.modal-image');
const modalCaption = document.querySelector('.image-caption h3');
const modalDesc = document.querySelector('.image-caption p');
const closeModal = document.querySelector('.close-modal');
const galleryOverlays = document.querySelectorAll('.gallery-overlay');

galleryOverlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        const imgSrc = overlay.parentElement.querySelector('img').src;
        const imgTitle = overlay.querySelector('h3').textContent;
        const imgDesc = overlay.querySelector('p').textContent;
        
        modal.style.display = 'block';
        modalImg.src = imgSrc;
        modalCaption.textContent = imgTitle;
        modalDesc.textContent = imgDesc;
        
        // غیرفعال کردن اسکرول صفحه هنگام نمایش مودال
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// بستن مودال با کلید ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});