import { Tip } from '../types/models';

export const SEED_TIPS: Omit<Tip, 'id'>[] = [
  {
    category: 'care',
    species: 'dog',
    title: 'Escovação regular evita nós e queda de pelo',
    body:
      'Escove seu cão pelo menos 2 a 3 vezes por semana. Isso reduz pelos pela casa, previne nós dolorosos e é um ótimo momento de vínculo.',
    cover_url: null,
  },
  {
    category: 'feeding',
    species: 'dog',
    title: 'Respeite a quantidade indicada na embalagem da ração',
    body:
      'A quantidade ideal varia por peso, idade e nível de atividade. Excesso de ração é uma das principais causas de obesidade em pets.',
    cover_url: null,
  },
  {
    category: 'enrichment',
    species: 'dog',
    title: 'Brinquedos de busca por comida estimulam o cérebro',
    body:
      'Esconder petiscos em brinquedos interativos (snuffle mats, kongs) reduz o tédio e a ansiedade, especialmente em cães que ficam muitas horas sozinhos.',
    cover_url: null,
  },
  {
    category: 'care',
    species: 'dog',
    title: 'Corte de unhas: fique de olho no som no chão',
    body:
      'Se você ouve as unhas do seu cão "clicando" no piso ao andar, é hora de aparar. Unhas longas demais alteram a postura e causam dor.',
    cover_url: null,
  },
];
