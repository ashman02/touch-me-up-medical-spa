"use client"

const BlurryGradient = () => {
	return (
		<div
			className="absolute top-0 left-0 w-full h-full pointer-events-none"
			style={{
				backdropFilter: "blur(8px)",
				WebkitBackdropFilter: "blur(8px)",
				background:
					"linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.7) 30%, transparent 100%)",
				maskImage:
					"linear-gradient(to top, black 20%, transparent 100%)",
				WebkitMaskImage:
					"linear-gradient(to top, black 20%, transparent 100%)",
			}}
		/>
	)
}

export default BlurryGradient
