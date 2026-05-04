document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
    });

    // Mobile Navigation
    const mobileToggle = document.getElementById('mobile-toggle');
    const nav = document.querySelector('.nav');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-list a');

    function openMenu() {
        mobileToggle.classList.add('active');
        nav.classList.add('active');
        header.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileToggle.classList.remove('active');
        nav.classList.remove('active');
        header.classList.remove('menu-open');
        document.body.style.overflow = '';
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle) closeMenu();
        });
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Close all open FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });

            // Open the clicked one if it wasn't active
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Form Interactions
    const form = document.getElementById('quote-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Processing...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.innerHTML = 'Inquiry Sent <i class="fas fa-check"></i>';
                btn.style.backgroundColor = '#111';
                btn.style.opacity = '1';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                }, 4000);
            }, 1500);
        });
    }
});
