import React from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * Elemento de assinatura visual do MBF: uma pegada estilizada, usada em
 * indicadores de progresso do onboarding, streak de gamificação e no
 * estado ativo da tab bar — em vez do ícone de pata genérico de biblioteca.
 */
export function PawIcon({ size = 20, color = '#2F6E4F' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.5 12.2c1.7 0 3 1.6 3 3.6s-1.3 3.6-3 3.6-3-1.6-3-3.6 1.3-3.6 3-3.6Z"
        fill={color}
      />
      <Path
        d="M16.5 12.2c1.7 0 3 1.6 3 3.6s-1.3 3.6-3 3.6-3-1.6-3-3.6 1.3-3.6 3-3.6Z"
        fill={color}
      />
      <Path
        d="M4.8 5.6c1.3 0 2.3 1.3 2.3 2.9S6.1 11.4 4.8 11.4s-2.3-1.3-2.3-2.9S3.5 5.6 4.8 5.6Z"
        fill={color}
      />
      <Path
        d="M19.2 5.6c1.3 0 2.3 1.3 2.3 2.9s-1 2.9-2.3 2.9-2.3-1.3-2.3-2.9 1-2.9 2.3-2.9Z"
        fill={color}
      />
      <Path
        d="M12 12.6c2.3 0 5 1.9 5 4.6 0 1.8-1.4 2.9-3 2.9-.9 0-1.4-.4-2-.4s-1.1.4-2 .4c-1.6 0-3-1.1-3-2.9 0-2.7 2.7-4.6 5-4.6Z"
        fill={color}
      />
    </Svg>
  );
}
