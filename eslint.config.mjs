import configLove from 'eslint-config-love';

export default [
  {
    ...configLove,
    files: ['**/*.ts'],
    ignores: ['dist', 'dist-go', 'bin'],
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argumen': 'off'
    }
  }
];
