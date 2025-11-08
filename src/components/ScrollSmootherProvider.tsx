"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePathname } from "next/navigation"
import Footer from "./Footer"

gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

export default function ScrollSmootherProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const smootherRef = useRef<ScrollSmoother | null>(null)
	const pathname = usePathname()

	useEffect(() => {
		// Kill existing instance
		if (smootherRef.current) {
			smootherRef.current.kill()
		}

		// Create ScrollSmoother
		smootherRef.current = ScrollSmoother.create({
			smooth: 1,
			effects: true,
			normalizeScroll: true,
			smoothTouch: 0.1,
		})

		return () => {
			if (smootherRef.current) {
				smootherRef.current.kill()
			}
		}
	}, [pathname]) // Reinitialize on route change

	return (
		<div className="relative w-full h-full">
			<div id="smooth-wrapper">
				<div
					id="smooth-content">
					{children}
					<Footer/>
				</div>
			</div>
		</div>
	)
}
