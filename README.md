<div align="center">
  <img src="view/images/PsicoLink.png" alt="PsicoLink" width="180" />
  <h1>PsicoLink</h1>
  <p><strong>Apoio e Conhecimento em Saúde Mental</strong></p>

  ![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
  ![License](https://img.shields.io/badge/licença-MIT-green)
</div>

---

## 📖 Sobre o projeto

O **PsicoLink** é um site educativo de saúde mental com dois pilares:

- **Informação acessível** — explicações claras sobre condições como ansiedade, depressão, burnout, TOC e mais, com sintomas comuns, sintomas menos conhecidos e possíveis causas.
- **Localização de atendimento** — mapa interativo que usa geolocalização para encontrar psicólogos, psiquiatras, clínicas, CAPS e hospitais próximos do usuário, gratuitamente.

> ⚠️ O conteúdo do PsicoLink é **informativo e educativo**. Não substitui consultas com profissionais de saúde mental. Em caso de crise, ligue **188** (CVV, gratuito, 24h).

---

## ✨ Funcionalidades

- 9 condições de saúde mental documentadas com sintomas e causas
- Mapa interativo com geolocalização automática
- Busca manual por cidade ou bairro
- Marcadores coloridos por tipo de serviço (hospital, psicólogo, clínica, CAPS)
- Widget flutuante do CVV visível em todas as páginas
- Design responsivo para desktop e mobile
- Menu hambúrguer para telas pequenas
- Navegação direta para condição via URL (`informacoes.html#burnout`)
- 100% gratuito — sem chaves de API pagas

---

## 🗂️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)** com HTML, CSS e JavaScript separados:

```
PsicoLink/
├── model/
│   ├── conditions.js      # Dados das 9 condições de saúde mental
│   └── mapConfig.js       # Configurações do mapa (URLs, cores, legendas)
│
├── view/
│   ├── pages/
│   │   ├── home.html          # Início
│   │   ├── informacoes.html   # Condições de saúde mental
│   │   ├── mapa.html          # Mapa de atendimento
│   │   └── sobre.html         # Sobre o projeto
│   ├── css/
│   │   ├── global.css         # Reset, variáveis, nav, footer, botões
│   │   ├── home.css           # Hero, quick cards
│   │   ├── informacoes.css    # Tabs, cards de condição, sintomas
│   │   ├── mapa.css           # Mapa, legenda, recursos
│   │   ├── sobre.css          # Bloco sobre
│   │   └── cvv-widget.css     # Widget flutuante do CVV
│   └── images/
│       ├── PsicoLink.png          # Favicon
│       ├── PsicoLinkBrain.png     # Ícone da navbar
│       ├── PsicoLinkNull.png      # Logo da hero
│       └── CVV.png                # Logo do CVV (widget flutuante)
│
└── controller/
    ├── navigation.js      # Destaca nav ativo por URL, menu hambúrguer
    ├── home.js            # Gera quick-cards dinamicamente
    ├── informacoes.js     # Gera tabs e cards, deep-link via hash
    ├── mapa.js            # Leaflet, Overpass API, geolocalização
    └── cvv-widget.js      # Widget flutuante do CVV
```

---

## 🛠️ Stack técnica

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico |
| Estilo | CSS3 com variáveis customizadas |
| Interação | JavaScript vanilla (ES2020+) |
| Mapa | [Leaflet 1.9.4](https://leafletjs.com/) |
| Tiles | [OpenStreetMap](https://www.openstreetmap.org/) |
| Geocodificação | [Nominatim](https://nominatim.org/) |
| Busca de locais | [Overpass API](https://overpass-api.de/) |
| Fontes | Google Fonts (Playfair Display + Raleway) |

Nenhuma dependência paga. Nenhum framework. Nenhum build step.

---

## 🚀 Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/JVAmaroVS/psicolink.git
   cd psicolink
   ```

2. Abra com um servidor local (necessário para que os módulos JS funcionem corretamente entre pastas):

   **Com VS Code:** instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) e clique em **Go Live**.

   **Com Python:**
   ```bash
   python -m http.server 5500
   ```
   Depois acesse `http://localhost:5500/view/pages/home.html`.

> **Atenção:** abrir o `home.html` diretamente pelo explorador de arquivos (`file://`) pode causar erros de CORS nos scripts. Use sempre um servidor local.

---

## 🗺️ Mapa — Como funciona

Ao abrir a aba **Mapa**, o site solicita permissão de geolocalização do navegador. Se concedida, o mapa centraliza na posição do usuário e busca automaticamente serviços de saúde mental próximos.

A busca utiliza a **Overpass API** (dados do OpenStreetMap) e retorna:

| Marcador | Tipo |
|---|---|
| 🔴 Vermelho | Hospitais |
| 🟣 Roxo | Psiquiatras |
| 🟡 Dourado | Psicólogos |
| 🟢 Verde | Clínicas |
| 🔵 Azul | Sua localização |

Se a permissão for negada, o mapa abre normalmente e a busca manual por cidade continua disponível.

> **Limitação conhecida:** o OpenStreetMap depende de dados colaborativos. Em cidades menores, poucos consultórios podem estar cadastrados. Hospitais públicos e CAPS grandes geralmente aparecem bem.

---

## 🆘 Widget CVV

Em todas as páginas do site há um widget flutuante no centro da lateral direita, inspirado no botão VLibras dos sites do governo brasileiro.

- **Desktop:** passe o mouse sobre o ícone para expandir o painel
- **Mobile:** toque no ícone para abrir/fechar

O painel exibe o número **188** (CVV, gratuito, 24h) e o link direto para [cvv.org.br](https://cvv.org.br).

---

## 🧠 Condições documentadas

| Condição | Sintomas comuns | Sintomas menos conhecidos | Causas |
|---|---|---|---|
| Ansiedade | ✅ | ✅ | ✅ |
| Depressão | ✅ | ✅ | ✅ |
| Burnout | ✅ | ✅ | ✅ |
| TOC | ✅ | ✅ | ✅ |
| Síndrome do Pânico | ✅ | ✅ | ✅ |
| TEPT | ✅ | ✅ | ✅ |
| Fobias | ✅ | ✅ | ✅ |
| Transtornos Alimentares | ✅ | ✅ | ✅ |
| Distúrbios do Sono | ✅ | ✅ | ✅ |

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Leia o [CONTRIBUTING.md](CONTRIBUTING.md) para entender como participar.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🆘 Recursos de emergência

Se você ou alguém que você conhece está em crise:

- **CVV:** 188 (gratuito, 24 horas) — [cvv.org.br](https://cvv.org.br)
- **SAMU:** 192
- **Bombeiros:** 193
- **UPA mais próxima:** busque no mapa acima