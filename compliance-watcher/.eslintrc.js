module.exports = {
  extends: ["standard", "prettier", "prettier/standard"],
  env: {
    "jest/globals": true
  },
  parser: "babel-eslint",
  plugins: ["react", "jest"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
};
