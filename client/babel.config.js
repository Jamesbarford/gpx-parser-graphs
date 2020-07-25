module.exports = {
    presets: [
        ["@babel/preset-env", { useBuiltIns: "entry", corejs: 3 }],
        "@babel/preset-typescript"
    ],
    plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-optional-chaining"]
};
