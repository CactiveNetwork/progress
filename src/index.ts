type Variant = 'colour' | 'gradient';

interface GradientConfig {
	from: string;
	to: string;
}

interface BarConfig {
	size?: number | string;
	colour?: string;
	variant?: Variant;
	gradient?: GradientConfig;
	className?: string;
	delay?: number;
}

export default class Progress {
	start: () => void;
	finish: () => void;

	constructor(options?: Partial<BarConfig>) {
		const assign = Object.assign;
		const config: BarConfig = assign(
			{
				size: 2,
				colour: '#8572da',
				variant: 'gradient',
				gradient: {
					from: '#da72b6',
					to: '#646bfc',
				},
				className: 'cactive-progress',
				delay: 80,
			},
			options,
		);

		const initial_style = {
			position: 'fixed',
			top: 0,
			left: 0,
			margin: 0,
			padding: 0,
			border: 'none',
			borderRadius: 0,
			[config.variant === 'gradient' ? 'backgroundImage' : 'backgroundColor']:
				config.variant === 'gradient'
					? `linear-gradient(to right, ${config.gradient?.from}, ${config.gradient?.to})`
					: config.colour,
			zIndex: 10000,
			height:
				typeof config.size === 'number' ? config.size + 'px' : config.size,
			color: config.colour,
			opacity: 0,
			width: '0%',
		};

		const start_style = {
			opacity: 1,
			width: '99%',
			transition: 'width 10s cubic-bezier(0.1, 0.05, 0, 1)',
		};

		const finish_style = {
			opacity: 0,
			width: '100%',
			transition: 'width 0.1s ease-out, opacity 0.5s ease 0.2s',
		};

		const glow_style = {
			opacity: 0.4,
			boxShadow: '3px 0 8px',
			height: '100%',
		};

		let timeout: ReturnType<typeof setTimeout> | undefined;
		let current!: HTMLElement;

		this.start = () => {
			if (current && current.parentNode)
				current.parentNode.removeChild(current);

			current = document.body.appendChild(document.createElement('div'));
			current.className = config.className + ' stopped';
			assign(current.style, initial_style);

			const glow = current.appendChild(document.createElement('div'));
			glow.className = 'glow';
			assign(glow.style, glow_style);

			if (timeout !== null) clearTimeout(timeout);

			timeout = setTimeout(() => {
				timeout = undefined;
				current.className = config.className + ' started';
				assign(current.style, start_style);
			}, config.delay);

			current.scrollTop = 0;
		};

		this.finish = () => {
			if (timeout != null) {
				clearTimeout(timeout);
				timeout = undefined;
			}
			if (current) {
				current.className = config.className + ' finished';
				assign(current.style, finish_style);
			}
		};
	}
}
