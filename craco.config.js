const path = require('path');

module.exports = {
	jest: {
		configure: {
			moduleNameMapper: {
				'^@/(.*)$': '<rootDir>/src/$1',
			},
		},
	},
	style: {
		postcss: {
			plugins: [require('tailwindcss'), require('autoprefixer')],
		},
	},
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
};
