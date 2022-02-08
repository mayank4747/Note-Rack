// -=- Styling lookup tabel for elements -=-
const stylingLookupTable: {[key: string]: string} = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-bold',
  h5: 'text-lg font-bold',
};

// -=- Keybinds for non-inline elements -=-
const textKeybinds: {[key: string]: string} = {
  '#': 'h1',
  '##': 'h2',
  '###': 'h3',
  '####': 'h4',
  '#####': 'h5',
};

// -=- Keybinds for inline elements -=-
const inlineTextKeybinds: {[key: string]: {regex: RegExp, key: string}} = {
  '**': {
    regex: /\*\*(\S?.*?\S)\*\*/gm,
    key: 'u',
  },
  '*': {
    regex: /\*(\\S?.*?\\S)\*/gm,
    key: 'u',
  },
  '--': {
    regex: /--(\\S?.*?\\S)--/gm,
    key: 'u',
  },
  __: {
    regex: /__(\S?.*?\S)__/gm,
    key: 'u',
  },
};

export { stylingLookupTable, textKeybinds, inlineTextKeybinds };
