"use client"
import Image from "next/image"
import React, { useRef, useState } from "react"
import Button from "./Button"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { socials } from "@/utils/data"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

const Navbar = () => {
	const pathname = usePathname()
	const navItems = [
		{
			name: "Home",
			link: "/",
			isActive: pathname === "/",
		},
		{
			name: "About",
			link: "/about",
			isActive: pathname === "/about",
		},
		{
			name: "Services",
			link: "/services",
			isActive: pathname === "/services",
		},
		{
			name: "Contact",
			link: "/contact",
			isActive: pathname === "/contact",
		},
	]

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const navTl = useRef<GSAPTimeline>(null)
	const menuRef = useRef<HTMLDivElement>(null)
	const overlayRef = useRef<HTMLDivElement>(null)
	const headerRef = useRef<HTMLDivElement>(null)

	const { contextSafe } = useGSAP(() => {
		gsap.to(headerRef.current, {
			opacity : 1,
			duration : 0.5,
			ease : "sine.inOut"
		})
	}, [])

	// eslint-disable-next-line react-hooks/refs
	const handleOpenMenuBar = contextSafe(() => {
		if (navTl.current) navTl.current.kill()
		setIsMenuOpen(true)
		gsap.set(overlayRef.current, { display: "block" })
		navTl.current = gsap.timeline({
			defaults: { duration: 0.5, ease: "sine.inOut" },
		})
		navTl.current
			.to(".bar.top", {
				rotate: 45,
				y: 8,
				transformOrigin: "center center",
			})
			.to(".bar.middle", { scaleX: 0, opacity: 0 }, "<")
			.to(
				".bar.bottom",
				{
					rotate: -45,
					y: -8,
					transformOrigin: "center center",
				},
				"<"
			)
			.to(menuRef.current, { x: 0 }, "<")
			.to(overlayRef.current, { opacity: 0.3 }, "<")
			.to(
				".navbar-item",
				{
					x: 0,
					opacity: 1,
					stagger: 0.1,
				},
				"-=0.4"
			)
			.to(
				".navbar-social",
				{
					opacity: 1,
				},
				"<"
			)
	})
	// eslint-disable-next-line react-hooks/refs
	const handleCloseMenuBar = contextSafe(() => {
		if (navTl.current) navTl.current.kill()
		setIsMenuOpen(false)
		navTl.current = gsap.timeline({
			defaults: { duration: 0.8, ease: "sine.inOut" },
		})
		navTl.current
			.to(".bar.top", {
				rotate: 0,
				y: 0,
			})
			.to(".bar.middle", { scaleX: 1, opacity: 1 }, "<")
			.to(
				".bar.bottom",
				{
					rotate: 0,
					y: 0,
				},
				"<"
			)
			.to(
				".navbar-item",
				{
					x: 80,
					opacity: 0,
					stagger: 0.1,
				},
				"<"
			)
			.to(
				".navbar-social",
				{
					opacity: 0,
				},
				"<"
			)
			.to(menuRef.current, { x: "100%" }, "<")
			.to(overlayRef.current, { opacity: 0 }, "<")
			.set(overlayRef.current, { display: "hidden" })
	})

	return (
		<header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 opacity-0">
			{/* navbar  */}
			<nav className="my-container flex items-center justify-between py-4 md:py-7 relative  top-0 left-0 right-0 z-50">
				<div className="logo">
					<Image
						src={"/images/logo.png"}
						alt="Touch Me Up Logo"
						width={80}
						height={57}
						className="w-20 md:w-40"
						loading="eager"
					/>
				</div>
				<div className="flex items-center gap-6 lg:gap-8">
					<div className="hidden md:block">
						<Button title="Get In Touch" />
					</div>
					<div
						className="cursor-pointer md:bg-gray-100 md:rounded-full md:px-6 py-1"
						onClick={() => {
							if (isMenuOpen) {
								handleCloseMenuBar()
							} else {
								handleOpenMenuBar()
							}
						}}
					>
						<svg className="w-8 h-12 lg:h-16" viewBox="0 0 32 32">
							<rect
								className="bar top fill-foreground w-8 h-0.5"
								x="2"
								y="8"
								rx="2"
							/>
							<rect
								className="bar middle fill-foreground w-8 h-0.5"
								x="2"
								y="16"
								rx="2"
							/>
							<rect
								className="bar bottom fill-foreground w-8 h-0.5"
								x="2"
								y="24"
								rx="2"
							/>
						</svg>
					</div>
				</div>
			</nav>
			{/* Menu bar */}
			<div>
				{/* Menu */}
				<div
					ref={menuRef}
					className="my-container absolute top-0 w-full md:w-[500px] lg:w-[700px] md:right-0 h-screen min-h-[600px] bg-foreground z-40 flex flex-col justify-between pb-10 translate-x-full"
				>
					<ul className="menu flex flex-col gap-4 mt-[149px] md:mt-[209px] lg:mt-[233px]">
						{navItems.map((i) => (
							<li
								key={i.name}
								className="hero-heading navbar-item translate-x-20 opacity-0"
								style={{
									color: i.isActive
										? "var(--color-background)"
										: "var(--color-gray-300)",
								}}
								onClick={handleCloseMenuBar}
							>
								<Link href={i.link}>{i.name}</Link>
							</li>
						))}
					</ul>
					<div className="navbar-social flex flex-col gap-3 opacity-0">
						<h3 className="paragraph-text text-gray-300">
							Socials
						</h3>
						<ul className="flex gap-2">
							{socials.map((s) => (
								<li
									key={s.name}
									className="button-text text-background"
								>
									<Link href={s.link} target="_blank">
										{s.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				{/* navbar overlay  */}
				<div
					ref={overlayRef}
					className="hidden opacity-0 nav-overlay absolute w-full h-screen min-h-[600px] top-0 bg-foreground"
				/>
			</div>
		</header>
	)
}

export default Navbar
