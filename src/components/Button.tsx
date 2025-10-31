import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
	variant?: "primary" | "secondary"
}

const Button = ({ title, variant = "primary", ...props }: ButtonProps) => {
	return (
		<button
			className="flex items-center justify-center gap-3 px-5 md:px-7 lg:px-10 py-3 md:py-4 lg:py-6 cursor-pointer"
			{...props}
			style={{
				backgroundColor:
					variant === "primary"
						? "var(--color-primary)"
						: "var(--color-background)",
				color:
					variant === "primary"
						? "var(--color-background)"
						: "var(--color-foreground)",
				border:
					variant === "primary"
						? "none"
						: "1px solid var(--color-foreground)",
			}}
		>
			<h3 className="button-text uppercase">{title}</h3>
			<div>
				<svg
					className="w-5 lg:w-[26px] h-4 lg:h-5"
					viewBox="0 0 26 22"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18.2139 4L17.0812 5.13268L21.8867 9.93818H1V11.5401H21.8866L17.0812 16.3455L18.2139 17.4781L24.9531 10.7391L18.2139 4Z"
						fill={
							variant === "primary"
								? "var(--color-background)"
								: "var(--color-foreground)"
						}
					/>
				</svg>
			</div>
		</button>
	)
}

export default Button
