import type {Config} from './node_modules/@jest/types/build/index';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  '^.+\\.ts?$': 'ts-jest',
  },
    "resetMocks": false,
    "setupFiles": [
        "jest-localstorage-mock"
    ],
    testEnvironment: "jsdom",
    moduleNameMapper: { "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js", "\\.(css|less)$": "<rootDir>/assetsTransformer.js" }
    
};
export default config;