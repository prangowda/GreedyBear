/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

const coverageReporters = [["text", { skipFull: true, skipEmpty: true }]];
if (!process.env.STAGE_CI) {
  // Show HTML coverage only in local environments
  coverageReporters.push(["html", { skipFull: true, skipEmpty: true }]);
}

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Collect coverage information while executing tests
  collectCoverage: true,

  // Specify the files and directories for which coverage is collected
  collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/**/*.test.{js,jsx}", "!src/**/index.{js,jsx}"],

  // Output directory for coverage files
  coverageDirectory: ".coverage",

  // Configure the coverage reporters
  coverageReporters,

  // Define global variables available in all test environments
  globals: {
    COOKIE: ["foo", "bar"],
  },

  // Specify directories to look for modules
  moduleDirectories: ["node_modules", "src"],

  // Map specific module patterns to mock implementations
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/tests/styleMock",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^test-utils$": "<rootDir>/tests/testing-utils",
    "^lodash-es$": "lodash",
    "d3-(.*)$": "<rootDir>/node_modules/d3-$1/dist/d3-$1.min.js",
  },

  // Run setup files after the environment is initialized
  setupFilesAfterEnv: ["<rootDir>/tests/test-setup.js"],

  // Use jsdom for the testing environment
  testEnvironment: "jsdom",

  // Test environment options for better simulation of browser-like environments
  testEnvironmentOptions: {
    url: "https://localhost",
  },

  // Transform configuration to handle specific node_modules and file types
  transformIgnorePatterns: [
    "/node_modules/(?!(${[
      "axios",
      "nanoid",
    ].join("|")})/)",
    "\\.pnp\\.[^\/]+$",
  ],

  // Set slow test threshold to identify long-running tests
  slowTestThreshold: 10,

  // Enable verbose reporting for better test output (optional)
  verbose: true,

  // Custom test match patterns for detecting test files
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],

  // Ignore specific test paths
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],

  // Enable fake timers for consistency in testing time-based functionalities
  timers: "fake",

  // Configure module paths for efficient imports
  roots: ["<rootDir>/src"],

  // Example to enforce coverage thresholds globally
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 90,
    },
  },

  // Custom reporting options (e.g., for CI/CD pipelines)
  reporters: process.env.STAGE_CI
    ? ["default", ["jest-junit", { outputDirectory: "./reports", outputName: "jest-junit.xml" }]]
    : ["default"],
};
