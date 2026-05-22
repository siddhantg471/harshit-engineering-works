(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  const interactiveSelector = 'a, button, input, select, textarea, [role="button"]';
  const hasFirebase =
    typeof auth !== 'undefined' &&
    typeof db !== 'undefined' &&
    typeof firebase !== 'undefined';

  const elements = {
    currentYear: document.getElementById('currentYear'),
    scrollProgress: document.getElementById('scroll-progress'),
    cursor: document.querySelector('.custom-cursor'),
    cursorDot: document.querySelector('.custom-cursor-dot'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileMenu: document.getElementById('mobileMenu'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    closeMenuBtn: document.getElementById('closeMenuBtn'),
    loginBtn: document.getElementById('loginBtn'),
    mobileLoginBtn: document.getElementById('mobileLoginBtn'),
    dashboardBtn: document.getElementById('dashboardBtn'),
    mobileDashboardBtn: document.getElementById('mobileDashboardBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    mobileLogoutBtn: document.getElementById('mobileLogoutBtn'),
    loginModal: document.getElementById('loginModal'),
    closeLoginModal: document.getElementById('closeLoginModal'),
    registerModal: document.getElementById('registerModal'),
    closeRegisterModal: document.getElementById('closeRegisterModal'),
    dashboardModal: document.getElementById('dashboardModal'),
    closeDashboardModal: document.getElementById('closeDashboardModal'),
    showRegisterBtn: document.getElementById('showRegisterBtn'),
    showLoginBtn: document.getElementById('showLoginBtn'),
    googleLoginBtn: document.getElementById('googleLoginBtn'),
    facebookLoginBtn: document.getElementById('facebookLoginBtn'),
    demoLoginBtn: document.getElementById('demoLoginBtn'),
    emailLoginForm: document.getElementById('emailLoginForm'),
    registerForm: document.getElementById('registerForm'),
    contactForm: document.getElementById('contactForm'),
    testimonialForm: document.getElementById('testimonialForm'),
    dashboardUserName: document.getElementById('dashboardUserName'),
    dashboardUserEmail: document.getElementById('dashboardUserEmail'),
    newQuoteBtn: document.getElementById('newQuoteBtn'),
    supportBtn: document.getElementById('supportBtn'),
    productInterest: document.getElementById('productInterest'),
    messageField: document.getElementById('message'),
    testimonialName: document.getElementById('testimonialName'),
    testimonialCompany: document.getElementById('testimonialCompany'),
    testimonialRating: document.getElementById('testimonialRating'),
    testimonialComment: document.getElementById('testimonialComment'),
    testimonialsList: document.getElementById('testimonialsList'),
    testimonialsFallback: document.getElementById('testimonialsFallback'),
    testimonialFormNote: document.getElementById('testimonialFormNote'),
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterEmail: document.getElementById('newsletterEmail'),
  };

  const modals = [
    elements.loginModal,
    elements.registerModal,
    elements.dashboardModal,
  ].filter(Boolean);

  const state = {
    cursorFrame: 0,
    scrollFrame: 0,
    notificationTimer: 0,
    pointerX: window.innerWidth / 2,
    pointerY: window.innerHeight / 2,
  };

  const productDetails = {
    'internal-mixer': {
      title: 'Internal Rubber Mixer',
      features: [
        'Capacity: 50-500L',
        'Power: 75-500kW',
        'Temperature control: +/-1 C',
        'PLC control system',
        'Safety interlocks',
      ],
    },
    'kneader-mixer': {
      title: 'Kneader Mixer',
      features: [
        'Capacity: 100-1000L',
        'Power: 55-450kW',
        'Sigma blade design',
        'Jacketed mixing chamber',
        'Vacuum capability',
      ],
    },
    'twin-screw-extruder': {
      title: 'Twin-Screw Extruder',
      features: [
        'Screw diameter: 30-150mm',
        'L/D ratio: 24-48',
        'Power: 15-300kW',
        'Modular barrel design',
        'Precision temperature zones',
      ],
    },
    'mixing-mill': {
      title: 'Mixing Mill',
      features: [
        'Roll size options: 16-26 inch',
        'Chilled alloy roll construction',
        'Adjustable friction ratio',
        'Emergency braking system',
        'Stock blender and guides optional',
      ],
    },
    'banbury-mixer': {
      title: 'Banbury Mixer',
      features: [
        'Batch capacity: 35-270L',
        'Tangential or intermeshing rotor options',
        'Advanced temperature and pressure control',
        'High dispersion efficiency for rubber compounds',
        'PLC-based monitoring and safety interlocks',
      ],
    },
    'rubber-calender': {
      title: 'Rubber Calender',
      features: [
        '2, 3, or 4 roll configurations',
        'Precision roll gap adjustment',
        'Uniform sheet thickness control',
        'Temperature-controlled rolls',
        'Coating and laminating support',
      ],
    },
    'batch-off-cooling-line': {
      title: 'Batch Off Cooling Line',
      features: [
        'Dip tank and cooling conveyor',
        'Anti-tack solution application',
        'Festooning and batch stacking options',
        'Variable-speed line synchronization',
        'Compact and continuous operation',
      ],
    },
    'hydraulic-rubber-press': {
      title: 'Hydraulic Rubber Press',
      features: [
        'High-tonnage hydraulic pressing system',
        'Accurate pressure and platen temperature control',
        'Suitable for compression molding and vulcanizing',
        'Rigid frame for stable production cycles',
        'Manual, semi-auto, and auto variants available',
      ],
    },
    'special-purpose-machine': {
      title: 'Special Purpose Machine',
      features: [
        'Custom-built to process-specific requirements',
        'Integration-ready for automation and conveyors',
        'Designed for unique rubber workflow challenges',
        'Flexible tooling and operation layouts',
        'Engineered for precision, safety, and repeatability',
      ],
    },
    'rubber-strainer': {
      title: 'Rubber Strainer',
      features: [
        'Continuous filtration of rubber compounds',
        'Impurity removal before extrusion',
        'High-output screw design',
        'Temperature-controlled barrel',
        'Quick screen change arrangement',
      ],
    },
    'repair-machine': {
      title: 'Repair Machine',
      features: [
        'Heavy-duty repair and rework system',
        'Controlled heating and pressure application',
        'Suitable for damaged rubber components',
        'Consistent patching and restoration quality',
        'Built for low downtime maintenance support',
      ],
    },
    'spare-parts': {
      title: 'Spare Parts',
      features: [
        'Rotors, liners, and chamber parts',
        'Gearbox, couplings, and drive components',
        'Seals, bearings, bushes, and sleeves',
        'Rollers, blades, and wear-resistant elements',
        'OEM replacement and custom fabrication support',
      ],
    },
  };

  function isReducedMotion() {
    return prefersReducedMotion.matches;
  }

  function toggleMobileMenu(shouldOpen) {
    if (!elements.mobileMenu) {
      return;
    }

    elements.mobileMenu.classList.toggle('hidden', !shouldOpen);
    elements.mobileMenu.classList.toggle('block', shouldOpen);
  }

  function closeModal(modal) {
    if (!modal) {
      return;
    }

    modal.classList.add('hidden');
    modal.classList.remove('flex');

    const hasVisibleModal = modals.some((item) => item.classList.contains('flex'));
    if (!hasVisibleModal) {
      document.body.classList.remove('overflow-hidden');
    }
  }

  function openModal(modal) {
    if (!modal) {
      return;
    }

    modals.forEach((item) => {
      if (item !== modal) {
        closeModal(item);
      }
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  }

  function closeAllModals() {
    modals.forEach(closeModal);
  }

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({
      top,
      behavior: isReducedMotion() ? 'auto' : 'smooth',
    });
  }

  function showNotification(message, type = 'info', duration = 5000) {
    document.querySelectorAll('.notification').forEach((notification) => {
      notification.remove();
    });

    const toneClasses = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
      neutral: 'bg-gray-800 text-white',
    };

    const iconClasses = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      info: 'fa-info-circle',
      neutral: 'fa-bell',
    };

    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 max-w-sm rounded-lg p-4 shadow-lg animate-slide-up ${toneClasses[type] || toneClasses.neutral}`;
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');

    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-start';

    const icon = document.createElement('i');
    icon.className = `fas ${iconClasses[type] || iconClasses.neutral} mr-3 mt-1`;

    const content = document.createElement('div');
    content.className = 'flex-1';
    content.innerHTML = message;

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'ml-4 text-white hover:text-gray-200';
    closeButton.setAttribute('aria-label', 'Close notification');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.addEventListener('click', () => notification.remove());

    wrapper.append(icon, content, closeButton);
    notification.appendChild(wrapper);
    document.body.appendChild(notification);

    window.clearTimeout(state.notificationTimer);
    state.notificationTimer = window.setTimeout(() => {
      notification.remove();
    }, duration);
  }

  function updateAuthUi(user) {
    const isLoggedIn = Boolean(user);

    elements.loginBtn?.classList.toggle('hidden', isLoggedIn);
    elements.mobileLoginBtn?.classList.toggle('hidden', isLoggedIn);
    elements.dashboardBtn?.classList.toggle('hidden', !isLoggedIn);
    elements.mobileDashboardBtn?.classList.toggle('hidden', !isLoggedIn);
    elements.logoutBtn?.classList.toggle('hidden', !isLoggedIn);
    elements.mobileLogoutBtn?.classList.toggle('hidden', !isLoggedIn);

    if (isLoggedIn && elements.dashboardUserName && elements.dashboardUserEmail) {
      const displayName = user.displayName || user.email.split('@')[0];
      elements.dashboardUserName.textContent = `Welcome, ${displayName}!`;
      elements.dashboardUserEmail.textContent = user.email;
      
      const avatarImg = document.getElementById('dashboardUserAvatarImg');
      const avatarIcon = document.getElementById('dashboardUserAvatarIcon');
      if (avatarImg && avatarIcon) {
        if (user.photoURL) {
          avatarImg.src = user.photoURL;
          avatarImg.classList.remove('hidden');
          avatarIcon.classList.add('hidden');
        } else {
          avatarImg.classList.add('hidden');
          avatarIcon.classList.remove('hidden');
        }
      }
    }

    if (!isLoggedIn) {
      closeModal(elements.dashboardModal);
    }
  }

  async function updateUserActivity(activity) {
    if (!hasFirebase || !auth.currentUser) {
      return;
    }

    try {
      await db.collection('userActivities').add({
        userId: auth.currentUser.uid,
        activity,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating user activity:', error);
    }
  }


  async function loadDashboardData(user) {
    if (!hasFirebase || !user) return;
    
    try {
      const activeQuotesEl = document.getElementById('activeQuotes');
      const machinesViewedEl = document.getElementById('machinesViewed');
      const supportTicketsEl = document.getElementById('supportTickets');
      const recentActivityContainer = document.getElementById('recentActivityContainer');
      
      // Fetch contact submissions (quotes & support)
      const contactSnap = await db.collection('contactSubmissions').where('userId', '==', user.uid).get();
      let quotesCount = 0;
      let supportCount = 0;
      const contacts = [];
      
      contactSnap.forEach(doc => {
        const data = doc.data();
        if (data.message && data.message.includes('I need support with:')) {
          supportCount++;
          contacts.push({ type: 'support', text: 'Support ticket opened', time: data.timestamp ? data.timestamp.toMillis() : Date.now(), status: data.status || 'Pending' });
        } else {
          quotesCount++;
          contacts.push({ type: 'quote', text: `Quote request sent for ${data.productInterest || 'product'}`, time: data.timestamp ? data.timestamp.toMillis() : Date.now(), status: data.status || 'Pending' });
        }
      });
      
      // Fetch user activities
      const activitySnap = await db.collection('userActivities').where('userId', '==', user.uid).get();
      let viewCount = 0;
      const activities = [];
      
      activitySnap.forEach(doc => {
        const data = doc.data();
        if (data.activity && data.activity.includes('Viewed')) {
          viewCount++;
        }
        activities.push({ type: 'activity', text: data.activity, time: data.timestamp ? data.timestamp.toMillis() : Date.now(), status: '' });
      });
      
      // Update DOM for counters
      if (activeQuotesEl) activeQuotesEl.textContent = quotesCount;
      if (machinesViewedEl) machinesViewedEl.textContent = viewCount;
      if (supportTicketsEl) supportTicketsEl.textContent = supportCount;
      
      // Merge, sort, and display recent activity
      const allActivities = [...contacts, ...activities].sort((a, b) => b.time - a.time).slice(0, 5);
      
      if (recentActivityContainer) {
        if (allActivities.length === 0) {
          recentActivityContainer.innerHTML = '<p class="text-gray-500 text-sm">No recent activity found.</p>';
          return;
        }
        
        recentActivityContainer.innerHTML = allActivities.map(act => {
          const timeAgo = Math.round((Date.now() - act.time) / 1000 / 60); // minutes
          let timeText = timeAgo < 60 ? `${timeAgo} mins ago` : `${Math.round(timeAgo/60)} hours ago`;
          if (timeAgo > 24*60) timeText = `${Math.round(timeAgo/(24*60))} days ago`;
          if (timeAgo < 2) timeText = 'Just now';
          
          let iconClass = 'fas fa-history text-gray-500';
          let iconBg = 'bg-gray-100';
          
          if (act.type === 'quote') {
            iconClass = 'fas fa-file-invoice text-primary';
            iconBg = 'bg-primary bg-opacity-10';
          } else if (act.type === 'activity' && act.text.includes('Viewed')) {
            iconClass = 'fas fa-eye text-secondary';
            iconBg = 'bg-secondary bg-opacity-10';
          } else if (act.type === 'support') {
            iconClass = 'fas fa-headset text-green-500';
            iconBg = 'bg-green-500 bg-opacity-10';
          } else if (act.type === 'activity') {
             iconClass = 'fas fa-check-circle text-blue-500';
             iconBg = 'bg-blue-500 bg-opacity-10';
          }
          
          let statusHtml = '';
          if (act.status) {
            const statusColor = act.status.toLowerCase() === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
            statusHtml = `<span class="${statusColor} text-xs px-2 py-1 rounded-full capitalize">${act.status}</span>`;
          }
          
          return `
            <div class="flex items-center p-3 bg-white dark:bg-slate-800 rounded-lg mb-3">
              <div class="${iconBg} p-2 rounded-full mr-3">
                <i class="${iconClass}"></i>
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900 dark:text-white">${act.text}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">${timeText}</p>
              </div>
              ${statusHtml}
            </div>
          `;
        }).join('');
      }
      
    } catch(err) {
      console.error('Error loading dashboard data:', err);
      if (document.getElementById('recentActivityContainer')) {
         document.getElementById('recentActivityContainer').innerHTML = '<p class="text-red-500 text-sm">Failed to load activity.</p>';
      }
    }
  }

  function setContactMessage(message, productInterest = '') {
    if (elements.productInterest) {
      elements.productInterest.value = productInterest;
    }

    if (elements.messageField) {
      elements.messageField.value = message;
    }

    scrollToSection('contact');
  }

  function setTestimonialFormMessage(message, type = 'neutral') {
    if (!elements.testimonialFormNote) {
      return;
    }

    const toneClasses = {
      success: 'text-green-600',
      error: 'text-red-600',
      neutral: 'text-gray-500',
    };

    elements.testimonialFormNote.className = `text-sm ${toneClasses[type] || toneClasses.neutral}`;
    elements.testimonialFormNote.textContent = message;
  }

  function prefillTestimonialFields(user) {
    if (!user || !elements.testimonialName || elements.testimonialName.value.trim()) {
      return;
    }

    const displayName = user.displayName || user.email?.split('@')[0] || '';
    if (displayName) {
      elements.testimonialName.value = displayName;
    }
  }

  function normalizeRating(value) {
    const rating = Number.parseInt(value, 10);
    if (!Number.isFinite(rating)) {
      return 5;
    }

    return Math.min(Math.max(rating, 1), 5);
  }

  function createTestimonialStars(rating) {
    const wrapper = document.createElement('div');
    wrapper.className = 'text-yellow-400 mr-2';

    for (let index = 0; index < 5; index += 1) {
      const star = document.createElement('i');
      star.className = index < rating ? 'fas fa-star' : 'far fa-star';
      wrapper.appendChild(star);
    }

    return wrapper;
  }

  function createTestimonialCard(testimonial) {
    const name =
      typeof testimonial.name === 'string' && testimonial.name.trim()
        ? testimonial.name.trim()
        : 'Verified Client';
    const company =
      typeof testimonial.company === 'string' && testimonial.company.trim()
        ? testimonial.company.trim()
        : 'Harshit Engineering Works Customer';
    const comment =
      typeof testimonial.comment === 'string' && testimonial.comment.trim()
        ? testimonial.comment.trim()
        : '';
    const rating = normalizeRating(testimonial.rating);
    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('');

    const card = document.createElement('article');
    card.className = 'bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-xl transition animate-slide-up dark:border dark:border-slate-700';

    const starsRow = document.createElement('div');
    starsRow.className = 'flex items-center mb-4';
    starsRow.appendChild(createTestimonialStars(rating));

    const quote = document.createElement('p');
    quote.className = 'text-gray-600 dark:text-gray-300 mb-6';
    quote.textContent = `"${comment}"`;

    const footer = document.createElement('div');
    footer.className = 'flex items-center';

    const avatar = document.createElement('div');
    avatar.className =
      'bg-red-50 dark:bg-primary/20 text-primary w-12 h-12 rounded-full flex items-center justify-center mr-4 font-semibold overflow-hidden shrink-0';
    
    if (testimonial.photoURL) {
      const img = document.createElement('img');
      img.src = testimonial.photoURL;
      img.alt = name;
      img.className = 'w-full h-full object-cover';
      avatar.appendChild(img);
    } else {
      avatar.textContent = initials || 'C';
    }

    const meta = document.createElement('div');

    const author = document.createElement('h4');
    author.className = 'font-semibold text-gray-900 dark:text-white';
    author.textContent = name;

    const companyLine = document.createElement('p');
    companyLine.className = 'text-sm text-gray-500 dark:text-gray-400';
    companyLine.textContent = company;

    meta.append(author, companyLine);
    footer.append(avatar, meta);
    card.append(starsRow, quote, footer);

    return card;
  }

  function renderTestimonials(testimonials) {
    if (!elements.testimonialsList || !elements.testimonialsFallback) {
      return;
    }

    const items = testimonials.filter(
      (testimonial) => typeof testimonial.comment === 'string' && testimonial.comment.trim()
    );

    elements.testimonialsList.replaceChildren();

    if (!items.length) {
      elements.testimonialsList.classList.add('hidden');
      elements.testimonialsFallback.classList.remove('hidden');
      return;
    }

    items.forEach((testimonial) => {
      elements.testimonialsList.appendChild(createTestimonialCard(testimonial));
    });

    elements.testimonialsList.classList.remove('hidden');
    elements.testimonialsFallback.classList.add('hidden');
  }

  function subscribeToTestimonials() {
    if (!hasFirebase || !elements.testimonialsList) {
      return;
    }

    db.collection('testimonials')
      .orderBy('submittedAt', 'desc')
      .limit(6)
      .onSnapshot(
        (snapshot) => {
          const testimonials = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          renderTestimonials(testimonials);
        },
        (error) => {
          console.error('Error loading testimonials:', error);
          renderTestimonials([]);
          setTestimonialFormMessage('Live testimonials could not be loaded right now.', 'error');
        }
      );
  }

  function animateCounter(counter) {
    if (!counter || counter.dataset.animated === 'true') {
      return;
    }

    const target = Number.parseInt(counter.dataset.target || counter.textContent, 10);
    if (!Number.isFinite(target)) {
      return;
    }

    const suffix = counter.dataset.suffix || counter.textContent.replace(/[0-9\s]/g, '');
    counter.dataset.animated = 'true';

    if (isReducedMotion()) {
      counter.textContent = `${target}${suffix}`;
      return;
    }

    const startTime = performance.now();
    const duration = 1200;

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(target * easedProgress)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.animate-count');

    if (!counters.length) {
      return;
    }

    if (isReducedMotion() || typeof IntersectionObserver === 'undefined') {
      counters.forEach(animateCounter);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function initRevealAnimations() {
    const animatedElements = document.querySelectorAll('[data-delay]');

    if (!animatedElements.length) {
      return;
    }

    if (isReducedMotion() || typeof IntersectionObserver === 'undefined') {
      animatedElements.forEach((element) => {
        element.style.animationDelay = '0ms';
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const delay = entry.target.getAttribute('data-delay') || '0';
          entry.target.style.animationDelay = `${delay}ms`;
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    animatedElements.forEach((element) => observer.observe(element));
  }

  function initScrollProgress() {
    if (!elements.scrollProgress) {
      return;
    }

    const render = () => {
      state.scrollFrame = 0;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      elements.scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    const queueRender = () => {
      if (!state.scrollFrame) {
        state.scrollFrame = requestAnimationFrame(render);
      }
    };

    render();
    window.addEventListener('scroll', queueRender, { passive: true });
    window.addEventListener('resize', queueRender, { passive: true });
  }

  function initSmoothScrolling() {
    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) {
        return;
      }

      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      toggleMobileMenu(false);
      scrollToSection(targetId.slice(1));
    });
  }

  function initCustomCursor() {
    if (!elements.cursor || !elements.cursorDot || !finePointer.matches || isReducedMotion()) {
      document.documentElement.classList.remove('has-custom-cursor');
      return;
    }

    document.documentElement.classList.add('has-custom-cursor');

    let ringX = state.pointerX;
    let ringY = state.pointerY;

    const renderCursor = () => {
      state.cursorFrame = 0;
      ringX += (state.pointerX - ringX) * 0.18;
      ringY += (state.pointerY - ringY) * 0.18;

      elements.cursor.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      elements.cursorDot.style.transform = `translate3d(${state.pointerX}px, ${state.pointerY}px, 0) translate(-50%, -50%)`;
      elements.cursor.style.opacity = '1';
      elements.cursorDot.style.opacity = '1';

      if (Math.abs(state.pointerX - ringX) > 0.1 || Math.abs(state.pointerY - ringY) > 0.1) {
        state.cursorFrame = requestAnimationFrame(renderCursor);
      }
    };

    const queueCursorFrame = () => {
      if (!state.cursorFrame) {
        state.cursorFrame = requestAnimationFrame(renderCursor);
      }
    };

    document.addEventListener(
      'pointermove',
      (event) => {
        state.pointerX = event.clientX;
        state.pointerY = event.clientY;
        queueCursorFrame();
      },
      { passive: true }
    );

    document.addEventListener('mouseover', (event) => {
      if (event.target.closest(interactiveSelector)) {
        elements.cursor.classList.add('hovering');
      }
    });

    document.addEventListener('mouseout', (event) => {
      const target = event.target.closest(interactiveSelector);
      const relatedTarget =
        event.relatedTarget && typeof event.relatedTarget.closest === 'function'
          ? event.relatedTarget.closest(interactiveSelector)
          : null;

      if (target && !relatedTarget) {
        elements.cursor.classList.remove('hovering');
      }
    });

    document.addEventListener('mouseleave', () => {
      elements.cursor.style.opacity = '0';
      elements.cursorDot.style.opacity = '0';
    });
  }

  function bindModalControls() {
    elements.mobileMenuBtn?.addEventListener('click', () => toggleMobileMenu(true));
    elements.closeMenuBtn?.addEventListener('click', () => toggleMobileMenu(false));

    elements.loginBtn?.addEventListener('click', () => {
      toggleMobileMenu(false);
      openModal(elements.loginModal);
    });

    elements.mobileLoginBtn?.addEventListener('click', () => {
      toggleMobileMenu(false);
      openModal(elements.loginModal);
    });

    elements.dashboardBtn?.addEventListener('click', () => {
      toggleMobileMenu(false);
      openModal(elements.dashboardModal);
    });

    elements.mobileDashboardBtn?.addEventListener('click', () => {
      toggleMobileMenu(false);
      openModal(elements.dashboardModal);
    });

    elements.closeLoginModal?.addEventListener('click', () => closeModal(elements.loginModal));
    elements.closeRegisterModal?.addEventListener('click', () => closeModal(elements.registerModal));
    elements.closeDashboardModal?.addEventListener('click', () => closeModal(elements.dashboardModal));

    elements.showRegisterBtn?.addEventListener('click', () => openModal(elements.registerModal));
    elements.showLoginBtn?.addEventListener('click', () => openModal(elements.loginModal));

    window.addEventListener('click', (event) => {
      if (modals.includes(event.target)) {
        closeModal(event.target);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        toggleMobileMenu(false);
        closeAllModals();
      }
    });
  }

  function bindDashboardActions() {
    elements.newQuoteBtn?.addEventListener('click', () => {
      closeModal(elements.dashboardModal);
      setContactMessage('I would like to request a quote for:');
      showNotification(
        'Please fill out the contact form with your quote request details.',
        'info'
      );
    });

    elements.supportBtn?.addEventListener('click', () => {
      closeModal(elements.dashboardModal);
      setContactMessage('I need support with:');
      showNotification('Please describe your support request in the message field.', 'info');
    });
  }

  function bindProductDetails() {
    window.showProductDetails = (productId) => {
      const product = productDetails[productId];
      if (!product) {
        return;
      }

      const featureList = product.features.map((feature) => `<li>${feature}</li>`).join('');
      showNotification(
        `
          <strong>${product.title}</strong><br>
          <ul class="mt-2 text-left">${featureList}</ul>
          <p class="mt-2 text-sm font-medium">As per your requirement</p>
          <div class="mt-4">
            <a href="#contact" onclick="window.selectProduct('${productId}');" class="inline-block rounded bg-primary px-4 py-2 text-sm text-white">Request Detailed Specs</a>
          </div>
        `,
        'info',
        8000
      );
      
      if (hasFirebase && typeof auth !== 'undefined' && auth.currentUser) {
        updateUserActivity(`Viewed ${product.title} specifications`);
      }
    };
  }

  function bindFirebaseActions() {
    if (!hasFirebase) {
      console.warn('Firebase SDK is unavailable. Auth and contact actions are disabled.');

      const unavailable = (event) => {
        event.preventDefault();
        showNotification('Online services are temporarily unavailable. Please try again shortly.', 'error');
      };

      elements.emailLoginForm?.addEventListener('submit', unavailable);
      elements.registerForm?.addEventListener('submit', unavailable);
      elements.contactForm?.addEventListener('submit', unavailable);
      elements.testimonialForm?.addEventListener('submit', unavailable);
      elements.newsletterForm?.addEventListener('submit', unavailable);
      elements.googleLoginBtn?.addEventListener('click', unavailable);
      elements.facebookLoginBtn?.addEventListener('click', unavailable);
      elements.demoLoginBtn?.addEventListener('click', unavailable);
      elements.logoutBtn?.addEventListener('click', unavailable);
      elements.mobileLogoutBtn?.addEventListener('click', unavailable);
      setTestimonialFormMessage(
        'Live testimonial submissions are temporarily unavailable. Please try again shortly.',
        'error'
      );
      return;
    }

    subscribeToTestimonials();

    auth.onAuthStateChanged((user) => {
      updateAuthUi(user);
      prefillTestimonialFields(user);

      if (user) {
        closeModal(elements.loginModal);
        closeModal(elements.registerModal);
        loadDashboardData(user);
      }
    });

    elements.emailLoginForm?.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('loginEmail')?.value.trim();
      const password = document.getElementById('loginPassword')?.value;

      try {
        await auth.signInWithEmailAndPassword(email, password);
        showNotification('Successfully logged in!', 'success');
      } catch (error) {
        console.error('Login error:', error);
        showNotification(error.message, 'error');
      }
    });

    elements.googleLoginBtn?.addEventListener('click', async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        showNotification('Successfully logged in with Google!', 'success');
      } catch (error) {
        console.error('Google sign in error:', error);
        showNotification(error.message, 'error');
      }
    });

    elements.facebookLoginBtn?.addEventListener('click', async () => {
      try {
        const provider = new firebase.auth.FacebookAuthProvider();
        await auth.signInWithPopup(provider);
        showNotification('Successfully logged in with Facebook!', 'success');
      } catch (error) {
        console.error('Facebook sign in error:', error);
        showNotification(error.message, 'error');
      }
    });

    elements.demoLoginBtn?.addEventListener('click', async () => {
      const demoEmail = 'demo@harshitengineering.com';
      const demoPassword = 'demo123';

      try {
        await auth.signInWithEmailAndPassword(demoEmail, demoPassword);
        showNotification('Welcome to the demo account!', 'success');
      } catch (error) {
        if (error.code !== 'auth/user-not-found') {
          console.error('Demo login error:', error);
          showNotification(error.message, 'error');
          return;
        }

        try {
          const userCredential = await auth.createUserWithEmailAndPassword(demoEmail, demoPassword);
          await userCredential.user.updateProfile({ displayName: 'Demo User' });
          showNotification('Demo account created! Welcome!', 'success');
        } catch (createError) {
          console.error('Demo account creation error:', createError);
          showNotification(createError.message, 'error');
        }
      }
    });

    elements.registerForm?.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('registerName')?.value.trim();
      const company = document.getElementById('registerCompany')?.value.trim();
      const email = document.getElementById('registerEmail')?.value.trim();
      const phone = document.getElementById('registerPhone')?.value.trim();
      const password = document.getElementById('registerPassword')?.value;

      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({ displayName: name });
        await db.collection('users').doc(userCredential.user.uid).set({
          name,
          company,
          email,
          phone,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          role: 'customer',
        });

        showNotification('Account created successfully!', 'success');
        closeModal(elements.registerModal);
      } catch (error) {
        console.error('Registration error:', error);
        showNotification(error.message, 'error');
      }
    });

    const handleLogout = async () => {
      try {
        await auth.signOut();
        showNotification('Successfully logged out', 'info');
        toggleMobileMenu(false);
      } catch (error) {
        console.error('Sign out error:', error);
        showNotification(error.message, 'error');
      }
    };

    elements.logoutBtn?.addEventListener('click', handleLogout);
    elements.mobileLogoutBtn?.addEventListener('click', handleLogout);

    elements.testimonialForm?.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = elements.testimonialName?.value.trim() || '';
      const company = elements.testimonialCompany?.value.trim() || '';
      const comment = elements.testimonialComment?.value.trim() || '';
      const ratingValue = elements.testimonialRating?.value || '';
      const rating = normalizeRating(ratingValue);
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      const userEmail = auth.currentUser ? auth.currentUser.email : null;
      const photoURL = auth.currentUser ? auth.currentUser.photoURL : null;

      if (!name || !company || !comment || !ratingValue) {
        showNotification('Please complete all testimonial fields before submitting.', 'error');
        setTestimonialFormMessage('Please complete all testimonial fields.', 'error');
        return;
      }

      try {
        await db.collection('testimonials').add({
          name,
          company,
          comment,
          rating,
          userId,
          userEmail,
          photoURL,
          submittedAt: Date.now(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          source: 'website',
        });

        elements.testimonialForm.reset();
        prefillTestimonialFields(auth.currentUser);
        showNotification(
          'Thank you! Your testimonial has been submitted and should appear in the testimonials section shortly.',
          'success'
        );
        setTestimonialFormMessage(
          'Thank you for sharing your feedback. Your testimonial should appear above shortly.',
          'success'
        );

        if (auth.currentUser) {
          await updateUserActivity('Testimonial submitted');
        }
      } catch (error) {
        console.error('Error submitting testimonial:', error);
        showNotification(
          'Sorry, there was an error submitting your testimonial. Please try again.',
          'error'
        );
        setTestimonialFormMessage('Unable to submit testimonial right now. Please try again.', 'error');
      }
    });

    elements.contactForm?.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();
      const company = document.getElementById('company')?.value.trim();
      const productInterest = elements.productInterest?.value || '';
      const message = elements.messageField?.value.trim() || '';
      const userId = auth.currentUser ? auth.currentUser.uid : null;

      try {
        await db.collection('contactSubmissions').add({
          name,
          email,
          phone,
          company,
          productInterest,
          message,
          userId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          status: 'new',
        });

        elements.contactForm.reset();
        showNotification('Thank you! Your message has been sent successfully.', 'success');

        if (auth.currentUser) {
          await updateUserActivity('Contact form submitted');
        }
      } catch (error) {
        console.error('Error submitting contact form:', error);
        showNotification(
          'Sorry, there was an error sending your message. Please try again.',
          'error'
        );
      }
    });

    elements.newsletterForm?.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = elements.newsletterEmail?.value.trim();
      if (!email) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }

      try {
        await db.collection('newsletterSubscribers').add({
          email,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          source: 'website footer',
        });

        elements.newsletterForm.reset();
        showNotification('Successfully subscribed to the newsletter!', 'success');
        
        if (auth.currentUser) {
          await updateUserActivity('Subscribed to newsletter');
        }
      } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        showNotification('Sorry, there was an error. Please try again.', 'error');
      }
    });
  }

  function bindThemeToggle() {
    const toggleTheme = () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      }
    };

    elements.themeToggleBtn?.addEventListener('click', toggleTheme);
  }

  function init() {
    if (elements.currentYear) {
      elements.currentYear.textContent = new Date().getFullYear();
    }

    bindModalControls();
    bindThemeToggle();
    bindDashboardActions();
    bindProductDetails();
    bindFirebaseActions();
    initCounters();
    initRevealAnimations();
    initScrollProgress();
    initSmoothScrolling();
    initCustomCursor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
