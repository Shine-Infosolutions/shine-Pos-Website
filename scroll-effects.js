// Scroll Animation JavaScript

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-left, .slide-right, .scale-up, .rotate-in, .bounce-in, .stagger-item'
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(5px)';
      }
    });
  }

  // Parallax effect for hero sections
  const parallaxElements = document.querySelectorAll('.parallax-section');
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      parallaxElements.forEach(element => {
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  // Progress bar on scroll
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #007bff, #0056b3);
    z-index: 9999;
    transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

});

// Additional scroll effects
function addScrollEffects() {
  // Add classes to existing elements for animations
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    if (index % 2 === 0) {
      section.classList.add('fade-in');
    } else {
      section.classList.add('slide-left');
    }
  });

  // Add stagger effect to feature cards
  const featureCards = document.querySelectorAll('.feature-card, .service-card, .pricing-card');
  featureCards.forEach(card => {
    card.classList.add('stagger-item');
  });

  // Add bounce effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'transform 0.3s ease';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

document.getElementById("year").innerHTML = new Date().getFullYear();

// Call the function to add effects
addScrollEffects();