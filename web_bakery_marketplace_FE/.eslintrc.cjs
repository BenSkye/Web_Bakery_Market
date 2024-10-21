module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Bỏ qua cảnh báo về biến không sử dụng
    '@typescript-eslint/no-unused-vars': [
      'warn', // Chỉ cảnh báo thay vì lỗi
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }, // Bỏ qua các biến bắt đầu bằng dấu gạch dưới
    ],
    // Bỏ qua cảnh báo về tham số không sử dụng
    '@typescript-eslint/no-unused-parameters': 'off', // Tắt hoàn toàn kiểm tra tham số không sử dụng
  },
};
