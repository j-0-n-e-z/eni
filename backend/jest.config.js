module.exports = {
	preset: 'ts-jest',
	testMatch: ['**/__tests__/**/*.test.ts'],
	testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/']
}
