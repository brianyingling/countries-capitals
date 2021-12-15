module.exports = {
	transform: {
		'\\.(js|jsx|ts|tsx)$': 'babel-jest',
		'.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
	},
	transformIgnorePatterns: [],
	setupFilesAfterEnv: [
		'@testing-library/jest-dom/extend-expect',
	]
};
