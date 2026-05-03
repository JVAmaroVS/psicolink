# Contribuindo com o PsicoLink

Obrigado pelo interesse em contribuir! Este documento explica como participar do projeto de forma organizada.

---

## 📋 Antes de começar

- Leia o [README](README.md) para entender a arquitetura e o propósito do projeto.
- Verifique se já existe uma [issue](../../issues) aberta para o que você quer resolver antes de criar uma nova.
- Para mudanças grandes, **abra uma issue primeiro** para discutir a proposta antes de codificar.

---

## 🐛 Reportando bugs

Ao abrir uma issue de bug, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir** (passo a passo)
3. **Comportamento esperado** vs. o que aconteceu
4. **Ambiente:** navegador, sistema operacional, tamanho de tela
5. **Capturas de tela** se aplicável

---

## 💡 Sugerindo melhorias

Ao abrir uma issue de sugestão, inclua:

1. **Qual problema resolve** ou qual experiência melhora
2. **Descrição da solução** proposta
3. **Alternativas consideradas**, se houver

---

## 🔧 Fluxo de contribuição

```bash
# 1. Fork e clone
git clone https://github.com/JVAmaroVS/psicolink.git
cd psicolink

# 2. Crie uma branch com nome descritivo
git checkout -b feat/nova-condicao-bipolaridade
# ou
git checkout -b fix/mapa-geolocation-timeout

# 3. Faça suas alterações

# 4. Commit com mensagem clara (veja convenção abaixo)
git commit -m "feat: adiciona condição Transtorno Bipolar ao model"

# 5. Push e abra um Pull Request
git push origin feat/nova-condicao-bipolaridade
```

---

## 📝 Convenção de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

| Prefixo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Mudanças em documentação |
| `style:` | Formatação, espaçamento (sem mudança de lógica) |
| `refactor:` | Refatoração sem nova funcionalidade ou bug fix |
| `content:` | Adição ou correção de conteúdo de saúde mental |

---

## 🗂️ Onde mexer em cada tipo de mudança

| O que fazer | Arquivo(s) a editar |
|---|---|
| Adicionar nova condição de saúde mental | `model/conditions.js` |
| Alterar texto de sintoma ou causa | `model/conditions.js` |
| Alterar configuração do mapa | `model/mapConfig.js` |
| Corrigir layout da Home | `view/css/home.css` |
| Corrigir layout das condições | `view/css/informacoes.css` |
| Corrigir layout do mapa | `view/css/mapa.css` |
| Alterar lógica de navegação | `controller/navigation.js` |
| Alterar lógica do mapa | `controller/mapa.js` |
| Alterar geração dos quick-cards | `controller/home.js` |
| Alterar geração das tabs/cards | `controller/informacoes.js` |

---

## ➕ Como adicionar uma nova condição de saúde mental

Edite **somente** `model/conditions.js` e adicione um novo objeto ao array `CONDITIONS`:

```js
{
  id: "bipolar",                        // identificador único, sem espaços
  label: "Bipolaridade",                // nome curto (usado nas tabs)
  title: "Transtorno Bipolar",          // nome completo (usado nos cards)
  description: "Descrição clara...",
  commonSymptoms: [
    "Sintoma 1",
    "Sintoma 2",
    // ...
  ],
  rareSymptoms: [
    "Sintoma menos conhecido 1",
    // ...
  ],
  causes: [
    "Causa 1",
    "Causa 2",
    // ...
  ],
  quickSub: "Texto curto para o quick-card da home",
},
```

O card e a tab serão gerados automaticamente pelos controllers — nenhum HTML precisa ser tocado.

---

## ✅ Checklist do Pull Request

Antes de abrir o PR, verifique:

- [ ] O código funciona abrindo via servidor local (não via `file://`)
- [ ] Testado em pelo menos um navegador moderno
- [ ] Não há `console.log` de debug esquecidos
- [ ] Conteúdos de saúde mental foram baseados em fontes confiáveis (DSM-5, CID-11, CFP, OMS)
- [ ] Nenhuma informação de diagnóstico foi adicionada (o site é informativo, não diagnóstico)

---

## 💬 Dúvidas

Abra uma [issue](../../issues) com a label `question` e responderemos assim que possível.
