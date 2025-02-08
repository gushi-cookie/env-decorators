/** @type { import('@cspell/cspell-types').CSpellUserSettings } */
export default {
  dictionaryDefinitions: [
    {
      name: 'main',
      path: '.vscode/cspell.dictionary.txt',
      description: 'Words used in this project',
      addWords: true,
    },
  ],
  dictionaries: ['main'],
  ignorePaths: ['build/**', 'coverage/**', 'tsconfig.tsbuildinfo', 'LICENSE'],
};
