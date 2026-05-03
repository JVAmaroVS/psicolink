/**
 * CONTROLLER — informacoes.js
 * Constrói dinamicamente os cards e abas de condições a partir do Model,
 * e gerencia a troca de card ativo.
 */

const InformacoesController = (() => {

  /* ── Render ── */

  function renderTabs(container) {
    CONDITIONS.forEach((cond, i) => {
      const btn = document.createElement("button");
      btn.className = "tab-btn" + (i === 0 ? " active" : "");
      btn.textContent = cond.label;
      btn.dataset.id = cond.id;
      btn.addEventListener("click", () => showCondition(cond.id, btn));
      container.appendChild(btn);
    });
  }

  function renderCards(container) {
    CONDITIONS.forEach((cond, i) => {
      const card = document.createElement("div");
      card.id = `card-${cond.id}`;
      card.className = "condition-card" + (i === 0 ? " visible" : "");

      card.innerHTML = `
        <h3>${cond.title}</h3>
        <p class="desc">${cond.description}</p>
        <div class="symptom-grid">
          <div class="symptom-block">
            <h4>Sintomas comuns</h4>
            <ul>${cond.commonSymptoms.map(s => `<li>${s}</li>`).join("")}</ul>
          </div>
          <div class="symptom-block rare">
            <h4>Sintomas menos conhecidos</h4>
            <ul>${cond.rareSymptoms.map(s => `<li>${s}</li>`).join("")}</ul>
          </div>
        </div>
        <div class="causes-row">
          <h4>Possíveis causas</h4>
          <div class="cause-tags">
            ${cond.causes.map(c => `<span class="cause-tag">${c}</span>`).join("")}
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  /* ── Interaction ── */

  function showCondition(id, activeBtn) {
    document.querySelectorAll(".condition-card").forEach(c => c.classList.remove("visible"));
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));

    const card = document.getElementById(`card-${id}`);
    if (card) card.classList.add("visible");
    if (activeBtn) activeBtn.classList.add("active");
  }

  /* ── Deep-link via URL hash: informacoes.html#burnout ── */

  function checkHash() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const btn = document.querySelector(`.tab-btn[data-id="${hash}"]`);
    if (btn) showCondition(hash, btn);
  }

  /* ── Init ── */

  function init() {
    const tabsContainer = document.getElementById("condition-tabs");
    const cardsContainer = document.getElementById("condition-cards");
    if (!tabsContainer || !cardsContainer) return;

    renderTabs(tabsContainer);
    renderCards(cardsContainer);
    checkHash();

    window.addEventListener("hashchange", checkHash);
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", InformacoesController.init);
