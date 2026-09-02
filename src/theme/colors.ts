/**
 * MBF Design System — paleta "Golden Hour Walk"
 *
 * Direção: um app de cuidado com pet deve parecer tão acolhedor quanto
 * o momento de chegar em casa e ser recebido pelo cachorro. Em vez do
 * bege+terracota genérico, usamos um verde-musgo (confiança, natureza,
 * passeios) como cor de marca, com um amarelo-marigold como acento de
 * energia/gamificação e um coral para saúde/lembretes — as três cores
 * que aparecem juntas numa coleira, numa bolinha e num pôr do sol.
 */

export const palette = {
  moss900: '#16321F',
  moss700: '#245C3A',
  moss500: '#2F6E4F',
  moss300: '#6FA787',
  moss100: '#DCEBE1',

  marigold500: '#F2A93B',
  marigold300: '#F7C878',
  marigold100: '#FCEBD1',

  coral500: '#FF6F59',
  coral300: '#FF9C8C',
  coral100: '#FFE3DD',

  sand50: '#FBF3E7',
  sand100: '#F5E9D8',
  sand200: '#ECDBC1',

  ink900: '#2B2418',
  ink600: '#5B5140',
  ink400: '#8A8071',
  ink200: '#C7BFAF',

  white: '#FFFFFF',
  danger: '#D64545',
  success: '#2F6E4F',
} as const;

export const theme = {
  color: {
    background: palette.sand50,
    surface: palette.white,
    surfaceAlt: palette.sand100,
    brand: palette.moss500,
    brandDark: palette.moss700,
    brandSoft: palette.moss100,
    accent: palette.marigold500,
    accentSoft: palette.marigold100,
    health: palette.coral500,
    healthSoft: palette.coral100,
    text: palette.ink900,
    textMuted: palette.ink600,
    textFaint: palette.ink400,
    border: palette.sand200,
    danger: palette.danger,
    white: palette.white,
  },
  radius: {
    sm: 12,
    md: 18,
    lg: 24,
    pill: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  shadow: {
    card: {
      shadowColor: '#2B2418',
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
  },
} as const;

export type Theme = typeof theme;
