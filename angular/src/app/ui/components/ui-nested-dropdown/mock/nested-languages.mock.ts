export const cities = [
  {
    label: 'Paris',
    value: 'paris'
  },
  {
    label: 'Marseille',
    value: 'marseille'
  },
  {
    label: 'Lyon',
    value: [
      { label: '5em', value: 'lyon5' },
      { label: '3em ', value: 'lyon3' },
      { label: '8em ', value: 'lyon8' },
      { label: 'nested2', value: [
        { label: 'quartier X', value: 'nested2-5' },
        { label: 'quartier Y ', value: 'nested2-3' },
        { label: 'command', command: () => {
          alert('YES')
          return true;
        } },
        { label: 'et z ', value: 'nested2-8' },
      ]},
      { label: 'message', value: 'lyon-message', command: () => {
        alert('OK!');
        return true;
      }}
    ]
  }
];
