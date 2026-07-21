import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

/* ==========================================================================
   NEXORA CONSTRUCTIONS - PREMIUM INTERACTIONS & DYNAMIC ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. VIDEO SHOWREEL MODAL INTERACTION
  const playBtn = document.getElementById('play-video-btn');
  const videoModal = document.getElementById('video-modal');
  const closeVideoBtn = document.getElementById('close-video-btn');
  const iframePlayer = document.getElementById('showreel-iframe');

  // High-quality drone construction / architecture video showreel (Vimeo)
  const showreelUrl = "https://player.vimeo.com/video/352219760?autoplay=1&muted=0&loop=1";

  const openModal = () => {
    if (videoModal && iframePlayer) {
      iframePlayer.src = showreelUrl;
      videoModal.classList.add('active');
      videoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Stop background page scroll if any
    }
  };

  const closeModal = () => {
    if (videoModal && iframePlayer) {
      videoModal.classList.remove('active');
      videoModal.setAttribute('aria-hidden', 'true');
      iframePlayer.src = ''; // Stop video playback immediately
      document.body.style.overflow = 'hidden'; // Keep standard body overflow
    }
  };

  if (playBtn) playBtn.addEventListener('click', openModal);
  if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeModal);

  // Close modal when clicking on the outside overlay
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeModal();
      }
    });
  }

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
      closeModal();
    }
  });


  // 2. MOBILE HAMBURGER MENU INTERACTION
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu-btn');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  const openMobileMenu = () => {
    if (mobileMenu && menuToggleBtn) {
      mobileMenu.classList.add('active');
      menuToggleBtn.setAttribute('aria-expanded', 'true');
    }
  };

  const closeMobileMenu = () => {
    if (mobileMenu && menuToggleBtn) {
      mobileMenu.classList.remove('active');
      menuToggleBtn.setAttribute('aria-expanded', 'false');
    }
  };

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);

  // Close mobile menu when clicking any nav item link
  mobileNavItems.forEach(item => {
    item.addEventListener('click', closeMobileMenu);
  });


  // 3. SMOOTH SCROLL FOR FOOTER INDICATOR
  const scrollBtn = document.querySelector('.scroll-discover');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      // Since this is a hero-only presentation, we simulate scrolling or scroll slightly
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: 'smooth'
      });
    });
  }


  // 4. SUBTLE MOUSE PARALLAX EFFECT FOR BACKGROUND VIDEO
  const bgOverlay = document.querySelector('.bg-video');

  if (bgOverlay && window.innerWidth > 992) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5; // Normalized range [-0.5, 0.5]
      const mouseY = e.clientY / window.innerHeight - 0.5;

      // Calculate translations (subtle, offset of up to 18px)
      const moveX = mouseX * -18;
      const moveY = mouseY * -18;

      // Apply translation to background video with hardware-acceleration
      // scale(1.08) preserves the sizing buffer to prevent border gaps
      bgOverlay.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.08)`;
    });
  }


  // 5. TESTIMONIALS SLIDER & AUTOPLAY FUNCTIONALITY
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDots = document.querySelectorAll('.pagination-dot');
  const prevTestimonialBtn = document.getElementById('prev-testimonial');
  const nextTestimonialBtn = document.getElementById('next-testimonial');

  let testimonialIndex = 1; // Start with the second card (index 1) as the active/middle card
  let testimonialInterval;
  const autoSwipeDelay = 5000; // 5 seconds: perfect duration to read and transition

  const updateTestimonials = (index) => {
    // Clamp/wrap index
    if (index < 0) {
      testimonialIndex = testimonialCards.length - 1;
    } else if (index >= testimonialCards.length) {
      testimonialIndex = 0;
    } else {
      testimonialIndex = index;
    }

    // Calculate dimensions dynamically for responsive layout translation
    let cardWidth = 0;
    let gap = 0;
    let centerOffset = 0;
    const grid = document.querySelector('.testimonials-grid');
    if (testimonialCards.length > 0) {
      cardWidth = testimonialCards[0].offsetWidth;
      if (grid) {
        const computedStyle = window.getComputedStyle(grid);
        gap = parseFloat(computedStyle.columnGap) || parseFloat(computedStyle.gap) || 0;

        // Centering offset calculation for mobile/tablet horizontal carousel view
        const containerWidth = grid.clientWidth;
        centerOffset = (containerWidth - cardWidth) / 2;
      }
    }
    const step = cardWidth + gap;

    // Set translations and active classes
    testimonialCards.forEach((card, i) => {
      // Clear active class
      card.classList.remove('active-card');

      // Determine visual position index (0: left, 1: middle, 2: right) relative to testimonialIndex
      let positionIndex;
      if (i === testimonialIndex) {
        card.classList.add('active-card');
        positionIndex = 1; // Middle
      } else if (i === (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length) {
        positionIndex = 0; // Left
      } else {
        positionIndex = 2; // Right
      }

      // Translate dynamically on desktop views, and slide horizontally on tablet/mobile views
      if (window.innerWidth > 992) {
        const translation = (positionIndex - i) * step;
        card.style.transform = `translateX(${translation}px)`;
        card.style.opacity = '';
        card.style.zIndex = '';
        if (positionIndex === 1) {
          card.style.transform += ` translateY(-5px)`;
        }
      } else {
        const translation = centerOffset + (positionIndex - 1 - i) * step;
        card.style.transform = `translateX(${translation}px)`;
        if (positionIndex === 1) {
          card.style.transform += ` translateY(-5px) scale(1)`;
          card.style.opacity = '1';
          card.style.zIndex = '3';
        } else {
          card.style.transform += ` translateY(0) scale(0.92)`;
          card.style.opacity = '0.6';
          card.style.zIndex = '1';
        }
      }
    });

    // Update pagination dots
    testimonialDots.forEach((dot, i) => {
      if (i === testimonialIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  const startAutoSwipe = () => {
    stopAutoSwipe();
    testimonialInterval = setInterval(() => {
      updateTestimonials(testimonialIndex + 1);
    }, autoSwipeDelay);
  };

  const stopAutoSwipe = () => {
    if (testimonialInterval) {
      clearInterval(testimonialInterval);
    }
  };

  // Event Listeners for controls
  if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener('click', () => {
      updateTestimonials(testimonialIndex - 1);
      startAutoSwipe(); // Reset timer on manual interaction
    });
  }

  if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener('click', () => {
      updateTestimonials(testimonialIndex + 1);
      startAutoSwipe(); // Reset timer on manual interaction
    });
  }

  testimonialDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      updateTestimonials(idx);
      startAutoSwipe(); // Reset timer on manual interaction
    });
  });

  // Pause autoplay when user hovers over the testimonial grid
  const testimonialGrid = document.querySelector('.testimonials-grid');
  if (testimonialGrid) {
    testimonialGrid.addEventListener('mouseenter', stopAutoSwipe);
    testimonialGrid.addEventListener('mouseleave', startAutoSwipe);
  }

  // Swipe Gestures for Mobile/Tablet
  let touchStartX = 0;
  let touchEndX = 0;

  if (testimonialGrid) {
    testimonialGrid.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSwipe(); // Pause autoplay when swiping starts
    }, { passive: true });

    testimonialGrid.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
      startAutoSwipe(); // Resume autoplay after swiping ends
    }, { passive: true });
  }

  const handleSwipeGesture = () => {
    const swipeThreshold = 50; // Minimum distance to register swipe
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swiped left, show next
      updateTestimonials(testimonialIndex + 1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swiped right, show prev
      updateTestimonials(testimonialIndex - 1);
    }
  };

  // 5B. RESPONSIVE DOM MANAGEMENT FOR 3D CANVAS
  const threeContainer = document.getElementById('house-3d-container');
  const threeCanvas = document.getElementById('threejs-canvas');
  const threeLoader = document.getElementById('threejs-loader');
  const desktopParent = document.querySelector('.contact-3d-column');
  const mobilePlaceholder = document.querySelector('.contact-3d-placeholder-mobile');

  const handleResponsive3D = () => {
    if (!threeContainer) return;
    if (window.innerWidth <= 992) {
      if (mobilePlaceholder && threeContainer.parentElement !== mobilePlaceholder) {
        mobilePlaceholder.appendChild(threeContainer);
      }
    } else {
      if (desktopParent && threeContainer.parentElement !== desktopParent) {
        const quoteBanner = desktopParent.querySelector('.contact-quote-banner');
        if (quoteBanner) {
          desktopParent.insertBefore(threeContainer, quoteBanner);
        } else {
          desktopParent.appendChild(threeContainer);
        }
      }
    }
  };

  // Run immediately on script load
  handleResponsive3D();

  // Recalculate on window resize to ensure responsive translation offsets and DOM positioning
  window.addEventListener('resize', () => {
    handleResponsive3D();
    updateTestimonials(testimonialIndex);
  });

  // Initialize Slider
  updateTestimonials(testimonialIndex);
  startAutoSwipe();


  // ==========================================================================
  // 6. THREE.JS 3D HOUSE MODEL VIEWER
  // ==========================================================================
  if (threeContainer && threeCanvas) {
    let scene, camera, renderer, controls;
    let houseModel = null;
    let housePivot = null; // Pivot helper to rotate exactly in place
    let baseRotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let scrollPercentage = 0;
    let isUserInteracting = false;

    // A. Setup Scene, Camera, and Renderer
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      45,
      threeContainer.clientWidth / threeContainer.clientHeight,
      0.1,
      100
    );
    camera.position.set(7, 0.6, 18); // Ideal cinematic angle to view the house

    renderer = new THREE.WebGLRenderer({
      canvas: threeCanvas,
      alpha: true, // Transparent bg to let Curved Mask show through
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // B. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(12, 18, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 40;

    // Set orthographic shadow camera bounds to fit a typical house size
    const d = 15;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    // Subtle warm point light at the entrance/doorway for rich realism
    const doorwayLight = new THREE.PointLight(0xffaa44, 2.5, 8);
    doorwayLight.position.set(0, 1.2, 2.5);
    scene.add(doorwayLight);

    // C. Orbit Controls
    controls = new OrbitControls(camera, threeCanvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false; // Keep focus on center product view
    controls.enableZoom = false; // Disable zooming as requested
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera going below ground level

    controls.addEventListener('start', () => { isUserInteracting = true; });
    controls.addEventListener('end', () => { isUserInteracting = false; });

    // D. GLB Model Loading
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    loader.load(
      'models/modern_house-optimized.glb',
      (gltf) => {
        houseModel = gltf.scene;

        // Scale down the model slightly so it fits completely within the section container
        houseModel.scale.set(0.45, 0.45, 0.45);

        // Center the loaded GLB model relative to the pivot helper
        const box = new THREE.Box3().setFromObject(houseModel);
        const center = box.getCenter(new THREE.Vector3());

        houseModel.position.sub(center);
        // Slightly lower it inside the pivot
        houseModel.position.y -= 0.25;

        // Traverse model to apply shadows and smooth shading roughness
        houseModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Premium material tuning for rendering architectural textures
            if (child.material) {
              child.material.roughness = Math.max(child.material.roughness, 0.35);
              child.material.metalness = Math.min(child.material.metalness, 0.4);
            }
          }
        });

        // Create pivot group positioned exactly at origin (0, 0, 0)
        housePivot = new THREE.Group();
        housePivot.add(houseModel);
        scene.add(housePivot);

        // Hide loader spinner overlay cleanly with transition
        if (threeLoader) {
          threeLoader.style.opacity = 0;
          setTimeout(() => {
            threeLoader.style.display = 'none';
          }, 500);
        }
      },
      (xhr) => {
        // Update loading progress text
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          const progressText = threeLoader.querySelector('.threejs-loading-text');
          if (progressText) {
            progressText.innerText = `Loading 3D House Model: ${percent}%`;
          }
        }
      },
      (error) => {
        console.error('Error loading 3D GLB model:', error);
        const progressText = threeLoader.querySelector('.threejs-loading-text');
        if (progressText) {
          progressText.innerText = 'Failed to load 3D model. Showing interactive layout...';
        }
      }
    );

    let isCanvasVisible = false;

    // E. Viewport Visibility Check
    const checkCanvasVisibility = () => {
      const rect = threeContainer.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      isCanvasVisible = (rect.top < viewHeight && rect.bottom > 0);
    };

    window.addEventListener('scroll', checkCanvasVisibility);
    // Initialize once on load
    checkCanvasVisibility();

    // H. Hero Section Content Parallax Fade Out
    const heroContent = document.querySelector('.hero-container .main-content');
    const leftSidebar = document.querySelector('.left-sidebar');
    const rightSidebar = document.querySelector('.right-sidebar');

    const handleHeroParallax = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (scrollY <= heroHeight) {
        // Translate elements upwards at different speeds and fade them out
        const translateVal = scrollY * 0.45;
        const opacityVal = 1 - (scrollY / (heroHeight * 0.65));

        if (heroContent) {
          heroContent.style.transform = `translate3d(0, -${translateVal}px, 0)`;
          heroContent.style.opacity = Math.max(0, opacityVal);
        }
        if (leftSidebar) {
          leftSidebar.style.transform = `translate3d(0, -${translateVal * 0.5}px, 0)`;
          leftSidebar.style.opacity = Math.max(0, opacityVal);
        }
        if (rightSidebar) {
          rightSidebar.style.transform = `translate3d(0, -${translateVal * 0.5}px, 0)`;
          rightSidebar.style.opacity = Math.max(0, opacityVal);
        }
      } else {
        // Reset when scrolled past
        if (heroContent) {
          heroContent.style.transform = 'none';
          heroContent.style.opacity = 0;
        }
        if (leftSidebar) {
          leftSidebar.style.transform = 'none';
          leftSidebar.style.opacity = 0;
        }
        if (rightSidebar) {
          rightSidebar.style.transform = 'none';
          rightSidebar.style.opacity = 0;
        }
      }
    };

    window.addEventListener('scroll', handleHeroParallax);
    // Initialize on load in case page starts scrolled
    handleHeroParallax();

    // I. Modern Header Scroll Reveal Effect (Hide on Scroll Down, Show on Scroll Up)
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.main-header');

    const handleHeaderScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle "scrolled" class for background styling
      if (currentScrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleHeaderScroll);
    // Initialize once on load
    handleHeaderScroll();

    // Desktop Nav Items Active Switcher
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
      });
    });

    // F. Resize Event
    window.addEventListener('resize', () => {
      if (threeContainer && camera && renderer) {
        camera.aspect = threeContainer.clientWidth / threeContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
      }
    });

    // G. Animation Rendering Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Only perform rendering & update loops if the canvas is visible in the viewport
      if (!isCanvasVisible) return;

      // Smooth controls damping update
      controls.update();

      if (housePivot) {
        if (!isUserInteracting) {
          // Slow, passive auto-rotation (spins smoothly in place)
          housePivot.rotation.y += 0.0035;
        }
      }

      renderer.render(scene, camera);
    };

    animate();
  }

});
