// Re-initializing the reveal animations for the new editorial layout
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial reveal for items already in view
    document.querySelectorAll('.reveal-up').forEach(el => {
        observer.observe(el);
    });

    // Minimal navbar scroll effect
    const navbar = document.querySelector('.nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = "rgba(252, 252, 252, 0.9)";
                navbar.style.backdropFilter = "blur(10px)";
                navbar.style.borderBottom = "1px solid rgba(0, 0, 0, 0.05)";
                navbar.style.padding = "20px 0";
            } else {
                navbar.style.background = "transparent";
                navbar.style.backdropFilter = "none";
                navbar.style.borderBottom = "none";
                navbar.style.padding = "40px 0";
            }
        });
    }
});
