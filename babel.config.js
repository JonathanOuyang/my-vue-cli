module.exports = {
  presets: [
    ["@babel/preset-env",

      // 按需引入polyfill
      {
        "useBuiltIns": "usage",
        corejs: {
          // core-js的版本
          version: 3,
        },
      }]
  ]
}