/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				'color-acсent': 'var(--color-acсent)',
				'color-acent-hover': 'var(--color-acent-hover)',
				'color-accent-secondary': 'var(--color-accent-secondary)',
				'color-error': 'var(--color-error)',
				'color-active': 'var(--color-active)',
				'color-inactive': 'var(--color-inactive)',
				'color-background': 'var(--color-background)',
				'color-component-background': 'var(--color-component-background)',
				'color-yellow': 'var(--color-yellow)',
				'color-blue': 'var(--color-blue)',
				'color-orange': 'var(--color-orange)',
				'color-peach': 'var(--color-peach)',
				'color-purple': 'var(--color-purple)',
				errorColor: '#DB0030',
			},
		},
	},
	plugins: [],
};
