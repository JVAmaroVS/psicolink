/**
 * CONTROLLER — home.js
 * Constrói os quick-cards dinamicamente a partir do Model (CONDITIONS).
 */

const HomeController = (() => {

  function renderQuickCards(container) {
    CONDITIONS.forEach((cond) => {
      const card = document.createElement("div");
      card.className = "quick-card";
      // Navigate to informacoes.html and deep-link via hash
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.innerHTML = `
        <div class="quick-card-title">${cond.label}</div>
        <div class="quick-card-sub">${cond.quickSub}</div>
      `;

      const navigate = () => {
        window.location.href = `informacoes.html#${cond.id}`;
      };

      card.addEventListener("click", navigate);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") navigate();
      });

      container.appendChild(card);
    });
  }

  function init() {
    const grid = document.getElementById("quick-cards-grid");
    if (!grid) return;
    renderQuickCards(grid);
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", HomeController.init);
