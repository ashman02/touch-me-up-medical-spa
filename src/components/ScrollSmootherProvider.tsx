"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePathname } from "next/navigation"

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
		<div id="smooth-wrapper">
			<div
				id="smooth-content"
				className="pb-[912px] md:pb-[999px] lg:pb-[868px]"
			>
				{children}
			</div>
		</div>
	)
}
