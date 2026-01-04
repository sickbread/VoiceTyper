document.addEventListener('DOMContentLoaded', () => {
    // Add smooth reveal effect on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .feature-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Credits Toggle Functionality
    const creditsBtn = document.getElementById('credits-toggle');
    const creditsContent = document.getElementById('credits-content');

    if (creditsBtn && creditsContent) {
        creditsBtn.addEventListener('click', () => {
            const isHidden = creditsContent.style.display === 'none';
            creditsContent.style.display = isHidden ? 'block' : 'none';

            // Optional: Smooth scroll to content when opening
            if (isHidden) {
                setTimeout(() => {
                    creditsContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    }
});
