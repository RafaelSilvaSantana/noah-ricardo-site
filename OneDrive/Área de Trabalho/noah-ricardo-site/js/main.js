/* =========================================================
   NOAH RICARDO
   Interações do site
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");


  /* =======================================================
     HEADER AO ROLAR
     ======================================================= */

  const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* =======================================================
     MENU MOBILE
     ======================================================= */

  const closeMenu = () => {

    if (!menuToggle || !mainNav) return;

    menuToggle.classList.remove("active");

    mainNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");

    document.body.classList.remove("menu-open");

  };


  const openMenu = () => {

    if (!menuToggle || !mainNav) return;

    menuToggle.classList.add("active");

    mainNav.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");

    document.body.classList.add("menu-open");

  };


  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });


    navLinks.forEach(link => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });


    document.addEventListener("click", event => {

      if (
        mainNav.classList.contains("open") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }

    });


    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });


    window.addEventListener("resize", () => {

      if (window.innerWidth > 820) {
        closeMenu();
      }

    });

  }


  /* =======================================================
     FAQ
     Mantém apenas uma pergunta aberta por vez
     ======================================================= */

  const faqItems = document.querySelectorAll(".faq details");

  faqItems.forEach(item => {

    item.addEventListener("toggle", () => {

      if (!item.open) return;

      faqItems.forEach(otherItem => {

        if (otherItem !== item) {
          otherItem.open = false;
        }

      });

    });

  });


  /* =======================================================
     ANIMAÇÃO SUAVE DE ENTRADA
     ======================================================= */

  const animatedElements = document.querySelectorAll(
    ".value-card, .feature-card, .process-card, .step-card, .image-frame"
  );


  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.08
      }
    );


    animatedElements.forEach(element => {

      element.classList.add("animate-on-scroll");

      observer.observe(element);

    });

  }


  /* =======================================================
     LINK ATIVO DA NAVEGAÇÃO
     ======================================================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");

        navLinks.forEach(link => {

          link.classList.remove("active");

          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }

        });

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );


  sections.forEach(section => {
    sectionObserver.observe(section);
  });

});