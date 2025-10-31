"use client"
import Button from "@/components/Button"
import ServiceCard from "@/components/ServiceCard"
import TestimonialCard from "@/components/TestimonialCard"
import { homeData } from "@/utils/data"
import { horizontalLoop, HorizontalLoopTimeline } from "@/utils/InfiniteScroll"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Image from "next/image"
import { useRef } from "react"

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText)

export default function Home() {
	const heroHeaderRef = useRef<HTMLDivElement>(null)
	const heroTlRef = useRef<GSAPTimeline>(null)
	const aboutRef = useRef<HTMLDivElement>(null)
	const aboutHeaderRef = useRef<HTMLHeadingElement>(null)
	const resultsSectionRef = useRef<HTMLDivElement>(null)
	const resultsContainerRef = useRef<HTMLDivElement>(null)
	const testiLoopOneRef = useRef<HorizontalLoopTimeline>(null)
	const testiLoopTwoRef = useRef<HorizontalLoopTimeline>(null)
	useGSAP(() => {
		// hero section animations + smooth scrolling and parallax
		if (heroTlRef.current) heroTlRef.current.kill()
		ScrollSmoother.create({
			smooth: 1,
			effects: true,
			normalizeScroll: true,
			smoothTouch: 0.1,
		})

		heroTlRef.current = gsap.timeline({
			defaults: { duration: 1, ease: "sine.inOut" },
		})
		heroTlRef.current
			.to(heroHeaderRef.current, {
				opacity: 1,
			})
			.to(
				".hero-img",
				{
					clipPath: "inset(0% 0% 0% 0%)",
				},
				"-=0.7"
			)

		// About section animations
		const splitedAboutHeader = SplitText.create(aboutHeaderRef.current, {
			type: "chars",
		})
		gsap.to(splitedAboutHeader.chars, {
			color: "var(--color-foreground)",
			stagger: 0.05,
			scrollTrigger: {
				trigger: aboutHeaderRef.current,
				scrub: true,
				start: "top 80%",
				end: "bottom 50%",
			},
		})
		gsap.to(".about-image", {
			clipPath: "inset(0% 0% 0% 0%)",
			ease: "sine.inOut",
			duration: 1,
			scrollTrigger: {
				trigger: ".about-image",
				start: "top 50%",
				end: "bottom bottom",
			},
		})

		// results section animation
		const scrollHeight = () => {
			if (resultsContainerRef.current) {
				return resultsContainerRef.current.scrollHeight
			} else return "200%"
		}

		gsap.to(resultsContainerRef.current, {
			y: () => -scrollHeight(),
			ease: "none",
			scrollTrigger: {
				trigger: resultsSectionRef.current,
				start: "top top",
				end: () => `+=${resultsContainerRef.current?.scrollHeight}px`,
				pinType: "transform",
				pinSpacing: true,
				scrub: 1,
				pin: true,
				invalidateOnRefresh: true,
				// Color change callbacks - instant, not scrubbed
				onEnter: () => {
					gsap.to("body", {
						backgroundColor: "var(--color-foreground)",
						color: "var(--color-background)",
						duration: 0.6,
						ease: "sine.inOut",
					})
				},
				onLeaveBack: () => {
					gsap.to("body", {
						backgroundColor: "var(--color-background)",
						color: "var(--color-foreground)",
						duration: 0.6,
						ease: "sine.inOut",
					})
				},
				onLeave: () => {
					gsap.to("body", {
						backgroundColor: "var(--color-background)",
						color: "var(--color-foreground)",
						duration: 0.6,
						ease: "sine.inOut",
					})
				},
				onEnterBack: () => {
					gsap.to("body", {
						backgroundColor: "var(--color-foreground)",
						color: "var(--color-background)",
						duration: 0.6,
						ease: "sine.inOut",
					})
				},
			},
		})

		// Testimonial section animation
		testiLoopOneRef.current = horizontalLoop(
			".testimonial-section-row-1 > div",
			{
				repeat: -1,
				speed: 0.6,
				paddingRight: 16,
			}
		)

		testiLoopTwoRef.current = horizontalLoop(
			".testimonial-section-row-2 > div",
			{
				repeat: -1,
				speed: 0.6,
				reversed: true,
				paddingRight: 16,
			}
		)
	}, [])
	return (
		<div id="smooth-wrapper">
			<div id="smooth-content">
				<main className="my-container flex flex-col gap-32 pb-10 overflow-hidden">
					<section className="relative h-screen min-h-[700px] lg:min-h-[600px] w-full">
						<div
							className="hero-main-content flex flex-col items-center gap-5 md:gap-6 lg:gap-8 pt-24 md:pt-32 opacity-0"
							data-speed="0.7"
							ref={heroHeaderRef}
						>
							<h1 className="hero-heading w-full flex flex-col items-center justify-center">
								<div className="text-center">
									{homeData.hero.title1}
								</div>
								<div className="text-center">
									{homeData.hero.title2}
								</div>
							</h1>
							<p className="w-full md:w-11/12 lg:w-2/3 text-center paragraph-text text-gray-500">
								{homeData.hero.subHeading}
							</p>
							<Button
								title={homeData.hero.cta}
								variant="primary"
							/>
						</div>
						<div className="randomImages absolute w-full h-full top-0 -z-10">
							{homeData.hero.images.map((img) => (
								<div
									key={img.id}
									className={`hero-img w-32 h-[82px] md:w-48 md:h-[123px] lg:w-[264px] lg:h-[169px] absolute overflow-hidden ${img.classes}`}
									style={{
										clipPath: "inset(0% 0% 100% 0%)",
									}}
								>
									<Image
										src={img.img}
										alt="Result Image"
										width={264}
										height={169}
										preload
										quality={100}
										className=" w-full h-full object-cover"
									/>
									<div className="absolute z-20 top-0 left-0 bottom-0 right-0 bg-foreground opacity-30" />
								</div>
							))}
						</div>
					</section>
					<section
						ref={aboutRef}
						className="about-section py-16 md:py-20 flex flex-col gap-6 md:gap-8"
					>
						<h1
							ref={aboutHeaderRef}
							className="section-heading w-full lg:w-3/4 text-gray-300"
						>
							{homeData.about.title}
						</h1>
						<div className="images flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-4">
							{homeData.about.images.map((img, idx) => (
								<div
									key={idx}
									className="w-full md:w-1/2 aspect-[0.74/1]"
								>
									<Image
										src={img}
										alt="Owner Image"
										width={920}
										height={1241}
										className="about-image w-full h-full object-cover"
										style={{
											clipPath: "inset(0% 0% 100% 0)",
										}}
									/>
								</div>
							))}
						</div>
					</section>
					<section className="services-section flex flex-col gap-4 md:gap-6 lg:gap-8">
						<h1 className="section-heading w-full md:w-3/4 lg:w-1/2">
							{homeData.services.title}
						</h1>
						<div className="services flex flex-wrap gap-2 md:gap-3 lg:gap-4">
							{homeData.services.servicesArray.map((service) => (
								<div
									key={service.id}
									className="w-full md:w-[calc(50%-6px)] lg:w-[calc(33.33%-12px)] overflow-hidden"
								>
									<ServiceCard
										title={service.name}
										img={service.img}
									/>
								</div>
							))}
						</div>
						<div className="flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-6 w-fit">
							<Button
								title="View All Services"
								variant="secondary"
							/>
							<Button title="Book Your Free Consultation" />
						</div>
					</section>
					<section
						ref={resultsSectionRef}
						className="result-section flex h-screen min-h-[600px] overflow-hidden"
						data-speed="1"
					>
						<div className="w-1/2">
							<h1 className="section-heading w-full lg:w-3/5">
								{homeData.results.title}
							</h1>
						</div>
						<div
							ref={resultsContainerRef}
							className="w-1/2 flex flex-wrap gap-2 md:gap-3 lg:gap-4"
						>
							{homeData.results.images.map((img, idx) => (
								<div
									key={idx}
									className="w-full md:w-[calc(50%-6px)] lg:w-[calc(33.33%-11px)] aspect-[0.81/1]"
								>
									<Image
										src={img}
										alt={"Before and After Image"}
										width={293}
										height={363}
										className="w-full h-full object-cover"
									/>
								</div>
							))}
						</div>
					</section>
					<section className="testimonial-section flex flex-col items-center justify-center gap-6 md:gap-8 overflow-hidden">
						<div className="section-heading flex flex-col items-center justify-center">
							<h1>{homeData.testimonial.title1}</h1>
							<h1>{homeData.testimonial.title2}</h1>
						</div>
						<div className="testimonial-container flex flex-col gap-2 md:gap-4 overflow-x-hidden">
							<div className="overflow-x-visible">
								<div
									className="testimonial-section-row-1 flex gap-2 md:gap-4"
									onMouseEnter={() => {
										if (testiLoopOneRef.current) {
											testiLoopOneRef.current.pause()
										}
									}}
									onMouseLeave={() => {
										if (testiLoopOneRef.current) {
											testiLoopOneRef.current.resume()
										}
									}}
									onTouchStart={() => {
										if (testiLoopOneRef.current) {
											testiLoopOneRef.current.pause()
										}
									}}
									onTouchEnd={() => {
										if (testiLoopOneRef.current) {
											testiLoopOneRef.current.resume()
										}
									}}
								>
									{homeData.testimonial.testimonialsRow1.map(
										(t, idx) => (
											<div
												key={idx}
												className="w-[300px] h-[300px] md:w-[434px] md:h-[374px] lg:w-[412px] lg:h-[512px] shrink-0"
											>
												<TestimonialCard
													content={t.content}
													name={t.name}
												/>
											</div>
										)
									)}
									{homeData.testimonial.testimonialsRow1.map(
										(t, idx) => (
											<div
												key={idx}
												className="w-[300px] h-[300px] md:w-[434px] md:h-[374px] lg:w-[412px] lg:h-[512px] shrink-0"
											>
												<TestimonialCard
													content={t.content}
													name={t.name}
												/>
											</div>
										)
									)}
								</div>
							</div>
							<div className="overflow-x-visible">
								<div
									className="testimonial-section-row-2 flex gap-2 md:gap-4"
									onMouseEnter={() => {
										if (testiLoopTwoRef.current) {
											testiLoopTwoRef.current.pause()
										}
									}}
									onMouseLeave={() => {
										if (testiLoopTwoRef.current) {
											testiLoopTwoRef.current.resume()
										}
									}}
									onTouchStart={() => {
										if (testiLoopTwoRef.current) {
											testiLoopTwoRef.current.pause()
										}
									}}
									onTouchEnd={() => {
										if (testiLoopTwoRef.current) {
											testiLoopTwoRef.current.resume()
										}
									}}
								>
									{homeData.testimonial.testimonialsRow2.map(
										(t, idx) => (
											<div
												key={idx}
												className="w-[300px] h-[300px] md:w-[434px] md:h-[374px] lg:w-[412px] lg:h-[512px] shrink-0"
											>
												<TestimonialCard
													content={t.content}
													name={t.name}
												/>
											</div>
										)
									)}
									{homeData.testimonial.testimonialsRow2.map(
										(t, idx) => (
											<div
												key={idx}
												className="w-[300px] h-[300px] md:w-[434px] md:h-[374px] lg:w-[412px] lg:h-[512px] shrink-0"
											>
												<TestimonialCard
													content={t.content}
													name={t.name}
												/>
											</div>
										)
									)}
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}
