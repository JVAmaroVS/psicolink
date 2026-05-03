/**
 * CONTROLLER — navigation.js
 * Gerencia navegação entre páginas (abas) via links âncora entre HTMLs.
 * Marca o item de nav ativo com base na URL atual.
 */

const NavigationController = (() => {

  const PAGE_MAP = {
    "home.html": "home",
    "informacoes.html": "info",
    "mapa.html": "mapa",
    "sobre.html": "sobre",
    "": "home",   // raiz
  };

  function getCurrentPage() {
    const file = window.location.pathname.split("/").pop();
    return PAGE_MAP[file] ?? "home";
  }

  function highlightActiveNav() {
    const current = getCurrentPage();
    document.querySelectorAll(".ps-nav-links a[data-page]").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === current);
    });
  }

  function toggleMenu() {
    const nav = document.getElementById("nav-links");
    const btn = document.getElementById("hamburger");
    const open = nav.classList.toggle("open");
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
  }

  function init() {
    highlightActiveNav();

    const hamburger = document.getElementById("hamburger");
    if (hamburger) hamburger.addEventListener("click", toggleMenu);

    // Close mobile menu when any nav link is tapped
    document.querySelectorAll(".ps-nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        document.getElementById("nav-links")?.classList.remove("open");
        document.getElementById("hamburger")?.classList.remove("open");
      });
    });
  }

  return { init, getCurrentPage };
})();

document.addEventListener("DOMContentLoaded", NavigationController.init);
