// Initialize Lenis Smooth Scroll
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Countdown Timer
const weddingDate = new Date('September 12, 2026 16:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Animations
window.addEventListener('load', () => {
    // Hero Animations
    const tl = gsap.timeline();
    
    tl.from('.fade-in', {
        y: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power3.out'
    });

    // Scroll Animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1
        });
    });

    gsap.utils.toArray('.glass-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.1 // Stagger effect
        });
    });
});

// Drag and Drop Logic
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const galleryPreview = document.getElementById('gallery-preview');

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('preview-img');
                
                // Animate new image in
                gsap.set(img, { scale: 0, opacity: 0 });
                galleryPreview.appendChild(img);
                gsap.to(img, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
            };
            reader.readAsDataURL(file);
        }
    });
}

// RSVP Form (Simple handling)
document.getElementById('rsvp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Sending...';
    
    // Simulate API call
    setTimeout(() => {
        btn.innerText = 'RSVP Sent! 🎉';
        btn.style.backgroundColor = '#27ae60'; // Success green
        
        // Confetti effect (simple CSS/JS or external lib, here just success state)
    }, 1500);
});
