// منوی موبایل
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBtn.classList.toggle('fa-times');
});

// بستن منو هنگام کلیک روی لینک
document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuBtn.classList.remove('fa-times');
    });
});

// اسکرول نرم برای لینک‌ها
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// تغییر هدر هنگام اسکرول
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// انیمیشن اسکرول
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.menu-item, .about-img, .gallery-item, .review');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// تنظیم اولیه برای انیمیشن‌ها
document.querySelectorAll('.menu-item, .about-img, .gallery-item, .review').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// اسلایدر نظرات
let currentReview = 0;
const reviews = document.querySelectorAll('.review');
const totalReviews = reviews.length;

setInterval(() => {
    reviews[currentReview].classList.remove('active');
    currentReview = (currentReview + 1) % totalReviews;
    reviews[currentReview].classList.add('active');
}, 5000);