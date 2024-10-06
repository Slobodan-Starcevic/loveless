/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'loveless-pink': 'hsl(304,90%,67%)',
				'loveless-blue': 'hsl(180,60%,66%)',
				'loveless-black': 'hsl(0,0%,0%)',
				'loveless-white': '0,0%,100%',
			},
			transitionTimingFunction: {
				customEase1: 'var(--custom-ease-1)',
				customEase2: 'var(--custom-ease-2)',
				customEase3: 'var(--custom-ease-3)',
				customEase4: 'var(--custom-ease-4)',
			},
			spacing: {
			'2xs': 'var(--spacing-2xs)',
			'xs': 'var(--spacing-xs)',
			's': 'var(--spacing-s)',
			'm': 'var(--spacing-m)',
			'l': 'var(--spacing-l)',
			'xl': 'var(--spacing-xl)',
			'2xl': 'var(--spacing-2xl)',
			'3xl': 'var(--spacing-3xl)',
			'4xl': 'var(--spacing-4xl)',
			},
		},
	},
	plugins: [],
}
