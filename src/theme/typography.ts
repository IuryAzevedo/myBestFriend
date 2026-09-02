/**
 * Baloo 2 = display: traços arredondados e amigáveis, usado com moderação
 * (títulos, números de destaque, botões principais).
 * Nunito = corpo: rounded sans-serif legível para textos longos e listas.
 * Essa dupla é o "signature" tipográfico do MBF — diferente do padrão
 * bege+serifada que qualquer app "quente" tende a usar por default.
 */
export const fontFamily = {
  display: 'Baloo2_700Bold',
  displayExtra: 'Baloo2_800ExtraBold',
  body: 'Nunito_400Regular',
  bodySemibold: 'Nunito_600SemiBold',
  bodyBold: 'Nunito_700Bold',
};

export const type = {
  display: { fontFamily: fontFamily.displayExtra, fontSize: 32, lineHeight: 38 },
  h1: { fontFamily: fontFamily.display, fontSize: 26, lineHeight: 32 },
  h2: { fontFamily: fontFamily.display, fontSize: 20, lineHeight: 26 },
  h3: { fontFamily: fontFamily.bodyBold, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fontFamily.body, fontSize: 15, lineHeight: 22 },
  bodyStrong: { fontFamily: fontFamily.bodySemibold, fontSize: 15, lineHeight: 22 },
  caption: { fontFamily: fontFamily.body, fontSize: 13, lineHeight: 18 },
  button: { fontFamily: fontFamily.bodyBold, fontSize: 16, lineHeight: 20 },
} as const;
