module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.(tsx|ts)?$": "ts-jest"
    },
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js"
    },
    globals: {
        "ts-jest": {
            tsConfig: "<rootDir>/tsconfig.json",
            isolatedModules: true,
            diagnostics: {
                pathRegex: ".*\\.jest.test\\.tsx?$"
            }
        }
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec|unit))\\.(ts|tsx)?$",
    moduleFileExtensions: ["ts", "js", "json", "node", "tsx"],
};
