
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				lekker: {
					purple: '#6B46C1',
					'purple-hover': '#553C9A',
					black: '#222222',
					gray: '#666666',
					'light-gray': '#F5F5F5',
					'border-gray': 'rgba(0,0,0,0.12)',
					white: '#FFFFFF'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'drag': {
					'0%': { transform: 'translate(0, 0) scale(1)' },
					'20%': { transform: 'translate(20px, 0) scale(1.02)' },
					'40%': { transform: 'translate(100px, 30px) scale(1.02)' },
					'60%': { transform: 'translate(150px, 60px) scale(1.02)' },
					'80%': { transform: 'translate(120px, 40px) scale(0.98)' },
					'100%': { transform: 'translate(100px, 50px) scale(1)' }
				},
				'cursor-move': {
					'0%': { transform: 'translate(0, 0)' },
					'30%': { transform: 'translate(80px, 20px)' },
					'60%': { transform: 'translate(130px, 50px)' },
					'100%': { transform: 'translate(100px, 30px)' }
				},
				'section-build': {
					'0%': { transform: 'translateY(24px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'responsive-switch': {
					'0%': { transform: 'scale(1, 1)' },
					'50%': { transform: 'scale(0.5, 1)' },
					'100%': { transform: 'scale(0.5, 1.3)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'drag': 'drag 3s ease-in-out infinite',
				'cursor-move': 'cursor-move 3s ease-in-out infinite',
				'section-build': 'section-build 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
				'section-build-delay-1': 'section-build 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s forwards',
				'section-build-delay-2': 'section-build 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards',
				'section-build-delay-3': 'section-build 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards',
				'fade-in': 'fade-in 0.35s ease forwards',
				'responsive-switch': 'responsive-switch 2s ease-in-out infinite alternate'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				'soft': '0 5px 15px rgba(0,0,0,0.08)',
				'softer': '0 5px 10px rgba(0,0,0,0.04)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
