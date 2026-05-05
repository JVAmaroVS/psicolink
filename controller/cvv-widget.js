/**
 * CONTROLLER — cvv-widget.js
 * Renderiza e controla o widget flutuante do CVV.
 * Deve ser carregado em TODOS os HTMLs, após o DOM estar pronto.
 *
 * Comportamento:
 * - Desktop: expande ao passar o mouse (hover via CSS puro)
 * - Mobile:  expande/fecha ao tocar no ícone (toggle via JS)
 *   (hover não existe em touch; o JS garante a experiência)
 */

const CVVWidget = (() => {

  const HTML = `
    <div class="cvv-widget" id="cvv-widget" aria-label="Ajuda em crise — CVV" role="complementary">
      <button
        class="cvv-widget__icon"
        id="cvv-widget-btn"
        aria-label="Abrir informações do CVV"
        aria-expanded="false"
      >
        <img
          src="../images/CVV.png"
          alt="CVV"
          onerror="this.style.display='none'; this.parentElement.insertAdjacentHTML('beforeend', '<span style=\'font-family:Raleway,sans-serif;font-size:11px;font-weight:700;color:#FDFAF5;text-align:center;line-height:1.1\'>CVV</span>')"
        />
      </button>
      <div class="cvv-widget__panel" id="cvv-widget-panel" aria-hidden="true">
        <span class="cvv-widget__label">Precisa de ajuda?</span>
        <span class="cvv-widget__phone">188</span>
        <span class="cvv-widget__sub">Gratuito · 24 horas · Sigilo total</span>
        <a
          class="cvv-widget__link"
          href="https://cvv.org.br"
          target="_blank"
          rel="noopener noreferrer"
        >cvv.org.br →</a>
      </div>
    </div>
  `;

  function isTouchDevice() {
    return window.matchMedia("(hover: none)").matches;
  }

  function init() {
    // Injeta o widget antes do </body>
    document.body.insertAdjacentHTML("beforeend", HTML);

    const widget = document.getElementById("cvv-widget");
    const btn    = document.getElementById("cvv-widget-btn");
    const panel  = document.getElementById("cvv-widget-panel");

    if (!widget || !btn || !panel) return;

    // Em dispositivos touch, o hover CSS não funciona.
    // O JS assume o controle e faz toggle ao tocar.
    if (isTouchDevice()) {
      btn.addEventListener("click", () => {
        const isOpen = widget.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen);
        panel.setAttribute("aria-hidden", !isOpen);
      });

      // Fecha ao tocar fora do widget
      document.addEventListener("click", (e) => {
        if (!widget.contains(e.target)) {
          widget.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
          panel.setAttribute("aria-hidden", "true");
        }
      });
    }
    // Em desktop, o hover é tratado puramente pelo CSS (.cvv-widget:hover)
    // sem necessidade de JS adicional.
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", CVVWidget.init);
