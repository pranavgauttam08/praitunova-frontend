
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import './globals.css';
import { API_BASE_URL } from '../lib/api';

// ── Service Modal Data ──────────────────────────────────────────────────────
const SERVICE_DATA = {
  'software-dev': {
    icon: '💻', tag: 'IT Services', title: 'Software Development',
    body: '<p>At Praitunova Infotech, we architect and deliver <strong>custom enterprise software</strong> that solves your most complex business challenges.</p><ul><li>Custom ERP, CRM, and HRMS platforms built from the ground up</li><li>Scalable microservices architectures with API-first design</li><li>Legacy system modernisation and re-engineering</li><li>Agile development with 2-week sprint cycles</li><li>Post-deployment support, SLAs, and continuous improvement</li></ul>'
  },
  'web-dev': {
    icon: '🌐', tag: 'IT Services', title: 'Web Development',
    body: '<p>We build <strong>high-performance, enterprise-grade web applications</strong> that are fast, secure, and beautifully designed.</p><ul><li>React, Next.js, Angular &amp; Vue.js frontends</li><li>Headless CMS and e-commerce platforms</li><li>Progressive Web Apps (PWA)</li><li>Core Web Vitals &amp; SEO optimised</li><li>WCAG 2.1 AA accessible interfaces</li></ul>'
  },
  'mobile-dev': {
    icon: '📱', tag: 'IT Services', title: 'Mobile App Development',
    body: '<p>We build <strong>cross-platform and native mobile applications</strong> for iOS and Android.</p><ul><li>React Native &amp; Flutter cross-platform apps</li><li>Native Swift (iOS) and Kotlin (Android)</li><li>Offline-first architecture with sync</li><li>Push notifications, biometric auth, payment integration</li><li>App Store &amp; Play Store submission</li></ul>'
  },
  'enterprise-apps': {
    icon: '🏢', tag: 'IT Services', title: 'Enterprise Applications',
    body: '<p>We build <strong>mission-critical enterprise platforms</strong> engineered for high availability and scale.</p><ul><li>Custom ERP, supply chain, and operations systems</li><li>Multi-tenant SaaS platforms with RBAC</li><li>Real-time dashboards and workflow automation</li><li>Integration with SAP, Oracle, Salesforce</li><li>99.9% uptime SLA with disaster recovery</li></ul>'
  },
  'cloud': {
    icon: '☁️', tag: 'IT Services', title: 'Cloud Solutions',
    body: '<p>We help enterprises <strong>migrate, modernise, and manage cloud workloads</strong> across AWS, Azure, and GCP.</p><ul><li>Cloud readiness assessment and migration strategy</li><li>Lift-and-shift, re-platforming, re-architecting</li><li>Multi-cloud and hybrid cloud management</li><li>Cloud cost optimisation — avg 30-40% savings</li><li>24/7 monitoring, auto-scaling, incident response</li></ul>'
  },
  'infrastructure': {
    icon: '🏗️', tag: 'IT Services', title: 'IT Infrastructure',
    body: '<p>We design and manage <strong>robust IT infrastructure</strong> that forms the resilient backbone of your enterprise.</p><ul><li>Data centre design, virtualisation (VMware, Hyper-V)</li><li>Network architecture — SD-WAN, LAN/WAN, VPN, firewall</li><li>Storage solutions — SAN, NAS, object storage</li><li>Backup, DR, and high-availability clustering</li><li>Server procurement, provisioning, lifecycle management</li></ul>'
  },
  'cybersec': {
    icon: '🛡️', tag: 'IT Services', title: 'Cyber Security',
    body: '<p>We protect your enterprise with a <strong>comprehensive, layered security programme</strong>.</p><ul><li>VAPT — Vulnerability Assessment &amp; Penetration Testing</li><li>SOC as a Service — 24/7 monitoring</li><li>IAM and Zero Trust implementation</li><li>Compliance — ISO 27001, GDPR, PCI-DSS, HIPAA</li><li>Incident response and forensic investigation</li></ul>'
  },
  'ai': {
    icon: '🤖', tag: 'IT Services', title: 'AI Solutions',
    body: '<p>We integrate <strong>production-ready AI capabilities</strong> into your enterprise workflows.</p><ul><li>LLM integration — OpenAI GPT, Claude, Gemini</li><li>Conversational AI and intelligent chatbots</li><li>Document intelligence — OCR, classification, extraction</li><li>Computer vision for quality control and surveillance</li><li>AI governance and explainability frameworks</li></ul>'
  },
  'ml': {
    icon: '📊', tag: 'IT Services', title: 'Machine Learning',
    body: '<p>We build and deploy <strong>custom machine learning models</strong> that turn data into competitive advantage.</p><ul><li>Demand forecasting and inventory optimisation</li><li>Customer churn prediction and LTV modelling</li><li>Recommendation engines</li><li>Fraud detection and anomaly detection</li><li>MLOps — model versioning, monitoring, retraining</li></ul>'
  },
  'analytics': {
    icon: '📈', tag: 'IT Services', title: 'Data Analytics',
    body: '<p>We transform raw data into <strong>actionable business intelligence</strong>.</p><ul><li>Data warehouse design — Snowflake, BigQuery, Azure Synapse</li><li>ETL/ELT pipelines with dbt, Airflow, Fivetran</li><li>Power BI, Tableau, and Looker dashboards</li><li>Real-time streaming analytics with Kafka and Spark</li><li>Data governance and lineage management</li></ul>'
  },
  'automation': {
    icon: '⚡', tag: 'IT Services', title: 'Automation',
    body: '<p>We help enterprises <strong>eliminate repetitive manual work</strong> through RPA and intelligent automation.</p><ul><li>RPA — UiPath, Automation Anywhere, Blue Prism</li><li>Intelligent Document Processing (IDP)</li><li>BPM with Camunda and custom engines</li><li>ERP/CRM automation — invoicing, HR workflows</li><li>Process mining and optimisation consulting</li></ul>'
  },
  'devops': {
    icon: '🔄', tag: 'IT Services', title: 'DevOps',
    body: '<p>We implement <strong>world-class DevOps practices</strong> to accelerate delivery and improve reliability.</p><ul><li>CI/CD pipelines — Jenkins, GitHub Actions, GitLab CI</li><li>Container orchestration with Docker &amp; Kubernetes</li><li>Infrastructure as Code — Terraform &amp; Ansible</li><li>Observability — Prometheus, Grafana, ELK, Datadog</li><li>Site Reliability Engineering (SRE) practices</li></ul>'
  },
  'digital-transformation': {
    icon: '🚀', tag: 'IT Services', title: 'Digital Transformation',
    body: '<p>We guide enterprises through <strong>end-to-end digital transformation</strong>.</p><ul><li>Digital maturity assessment and roadmap</li><li>Technology stack modernisation</li><li>Change management and adoption programmes</li><li>Customer experience (CX) digitalisation</li><li>Business process re-engineering</li></ul>'
  },
  'qa': {
    icon: '✅', tag: 'IT Services', title: 'QA & Testing',
    body: '<p>We ensure your software is <strong>reliable, secure, and performant</strong>.</p><ul><li>Test strategy, planning, and QA process setup</li><li>Automation — Selenium, Cypress, Playwright, Appium</li><li>Performance &amp; load testing — JMeter, k6, Gatling</li><li>Security testing — DAST, SAST, API security</li><li>Accessibility (WCAG 2.1) and cross-browser testing</li></ul>'
  },
  'consulting': {
    icon: '💼', tag: 'IT Services', title: 'IT Consulting',
    body: '<p>Our <strong>certified enterprise consultants</strong> provide strategic technology advisory.</p><ul><li>Technology strategy and IT roadmap development</li><li>Architecture review and solution design workshops</li><li>Vendor evaluation, RFP management</li><li>IT governance and ITIL process design</li><li>CTO-as-a-Service for scaling companies</li></ul>'
  },
  'erp': {
    icon: '🗂️', tag: 'IT Services', title: 'ERP Solutions',
    body: '<p>We implement and support <strong>enterprise ERP systems</strong> that unify your operations.</p><ul><li>SAP S/4HANA, SAP Business One</li><li>Oracle ERP Cloud and Oracle NetSuite</li><li>Microsoft Dynamics 365 Finance and Supply Chain</li><li>Custom ERP for unique industry requirements</li><li>Data migration and post-go-live support</li></ul>'
  },
  'crm': {
    icon: '🤝', tag: 'IT Services', title: 'CRM Solutions',
    body: '<p>We help businesses <strong>transform customer relationships</strong> through CRM implementation.</p><ul><li>Salesforce Sales Cloud, Service Cloud, Marketing Cloud</li><li>HubSpot CRM setup and workflow automation</li><li>Microsoft Dynamics 365 Sales</li><li>Custom CRM with advanced analytics</li><li>CRM data migration and deduplication</li></ul>'
  },
  'uiux': {
    icon: '🎨', tag: 'IT Services', title: 'UI/UX Design',
    body: '<p>We create <strong>intuitive, beautiful digital experiences</strong> grounded in user research.</p><ul><li>User research, personas, and journey mapping</li><li>Information architecture and wireframing</li><li>High-fidelity prototyping in Figma and Adobe XD</li><li>Design systems and component libraries</li><li>Usability testing and iterative improvement</li></ul>'
  },
  'api': {
    icon: '🔗', tag: 'IT Services', title: 'API Development',
    body: '<p>We design and build <strong>robust, scalable APIs</strong> that connect your systems.</p><ul><li>RESTful API with OpenAPI 3.0 / Swagger docs</li><li>GraphQL API development</li><li>Microservices with event-driven communication</li><li>API gateway — Kong, AWS API Gateway, Azure APIM</li><li>Third-party integration connectors</li></ul>'
  },
  'managed-it': {
    icon: '🖥️', tag: 'IT Services', title: 'Managed IT Services',
    body: '<p>We act as your <strong>dedicated IT department</strong> — proactively managing your environment.</p><ul><li>24/7 infrastructure monitoring with alerting</li><li>Helpdesk support — L1, L2, L3</li><li>Patch management, backup, business continuity</li><li>Network management and endpoint security</li><li>Monthly reporting and SLA management</li></ul>'
  },
  'esg': {
    icon: '🌍', tag: 'Sustainable Solutions', title: 'Sustainable Solutions — ESG, EHS & CSR',
    body: '<p>We help enterprises build <strong>responsible, sustainable business practices</strong> through technology.</p><p><strong>ESG &amp; BRSR Reporting:</strong></p><ul><li>BRSR data collection and reporting platform</li><li>GRI, SASB, TCFD-aligned ESG disclosure management</li><li>Carbon footprint tracking — Scope 1, 2, 3 dashboards</li></ul><p><strong>EHS:</strong></p><ul><li>Digital EHS management — incident reporting, audits</li><li>Regulatory compliance (ISO 14001, ISO 45001)</li></ul><p><strong>CSR:</strong></p><ul><li>CSR activity planning and impact measurement</li><li>NGO partnership management portals</li></ul>'
  }
};

function openServiceModal(serviceKey) {
  const data = SERVICE_DATA[serviceKey];
  if (!data) return;
  const icon  = document.getElementById('svc-modal-icon');
  const tag   = document.getElementById('svc-modal-tag');
  const title = document.getElementById('svc-modal-title');
  const body  = document.getElementById('svc-modal-body');
  if (icon)  icon.textContent  = data.icon;
  if (tag)   tag.textContent   = data.tag;
  if (title) title.textContent = data.title;
  if (body)  body.innerHTML    = data.body;
  const overlay = document.getElementById('svc-modal-overlay');
  if (overlay) { overlay.classList.add('open'); document.body.classList.add('no-scroll'); }
  setTimeout(() => document.getElementById('svc-modal-close')?.focus(), 50);
}

function closeSvcModal() {
  document.getElementById('svc-modal-overlay')?.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

// Expose globally so onClick handlers can call them
if (typeof window !== 'undefined') {
  window.openServiceModal = openServiceModal;
  window.closeSvcModal    = closeSvcModal;
}


export default function Home() {
  
  useEffect(() => {
    // Preloader
    const preloader = document.getElementById('preloader');
    const bar = document.querySelector('.preloader-bar');
    if (preloader && bar) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 18;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
          }, 300);
        }
        bar.style.width = Math.min(progress, 100) + '%';
      }, 80);
    }

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile menu — the hamburger has a fully-built CSS animation to morph
    // into an "X" (.hamburger.open span:nth-child(...)), and sits at a
    // higher z-index than the menu overlay so it stays clickable on top,
    // but nothing ever toggled it: the old code only ever called
    // openMenu() and looked for a '#mobile-close-btn' that doesn't exist
    // in the markup. Net effect: once opened, the menu had no way to
    // close except tapping the unlabeled dark overlay background. Wired
    // the hamburger as a real open/close toggle instead.
    const toggle = document.getElementById('hamburger-btn');
    const menu = document.querySelector('.mobile-menu');

    const closeMenu = () => {
      menu?.classList.remove('open');
      toggle?.classList.remove('open');
      document.body.classList.remove('no-scroll');
      toggle?.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      menu?.classList.add('open');
      toggle?.classList.add('open');
      document.body.classList.add('no-scroll');
      toggle?.setAttribute('aria-expanded', 'true');
    };

    const toggleMenu = () => {
      if (menu?.classList.contains('open')) closeMenu(); else openMenu();
    };

    const menuLinks = menu ? Array.from(menu.querySelectorAll('a')) : [];
    const closeOnOverlayClick = e => { if (e.target === menu) closeMenu(); };

    const handleToggleKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
    };
    toggle?.addEventListener('click', toggleMenu);
    toggle?.addEventListener('keydown', handleToggleKey);
    menuLinks.forEach(a => a.addEventListener('click', closeMenu));
    menu?.addEventListener('click', closeOnOverlayClick);

    // Animate on scroll
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));

    // Form submission handling to backend API
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('contact-status');
    let submitCount = 0;
    const FALLBACK = 'Enquiry@Praitunova.com or call +91 90821 10849';

    const showStatus = (msg, ok = false) => {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.style.display = msg ? 'block' : 'none';
      statusEl.style.color = ok ? '#059669' : '#DC2626';
    };

    // The form is noValidate (custom styling), so nothing checked the
    // fields: an empty one went to the server and came back as a generic
    // "Error. Try Again." with no hint what was wrong.
    const validate = (v) => {
      if (!v.name.trim()) return ['name', 'Please enter your full name.'];
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) return ['email', 'Please enter a valid email address.'];
      if (v.phone.trim().length > 20) return ['phone', 'Phone number must be 20 characters or fewer.'];
      if (!v.message.trim()) return ['message', 'Please tell us a little about your project.'];
      return null;
    };

    const handleSubmit = async function (e) {
      e.preventDefault();
      showStatus('');
      if (submitCount >= 3) {
        showStatus(`You've already sent several messages. Please email ${FALLBACK}.`);
        return;
      }

      const formData = {
        name: form.querySelector('#contact-name')?.value || '',
        email: form.querySelector('#contact-email')?.value || '',
        phone: form.querySelector('#contact-phone')?.value || '',
        company: form.querySelector('#contact-company')?.value || '',
        service: form.querySelector('#contact-service')?.value || '',
        message: form.querySelector('#contact-message')?.value || '',
        website: form.querySelector('#contact-website')?.value || '',
      };

      const problem = validate(formData);
      if (problem) {
        showStatus(problem[1]);
        form.querySelector(`#contact-${problem[0]}`)?.focus();
        return;
      }

      const btn = form.querySelector('.form-submit');
      const originalHTML = btn.innerHTML;
      const restore = (delay) => setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
      }, delay);
      btn.disabled = true;
      btn.textContent = 'Sending...';

      try {
        const response = await fetch(`${API_BASE_URL}/contact/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-3px;margin-right:8px"><polyline points="20 6 9 17 4 12"></polyline></svg>Sent Successfully!';
          btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
          showStatus('Thank you! We will get back to you within 2 business hours.', true);
          submitCount++;
          form.reset();
          restore(3500);
        } else if (response.status === 429) {
          showStatus(`Too many messages from your network. Please try again later or contact ${FALLBACK}.`);
          restore(1500);
        } else if (response.status === 400) {
          let detail = '';
          try {
            const data = await response.json();
            const first = Object.values(data).flat()[0];
            if (typeof first === 'string') detail = first;
          } catch { /* fall through to generic message */ }
          showStatus(detail || 'Please check the form and try again.');
          restore(1500);
        } else {
          showStatus(`Something went wrong on our side. Please email ${FALLBACK}.`);
          restore(1500);
        }
      } catch (err) {
        console.error(err);
        showStatus(`We couldn't reach the server. Check your connection, or contact ${FALLBACK}.`);
        restore(1500);
      }
    };
    form?.addEventListener('submit', handleSubmit);

    // Modal wiring
    const modalCloseBtn = document.getElementById('svc-modal-close');
    const modalOverlay  = document.getElementById('svc-modal-overlay');
    const handleEsc = (e) => { if (e.key === 'Escape') { closeSvcModal(); closeMenu(); } };
    const closeOnModalOverlayClick = (e) => { if (e.target === modalOverlay) closeSvcModal(); };

    modalCloseBtn?.addEventListener('click', closeSvcModal);
    modalOverlay?.addEventListener('click', closeOnModalOverlayClick);
    document.addEventListener('keydown', handleEsc);

    // FAQ accordion — the CSS (.faq-item.open) was fully built but nothing
    // ever toggled the class, so every answer was permanently hidden.
    const faqItems = Array.from(document.querySelectorAll('.faq-item'));
    const faqHandlers = faqItems.map(item => {
      const question = item.querySelector('.faq-question');
      const handler = () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      };
      question?.addEventListener('click', handler);
      return { question, handler };
    });

    // Testimonials carousel — prev/next/dots existed with no wiring, so
    // the track never moved and only the first testimonial was ever
    // reachable.
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;

    const goToSlide = (index) => {
      if (!slides.length) return;
      currentSlide = (index + slides.length) % slides.length;
      if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    };
    const handlePrev = () => goToSlide(currentSlide - 1);
    const handleNext = () => goToSlide(currentSlide + 1);
    const dotHandlers = dots.map((dot, i) => {
      const handler = () => goToSlide(i);
      dot.addEventListener('click', handler);
      return { dot, handler };
    });
    prevBtn?.addEventListener('click', handlePrev);
    nextBtn?.addEventListener('click', handleNext);

    // Newsletter form — had no submit handler at all, so clicking
    // "Subscribe" fell through to a native form submit (page reload, email
    // leaked into the URL as a GET query string). Route it through the
    // same contact endpoint as a tagged lead instead of building a whole
    // separate subscriber system.
    const newsletterForm = document.getElementById('newsletter-form');
    const handleNewsletterSubmit = async (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const btn = newsletterForm.querySelector('.newsletter-btn');
      const email = input?.value;
      if (!email) return;
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Subscribing...';
      try {
        const response = await fetch(`${API_BASE_URL}/contact/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Newsletter Subscriber',
            email,
            service: 'Newsletter Subscription',
            message: `Newsletter signup from footer form: ${email}`,
          }),
        });
        btn.textContent = response.ok ? 'Subscribed!' : 'Error. Try again.';
        if (response.ok) newsletterForm.reset();
      } catch {
        btn.textContent = 'Network error.';
      } finally {
        setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 2500);
      }
    };
    newsletterForm?.addEventListener('submit', handleNewsletterSubmit);

    // Stat counters — the markup carried target values (data-count) but
    // no code ever animated them, so every stat sat at "0" / "0+" / "0%".
    // Real values stay in the markup as the no-JS fallback; with JS we
    // reset to 0 and count up when scrolled into view.
    const counterEls = Array.from(document.querySelectorAll('[data-count]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rafIds = [];
    const runCounter = (el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) rafIds.push(requestAnimationFrame(tick));
      };
      rafIds.push(requestAnimationFrame(tick));
    };
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    if (!reduceMotion) {
      counterEls.forEach(el => {
        el.textContent = '0' + (el.dataset.suffix || '');
        counterObserver.observe(el);
      });
    }

    // Scroll-to-top button — CSS had a .visible state (opacity/transform)
    // and a click cursor, but nothing ever toggled it or scrolled on
    // click, so it sat permanently invisible.
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    const handleScrollTopVisibility = () => {
      scrollTopBtn?.classList.toggle('visible', window.scrollY > 500);
    };
    const handleScrollTopClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });
    scrollTopBtn?.addEventListener('click', handleScrollTopClick);
    handleScrollTopVisibility();

    // Cookie consent banner — same story: built with .visible/.hidden CSS
    // states and Accept/Decline buttons, never shown or wired to anything.
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
    const cookieDeclineBtn = document.getElementById('cookie-decline-btn');
    let cookieShowTimer;
    const dismissCookieBanner = (choice) => {
      try { localStorage.setItem('cookie_consent', choice); } catch { /* ignore */ }
      cookieBanner?.classList.remove('visible');
      setTimeout(() => cookieBanner?.classList.add('hidden'), 500);
    };
    const handleCookieAccept = () => dismissCookieBanner('accepted');
    const handleCookieDecline = () => dismissCookieBanner('declined');
    let storedConsent = null;
    try { storedConsent = localStorage.getItem('cookie_consent'); } catch { /* ignore */ }
    if (storedConsent) {
      cookieBanner?.classList.add('hidden');
    } else {
      cookieShowTimer = setTimeout(() => cookieBanner?.classList.add('visible'), 1200);
    }
    cookieAcceptBtn?.addEventListener('click', handleCookieAccept);
    cookieDeclineBtn?.addEventListener('click', handleCookieDecline);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      toggle?.removeEventListener('click', toggleMenu);
      toggle?.removeEventListener('keydown', handleToggleKey);
      counterObserver.disconnect();
      rafIds.forEach(id => cancelAnimationFrame(id));
      menuLinks.forEach(a => a.removeEventListener('click', closeMenu));
      menu?.removeEventListener('click', closeOnOverlayClick);
      observer.disconnect();
      form?.removeEventListener('submit', handleSubmit);
      modalCloseBtn?.removeEventListener('click', closeSvcModal);
      modalOverlay?.removeEventListener('click', closeOnModalOverlayClick);
      document.removeEventListener('keydown', handleEsc);
      faqHandlers.forEach(({ question, handler }) => question?.removeEventListener('click', handler));
      prevBtn?.removeEventListener('click', handlePrev);
      nextBtn?.removeEventListener('click', handleNext);
      dotHandlers.forEach(({ dot, handler }) => dot.removeEventListener('click', handler));
      newsletterForm?.removeEventListener('submit', handleNewsletterSubmit);
      window.removeEventListener('scroll', handleScrollTopVisibility);
      scrollTopBtn?.removeEventListener('click', handleScrollTopClick);
      clearTimeout(cookieShowTimer);
      cookieAcceptBtn?.removeEventListener('click', handleCookieAccept);
      cookieDeclineBtn?.removeEventListener('click', handleCookieDecline);
    };
  }, []);

  return (
    <>
      

{/*  =============================================
     PRELOADER
=============================================  */}
<div id="preloader" role="status" aria-label="Loading">
  <div className="preloader-logo">Praitunova<span> Infotech</span></div>
  <div className="preloader-bar-container">
    <div className="preloader-bar"></div>
  </div>
  <p className="preloader-text">Initializing...</p>
</div>

{/*  =============================================
     NAVIGATION
=============================================  */}
<nav id="navbar" role="navigation" aria-label="Main navigation">
  <div className="container">
    <div className="nav-wrapper">
      {/*  Logo  */}
      <a href="#hero" className="nav-logo" aria-label="Praitunova Infotech Home">
        <Image src="/assets/logo.jpeg" alt="Praitunova Infotech Logo" width={64} height={64} className="nav-logo-icon" style={{'background': "transparent", 'borderRadius': "0", 'width': "64px", 'height': "64px", 'objectFit': "contain"}} priority />
        <div>
          <div className="nav-logo-text">Praitunova Infotech</div>
          <div className="nav-logo-sub">Technology &amp; Talent</div>
        </div>
      </a>

      {/*  Desktop Links  */}
      <ul className="nav-links" role="list">
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#industries">Industries</a></li>
        <li><a href="#technologies">Technologies</a></li>
        <li><a href="#careers">Careers</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/*  CTA + Hamburger  */}
      <div className="nav-right">
        <a href="#contact" className="nav-cta" id="nav-quote-btn" style={{'display': "inline-flex", 'alignItems': "center", 'gap': "6px", 'padding': "10px 20px", 'background': "linear-gradient(135deg,#2563EB,#06B6D4)", 'color': "#fff", 'borderRadius': "10px", 'fontWeight': "600", 'fontSize': "0.88rem", 'fontFamily': "var(--font-body)", 'textDecoration': "none", 'transition': "all .3s ease"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Get Quote
        </a>
        <div className="hamburger" role="button" aria-label="Toggle mobile menu" aria-expanded="false" tabIndex="0" id="hamburger-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</nav>

{/*  Mobile Menu  */}
<div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
  <a href="#about">About</a>
  <a href="#services">Services</a>
  <a href="#industries">Industries</a>
  <a href="#technologies">Technologies</a>
  <a href="#careers">Careers</a>
  <a href="#contact">Contact</a>
  <a href="#contact" className="btn btn-primary" style={{'marginTop': "16px"}}>Get Free Quote</a>
</div>

{/*  =============================================
     HERO SECTION
=============================================  */}
<section id="hero" aria-label="Hero">
  <div className="hero-bg">
    <div className="hero-gradient-orb hero-orb-1"></div>
    <div className="hero-gradient-orb hero-orb-2"></div>
    <div className="hero-gradient-orb hero-orb-3"></div>
    <div className="hero-grid"></div>
  </div>

  <div className="container">
    <div className="hero-content">
      {/*  Left  */}
      <div className="hero-left animate-on-scroll animate-fade-right">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Enterprise Technology Partner
        </div>

        <h1 className="hero-title">
          Empowering Businesses Through
          <span className="gradient-word"> Technology</span>
          {' '}& Digital Transformation
        </h1>

        <p className="hero-description">
          Delivering enterprise IT Solutions, Infrastructure, Recruitment, Consulting, Software Engineering, AI and Workforce Management that help businesses grow faster.
        </p>

        <div className="hero-cta-group">
          <a href="#about" className="btn btn-primary btn-lg btn-ripple" id="hero-get-started-btn">
            Get Started
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#services" className="btn btn-outline-white btn-lg" id="hero-explore-btn">
            Explore Services
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat-item">
            <div className="trust-number" style={{'fontFamily': "var(--font-number)", 'fontSize': "1.8rem", 'fontWeight': "700", 'color': "#fff", 'lineHeight': "1"}}>500<span style={{'background': "linear-gradient(135deg,#38BDF8,#06B6D4)", 'WebkitBackgroundClip': "text", 'WebkitTextFillColor': "transparent"}}>+</span></div>
            <div className="stat-label" style={{'fontSize': "0.8rem", 'color': "rgba(255,255,255,0.45)", 'marginTop': "4px"}}>Projects</div>
          </div>
          <div className="hero-stat-item">
            <div className="trust-number" style={{'fontFamily': "var(--font-number)", 'fontSize': "1.8rem", 'fontWeight': "700", 'color': "#fff", 'lineHeight': "1"}}>300<span style={{'background': "linear-gradient(135deg,#38BDF8,#06B6D4)", 'WebkitBackgroundClip': "text", 'WebkitTextFillColor': "transparent"}}>+</span></div>
            <div className="stat-label" style={{'fontSize': "0.8rem", 'color': "rgba(255,255,255,0.45)", 'marginTop': "4px"}}>Clients</div>
          </div>
          <div className="hero-stat-item">
            <div className="trust-number" style={{'fontFamily': "var(--font-number)", 'fontSize': "1.8rem", 'fontWeight': "700", 'color': "#fff", 'lineHeight': "1"}}>15<span style={{'background': "linear-gradient(135deg,#38BDF8,#06B6D4)", 'WebkitBackgroundClip': "text", 'WebkitTextFillColor': "transparent"}}>+</span></div>
            <div className="stat-label" style={{'fontSize': "0.8rem", 'color': "rgba(255,255,255,0.45)", 'marginTop': "4px"}}>Industries</div>
          </div>
        </div>
      </div>

      {/*  Right: SVG Illustration  */}
      <div className="hero-right animate-on-scroll animate-fade-left">
        <div className="hero-illustration float-anim">
          <div className="hero-illustration-main">
            {/*  Enterprise Technology SVG Illustration  */}
            <svg viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Enterprise technology illustration">
              {/*  Background circle  */}
              <circle cx="250" cy="210" r="190" fill="rgba(37,99,235,0.06)"/>
              <circle cx="250" cy="210" r="150" fill="rgba(37,99,235,0.04)"/>

              {/*  Outer orbit rings  */}
              <circle cx="250" cy="210" r="180" stroke="rgba(56,189,248,0.12)" strokeWidth="1" strokeDasharray="4 8"/>
              <circle cx="250" cy="210" r="130" stroke="rgba(6,182,212,0.15)" strokeWidth="1" strokeDasharray="3 6"/>

              {/*  Central cloud platform  */}
              <rect x="170" y="150" width="160" height="120" rx="20" fill="rgba(255,255,255,0.06)" stroke="rgba(37,99,235,0.3)" strokeWidth="1.5"/>
              <rect x="185" y="165" width="130" height="90" rx="12" fill="rgba(37,99,235,0.12)"/>

              {/*  Server rack illustration  */}
              <rect x="195" y="172" width="110" height="18" rx="5" fill="rgba(37,99,235,0.25)" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
              <circle cx="290" cy="181" r="3" fill="#10B981"/>
              <circle cx="278" cy="181" r="3" fill="#38BDF8"/>
              <rect x="203" y="176" width="60" height="8" rx="2" fill="rgba(255,255,255,0.1)"/>

              <rect x="195" y="196" width="110" height="18" rx="5" fill="rgba(6,182,212,0.2)" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
              <circle cx="290" cy="205" r="3" fill="#FBBF24"/>
              <circle cx="278" cy="205" r="3" fill="#10B981"/>
              <rect x="203" y="200" width="45" height="8" rx="2" fill="rgba(255,255,255,0.1)"/>

              <rect x="195" y="220" width="110" height="18" rx="5" fill="rgba(37,99,235,0.15)" stroke="rgba(56,189,248,0.3)" strokeWidth="1"/>
              <circle cx="290" cy="229" r="3" fill="#38BDF8"/>
              <rect x="203" y="224" width="75" height="8" rx="2" fill="rgba(255,255,255,0.1)"/>

              {/*  Cloud icon on top  */}
              <path d="M222 155 Q222 142 235 142 Q238 132 250 132 Q262 132 265 142 Q278 142 278 155 Z" fill="rgba(56,189,248,0.25)" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5"/>

              {/*  Network nodes floating around  */}
              {/*  Node 1: Top  */}
              <circle cx="250" cy="55" r="22" fill="rgba(37,99,235,0.15)" stroke="rgba(37,99,235,0.4)" strokeWidth="1.5"/>
              <path d="M241 55 L249 47 L257 55 L249 63 Z" stroke="#38BDF8" strokeWidth="1.5" fill="none"/>
              <line x1="250" y1="77" x2="250" y2="150" stroke="rgba(37,99,235,0.2)" strokeWidth="1" strokeDasharray="4 4"/>

              {/*  Node 2: Right  */}
              <circle cx="430" cy="180" r="22" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5"/>
              <rect x="421" y="171" width="18" height="18" rx="3" stroke="#06B6D4" strokeWidth="1.5" fill="none"/>
              <line x1="408" y1="200" x2="330" y2="210" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="4 4"/>

              {/*  Node 3: Left  */}
              <circle cx="68" cy="200" r="22" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5"/>
              <path d="M60 200 L64 192 L72 192 L76 200 L72 208 L64 208 Z" stroke="#10B981" strokeWidth="1.5" fill="none"/>
              <line x1="90" y1="210" x2="170" y2="210" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="4 4"/>

              {/*  Node 4: Bottom Left  */}
              <circle cx="95" cy="330" r="20" fill="rgba(37,99,235,0.12)" stroke="rgba(37,99,235,0.3)" strokeWidth="1.5"/>
              <circle cx="95" cy="330" r="8" fill="none" stroke="#2563EB" strokeWidth="1.5"/>
              <circle cx="95" cy="330" r="3" fill="#2563EB"/>
              <line x1="112" y1="315" x2="185" y2="265" stroke="rgba(37,99,235,0.15)" strokeWidth="1" strokeDasharray="4 4"/>

              {/*  Node 5: Bottom Right  */}
              <circle cx="405" cy="325" r="20" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.3)" strokeWidth="1.5"/>
              <path d="M397 325 L405 317 L413 325 L405 333 Z" stroke="#38BDF8" strokeWidth="1.5" fill="none"/>
              <line x1="388" y1="315" x2="315" y2="265" stroke="rgba(56,189,248,0.15)" strokeWidth="1" strokeDasharray="4 4"/>

              {/*  Node 6: Top Left  */}
              <circle cx="88" cy="88" r="18" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.3)" strokeWidth="1"/>
              <path d="M82 84 L94 84 M82 88 L94 88 M82 92 L94 92" stroke="#06B6D4" strokeWidth="1.5"/>
              <line x1="103" y1="98" x2="178" y2="165" stroke="rgba(6,182,212,0.15)" strokeWidth="1" strokeDasharray="3 6"/>

              {/*  Node 7: Top Right  */}
              <circle cx="410" cy="90" r="18" fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.3)" strokeWidth="1"/>
              <path d="M404 84 L416 84 L416 96 L404 96 Z M407 84 L407 96 M413 84 L413 96" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <line x1="396" y1="100" x2="322" y2="165" stroke="rgba(37,99,235,0.15)" strokeWidth="1" strokeDasharray="3 6"/>

              {/*  Data flow dots (animated)  */}
              <circle r="3" fill="#38BDF8" opacity="0.8">
                <animateMotion dur="3s" repeatCount="indefinite" path="M250,77 L250,150"/>
              </circle>
              <circle r="3" fill="#06B6D4" opacity="0.8">
                <animateMotion dur="4s" repeatCount="indefinite" path="M408,200 L330,210"/>
              </circle>
              <circle r="3" fill="#10B981" opacity="0.8">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M90,210 L170,210"/>
              </circle>

              {/*  AI brain icon in bottom center  */}
              <circle cx="250" cy="350" r="26" fill="rgba(37,99,235,0.15)" stroke="rgba(37,99,235,0.4)" strokeWidth="1.5"/>
              <path d="M240 342 Q240 334 250 334 Q260 334 260 342 L260 358 Q260 366 250 366 Q240 366 240 358 Z" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <line x1="243" y1="342" x2="243" y2="358" stroke="#2563EB" strokeWidth="1" opacity="0.5"/>
              <line x1="250" y1="342" x2="250" y2="358" stroke="#2563EB" strokeWidth="1" opacity="0.5"/>
              <line x1="257" y1="342" x2="257" y2="358" stroke="#2563EB" strokeWidth="1" opacity="0.5"/>
              <line x1="240" y1="347" x2="260" y2="347" stroke="#2563EB" strokeWidth="1" opacity="0.5"/>
              <line x1="240" y1="353" x2="260" y2="353" stroke="#2563EB" strokeWidth="1" opacity="0.5"/>
              <line x1="250" y1="324" x2="250" y2="270" stroke="rgba(37,99,235,0.2)" strokeWidth="1" strokeDasharray="4 4"/>

              {/*  Subtle glow dots  */}
              <circle cx="250" cy="210" r="6" fill="#2563EB" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>

          {/*  Floating Cards  */}
          <div className="hero-float-card hfc-1" style={{'animation': "float 5s ease-in-out infinite"}}>
            <div className="fc-icon">🚀</div>
            <div>
              <div className="fc-text">Cloud Migration</div>
              <div className="fc-sub">98% Success Rate</div>
            </div>
          </div>

          <div className="hero-float-card hfc-2" style={{'animation': "float 6s ease-in-out infinite 1s"}}>
            <div className="fc-icon">🤖</div>
            <div>
              <div className="fc-text">AI Powered</div>
              <div className="fc-sub">Next-Gen Solutions</div>
            </div>
          </div>

          <div className="hero-float-card hfc-3" style={{'animation': "float 7s ease-in-out infinite 0.5s"}}>
            <div className="fc-icon">🛡️</div>
            <div>
              <div className="fc-text">Enterprise Security</div>
              <div className="fc-sub">24/7 Monitoring</div>
            </div>
          </div>

          <div className="hero-float-card hfc-4" style={{'animation': "float 8s ease-in-out infinite 1.5s"}}>
            <div className="fc-icon">🏗️</div>
            <div>
              <div className="fc-text">Infrastructure</div>
              <div className="fc-sub">Scalable & Resilient</div>
            </div>
          </div>

          <div className="hero-float-card hfc-5" style={{'animation': "float 6.5s ease-in-out infinite 2s"}}>
            <div className="fc-icon">💼</div>
            <div>
              <div className="fc-text">Consulting</div>
              <div className="fc-sub">Expert Advisory</div>
            </div>
          </div>

          <div className="hero-float-card hfc-6" style={{'animation': "float 9s ease-in-out infinite 0.8s"}}>
            <div className="fc-icon">⚙️</div>
            <div>
              <div className="fc-text">Software Engineering</div>
              <div className="fc-sub">Enterprise Grade</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  =============================================
     TRUST BAR
=============================================  */}
<section id="trust-bar" aria-label="Company statistics">
  <div className="trust-bar-inner container" style={{'maxWidth': "100%", 'padding': "0"}}>
    <div className="trust-item animate-on-scroll animate-fade-up delay-100">
      <span className="trust-number" data-count="500" data-suffix="+">500+</span>
      <span className="trust-label">Projects Delivered</span>
    </div>
    <div className="trust-item animate-on-scroll animate-fade-up delay-200">
      <span className="trust-number" data-count="300" data-suffix="+">300+</span>
      <span className="trust-label">Happy Clients</span>
    </div>
    <div className="trust-item animate-on-scroll animate-fade-up delay-300">
      <span className="trust-number" data-count="1000" data-suffix="+">1000+</span>
      <span className="trust-label">Professionals</span>
    </div>
    <div className="trust-item animate-on-scroll animate-fade-up delay-400">
      <span className="trust-number" data-count="15" data-suffix="+">15+</span>
      <span className="trust-label">Industries Served</span>
    </div>
    <div className="trust-item animate-on-scroll animate-fade-up delay-500">
      <span className="trust-number">24/7</span>
      <span className="trust-label">Support Available</span>
    </div>
    <div className="trust-item animate-on-scroll animate-fade-up delay-600">
      <span className="trust-number" data-count="8" data-suffix="+">8+</span>
      <span className="trust-label">Years of Experience</span>
    </div>
  </div>
</section>

{/*  =============================================
     ABOUT US
=============================================  */}
<section id="about" className="section-padding" aria-label="About Praitunova Infotech">
  <div className="container">
    <div className="about-grid">
      {/*  Left: Visual  */}
      <div className="about-visual animate-on-scroll animate-fade-right">
        <div className="about-image-wrapper">
          <svg viewBox="0 0 540 420" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corporate office illustration">
            {/*  Background  */}
            <rect width="540" height="420" rx="20" fill="#F8FAFC"/>

            {/*  Building illustration  */}
            {/*  Sky gradient  */}
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DBEAFE"/>
                <stop offset="100%" stopColor="#F8FAFC"/>
              </linearGradient>
              <linearGradient id="buildGrad1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1E40AF"/>
                <stop offset="100%" stopColor="#2563EB"/>
              </linearGradient>
              <linearGradient id="buildGrad2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0F172A"/>
                <stop offset="100%" stopColor="#1E293B"/>
              </linearGradient>
              <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(37,99,235,0.2)"/>
                <stop offset="100%" stopColor="rgba(37,99,235,0.05)"/>
              </linearGradient>
            </defs>

            <rect width="540" height="280" fill="url(#skyGrad)"/>

            {/*  Sun/globe accent  */}
            <circle cx="460" cy="60" r="40" fill="rgba(37,99,235,0.06)"/>
            <circle cx="460" cy="60" r="28" fill="rgba(37,99,235,0.10)"/>

            {/*  Clouds  */}
            <ellipse cx="100" cy="70" rx="50" ry="18" fill="rgba(255,255,255,0.7)"/>
            <ellipse cx="130" cy="60" rx="35" ry="20" fill="rgba(255,255,255,0.8)"/>
            <ellipse cx="80" cy="65" rx="30" ry="16" fill="rgba(255,255,255,0.7)"/>

            {/*  Ground  */}
            <rect x="0" y="280" width="540" height="140" fill="#E8EEF7"/>
            <rect x="0" y="275" width="540" height="10" fill="#CBD5E1"/>

            {/*  Main tall building (center)  */}
            <rect x="195" y="80" width="150" height="200" fill="url(#buildGrad2)"/>
            {/*  Glass facade  */}
            <rect x="200" y="85" width="140" height="195" fill="url(#glassGrad)"/>
            {/*  Window grid  */}
            <g stroke="rgba(37,99,235,0.3)" strokeWidth="0.5" fill="rgba(37,99,235,0.08)">
              {/*  Row 1  */}
              <rect x="208" y="93" width="20" height="28" rx="2"/>
              <rect x="233" y="93" width="20" height="28" rx="2"/>
              <rect x="258" y="93" width="20" height="28" rx="2"/>
              <rect x="283" y="93" width="20" height="28" rx="2"/>
              <rect x="308" y="93" width="20" height="28" rx="2"/>
              {/*  Row 2  */}
              <rect x="208" y="127" width="20" height="28" rx="2"/>
              <rect x="233" y="127" width="20" height="28" rx="2"/>
              <rect x="258" y="127" width="20" height="28" rx="2" fill="rgba(56,189,248,0.25)"/>
              <rect x="283" y="127" width="20" height="28" rx="2"/>
              <rect x="308" y="127" width="20" height="28" rx="2"/>
              {/*  Row 3  */}
              <rect x="208" y="161" width="20" height="28" rx="2" fill="rgba(56,189,248,0.2)"/>
              <rect x="233" y="161" width="20" height="28" rx="2"/>
              <rect x="258" y="161" width="20" height="28" rx="2"/>
              <rect x="283" y="161" width="20" height="28" rx="2" fill="rgba(56,189,248,0.2)"/>
              <rect x="308" y="161" width="20" height="28" rx="2"/>
              {/*  Row 4  */}
              <rect x="208" y="195" width="20" height="28" rx="2"/>
              <rect x="233" y="195" width="20" height="28" rx="2" fill="rgba(56,189,248,0.2)"/>
              <rect x="258" y="195" width="20" height="28" rx="2"/>
              <rect x="283" y="195" width="20" height="28" rx="2"/>
              <rect x="308" y="195" width="20" height="28" rx="2"/>
              {/*  Row 5  */}
              <rect x="208" y="229" width="120" height="28" rx="2" fill="rgba(37,99,235,0.15)"/>
            </g>

            {/*  Left building  */}
            <rect x="80" y="140" width="105" height="140" fill="#1E293B"/>
            <rect x="85" y="145" width="100" height="135" fill="url(#glassGrad)"/>
            <g stroke="rgba(37,99,235,0.25)" strokeWidth="0.5" fill="rgba(37,99,235,0.06)">
              <rect x="92" y="152" width="18" height="22" rx="2"/>
              <rect x="116" y="152" width="18" height="22" rx="2" fill="rgba(56,189,248,0.2)"/>
              <rect x="140" y="152" width="18" height="22" rx="2"/>
              <rect x="163" y="152" width="18" height="22" rx="2"/>
              <rect x="92" y="180" width="18" height="22" rx="2" fill="rgba(56,189,248,0.2)"/>
              <rect x="116" y="180" width="18" height="22" rx="2"/>
              <rect x="140" y="180" width="18" height="22" rx="2"/>
              <rect x="163" y="180" width="18" height="22" rx="2" fill="rgba(56,189,248,0.2)"/>
              <rect x="92" y="208" width="18" height="22" rx="2"/>
              <rect x="116" y="208" width="18" height="22" rx="2"/>
              <rect x="140" y="208" width="18" height="22" rx="2"/>
              <rect x="163" y="208" width="18" height="22" rx="2"/>
              <rect x="92" y="236" width="90" height="22" rx="2"/>
            </g>

            {/*  Right building  */}
            <rect x="355" y="120" width="110" height="160" fill="#1E3A8A"/>
            <rect x="360" y="125" width="100" height="155" fill="url(#glassGrad)"/>
            <g stroke="rgba(56,189,248,0.2)" strokeWidth="0.5" fill="rgba(56,189,248,0.06)">
              <rect x="368" y="133" width="18" height="22" rx="2"/>
              <rect x="392" y="133" width="18" height="22" rx="2"/>
              <rect x="416" y="133" width="18" height="22" rx="2" fill="rgba(56,189,248,0.2)"/>
              <rect x="440" y="133" width="18" height="22" rx="2"/>
              <rect x="368" y="161" width="18" height="22" rx="2"/>
              <rect x="392" y="161" width="18" height="22" rx="2" fill="rgba(56,189,248,0.2)"/>
              <rect x="416" y="161" width="18" height="22" rx="2"/>
              <rect x="440" y="161" width="18" height="22" rx="2"/>
              <rect x="368" y="189" width="18" height="22" rx="2" fill="rgba(56,189,248,0.2)"/>
              <rect x="392" y="189" width="18" height="22" rx="2"/>
              <rect x="416" y="189" width="18" height="22" rx="2"/>
              <rect x="440" y="189" width="18" height="22" rx="2"/>
              <rect x="368" y="217" width="90" height="22" rx="2"/>
            </g>

            {/*  Entrance area  */}
            <rect x="225" y="255" width="90" height="25" fill="#0F172A"/>
            <rect x="232" y="255" width="38" height="25" fill="rgba(37,99,235,0.3)"/>
            <rect x="270" y="255" width="38" height="25" fill="rgba(37,99,235,0.3)"/>

            {/*  Street details  */}
            <rect x="0" y="295" width="540" height="4" fill="#CBD5E1"/>
            {/*  Road markings  */}
            <rect x="230" y="300" width="30" height="5" rx="2" fill="rgba(255,255,255,0.6)"/>
            <rect x="270" y="300" width="30" height="5" rx="2" fill="rgba(255,255,255,0.6)"/>
            <rect x="310" y="300" width="30" height="5" rx="2" fill="rgba(255,255,255,0.6)"/>

            {/*  Trees  */}
            <rect x="130" y="268" width="8" height="25" fill="#94A3B8"/>
            <circle cx="134" cy="258" r="18" fill="#10B981" opacity="0.7"/>
            <rect x="400" y="268" width="8" height="25" fill="#94A3B8"/>
            <circle cx="404" cy="258" r="18" fill="#10B981" opacity="0.7"/>
            <rect x="50" y="270" width="8" height="20" fill="#94A3B8"/>
            <circle cx="54" cy="262" r="14" fill="#10B981" opacity="0.6"/>
            <rect x="480" y="270" width="8" height="20" fill="#94A3B8"/>
            <circle cx="484" cy="262" r="14" fill="#10B981" opacity="0.6)"/>

            {/*  Company sign  */}
            <rect x="200" y="315" width="140" height="30" rx="6" fill="#2563EB"/>
            <text x="270" y="336" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="bold">PRAITUNOVA INFOTECH</text>

            {/*  Network connection lines on building  */}
            <circle cx="270" cy="78" r="5" fill="#38BDF8" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
            </circle>
            <path d="M270 78 L270 80" stroke="#38BDF8" strokeWidth="2"/>

            {/*  WiFi / signal indicator  */}
            <path d="M460 35 Q460 25 470 25" stroke="#2563EB" strokeWidth="2" fill="none" opacity="0.5"/>
            <path d="M457 38 Q457 20 473 20" stroke="#2563EB" strokeWidth="2" fill="none" opacity="0.35"/>
            <circle cx="463" cy="42" r="3" fill="#2563EB" opacity="0.7"/>
          </svg>
        </div>

        {/*  Floating badge  */}
        <div className="about-badge">
          <div className="badge-number" style={{'fontFamily': "var(--font-number)"}}>8+</div>
          <div className="badge-text">Years of Excellence</div>
        </div>

        {/*  Experience badge top-left  */}
        <div className="about-exp-badge">
          <span style={{'fontSize': "1.3rem"}}>🏆</span>
          <div>
            <div style={{'fontSize': "0.82rem", 'fontWeight': "700", 'color': "#0F172A", 'fontFamily': "var(--font-heading)"}}>Award Winning</div>
            <div style={{'fontSize': "0.72rem", 'color': "#64748B"}}>Technology Company</div>
          </div>
        </div>
      </div>

      {/*  Right: Content  */}
      <div className="about-content animate-on-scroll animate-fade-left">
        <div className="section-tag"><span className="tag-dot"></span>About Us</div>
        <h2 className="section-title">Building the Future of Enterprise <span>Technology</span></h2>

        <p>Praitunova Infotech is a technology company delivering enterprise IT services, infrastructure solutions, consulting, software development, recruitment, staffing, cloud services, AI solutions and workforce management for businesses across multiple industries.</p>
        <p>We combine deep technical expertise with industry knowledge to provide transformative solutions that drive growth, efficiency, and competitive advantage for our clients worldwide.</p>

        {/*  Mission / Vision / Values  */}
        <div className="mvv-grid">
          <div className="mvv-card animate-on-scroll animate-scale-in delay-100">
            <div className="mvv-icon">🎯</div>
            <h4>Mission</h4>
            <p>To empower businesses with technology solutions that drive meaningful transformation and sustainable growth.</p>
          </div>
          <div className="mvv-card animate-on-scroll animate-scale-in delay-200">
            <div className="mvv-icon">🔭</div>
            <h4>Vision</h4>
            <p>To be the most trusted enterprise technology partner across global markets by 2030.</p>
          </div>
          <div className="mvv-card animate-on-scroll animate-scale-in delay-300">
            <div className="mvv-icon">⭐</div>
            <h4>Values</h4>
            <p>Integrity, innovation, customer-centricity, and excellence in every engagement.</p>
          </div>
        </div>

        {/*  Core Values Chips  */}
        <div className="values-grid">
          <div className="value-chip"><span className="chip-icon">💡</span>Innovation</div>
          <div className="value-chip"><span className="chip-icon">🤝</span>Integrity</div>
          <div className="value-chip"><span className="chip-icon">👥</span>Customer First</div>
          <div className="value-chip"><span className="chip-icon">✅</span>Quality</div>
          <div className="value-chip"><span className="chip-icon">🔒</span>Commitment</div>
          <div className="value-chip"><span className="chip-icon">🚀</span>Excellence</div>
        </div>

        <div style={{'marginTop': "32px", 'display': "flex", 'gap': "16px", 'flexWrap': "wrap"}}>
          <a href="#contact" className="btn btn-primary" id="about-consult-btn">
            Schedule Consultation
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#services" className="btn btn-outline" id="about-services-btn">View Services</a>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  =============================================
     STATS BAND
=============================================  */}
<div className="stats-band" aria-label="Company statistics">
  <div className="container">
    <div className="stats-band-grid">
      <div className="stat-band-item animate-on-scroll animate-fade-up delay-100">
        <span className="stat-band-number" data-count="98" data-suffix="%">98%</span>
        <span className="stat-band-label">Client Retention</span>
      </div>
      <div className="stat-band-item animate-on-scroll animate-fade-up delay-200">
        <span className="stat-band-number" data-count="50" data-suffix="+">50+</span>
        <span className="stat-band-label">Certified Experts</span>
      </div>
      <div className="stat-band-item animate-on-scroll animate-fade-up delay-300">
        <span className="stat-band-number" data-count="30" data-suffix="+">30+</span>
        <span className="stat-band-label">Tech Partnerships</span>
      </div>
      <div className="stat-band-item animate-on-scroll animate-fade-up delay-400">
        <span className="stat-band-number" data-count="5" data-suffix="★">5★</span>
        <span className="stat-band-label">Average Rating</span>
      </div>
      <div className="stat-band-item animate-on-scroll animate-fade-up delay-500">
        <span className="stat-band-number" data-count="12" data-suffix="+">12+</span>
        <span className="stat-band-label">Countries</span>
      </div>
      <div className="stat-band-item animate-on-scroll animate-fade-up delay-600">
        <span className="stat-band-number" data-count="200" data-suffix="+">200+</span>
        <span className="stat-band-label">Active Projects</span>
      </div>
    </div>
  </div>
</div>

{/*  =============================================
     IT SERVICES
=============================================  */}
<section id="services" className="section-padding" aria-label="IT Services">
  <div className="container">
    <div className="section-header center animate-on-scroll animate-fade-up">
      <div className="section-tag"><span className="tag-dot"></span>IT Services</div>
      <h2 className="section-title">Enterprise <span>Technology Solutions</span></h2>
      <p className="section-subtitle">Comprehensive IT Services Tech Stack engineered for enterprise scale — from cloud Infrastructure to AI-powered automation and everything in between.</p>
    </div>

    <div className="services-grid">
      {/*  1  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-100" id="service-software-dev">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </div>
        <h4>Software Development</h4>
        <p>Custom enterprise software engineered to solve complex business challenges at scale with modern architecture.</p>
        <button className="service-link" onClick={() => openServiceModal('software-dev')} aria-label="Learn more about Software Development">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  2  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-200" id="service-web-dev">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        </div>
        <h4>Web Development</h4>
        <p>High-performance web applications with modern frameworks, seamless UX, and enterprise-grade reliability.</p>
        <button className="service-link" onClick={() => openServiceModal('web-dev')} aria-label="Learn more about Web Development">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  3  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-300" id="service-mobile-dev">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
        </div>
        <h4>Mobile App Development</h4>
        <p>iOS and Android applications built with React Native & Flutter for optimal performance across devices.</p>
        <button className="service-link" onClick={() => openServiceModal('mobile-dev')} aria-label="Learn more about Mobile App Development">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  4  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-400" id="service-enterprise-apps">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <h4>Enterprise Applications</h4>
        <p>Mission-critical enterprise platforms designed for high availability, scalability, and security compliance.</p>
        <button className="service-link" onClick={() => openServiceModal('enterprise-apps')} aria-label="Learn more about Enterprise Applications">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  5  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-100" id="service-cloud">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>
        </div>
        <h4>Cloud Solutions</h4>
        <p>Multi-cloud strategy, architecture design, and management across AWS, Azure, and Google Cloud platforms.</p>
        <button className="service-link" onClick={() => openServiceModal('cloud')} aria-label="Learn more about Cloud Solutions">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  6  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-200" id="service-infrastructure">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        </div>
        <h4>IT Infrastructure</h4>
        <p>End-to-end Infrastructure design, deployment, and management for enterprise environments.</p>
        <button className="service-link" onClick={() => openServiceModal('infrastructure')} aria-label="Learn more about IT Infrastructure">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  7  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-300" id="service-cybersec">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <h4>Cyber Security</h4>
        <p>Comprehensive security assessments, threat detection, incident response, and compliance management.</p>
        <button className="service-link" onClick={() => openServiceModal('cybersec')} aria-label="Learn more about Cyber Security">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  8  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-400" id="service-ai">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M12 16a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2v-2a2 2 0 012-2z"/><path d="M4 12a2 2 0 012-2h2a2 2 0 010 4H6a2 2 0 01-2-2z"/><path d="M16 12a2 2 0 012-2h2a2 2 0 010 4h-2a2 2 0 01-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <h4>AI Solutions</h4>
        <p>Enterprise AI integration using LLMs, computer vision, NLP, and custom AI models for business automation.</p>
        <button className="service-link" onClick={() => openServiceModal('ai')} aria-label="Learn more about AI Solutions">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  9  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-100" id="service-ml">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-5 0v-15A2.5 2.5 0 019.5 2z"/><path d="M14.5 8A2.5 2.5 0 0117 10.5v9a2.5 2.5 0 01-5 0v-9A2.5 2.5 0 0114.5 8z"/><path d="M4.5 14A2.5 2.5 0 017 16.5v3a2.5 2.5 0 01-5 0v-3A2.5 2.5 0 014.5 14z"/></svg>
        </div>
        <h4>Machine Learning</h4>
        <p>Predictive analytics, recommendation engines, and intelligent automation powered by ML models.</p>
        <button className="service-link" onClick={() => openServiceModal('ml')} aria-label="Learn more about Machine Learning">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  10  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-200" id="service-analytics">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        </div>
        <h4>Data Analytics</h4>
        <p>Business intelligence dashboards and data pipelines that turn raw data into actionable insights.</p>
        <button className="service-link" onClick={() => openServiceModal('analytics')} aria-label="Learn more about Data Analytics">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  11  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-300" id="service-automation">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
        </div>
        <h4>Automation</h4>
        <p>RPA, workflow automation, and process optimization to eliminate manual tasks and boost efficiency.</p>
        <button className="service-link" onClick={() => openServiceModal('automation')} aria-label="Learn more about Automation">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  12  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-400" id="service-devops">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
        </div>
        <h4>DevOps</h4>
        <p>CI/CD pipelines, Infrastructure as code, container orchestration, and agile deployment strategies.</p>
        <button className="service-link" onClick={() => openServiceModal('devops')} aria-label="Learn more about DevOps">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  13  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-100" id="service-digital-transformation">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <h4>Digital Transformation</h4>
        <p>End-to-end digital transformation roadmap, change management, and technology modernization.</p>
        <button className="service-link" onClick={() => openServiceModal('digital-transformation')} aria-label="Learn more about Digital Transformation">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  14  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-200" id="service-qa">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        </div>
        <h4>QA &amp; Testing</h4>
        <p>Automated and manual testing, performance testing, security audits, and quality assurance frameworks.</p>
        <button className="service-link" onClick={() => openServiceModal('qa')} aria-label="Learn more about QA and Testing">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  15  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-300" id="service-consulting">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
        </div>
        <h4>IT Consulting</h4>
        <p>Strategic technology advisory, architecture review, and roadmap planning by certified enterprise consultants.</p>
        <button className="service-link" onClick={() => openServiceModal('consulting')} aria-label="Learn more about IT Consulting">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  16  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-400" id="service-erp">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        </div>
        <h4>ERP Solutions</h4>
        <p>SAP, Oracle, and Microsoft Dynamics ERP implementations, customization, and enterprise integrations.</p>
        <button className="service-link" onClick={() => openServiceModal('erp')} aria-label="Learn more about ERP Solutions">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  17  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-100" id="service-crm">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
        </div>
        <h4>CRM Solutions</h4>
        <p>Salesforce, HubSpot, and custom CRM platforms to transform customer relationships and sales processes.</p>
        <button className="service-link" onClick={() => openServiceModal('crm')} aria-label="Learn more about CRM Solutions">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  18  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-200" id="service-uiux">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        </div>
        <h4>UI/UX Design</h4>
        <p>User research, wireframing, prototyping, and premium interface design for web and mobile platforms.</p>
        <button className="service-link" onClick={() => openServiceModal('uiux')} aria-label="Learn more about UI/UX Design">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  19  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-300" id="service-api">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
        </div>
        <h4>API Development</h4>
        <p>RESTful and GraphQL API design, microservices architecture, third-party integrations, and API gateways.</p>
        <button className="service-link" onClick={() => openServiceModal('api')} aria-label="Learn more about API Development">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      {/*  20  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-400" id="service-managed-it">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0120.7 8.27M8.27 3.3A10 10 0 004.93 4.93M3.3 15.73A10 10 0 004.93 19.07M8.27 20.7A10 10 0 0015.73 20.7M19.07 19.07A10 10 0 0020.7 15.73"/></svg>
        </div>
        <h4>Managed IT Services</h4>
        <p>Proactive Infrastructure monitoring, management, helpdesk, and 24/7 technical support services.</p>
        <button className="service-link" onClick={() => openServiceModal('managed-it')} aria-label="Learn more about Managed IT Services">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>

      {/*  21 — Sustainable Solutions  */}
      <div className="service-card animate-on-scroll animate-fade-up delay-100" id="service-esg">
        <div className="service-icon-wrap">
          <svg className="svc-icon" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
        </div>
        <h4>Sustainable Solutions — ESG, EHS &amp; CSR</h4>
        <p>End-to-end ESG-BRSR reporting, EHS compliance management, and CSR programme digitisation for responsible enterprises.</p>
        <button className="service-link" onClick={() => openServiceModal('esg')} aria-label="Learn more about Sustainable Solutions">Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
    </div>

    {/*  View All Services CTA  */}
    <div style={{'textAlign': "center", 'marginTop': "48px"}} className="animate-on-scroll animate-fade-up">
      <a href="#contact" className="btn btn-primary btn-lg" id="all-services-btn">
        Explore All Services
        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>
</section>

{/*  =============================================
     NON-IT SERVICES
=============================================  */}
<section id="non-it-services" className="section-padding" aria-label="Non-IT Services">
  <div className="container">
    <div className="section-header center animate-on-scroll animate-fade-up">
      <div className="section-tag"><span className="tag-dot"></span>Workforce Solutions</div>
      <h2 className="section-title">Non-IT <span>Staffing &amp; Workforce</span> Management</h2>
      <p className="section-subtitle">Complete workforce solutions spanning blue-collar, industrial, and operational staffing with end-to-end payroll and compliance management.</p>
    </div>

    <div className="non-it-grid">
      <div className="non-it-card animate-on-scroll animate-scale-in delay-100" id="nit-blue-collar">
        <span className="nit-icon">👷</span>
        <h4>Blue Collar Recruitment</h4>
        <p>Sourcing and placing skilled blue-collar workers for diverse operational roles.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-200" id="nit-industrial">
        <span className="nit-icon">🏭</span>
        <h4>Industrial Staffing</h4>
        <p>Specialized industrial workforce for manufacturing and heavy industry sectors.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-300" id="nit-warehouse">
        <span className="nit-icon">📦</span>
        <h4>Warehouse Workforce</h4>
        <p>Efficient warehouse staffing with inventory and logistics management expertise.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-400" id="nit-construction">
        <span className="nit-icon">🏗️</span>
        <h4>Construction Workforce</h4>
        <p>Skilled and unskilled construction labor sourcing for project-based assignments.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-100" id="nit-manufacturing">
        <span className="nit-icon">⚙️</span>
        <h4>Staffing in Manufacturing Industries</h4>
        <p>Assembly line, production supervisors, and quality control staffing for manufacturing plants.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-200" id="nit-facility">
        <span className="nit-icon">🏢</span>
        <h4>Facility Management</h4>
        <p>Complete facility management services including housekeeping, maintenance, and operations.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-300" id="nit-payroll">
        <span className="nit-icon">💼</span>
        <h4>Payroll Management</h4>
        <p>End-to-end payroll processing, compliance, and HR administration for your workforce.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-400" id="nit-contract">
        <span className="nit-icon">📋</span>
        <h4>Contract Staffing</h4>
        <p>Flexible contract workforce solutions with rapid deployment for project-based needs.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-100" id="nit-logistics">
        <span className="nit-icon">🚛</span>
        <h4>Logistics Workforce</h4>
        <p>Drivers, loaders, and supply chain personnel for seamless logistics operations.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-200" id="nit-housekeeping">
        <span className="nit-icon">🧹</span>
        <h4>Housekeeping</h4>
        <p>Professional housekeeping and sanitation teams for corporate and hospitality environments.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-300" id="nit-security">
        <span className="nit-icon">🛡️</span>
        <h4>Security Services</h4>
        <p>Trained security personnel for premises, events, and corporate security management.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-400" id="nit-drivers">
        <span className="nit-icon">🚗</span>
        <h4>Drivers</h4>
        <p>Verified commercial and executive drivers for corporate, logistics, and fleet operations.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-100" id="nit-technicians">
        <span className="nit-icon">🔧</span>
        <h4>Technicians</h4>
        <p>Skilled technicians for HVAC, electrical, mechanical, and equipment maintenance roles.</p>
      </div>
      <div className="non-it-card animate-on-scroll animate-scale-in delay-200" id="nit-electricians">
        <span className="nit-icon">⚡</span>
        <h4>Electricians</h4>
        <p>Licensed electricians for industrial, commercial, and residential electrical projects.</p>
      </div>

      <div className="non-it-card animate-on-scroll animate-scale-in delay-400" id="nit-labour">
        <span className="nit-icon">👨‍🏭</span>
        <h4>Labour Outsourcing</h4>
        <p>Complete labour outsourcing and contract management solutions for large-scale operations.</p>
      </div>
    </div>
  </div>
</section>

{/*  =============================================
     INDUSTRIES
=============================================  */}
<section id="industries" className="section-padding" aria-label="Industries we serve">
  <div className="container">
    <div className="section-header center animate-on-scroll animate-fade-up">
      <div className="section-tag" style={{'background': "rgba(255,255,255,0.06)", 'borderColor': "rgba(255,255,255,0.12)", 'color': "#38BDF8"}}><span className="tag-dot" style={{'background': "#38BDF8"}}></span>Industries</div>
      <h2 className="section-title">Serving <span>15+ Industries</span> Worldwide</h2>
      <p className="section-subtitle" style={{'color': "rgba(255,255,255,0.55)"}}>Deep domain expertise across multiple verticals — delivering solutions tailored to the unique challenges of each industry.</p>
    </div>

    <div className="industries-grid">
      <div className="industry-card animate-on-scroll animate-scale-in delay-100" id="ind-healthcare">
        <span className="industry-icon">🏥</span>
        <h4>Healthcare</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-150" id="ind-finance">
        <span className="industry-icon">💰</span>
        <h4>Finance &amp; Banking</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-200" id="ind-retail">
        <span className="industry-icon">🛒</span>
        <h4>Retail &amp; E-Commerce</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-250" id="ind-manufacturing">
        <span className="industry-icon">🏭</span>
        <h4>Manufacturing</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-300" id="ind-education">
        <span className="industry-icon">🎓</span>
        <h4>Education</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-100" id="ind-government">
        <span className="industry-icon">🏛️</span>
        <h4>Government</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-150" id="ind-energy">
        <span className="industry-icon">⚡</span>
        <h4>Energy &amp; Utilities</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-200" id="ind-construction">
        <span className="industry-icon">🏗️</span>
        <h4>Construction</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-250" id="ind-logistics">
        <span className="industry-icon">🚚</span>
        <h4>Logistics</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-300" id="ind-automotive">
        <span className="industry-icon">🚗</span>
        <h4>Automotive</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-100" id="ind-telecom">
        <span className="industry-icon">📡</span>
        <h4>Telecommunication</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-150" id="ind-hospitality">
        <span className="industry-icon">🏨</span>
        <h4>Hospitality</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-200" id="ind-ecommerce">
        <span className="industry-icon">🛍️</span>
        <h4>E-Commerce</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-250" id="ind-pharma">
        <span className="industry-icon">💊</span>
        <h4>Pharmaceuticals</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-300" id="ind-realestate">
        <span className="industry-icon">🏠</span>
        <h4>Real Estate</h4>
      </div>
      <div className="industry-card animate-on-scroll animate-scale-in delay-100" id="ind-chemical">
        <span className="industry-icon">🧪</span>
        <h4>Chemical Industry</h4>
      </div>
    </div>
  </div>
</section>

{/*  =============================================
     WHY CHOOSE US
=============================================  */}
<section id="why-us" className="section-padding" aria-label="Why choose Praitunova Infotech">
  <div className="container">
    <div className="section-header center animate-on-scroll animate-fade-up">
      <div className="section-tag"><span className="tag-dot"></span>Why Choose Us</div>
      <h2 className="section-title">The <span>Praitunova Infotech</span> Advantage</h2>
      <p className="section-subtitle">We bring together certified expertise, proven methodologies, and enterprise-grade processes to deliver results that matter.</p>
    </div>

    <div className="why-grid">
      <div className="why-card animate-on-scroll animate-fade-up delay-100" id="why-experienced">
        <div className="why-icon">👥</div>
        <h4>Experienced Team</h4>
        <p>Senior engineers and consultants with 10+ years of enterprise technology experience.</p>
      </div>
      <div className="why-card animate-on-scroll animate-fade-up delay-200" id="why-certified">
        <div className="why-icon">🏆</div>
        <h4>Certified Professionals</h4>
        <p>AWS, Azure, GCP, Salesforce, SAP, and 30+ industry certifications across our team.</p>
      </div>
      <div className="why-card animate-on-scroll animate-fade-up delay-300" id="why-enterprise">
        <div className="why-icon">🏢</div>
        <h4>Enterprise Solutions</h4>
        <p>Solutions designed for enterprise scale from day one — secure, resilient, and scalable.</p>
      </div>
      <div className="why-card animate-on-scroll animate-fade-up delay-400" id="why-support">
        <div className="why-icon">🕐</div>
        <h4>24x7 Support</h4>
        <p>Round-the-clock technical support with guaranteed SLAs and rapid incident response.</p>
      </div>
      <div className="why-card animate-on-scroll animate-fade-up delay-100" id="why-agile">
        <div className="why-icon">⚡</div>
        <h4>Agile Delivery</h4>
        <p>Sprint-based delivery model with transparent progress and continuous business alignment.</p>
      </div>
      <div className="why-card animate-on-scroll animate-fade-up delay-200" id="why-transparent">
        <div className="why-icon">💬</div>
        <h4>Transparent Communication</h4>
        <p>Real-time project visibility through dedicated dashboards, weekly reports, and direct access.</p>
      </div>
      <div className="why-card animate-on-scroll animate-fade-up delay-300" id="why-cost">
        <div className="why-icon">💰</div>
        <h4>Cost Effective</h4>
        <p>Competitive pricing with flexible engagement models — fixed, time &amp; materials, or managed.</p>
      </div>
      <div className="why-card animate-on-scroll animate-fade-up delay-400" id="why-tech">
        <div className="why-icon">🚀</div>
        <h4>Latest Technologies</h4>
        <p>Adoption of cutting-edge tools and frameworks to keep you ahead of the technology curve.</p>
      </div>
      <div className="why-card animate-on-scroll animate-fade-up delay-100" id="why-global">
        <div className="why-icon">🌍</div>
        <h4>Global Standards</h4>
        <p>ISO 9001, CMMI, and GDPR-compliant processes aligned with international best practices.</p>
      </div>
      <div className="why-card animate-on-scroll animate-fade-up delay-200" id="why-satisfaction">
        <div className="why-icon">⭐</div>
        <h4>Customer Satisfaction</h4>
        <p>98% client retention rate built on measurable outcomes and exceptional service delivery.</p>
      </div>
      <div className="why-card animate-on-scroll animate-fade-up delay-300" id="why-scalable">
        <div className="why-icon">📈</div>
        <h4>Scalable Solutions</h4>
        <p>Architecture designed to grow with your business — from startup to enterprise at any scale.</p>
      </div>
      <div className="why-card animate-on-scroll animate-fade-up delay-400" id="why-partnership">
        <div className="why-icon">🤝</div>
        <h4>Long-term Partnership</h4>
        <p>We invest in your success as a strategic partner, not just a vendor — for the long haul.</p>
      </div>
    </div>
  </div>
</section>

{/*  =============================================
     CONSULTATION CTA BAND
=============================================  */}
<div className="cta-band" aria-label="Free consultation call to action">
  <div className="container">
    <div className="cta-band-content animate-on-scroll animate-scale-in">
      <h2>Ready to Transform Your Business?</h2>
      <p>Schedule a free 45-minute consultation with our enterprise technology experts and discover how we can accelerate your growth.</p>
      <div className="btn-group">
        <a href="#contact" className="btn btn-white btn-lg" id="cta-schedule-btn">
          Schedule Free Consultation
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="tel:+919082110849" className="btn btn-outline-white btn-lg" id="cta-call-btn">
          📞 Call Us Now
        </a>
      </div>
    </div>
  </div>
</div>

{/*  =============================================
     OUR PROCESS
=============================================  */}
<section id="process" className="section-padding" aria-label="Our delivery process">
  <div className="container">
    <div className="section-header center animate-on-scroll animate-fade-up">
      <div className="section-tag"><span className="tag-dot"></span>Our Process</div>
      <h2 className="section-title">How We <span>Deliver Excellence</span></h2>
      <p className="section-subtitle">A proven 8-step delivery framework that ensures consistent quality, transparency, and value at every stage of your project.</p>
    </div>

    <div className="process-container">
      {/*  Timeline line  */}
      <div className="process-line">
        <div className="process-line-fill"></div>
      </div>

      <div className="process-grid">
        <div className="process-step animate-on-scroll animate-fade-up delay-100" id="process-step-1">
          <div className="process-step-number">01</div>
          <div className="process-step-icon">🔍</div>
          <div className="process-step-title">Requirement Gathering</div>
          <div className="process-step-desc">Deep dive into your business objectives, challenges, and success metrics.</div>
        </div>
        <div className="process-step animate-on-scroll animate-fade-up delay-200" id="process-step-2">
          <div className="process-step-number">02</div>
          <div className="process-step-icon">📊</div>
          <div className="process-step-title">Business Analysis</div>
          <div className="process-step-desc">Comprehensive analysis and feasibility study with ROI projections.</div>
        </div>
        <div className="process-step animate-on-scroll animate-fade-up delay-300" id="process-step-3">
          <div className="process-step-number">03</div>
          <div className="process-step-icon">🗺️</div>
          <div className="process-step-title">Planning</div>
          <div className="process-step-desc">Detailed project roadmap, resource allocation, and timeline definition.</div>
        </div>
        <div className="process-step animate-on-scroll animate-fade-up delay-400" id="process-step-4">
          <div className="process-step-number">04</div>
          <div className="process-step-icon">🏗️</div>
          <div className="process-step-title">Architecture</div>
          <div className="process-step-desc">Enterprise-grade solution design with scalability and security at core.</div>
        </div>
        <div className="process-step animate-on-scroll animate-fade-up delay-100" id="process-step-5">
          <div className="process-step-number">05</div>
          <div className="process-step-icon">💻</div>
          <div className="process-step-title">Development</div>
          <div className="process-step-desc">Agile sprints with continuous demos, code reviews, and stakeholder alignment.</div>
        </div>
        <div className="process-step animate-on-scroll animate-fade-up delay-200" id="process-step-6">
          <div className="process-step-number">06</div>
          <div className="process-step-icon">🧪</div>
          <div className="process-step-title">Testing</div>
          <div className="process-step-desc">Rigorous QA — unit, integration, performance, and security testing.</div>
        </div>
        <div className="process-step animate-on-scroll animate-fade-up delay-300" id="process-step-7">
          <div className="process-step-number">07</div>
          <div className="process-step-icon">🚀</div>
          <div className="process-step-title">Deployment</div>
          <div className="process-step-desc">Zero-downtime deployment with rollback strategies and monitoring setup.</div>
        </div>
        <div className="process-step animate-on-scroll animate-fade-up delay-400" id="process-step-8">
          <div className="process-step-number">08</div>
          <div className="process-step-icon">🛟</div>
          <div className="process-step-title">Support</div>
          <div className="process-step-desc">Ongoing maintenance, optimization, SLA-backed support, and future roadmap.</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  =============================================
     TECHNOLOGIES
=============================================  */}
<section id="technologies" className="section-padding" aria-label="Technologies we use">
  <div className="container">
    <div className="section-header center animate-on-scroll animate-fade-up">
      <div className="section-tag"><span className="tag-dot"></span>Technology Stack</div>
      <h2 className="section-title">Powered by <span>Modern Technologies</span></h2>
      <p className="section-subtitle">We leverage the latest tools, frameworks, and cloud platforms to build enterprise-grade solutions that stand the test of time.</p>
    </div>

    <div className="tech-categories">
      {/*  Frontend  */}
      <div className="animate-on-scroll animate-fade-up delay-100">
        <div className="tech-category-label">Frontend</div>
        <div className="tech-pills">
          <div className="tech-pill"><span className="tech-pill-icon">⚛️</span>React</div>
          <div className="tech-pill"><span className="tech-pill-icon">▲</span>Next.js</div>
          <div className="tech-pill"><span className="tech-pill-icon">🅰️</span>Angular</div>
          <div className="tech-pill"><span className="tech-pill-icon">💚</span>Vue.js</div>
          <div className="tech-pill"><span className="tech-pill-icon">🌐</span>HTML5</div>
          <div className="tech-pill"><span className="tech-pill-icon">🎨</span>CSS3</div>
          <div className="tech-pill"><span className="tech-pill-icon">🟨</span>JavaScript</div>
          <div className="tech-pill"><span className="tech-pill-icon">🔷</span>TypeScript</div>
        </div>
      </div>

      {/*  Backend  */}
      <div className="animate-on-scroll animate-fade-up delay-200">
        <div className="tech-category-label">Backend</div>
        <div className="tech-pills">
          <div className="tech-pill"><span className="tech-pill-icon">🐍</span>Python</div>
          <div className="tech-pill"><span className="tech-pill-icon">☕</span>Java</div>
          <div className="tech-pill"><span className="tech-pill-icon">🟢</span>Node.js</div>
          <div className="tech-pill"><span className="tech-pill-icon">🔷</span>.NET</div>
          <div className="tech-pill"><span className="tech-pill-icon">🐘</span>PHP</div>
          <div className="tech-pill"><span className="tech-pill-icon">🐹</span>Go</div>
          <div className="tech-pill"><span className="tech-pill-icon">💎</span>Ruby</div>
        </div>
      </div>

      {/*  Databases  */}
      <div className="animate-on-scroll animate-fade-up delay-300">
        <div className="tech-category-label">Databases</div>
        <div className="tech-pills">
          <div className="tech-pill"><span className="tech-pill-icon">🐘</span>PostgreSQL</div>
          <div className="tech-pill"><span className="tech-pill-icon">🐬</span>MySQL</div>
          <div className="tech-pill"><span className="tech-pill-icon">🗄️</span>MSSQL</div>
          <div className="tech-pill"><span className="tech-pill-icon">🍃</span>MongoDB</div>
          <div className="tech-pill"><span className="tech-pill-icon">🔴</span>Redis</div>
          <div className="tech-pill"><span className="tech-pill-icon">🟠</span>Oracle</div>
          <div className="tech-pill"><span className="tech-pill-icon">❄️</span>Snowflake</div>
          <div className="tech-pill"><span className="tech-pill-icon">🔥</span>Firebase</div>
        </div>
      </div>

      {/*  Cloud & DevOps  */}
      <div className="animate-on-scroll animate-fade-up delay-400">
        <div className="tech-category-label">Cloud &amp; DevOps</div>
        <div className="tech-pills">
          <div className="tech-pill"><span className="tech-pill-icon">☁️</span>AWS</div>
          <div className="tech-pill"><span className="tech-pill-icon">🔵</span>Azure</div>
          <div className="tech-pill"><span className="tech-pill-icon">🌈</span>Google Cloud</div>
          <div className="tech-pill"><span className="tech-pill-icon">🐳</span>Docker</div>
          <div className="tech-pill"><span className="tech-pill-icon">⎈</span>Kubernetes</div>
          <div className="tech-pill"><span className="tech-pill-icon">🔧</span>Terraform</div>
          <div className="tech-pill"><span className="tech-pill-icon">🔄</span>Jenkins</div>
          <div className="tech-pill"><span className="tech-pill-icon">🦊</span>GitLab CI</div>
        </div>
      </div>

      {/*  AI & Machine Learning  */}
      <div className="animate-on-scroll animate-fade-up delay-100">
        <div className="tech-category-label">AI &amp; Machine Learning</div>
        <div className="tech-pills">
          <div className="tech-pill"><span className="tech-pill-icon">🤖</span>OpenAI GPT</div>
          <div className="tech-pill"><span className="tech-pill-icon">🧠</span>Claude AI</div>
          <div className="tech-pill"><span className="tech-pill-icon">💫</span>Gemini</div>
          <div className="tech-pill"><span className="tech-pill-icon">🔗</span>LangChain</div>
          <div className="tech-pill"><span className="tech-pill-icon">🕸️</span>LangGraph</div>
          <div className="tech-pill"><span className="tech-pill-icon">🔥</span>PyTorch</div>
          <div className="tech-pill"><span className="tech-pill-icon">🌊</span>TensorFlow</div>
          <div className="tech-pill"><span className="tech-pill-icon">🤗</span>HuggingFace</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  =============================================
     TESTIMONIALS
=============================================  */}
<section id="testimonials" className="section-padding" aria-label="Client testimonials">
  <div className="container">
    <div className="section-header center animate-on-scroll animate-fade-up">
      <div className="section-tag"><span className="tag-dot"></span>Testimonials</div>
      <h2 className="section-title">What Our <span>Clients Say</span></h2>
      <p className="section-subtitle">Trusted by 300+ enterprises globally — here&apos;s what industry leaders say about partnering with Praitunova Infotech.</p>
    </div>

    <div className="testimonials-wrapper animate-on-scroll animate-fade-up delay-200">
      <div className="testimonials-track">
        {/*  Testimonial 1  */}
        <div className="testimonial-slide">
          <div className="testimonial-card">
            <div className="testimonial-quote-icon">&quot;</div>
            <div className="testimonial-stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="testimonial-text">&quot;Praitunova Infotech transformed our entire IT infrastructure within 6 months. Their team&apos;s technical depth and professionalism is unmatched. We&apos;ve seen a 45% reduction in operational costs and our systems are more reliable than ever.&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">RK</div>
              <div className="testimonial-author-info">
                <h4>Rajesh Kumar</h4>
                <p>CTO, MedCare Hospital Group</p>
              </div>
            </div>
          </div>
        </div>

        {/*  Testimonial 2  */}
        <div className="testimonial-slide">
          <div className="testimonial-card">
            <div className="testimonial-quote-icon">&quot;</div>
            <div className="testimonial-stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="testimonial-text">&quot;The AI solution developed by Praitunova Infotech has completely changed how we do demand forecasting. Their team understood our business deeply and delivered a solution that exceeded every expectation we had.&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">PS</div>
              <div className="testimonial-author-info">
                <h4>Priya Sharma</h4>
                <p>VP Technology, RetailMax India</p>
              </div>
            </div>
          </div>
        </div>

        {/*  Testimonial 3  */}
        <div className="testimonial-slide">
          <div className="testimonial-card">
            <div className="testimonial-quote-icon">&quot;</div>
            <div className="testimonial-stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="testimonial-text">&quot;Outstanding cloud migration execution. Praitunova Infotech moved our entire on-premise setup to AWS with zero downtime over a weekend. Their project management and communication throughout was exemplary.&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">AM</div>
              <div className="testimonial-author-info">
                <h4>Aditya Mehta</h4>
                <p>Director IT, FinSecure Financial Services</p>
              </div>
            </div>
          </div>
        </div>

        {/*  Testimonial 4  */}
        <div className="testimonial-slide">
          <div className="testimonial-card">
            <div className="testimonial-quote-icon">&quot;</div>
            <div className="testimonial-stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="testimonial-text">&quot;Their workforce management solutions are top-notch. They staffed our entire logistics operation within 2 weeks during peak season. The quality of professionals they provide is consistently excellent.&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">SJ</div>
              <div className="testimonial-author-info">
                <h4>Sunita Joshi</h4>
                <p>Operations Director, FastMove Logistics</p>
              </div>
            </div>
          </div>
        </div>

        {/*  Testimonial 5  */}
        <div className="testimonial-slide">
          <div className="testimonial-card">
            <div className="testimonial-quote-icon">&quot;</div>
            <div className="testimonial-stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="testimonial-text">&quot;We&apos;ve been working with Praitunova Infotech for 4 years. They&apos;re not just a vendor — they&apos;re a strategic technology partner. Their proactive approach to identifying improvements in our systems is invaluable.&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">VR</div>
              <div className="testimonial-author-info">
                <h4>Vikram Rao</h4>
                <p>CEO, BuildTech Construction Ltd.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-btn prev" aria-label="Previous testimonial">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div className="carousel-dots">
          <div className="carousel-dot active"></div>
          <div className="carousel-dot"></div>
          <div className="carousel-dot"></div>
          <div className="carousel-dot"></div>
          <div className="carousel-dot"></div>
        </div>
        <button className="carousel-btn next" aria-label="Next testimonial">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </div>
</section>

{/*  =============================================
     FAQ SECTION
=============================================  */}
<section id="faq" className="section-padding" aria-label="Frequently asked questions">
  <div className="container">
    <div className="faq-grid">
      {/*  Left  */}
      <div className="faq-left">
        <div className="faq-intro animate-on-scroll animate-fade-right">
          <div className="section-tag"><span className="tag-dot"></span>FAQ</div>
          <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
          <p className="section-subtitle">Have questions about our services, engagement models, or how we work? Find answers below or reach out to our team directly.</p>
          <div style={{'marginTop': "32px"}}>
            <a href="#contact" className="btn btn-primary" id="faq-contact-btn">
              Still have questions?
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          {/*  Quick stats  */}
          <div style={{'marginTop': "40px", 'display': "flex", 'flexDirection': "column", 'gap': "16px"}}>
            <div style={{'display': "flex", 'alignItems': "center", 'gap': "12px", 'background': "var(--bg)", 'border': "1px solid var(--border)", 'borderRadius': "12px", 'padding': "16px"}}>
              <span style={{'fontSize': "1.5rem"}}>⏱️</span>
              <div>
                <div style={{'fontWeight': "700", 'color': "var(--navy)", 'fontFamily': "var(--font-heading)", 'fontSize': "0.9rem"}}>2hr Response Time</div>
                <div style={{'fontSize': "0.8rem", 'color': "var(--muted)"}}>Average first response to inquiries</div>
              </div>
            </div>
            <div style={{'display': "flex", 'alignItems': "center", 'gap': "12px", 'background': "var(--bg)", 'border': "1px solid var(--border)", 'borderRadius': "12px", 'padding': "16px"}}>
              <span style={{'fontSize': "1.5rem"}}>✅</span>
              <div>
                <div style={{'fontWeight': "700", 'color': "var(--navy)", 'fontFamily': "var(--font-heading)", 'fontSize': "0.9rem"}}>Free Initial Consultation</div>
                <div style={{'fontSize': "0.8rem", 'color': "var(--muted)"}}>45-minute call with our expert team</div>
              </div>
            </div>
            <div style={{'display': "flex", 'alignItems': "center", 'gap': "12px", 'background': "var(--bg)", 'border': "1px solid var(--border)", 'borderRadius': "12px", 'padding': "16px"}}>
              <span style={{'fontSize': "1.5rem"}}>📄</span>
              <div>
                <div style={{'fontWeight': "700", 'color': "var(--navy)", 'fontFamily': "var(--font-heading)", 'fontSize': "0.9rem"}}>Free Proposal</div>
                <div style={{'fontSize': "0.8rem", 'color': "var(--muted)"}}>Detailed SOW within 48 hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Right: Accordion  */}
      <div className="animate-on-scroll animate-fade-left delay-200">
        <div className="faq-list">
          <div className="faq-item" id="faq-1">
            <div className="faq-question">
              <h4>What types of IT services does Praitunova Infotech offer?</h4>
              <div className="faq-toggle">+</div>
            </div>
            <div className="faq-answer">
              <p>We offer a comprehensive suite of IT services including software development, cloud solutions, AI &amp; ML, cybersecurity, ERP/CRM implementations, IT consulting, DevOps, data analytics, UI/UX design, managed IT services, and digital transformation. We also provide non-IT workforce solutions including staffing, recruitment, and payroll management.</p>
            </div>
          </div>

          <div className="faq-item" id="faq-2">
            <div className="faq-question">
              <h4>How do you price your services?</h4>
              <div className="faq-toggle">+</div>
            </div>
            <div className="faq-answer">
              <p>We offer flexible engagement models to suit different business needs: Fixed Price (defined scope and timeline), Time &amp; Materials (flexible scope with hourly billing), Dedicated Team (monthly retainer for a dedicated resource pool), and Managed Services (monthly subscription for ongoing support). We provide detailed proposals with transparent pricing — no hidden costs.</p>
            </div>
          </div>

          <div className="faq-item" id="faq-3">
            <div className="faq-question">
              <h4>What industries do you specialize in?</h4>
              <div className="faq-toggle">+</div>
            </div>
            <div className="faq-answer">
              <p>We have deep domain expertise in Healthcare, Finance &amp; Banking, Manufacturing, Retail &amp; E-Commerce, Education, Government, Energy, Construction, Logistics, Automotive, Telecommunications, Hospitality, Pharmaceuticals, and Real Estate — 15+ industries with proven track records.</p>
            </div>
          </div>

          <div className="faq-item" id="faq-4">
            <div className="faq-question">
              <h4>Do you provide 24/7 technical support?</h4>
              <div className="faq-toggle">+</div>
            </div>
            <div className="faq-answer">
              <p>Yes, we offer round-the-clock technical support with guaranteed SLAs (Service Level Agreements). Our support packages range from business hours (9am-6pm) to full 24/7/365 enterprise support with dedicated account managers, monitoring dashboards, and incident response under 1 hour for critical issues.</p>
            </div>
          </div>

          <div className="faq-item" id="faq-5">
            <div className="faq-question">
              <h4>How long does a typical IT project take?</h4>
              <div className="faq-toggle">+</div>
            </div>
            <div className="faq-answer">
              <p>Project timelines vary based on scope and complexity. Typical ranges: Small projects (4–8 weeks), Medium enterprise projects (3–6 months), Large digital transformation programs (6–18 months). We provide detailed project plans during the proposal phase with clear milestones and deliverables.</p>
            </div>
          </div>

          <div className="faq-item" id="faq-6">
            <div className="faq-question">
              <h4>How do you handle data security and compliance?</h4>
              <div className="faq-toggle">+</div>
            </div>
            <div className="faq-answer">
              <p>Security is foundational to everything we build. We follow ISO 27001, GDPR, HIPAA, and SOC 2 compliance frameworks. Our practices include end-to-end encryption, secure code reviews, penetration testing, NDA agreements, and compliance-first architecture design. All team members undergo background verification and security training.</p>
            </div>
          </div>

          <div className="faq-item" id="faq-7">
            <div className="faq-question">
              <h4>Can you help with hiring IT professionals for our company?</h4>
              <div className="faq-toggle">+</div>
            </div>
            <div className="faq-answer">
              <p>Absolutely. Our IT recruitment division specializes in placing permanent, contract, and contract-to-hire technology professionals. We maintain a talent pool of 1,000+ vetted IT professionals across software development, cloud, AI, cybersecurity, and more. Typical placement time is 5–15 business days.</p>
            </div>
          </div>

          <div className="faq-item" id="faq-8">
            <div className="faq-question">
              <h4>Do you work with startups or only large enterprises?</h4>
              <div className="faq-toggle">+</div>
            </div>
            <div className="faq-answer">
              <p>We work with organizations of all sizes — from funded startups building their first product to multinational corporations running global operations. Our solutions are designed to scale with your business. We have specific startup-friendly packages with MVP development, lean cloud architecture, and growth-oriented pricing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  =============================================
     CAREERS SECTION
=============================================  */}
<section id="careers" className="section-padding" aria-label="Careers at Praitunova Infotech">
  <div className="container">
    <div className="careers-layout">
      {/*  Left: Job Cards  */}
      <div>
        <div className="section-tag" style={{'background': "rgba(255,255,255,0.06)", 'borderColor': "rgba(255,255,255,0.12)", 'color': "#38BDF8", 'marginBottom': "16px"}}><span className="tag-dot" style={{'background': "#38BDF8"}}></span>Open Positions</div>
        <h2 className="section-title animate-on-scroll animate-fade-right" style={{'color': "#fff"}}>Join Our <span style={{'background': "linear-gradient(135deg,#38BDF8,#06B6D4)", 'WebkitBackgroundClip': "text", 'WebkitTextFillColor': "transparent"}}>Growing Team</span></h2>
        <p style={{'color': "rgba(255,255,255,0.6)", 'marginBottom': "32px"}} className="animate-on-scroll animate-fade-right delay-100">Be part of a team building the future of enterprise technology. We&apos;re always looking for passionate, talented professionals.</p>

        <div className="job-cards animate-on-scroll animate-fade-right delay-200">
          <div className="job-card" id="job-1">
            <div className="job-info">
              <h4>Senior Full-Stack Developer</h4>
              <p>Mumbai • 5-8 years experience</p>
            </div>
            <div className="job-tags">
              <span className="job-tag">Full-time</span>
              <span className="job-tag">Remote</span>
            </div>
            <a href="#contact" className="job-apply-btn">Apply</a>
          </div>

          <div className="job-card" id="job-2">
            <div className="job-info">
              <h4>Cloud Solutions Architect</h4>
              <p>Mumbai • 8+ years experience</p>
            </div>
            <div className="job-tags">
              <span className="job-tag">Full-time</span>
              <span className="job-tag">Hybrid</span>
            </div>
            <a href="#contact" className="job-apply-btn">Apply</a>
          </div>

          <div className="job-card" id="job-3">
            <div className="job-info">
              <h4>AI/ML Engineer</h4>
              <p>Hyderabad • 3-6 years experience</p>
            </div>
            <div className="job-tags">
              <span className="job-tag">Full-time</span>
              <span className="job-tag">On-site</span>
            </div>
            <a href="#contact" className="job-apply-btn">Apply</a>
          </div>

          <div className="job-card" id="job-4">
            <div className="job-info">
              <h4>DevOps &amp; Infrastructure Engineer</h4>
              <p>Pune • 4-7 years experience</p>
            </div>
            <div className="job-tags">
              <span className="job-tag">Full-time</span>
              <span className="job-tag">Remote</span>
            </div>
            <a href="#contact" className="job-apply-btn">Apply</a>
          </div>

          <div className="job-card" id="job-5">
            <div className="job-info">
              <h4>IT Recruitment Consultant</h4>
              <p>Delhi • 2-4 years experience</p>
            </div>
            <div className="job-tags">
              <span className="job-tag">Full-time</span>
              <span className="job-tag">Hybrid</span>
            </div>
            <a href="#contact" className="job-apply-btn">Apply</a>
          </div>

          <div className="job-card" id="job-6">
            <div className="job-info">
              <h4>Cybersecurity Analyst</h4>
              <p>Mumbai • 3-5 years experience</p>
            </div>
            <div className="job-tags">
              <span className="job-tag">Full-time</span>
              <span className="job-tag">On-site</span>
            </div>
            <a href="#contact" className="job-apply-btn">Apply</a>
          </div>
        </div>
      </div>

      {/*  Right: CTA + Benefits  */}
      <div className="careers-cta-content animate-on-scroll animate-fade-left delay-200">
        <div style={{'background': "rgba(255,255,255,0.04)", 'border': "1px solid rgba(255,255,255,0.08)", 'borderRadius': "20px", 'padding': "36px", 'marginBottom': "24px"}}>
          <h3 style={{'color': "#fff", 'fontFamily': "var(--font-heading)", 'fontSize': "1.4rem", 'marginBottom': "12px"}}>Life at Praitunova Infotech</h3>
          <p style={{'color': "rgba(255,255,255,0.6)", 'fontSize': "0.9rem", 'lineHeight': "1.7", 'marginBottom': "24px"}}>We foster a culture of innovation, continuous learning, and collaboration. Our team members grow their careers while solving enterprise challenges that matter.</p>

          <div className="benefits-grid">
            <div className="benefit-item">
              <span className="benefit-icon">💰</span>
              <div>
                <h5>Competitive Salary</h5>
                <p>Above-market compensation and performance bonuses</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🏥</span>
              <div>
                <h5>Health Insurance</h5>
                <p>Comprehensive medical coverage for you and family</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📚</span>
              <div>
                <h5>Learning Budget</h5>
                <p>₹50,000/year for certifications and courses</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🏠</span>
              <div>
                <h5>Remote Work</h5>
                <p>Flexible remote and hybrid work options</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🚀</span>
              <div>
                <h5>Fast Growth</h5>
                <p>Clear career paths and rapid promotion cycles</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎉</span>
              <div>
                <h5>Team Culture</h5>
                <p>Fun team events, hackathons, and celebrations</p>
              </div>
            </div>
          </div>

          <a className="upload-btn" href="mailto:Enquiry@Praitunova.com?subject=Job%20Application%20-%20Resume" id="upload-resume-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Email Your Resume
          </a>
        </div>

        <a href="#contact" className="btn btn-primary" style={{'width': "100%", 'justifyContent': "center"}} id="careers-contact-btn">
          Send Your Application
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>

{/*  =============================================
     CONTACT SECTION
=============================================  */}
<section id="contact" className="section-padding" aria-label="Contact Praitunova Infotech">
  <div className="container">
    <div className="section-header center animate-on-scroll animate-fade-up">
      <div className="section-tag"><span className="tag-dot"></span>Get In Touch</div>
      <h2 className="section-title">Let&apos;s Build Something <span>Great Together</span></h2>
      <p className="section-subtitle">Ready to transform your business? Our team of enterprise experts is ready to listen, understand, and deliver solutions that matter.</p>
    </div>

    <div className="contact-grid">
      {/*  Left: Info  */}
      <div className="contact-info animate-on-scroll animate-fade-right">
        <h3>Contact Information</h3>
        <p>Reach out to our team and we&apos;ll get back to you within 2 business hours with a tailored response to your inquiry.</p>

        <div className="contact-details">
          <div className="contact-detail-item">
            <div className="contact-detail-icon">📍</div>
            <div className="contact-detail-text">
              <label>Office Address</label>
              <p>Praitunova Infotech HQ, Tech Park, MG Road<br />Mumbai – 400001, Maharashtra, India</p>
            </div>
          </div>
          <div className="contact-detail-item">
            <div className="contact-detail-icon">📧</div>
            <div className="contact-detail-text">
              <label>Email</label>
              <p><a href="mailto:Enquiry@Praitunova.com">Enquiry@Praitunova.com</a></p>
            </div>
          </div>
          <div className="contact-detail-item">
            <div className="contact-detail-icon">📞</div>
            <div className="contact-detail-text">
              <label>Phone</label>
              <p><a href="tel:+919082110849">+91 90821 10849</a></p>
            </div>
          </div>
          <div className="contact-detail-item">
            <div className="contact-detail-icon">🕐</div>
            <div className="contact-detail-text">
              <label>Working Hours</label>
              <p>Mon – Sat: 9:00 AM – 7:00 PM IST<br />Support: 24/7 Available</p>
            </div>
          </div>
        </div>

        {/*  Map placeholder  */}
        <div className="map-placeholder">
          <span className="map-icon">🗺️</span>
          <p>Praitunova Infotech HQ<br />Tech Park, MG Road, Mumbai</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">View on Google Maps →</a>
        </div>
      </div>

      {/*  Right: Form  */}
      <div className="contact-form-wrapper animate-on-scroll animate-fade-left delay-200">
        <h3 className="form-title">Send Us a Message</h3>
        <form id="contact-form" method="post" noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="contact-name">Full Name *</label>
              <input type="text" id="contact-name" name="name" placeholder="John Smith" maxLength={255} required autoComplete="name" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-company">Company Name</label>
              <input type="text" id="contact-company" name="company" placeholder="Acme Corp" maxLength={255} autoComplete="organization" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email Address *</label>
              <input type="email" id="contact-email" name="email" placeholder="john@company.com" maxLength={254} required autoComplete="email" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-phone">Phone Number</label>
              <input type="tel" id="contact-phone" name="phone" placeholder="+91 90821 10849" maxLength={20} autoComplete="tel" />
            </div>
            <div className="form-group full">
              <label htmlFor="contact-service">Service Interested In</label>
              <select id="contact-service" name="service">
                <option value="">Select a Service...</option>
                <optgroup label="IT Services">
                  <option>Software Development</option>
                  <option>Web Development</option>
                  <option>Mobile App Development</option>
                  <option>Cloud Solutions</option>
                  <option>AI / ML Solutions</option>
                  <option>Cybersecurity</option>
                  <option>ERP / CRM Solutions</option>
                  <option>DevOps &amp; Infrastructure</option>
                  <option>IT Consulting</option>
                  <option>Digital Transformation</option>
                  <option>Managed IT Services</option>
                  <option>Data Analytics</option>
                </optgroup>
                <optgroup label="Staffing &amp; Workforce">
                  <option>IT Recruitment</option>
                  <option>Blue Collar Staffing</option>
                  <option>Contract Staffing</option>
                  <option>Payroll Management</option>
                  <option>Facility Management</option>
                </optgroup>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group full">
              <label htmlFor="contact-message">Message *</label>
              <textarea id="contact-message" name="message" placeholder="Tell us about your project, requirements, timeline, and budget..." maxLength={5000} required></textarea>
            </div>
          </div>
          {/* Honeypot spam trap — hidden from real users, bots tend to fill every field in */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
            <label htmlFor="contact-website">Website</label>
            <input type="text" id="contact-website" name="website" tabIndex="-1" autoComplete="off" />
          </div>
          <p id="contact-status" role="alert" aria-live="polite" style={{ display: 'none', margin: '0 0 14px', fontSize: '0.88rem', fontWeight: 500 }}></p>
          <button type="submit" className="btn btn-primary form-submit" id="contact-submit-btn">
            Send Message
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

{/*  =============================================
     FOOTER
=============================================  */}
<footer id="footer" role="contentinfo">
  <div className="container">
    <div className="footer-grid">
      {/*  Brand  */}
      <div className="footer-brand">
        <div style={{'display': "flex", 'alignItems': "center", 'gap': "10px", 'marginBottom': "16px"}}>
          <Image src="/assets/logo.jpeg" alt="Praitunova Infotech Logo" width={60} height={60} style={{'width': "60px", 'height': "60px", 'objectFit': "contain", 'marginBottom': "0"}} loading="lazy" />
          <div>
            <h3 style={{'margin': "0", 'fontSize': "1.1rem"}}>Praitunova Infotech</h3>
            <div style={{'fontSize': "0.65rem", 'color': "rgba(255,255,255,0.35)", 'letterSpacing': "2px", 'textTransform': "uppercase"}}>Technology &amp; Talent</div>
          </div>
        </div>
        <p>Empowering businesses through technology, talent, and digital transformation. Enterprise IT solutions trusted by 300+ companies worldwide.</p>

        {/*  Social  */}
        <div className="footer-social">
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="Twitter">𝕏</a>
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">ig</a>
          <a href="#" aria-label="YouTube">▶</a>
        </div>

        {/*  Certifications  */}
        <div className="footer-certifications">
          <div className="cert-badge">🏆 ISO 9001</div>
          <div className="cert-badge">☁️ AWS Partner</div>
          <div className="cert-badge">🔷 Azure Partner</div>
          <div className="cert-badge">🔐 ISO 27001</div>
        </div>
      </div>

      {/*  Quick Links  */}
      <div className="footer-col">
        <h4>Company</h4>
        <ul className="footer-links">
          <li><a href="#about">About Us</a></li>
          <li><a href="#why-us">Why Choose Us</a></li>
          <li><a href="#process">Our Process</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#careers">Careers</a></li>
        </ul>
      </div>

      {/*  IT Services  */}
      <div className="footer-col">
        <h4>IT Services</h4>
        <ul className="footer-links">
          <li><a href="#services">Software Development</a></li>
          <li><a href="#services">Cloud Solutions</a></li>
          <li><a href="#services">AI Solutions</a></li>
          <li><a href="#services">Cybersecurity</a></li>
          <li><a href="#services">DevOps</a></li>
          <li><a href="#services">IT Consulting</a></li>
        </ul>
      </div>

      {/*  Workforce  */}
      <div className="footer-col">
        <h4>Workforce</h4>
        <ul className="footer-links">
          <li><a href="#non-it-services">IT Recruitment</a></li>
          <li><a href="#non-it-services">Industrial Staffing</a></li>
          <li><a href="#non-it-services">Contract Staffing</a></li>
          <li><a href="#non-it-services">Payroll Management</a></li>
          <li><a href="#non-it-services">Facility Management</a></li>
          <li><a href="#non-it-services">Security Services</a></li>
        </ul>
      </div>

      {/*  Newsletter  */}
      <div className="footer-col">
        <h4>Stay Updated</h4>
        <p className="newsletter-title">Subscribe for technology insights, industry news, and company updates.</p>
        <form className="newsletter-form" id="newsletter-form" method="post" noValidate>
          <input className="newsletter-input" type="email" placeholder="Your email address" aria-label="Email for newsletter" required />
          <button className="newsletter-btn" type="submit" id="newsletter-submit-btn">Subscribe</button>
        </form>

        <div style={{'marginTop': "24px"}}>
          <h4 style={{'fontSize': "0.82rem", 'color': "rgba(255,255,255,0.6)", 'marginBottom': "12px"}}>Contact</h4>
          <div style={{'display': "flex", 'flexDirection': "column", 'gap': "8px"}}>
            <a href="mailto:Enquiry@Praitunova.com" style={{'fontSize': "0.82rem", 'color': "rgba(255,255,255,0.45)", 'display': "flex", 'alignItems': "center", 'gap': "6px"}}>📧 Enquiry@Praitunova.com</a>
            <a href="tel:+919082110849" style={{'fontSize': "0.82rem", 'color': "rgba(255,255,255,0.45)", 'display': "flex", 'alignItems': "center", 'gap': "6px"}}>📞 +91 90821 10849</a>
            <div style={{'fontSize': "0.82rem", 'color': "rgba(255,255,255,0.35)", 'display': "flex", 'alignItems': "center", 'gap': "6px"}}>📍 Mumbai, India</div>
          </div>
        </div>
      </div>
    </div>

    {/*  Footer Bottom  */}
    <div className="footer-bottom">
      <p suppressHydrationWarning>© {new Date().getFullYear()} Praitunova Infotech. All rights reserved.</p>
      <div className="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
        <a href="#">Sitemap</a>
      </div>
    </div>
  </div>
</footer>

{/*  =============================================
     FLOATING BUTTONS
=============================================  */}
{/*  Scroll to Top  */}
<button className="scroll-top-btn" aria-label="Scroll to top" id="scroll-top-btn">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
    <path d="M18 15l-6-6-6 6"/>
  </svg>
</button>

{/*  =============================================
     COOKIE CONSENT
=============================================  */}
<div className="cookie-banner" role="dialog" aria-label="Cookie consent" aria-modal="true" id="cookie-banner">
  <p>We use cookies to enhance your experience, analyze site traffic, and serve personalized content. By clicking &quot;Accept&quot;, you agree to our <a href="#">Cookie Policy</a>.</p>
  <div className="cookie-actions">
    <button className="cookie-accept" id="cookie-accept-btn">Accept All</button>
    <button className="cookie-decline" id="cookie-decline-btn">Decline</button>
  </div>
</div>

{/*  =============================================
     SERVICE MODAL
=============================================  */}
<div id="svc-modal-overlay" role="dialog" aria-modal="true" aria-label="Service details">
  <div className="svc-modal" id="svc-modal">
    <button className="svc-modal-close" id="svc-modal-close" aria-label="Close modal">&#10005;</button>
    <div className="svc-modal-header">
      <div className="svc-modal-icon-wrap" id="svc-modal-icon"></div>
      <div>
        <span className="svc-modal-tag" id="svc-modal-tag"></span>
        <h3 id="svc-modal-title"></h3>
      </div>
    </div>
    <div id="svc-modal-body"></div>
    <a href="#contact" className="svc-modal-cta" id="svc-modal-cta" onClick={() => closeSvcModal()}>
      Get a Free Consultation
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  </div>
</div>

{/*  =============================================
     SCRIPTS
=============================================  */}


    </>
  );
}
