# Política de Segurança

## Versões suportadas

| Versão | Suportada |
|---|---|
| main (atual) | ✅ |

---

## Reportando uma vulnerabilidade

O PsicoLink é um site estático sem back-end próprio, autenticação ou banco de dados. Ainda assim, caso identifique algum problema de segurança (como injeção de conteúdo via parâmetros de URL ou dependências desatualizadas com CVE conhecido), pedimos que **não abra uma issue pública**.

**Como reportar:**

1. Abra uma issue marcada como **confidencial** (se disponível no repositório), ou
2. Entre em contato diretamente pelos canais do projeto antes de divulgar publicamente.

Assim que o problema for confirmado, uma correção será publicada e o relator será creditado (se desejar).

---

## Dependências externas

O projeto carrega recursos de terceiros via CDN:

| Serviço | Finalidade |
|---|---|
| [Leaflet 1.9.4](https://unpkg.com/leaflet) | Mapa interativo |
| [OpenStreetMap](https://tile.openstreetmap.org) | Tiles do mapa |
| [Nominatim](https://nominatim.openstreetmap.org) | Geocodificação |
| [Overpass API](https://overpass-api.de) | Busca de locais |
| [Google Fonts](https://fonts.googleapis.com) | Tipografia |

Nenhuma dessas APIs recebe dados sensíveis do usuário além de coordenadas de localização (apenas quando o usuário concede permissão explícita ao navegador).
