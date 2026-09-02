# My Best Friend (MBF) — v2

App de cuidados com pets (iOS + Android, Expo/React Native) com controle de
gastos, saúde (vacinas e remédios), banho, atividades da família, fotos de
passeios, dicas e gamificação. Backend: **Supabase** (Postgres + Auth +
Storage + Row Level Security).

Este projeto substitui as versões anteriores do MBF (`backend` Node/Prisma +
`frontend` web + tentativas `mobile`/`mobile2`/`mobile3`/`app4`) por uma base
única em Expo Router, pronta para rodar em iOS e Android a partir do mesmo
código.

## Stack

- **Expo + Expo Router** (TypeScript) — navegação por arquivos, roda em iOS/Android/Web
- **Supabase** — Postgres, Auth (e-mail/senha), Storage (fotos), RLS por família
- **zustand** — estado global leve (sessão, pets, wizard de onboarding)
- **Baloo 2 + Nunito** — tipografia (ver `src/theme`)

## Como rodar

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No SQL Editor do Supabase, rode o arquivo [`supabase/schema.sql`](./supabase/schema.sql)
   inteiro. Ele cria todas as tabelas, a view de gastos unificados e as
   políticas de RLS (cada família só vê seus próprios dados).
3. Em **Project Settings → API**, copie a `Project URL` e a `anon public key`.
4. Copie `.env.example` para `.env` e preencha:
   ```
   EXPO_PUBLIC_SUPABASE_URL=...
   EXPO_PUBLIC_SUPABASE_ANON_KEY=...
   ```
5. Instale as dependências e rode:
   ```bash
   npm install
   npm start        # abre o Expo Dev Tools / QR code
   npm run ios      # requer macOS + Xcode
   npm run android  # requer Android Studio / emulador
   ```
   Para testar rapidamente sem emulador, instale o app **Expo Go** no seu
   celular e escaneie o QR code exibido pelo `npm start`.

## Estrutura de pastas

```
app/                        # rotas (Expo Router = 1 arquivo = 1 tela)
  (onboarding)/              # boas-vindas + wizard do 1º pet (5 passos)
  (auth)/                    # login / cadastro
  (app)/
    (tabs)/                  # Início · Pets · Cuidados · Família · Mais
    pet/[id].tsx             # perfil do pet
    pet/add.tsx              # adicionar novo pet
    care/[type].tsx          # formulário de vacina/remédio/banho
    family/invite.tsx        # convite por código

src/
  theme/                     # paleta, tipografia, espaçamento (design system)
  components/                # Button, Card, Screen, ProgressBar, PawIcon...
  lib/                       # cliente Supabase + regras de cadastro
  store/                     # zustand (sessão, pets ativos, wizard)
  hooks/                     # useDashboardData, useCareItems, useActivityFeed
  types/                     # tipos espelhando as tabelas do Supabase
  data/                      # seeds estáticos (raças, dicas)

supabase/schema.sql          # schema completo + RLS (fonte da verdade dos dados)
```

## Mapeamento funcionalidade → onde está no código

| Funcionalidade solicitada | Tabela(s) Supabase | Tela(s) |
|---|---|---|
| Gastos de ração | `food_purchases` | Início (resumo mensal), Cuidados |
| Vacinas | `vaccines` | `care.tsx` (aba Vacinas), `care/[type].tsx` |
| Remédios (acompanhamento, não só gasto) | `medications`, `medication_logs` | `care.tsx` (aba Remédios) |
| Membros da família + registro do dia a dia | `families`, `family_members`, `activities`, `feeding_logs` | `family.tsx`, `family/invite.tsx` |
| Banho (histórico + gasto) | `baths` | `care.tsx` (aba Banho) |
| Dashboard mensal de gastos | view `expenses_unified` | `index.tsx` (Início) |
| Múltiplos pets | `pets` (por `family_id`) | `pets.tsx`, seletor de pet na Início |
| Dicas (cuidado/alimentação/enriquecimento) | `tips` (com seed local em `src/data/tips.ts`) | `more.tsx` |
| Gamificação | `profiles.xp/level`, `achievements`, `profile_achievements` | cartão de XP em `more.tsx` |
| Fotos de passeio/viagem | `moments` (arquivos no Supabase Storage) | perfil do pet (`pet/[id].tsx`) |

## O que já está funcional

- Onboarding completo (gênero → idade → nome → raça → confirmação) igual ao
  fluxo de referência, com todos os dados salvos ao criar a conta.
- Cadastro/login com Supabase Auth, criação automática de família + primeiro pet.
- Dashboard mensal de gastos por categoria (ração/banho/vacina/remédio),
  puxando dados reais das tabelas via a view `expenses_unified`.
- CRUD básico de vacinas, remédios e banho (criar + listar).
- Registro rápido de atividades da família (passeio, brincadeira, treino,
  alimentação) com feed de "o que rolou hoje".
- Convite de família por código.
- Perfil do pet com atalhos de saúde e galeria de momentos.

## Próximos passos sugeridos (roadmap)

Esta é a fundação da arquitetura — os itens abaixo são o caminho natural de
continuação, cada um encaixando nas tabelas/telas que já existem:

1. **Notificações push** (Expo Notifications) para `vaccines.next_due_date`
   e horários de `medications.frequency_hours`.
2. **Upload de fotos** (Supabase Storage) nas telas de perfil do pet e
   "Momentos" — o bucket e a coluna `photo_url`/`avatar_url` já existem.
3. **Edição e exclusão** nos formulários de cuidados (hoje só criam).
4. **Regras de XP**: incrementar `profiles.xp` a cada `activities`/banho/
   vacina em dia e desbloquear `achievements` (tabela já modelada).
5. **Gráfico de gastos** (ex.: `victory-native` ou `recharts`) na Início,
   comparando meses.
6. **Tela de detalhe de dicas** com conteúdo completo por raça/espécie.
7. **Editar perfil da família** (trocar nome, remover membro).

## Sobre o backend anterior

O backend Node/Express/Prisma (MySQL) do repositório original foi mantido
intacto no histórico do Git para referência, mas não é mais necessário: toda
a lógica de dados migrou para Supabase (Postgres gerenciado + Auth + RLS),
o que elimina a necessidade de manter um servidor Express rodando.
