/**
 * Portfolio JavaScript
 * Author: Gowtam Krishnan Garapati
 * 
 * Modules:
 * 1. Navigation
 * 2. Scroll Effects
 * 3. Animations
 * 4. Utilities
 */

(function() {
  'use strict';

  /* ==========================================================================
     DOM Elements
     ========================================================================== */
  
  const DOM = {
    nav: document.querySelector('.nav'),
    navMenu: document.querySelector('.nav__menu'),
    navHamburger: document.querySelector('.nav__hamburger'),
    navLinks: document.querySelectorAll('.nav__link'),
    revealElements: document.querySelectorAll('.reveal'),
    statNumbers: document.querySelectorAll('.stat__number'),
    gradientOrbs: document.querySelectorAll('.gradient-orb')
  };

  /* ==========================================================================
     1. Navigation Module
     ========================================================================== */
  
  const Navigation = {
    init() {
      this.bindEvents();
    },

    bindEvents() {
      // Hamburger menu toggle
      if (DOM.navHamburger) {
        DOM.navHamburger.addEventListener('click', () => this.toggleMenu());
      }

      // Close menu on link click
      DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });

      // Scroll effect for navbar
      window.addEventListener('scroll', () => this.handleScroll());
    },

    toggleMenu() {
      DOM.navMenu.classList.toggle('nav__menu--active');
      DOM.navHamburger.classList.toggle('nav__hamburger--active');
      document.body.style.overflow = DOM.navMenu.classList.contains('nav__menu--active') ? 'hidden' : '';
    },

    closeMenu() {
      DOM.navMenu.classList.remove('nav__menu--active');
      DOM.navHamburger.classList.remove('nav__hamburger--active');
      document.body.style.overflow = '';
    },

    handleScroll() {
      if (window.scrollY > 100) {
        DOM.nav.classList.add('nav--scrolled');
      } else {
        DOM.nav.classList.remove('nav--scrolled');
      }
    }
  };

  /* ==========================================================================
     2. Scroll Effects Module
     ========================================================================== */
  
  const ScrollEffects = {
    statsAnimated: false,

    init() {
      this.bindEvents();
      this.revealOnScroll();
      this.animateStats();
    },

    bindEvents() {
      window.addEventListener('scroll', () => {
        this.revealOnScroll();
        this.animateStats();
      });
    },

    revealOnScroll() {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;

      DOM.revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('reveal--active');
        }
      });
    },

    animateStats() {
      if (this.statsAnimated || DOM.statNumbers.length === 0) return;

      const statsSection = document.querySelector('.about__stats');
      if (!statsSection) return;

      const sectionTop = statsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        this.statsAnimated = true;
        
        DOM.statNumbers.forEach(stat => {
          const target = parseInt(stat.textContent);
          this.countUp(stat, target);
        });
      }
    },

    countUp(element, target) {
      let current = 0;
      const increment = target / 50;
      const duration = 30;

      const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
          element.textContent = target + '+';
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + '+';
        }
      }, duration);
    }
  };

  /* ==========================================================================
     3. Animations Module
     ========================================================================== */
  
  const Animations = {
    init() {
      this.initParallaxOrbs();
    },

    initParallaxOrbs() {
      document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        DOM.gradientOrbs.forEach((orb, index) => {
          const speed = (index + 1) * 20;
          orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
      });
    }
  };

  /* ==========================================================================
     4. Utilities Module
     ========================================================================== */
  
  const Utilities = {
    init() {
      this.initSmoothScroll();
    },

    initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const target = document.querySelector(targetId);
          
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  /* ==========================================================================
     Initialize App
     ========================================================================== */
  
  const App = {
    init() {
      document.addEventListener('DOMContentLoaded', () => {
        Navigation.init();
        ScrollEffects.init();
        Animations.init();
        Utilities.init();
      });
    }
  };

  // Start the application
  App.init();

})();

