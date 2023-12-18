import type { Config } from 'tailwindcss'

const config: Config = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        'sunset': {
          '50': '#fff4ed',
          '100': '#ffe6d4',
          '200': '#ffc9a8',
          '300': '#ffa370',
          '400': '#ff7137',
          '500': '#ff4305',
          '600': '#f03006',
          '700': '#c72007',
          '800': '#9e1b0e',
          '900': '#7f1a0f',
          '950': '#450905',
        },

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
