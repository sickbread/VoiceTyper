document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Language Toggle Logic
    const langToggle = document.getElementById('langToggle');
    const translatableElements = document.querySelectorAll('.t-lang');

    // Check for saved preference
    let currentLang = localStorage.getItem('lava_lang') || 'kr';

    const updateLanguage = (lang, animate = true) => {
        currentLang = lang;
        localStorage.setItem('lava_lang', lang);

        if (langToggle) {
            langToggle.textContent = lang === 'en' ? 'EN / KR' : 'EN / KR';
            // Optional: highlight current lang if button is split, but using single toggle for now
        }

        translatableElements.forEach(el => {
            if (animate) {
                el.classList.add('switching');
                setTimeout(() => {
                    el.textContent = el.getAttribute(`data-${lang}`);
                    el.classList.remove('switching');
                }, 200);
            } else {
                el.textContent = el.getAttribute(`data-${lang}`);
            }
        });
    };

    // Initial load
    updateLanguage(currentLang, false);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const nextLang = currentLang === 'en' ? 'kr' : 'en';
            updateLanguage(nextLang);
        });
    }

    // Simple fade-in animation for cards
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .phi-node, .philosophy-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .feature-card.visible, .phi-node.visible, .philosophy-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
