// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const spans = mobileMenuBtn.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : '';
  spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : '';
});

// Form Submission Handlers
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you! Your submission has been received.');
    form.reset();
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Add animation to sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.6s ease-out';
  observer.observe(section);
});

// Service Cards Hover Effect
document.querySelectorAll('.service-card, .job-card, .category-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Location and Worker Finding functionality
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>

// Load location animation data
const locationAnimationData = {
    "v": "5.7.4",
    "fr": 30,
    "ip": 0,
    "op": 60,
    "w": 200,
    "h": 200,
    "nm": "Location Animation",
    "ddd": 0,
    "assets": [],
    "layers": [
        {
            "ddd": 0,
            "ind": 1,
            "ty": 4,
            "nm": "Pin",
            "sr": 1,
            "ks": {
                "o": { "a": 0, "k": 100 },
                "p": { "a": 1, "k": [
                    { "t": 0, "s": [100, 100], "h": 1 },
                    { "t": 30, "s": [100, 90], "h": 1 },
                    { "t": 60, "s": [100, 100], "h": 1 }
                ]},
                "a": { "a": 0, "k": [0, 0, 0] },
                "s": { "a": 0, "k": [100, 100, 100] }
            },
            "shapes": [
                {
                    "ty": "gr",
                    "it": [
                        {
                            "ty": "rc",
                            "d": 1,
                            "s": { "a": 0, "k": [40, 60] },
                            "p": { "a": 0, "k": [0, 0] },
                            "r": { "a": 0, "k": 20 }
                        },
                        {
                            "ty": "fl",
                            "c": { "a": 0, "k": [0.145, 0.388, 0.847, 1] }
                        }
                    ]
                }
            ]
        }
    ]
};

// Initialize location modal and animation
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('locationModal');
    const allowBtn = document.getElementById('allowLocation');
    const denyBtn = document.getElementById('denyLocation');
    const animationContainer = document.getElementById('locationAnimation');

    if (animationContainer) {
        const anim = lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: locationAnimationData
        });
    }

    // Handle category card clicks
    document.querySelectorAll('.category-card').forEach(card => {
        const findButton = card.querySelector('.btn-primary');
        if (findButton) {
            findButton.addEventListener('click', (e) => {
                e.preventDefault();
                const profession = card.dataset.profession;
                if (modal) modal.classList.add('active');
            });
        }
    });

    // Handle location permission
    if (allowBtn) {
        allowBtn.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
            requestLocation();
        });
    }

    if (denyBtn) {
        denyBtn.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
        });
    }
});

// Function to request location
function requestLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Show loading animation
                const loadingOverlay = document.createElement('div');
                loadingOverlay.className = 'loading-overlay active';
                loadingOverlay.innerHTML = '<div class="animation-container"></div>';
                document.body.appendChild(loadingOverlay);

                // Simulate finding workers (replace with actual API call)
                setTimeout(() => {
                    loadingOverlay.remove();
                    alert('Workers found in your area! We\'ll connect you with them shortly.');
                }, 2000);
            },
            (error) => {
                alert('Unable to access location. Please try again or enter your location manually.');
            }
        );
    } else {
        alert('Location services are not available in your browser.');
    }
}



