/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  prefix: "rt-",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
  theme: {
  	extend: {
  		fontFamily: {
  			primary: [
  				'var(--font-noto)',
  				'system-ui',
  				'sans-serif'
  			],
  			secondary: [
  				'var(--font-pyidaungsu)',
  				'system-ui',
  				'sans-serif'
  			],
  			inter: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			xs: [
  				'var(--text-11px)',
  				{
  					lineHeight: 'var(--lh-11px)'
  				}
  			],
  			'11px': [
  				'var(--text-11px)',
  				{
  					lineHeight: 'var(--lh-11px)'
  				}
  			],
  			'12px': [
  				'var(--text-12px)',
  				{
  					lineHeight: 'var(--lh-12px)'
  				}
  			],
  			'13px': [
  				'var(--text-13px)',
  				{
  					lineHeight: 'var(--lh-13px)'
  				}
  			],
  			'14px': [
  				'var(--text-14px)',
  				{
  					lineHeight: 'var(--lh-14px)'
  				}
  			],
  			'15px': [
  				'var(--text-15px)',
  				{
  					lineHeight: 'var(--lh-15px)'
  				}
  			],
  			'16px': [
  				'var(--text-16px)',
  				{
  					lineHeight: 'var(--lh-16px)'
  				}
  			],
  			'17px': [
  				'var(--text-17px)',
  				{
  					lineHeight: 'var(--lh-17px)'
  				}
  			],
  			'21px': [
  				'var(--text-21px)',
  				{
  					lineHeight: 'var(--lh-21px)'
  				}
  			]
  		},
  		borderRadius: {
  			'5': 'var(--radius-5)',
  			'8': 'var(--radius-8)',
  			'10': 'var(--radius-10)',
  			'12': 'var(--radius-12)',
  			'20': 'var(--radius-20)',
  			'24': 'var(--radius-24)'
  		},
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			primary: {
  				DEFAULT: 'var(--primary)',
  				dark: 'var(--primary-dark)',
  				darker: 'var(--primary-darker)',
  				light: 'var(--primary-light)',
  				lighter: 'var(--primary-lighter)',
  				muted: 'var(--primary-muted)',
  				stroke: 'var(--primary-stroke)',
  				foreground: 'var(--primary-foreground)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				light: 'var(--secondary-light)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				light: 'var(--muted-light)',
  				dark: 'var(--muted-dark)',
  				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				light: 'var(--destructive-light)',
  				dark: 'var(--destructive-dark)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
};
