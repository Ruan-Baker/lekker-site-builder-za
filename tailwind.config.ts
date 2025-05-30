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
				// Perspective-inspired color system
				perspective: {
					purple: '#9b87f5',
					'purple-dark': '#7E69AB',
					'purple-light': '#D6BCFA',
					blue: '#4895EF',
					'blue-light': '#72EFDD',
					pink: '#FF48C4',
					'pink-light': '#FFC8DD',
					black: '#1A1A2E',
					'dark-gray': '#333344',
					gray: '#4A4A60',
					'light-gray': '#F5F5F8',
					white: '#FFFFFF',
					'off-white': '#F9F9FC',
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
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'float-medium': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' }
				},
				'float-short': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-3px)' }
				},
				'builder-drag': {
					'0%': { transform: 'translate(0, 0) scale(1)' },
					'10%': { transform: 'translate(10px, -5px) scale(1.02)' },
					'30%': { transform: 'translate(60px, 10px) scale(1.03)' },
					'60%': { transform: 'translate(120px, 30px) scale(1.02)' },
					'80%': { transform: 'translate(150px, 50px) scale(0.98)' },
					'100%': { transform: 'translate(140px, 60px) scale(1)' }
				},
				'cursor-move-realistic': {
					'0%': { transform: 'translate(0, 0)' },
					'15%': { transform: 'translate(30px, 10px)' },
					'30%': { transform: 'translate(60px, 5px)' },
					'45%': { transform: 'translate(80px, 20px)' },
					'60%': { transform: 'translate(120px, 30px)' },
					'75%': { transform: 'translate(140px, 50px)' },
					'90%': { transform: 'translate(130px, 60px)' },
					'100%': { transform: 'translate(140px, 60px)' }
				},
				'section-build': {
					'0%': { transform: 'translateY(24px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'device-switch': {
					'0%': { transform: 'scale(1) translateY(-50%)' },
					'33%': { transform: 'scale(0.9) translateY(-50%)' },
					'66%': { transform: 'scale(0.8) translateY(-50%)' }, 
					'100%': { transform: 'scale(0.85) translateY(-50%) rotate(90deg)' }
				},
				'cursor-bounce': {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'25%': { transform: 'translate(60px, 15px)' },
					'50%': { transform: 'translate(120px, 25px)' },
					'60%': { transform: 'translate(120px, 25px) scale(0.8)' },
					'70%': { transform: 'translate(120px, 25px) scale(1.2)' },
					'80%': { transform: 'translate(120px, 25px) scale(0.9)' },
					'90%': { transform: 'translate(120px, 25px) scale(1.1)' },
					'100%': { transform: 'translate(120px, 25px) scale(1)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '0.6' },
					'50%': { opacity: '0.3' }
				},
				'pulse-medium': {
					'0%, 100%': { opacity: '0.8' },
					'50%': { opacity: '0.5' }
				},
				'glow-pulse': {
					'0%, 100%': { opacity: '0.7' },
					'50%': { opacity: '1' }
				},
				'gradient-flow': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float-slow': 'float-slow 6s ease-in-out infinite',
				'float-medium': 'float-medium 5s ease-in-out infinite',
				'float-short': 'float-short 4s ease-in-out infinite',
				'builder-drag': 'builder-drag 6s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
				'cursor-move-realistic': 'cursor-move-realistic 6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
				'section-build': 'section-build 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
				'section-build-delay-1': 'section-build 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s forwards',
				'section-build-delay-2': 'section-build 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards',
				'section-build-delay-3': 'section-build 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards',
				'fade-in': 'fade-in 0.35s ease forwards',
				'device-switch': 'device-switch 3s ease-in-out infinite alternate',
				'cursor-bounce': 'cursor-bounce 4s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'pulse-medium': 'pulse-medium 2s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'gradient-flow': 'gradient-flow 6s ease infinite',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				'soft': '0 5px 15px rgba(0,0,0,0.08)',
				'softer': '0 5px 10px rgba(0,0,0,0.04)',
				'glow': '0 0 15px rgba(108, 92, 231, 0.5)',
				'glow-blue': '0 0 20px rgba(72, 149, 239, 0.6)',
				'glow-pink': '0 0 20px rgba(255, 72, 196, 0.6)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-purple-blue': 'linear-gradient(90deg, #6C5CE7, #4895EF)',
				'gradient-blue-green': 'linear-gradient(90deg, #4895EF, #72EFDD)',
				'gradient-purple-pink': 'linear-gradient(90deg, #6C5CE7, #FF48C4)',
				'gradient-rainbow': 'linear-gradient(90deg, #6C5CE7, #4895EF, #72EFDD, #FF48C4)',
        'perspective-gradient': 'linear-gradient(90deg, #9b87f5, #7E69AB)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
