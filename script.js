function toggleMenu() {
    const nav = document.querySelector('header nav .nav-links');
    nav.classList.toggle('show');
}

document.querySelector('.reserve-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your reservation! We will contact you soon.');
    this.reset();
});

let cartCount = 0;
const addButtons = document.querySelectorAll('.menu-item button');

addButtons.forEach(button => {
    button.addEventListener('click', function() {
        cartCount++;
        alert(`Item added to cart! Total items: ${cartCount}`);
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 20px';
    } else {
        header.style.padding = '20px';
    }
});

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.menu-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
    observer.observe(item);
});