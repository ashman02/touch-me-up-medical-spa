import Image from "next/image"
import React from "react"
import Button from "./Button"

const Navbar = () => {
	return (
		<header>
			<nav className="my-container flex items-center justify-between py-4 md:py-7 fixed top-0 left-0 right-0 z-50">
				<div className="logo">
					<Image
						src={"/images/logo.png"}
						alt="Touch Me Up Logo"
						width={80}
						height={57}
						className="w-20 md:w-40"
					/>
				</div>
				<div className="flex items-center gap-6 lg:gap-8">
					<div className="hidden md:block">
						<Button title="Get In Touch" />
					</div>
					<div className="cursor-pointer md:bg-gray-100 md:rounded-full md:px-6 md:py-1">
						<svg
							viewBox="0 0 20 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="w-5 h-7 md:w-8 md:h-full lg:w-6 lg:h-16"
						>
							<path
								d="M0 8H20V10H0V8ZM0 13H20V15H0V13ZM0 18H20V20H0V18Z"
								fill="var(--color-foreground)"
							/>
						</svg>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Navbar
