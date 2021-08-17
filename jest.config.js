/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */

const { createJestConfig } = require('@craco/craco');

const cracoConfig = require('./craco.config.js');
const jestConfig = createJestConfig(cracoConfig);

module.exports = {
	...jestConfig,
	preset: 'ts-jest',
	testEnvironment: 'node',
};
