export const template = () => [
  'div',
  { class: 'winners' },
  [
    ['h2', { class: 'winners__head' }, ['Winners']],
    ['table', { class: 'winners__table' }, [
      ['thead', [
        ['tr', [
          ['th', { class: 'winner__pos' }, '№'],
          ['th', { class: 'winner__car-item' }, 'Car'],
          ['th', { class: 'winner__name' }, 'Name'],
          ['th', { class: 'winner__wins' }, 'Wins'],
          ['th', { class: 'winner__time' }, 'Best time'],
        ],
        ],
      ]],
      [
        'tbody', { class: 'winners__body' }, [
          [
            ['tr', [

            ]],
          ],
        ],
      ],
    ]],
  ],
];
