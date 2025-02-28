export const cities = [
  {
    label: 'Paris',
    target: 'paris'
  },
  {
    label: 'Marseille',
    target: 'marseille'
  },
  {
    label: 'Lyon',
    target: [
      { label: '5em', target: 'lyon5' },
      { label: '3em ', target: 'lyon3' },
      { label: '8em ', target: 'lyon8' },
      { label: 'nested2', target: [
        { label: 'quartier X', target: 'nested2-5' },
        { label: 'quartier Y ', target: 'nested2-3' },
        { label: 'command', command: () => {
          alert('YES')
          return true;
        } },
        { label: 'et z ', target: 'nested2-8' },
      ]},
      { label: 'message', target: 'lyon-message', command: () => {
        alert('OK!');
        return true;
      }}
    ]
  }
];
