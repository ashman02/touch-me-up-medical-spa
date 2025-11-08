"use client"
import Button from "@/components/Button"
import ServiceCard from "@/components/ServiceCard"
import TestimonialCard from "@/components/TestimonialCard"
import { homeData } from "@/utils/data"
import { horizontalLoop, HorizontalLoopTimeline } from "@/utils/InfiniteScroll"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Image from "next/image"
import { useRef } from "react"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

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
        <main className="my-container flex flex-col gap-32 overflow-hidden">
            <section className="relative h-screen min-h-[700px] w-full lg:min-h-[600px]">
                <div
                    className="hero-main-content flex flex-col items-center gap-5 pt-24 opacity-0 md:gap-6 md:pt-32 lg:gap-8"
                    data-speed="0.7"
                    ref={heroHeaderRef}
                >
                    <h1 className="hero-heading flex w-full flex-col items-center justify-center">
                        <div className="text-center">
                            {homeData.hero.title1}
                        </div>
                        <div className="text-center">
                            {homeData.hero.title2}
                        </div>
                    </h1>
                    <p className="paragraph-text w-full text-center text-gray-500 md:w-11/12 lg:w-2/3">
                        {homeData.hero.subHeading}
                    </p>
                    <Button title={homeData.hero.cta} variant="primary" />
                </div>
                <div className="randomImages absolute top-0 -z-10 h-full w-full">
                    {homeData.hero.images.map((img) => (
                        <div
                            key={img.id}
                            className={`hero-img absolute h-[82px] w-32 overflow-hidden md:h-[123px] md:w-48 lg:h-[169px] lg:w-[264px] ${img.classes}`}
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
                                className="h-full w-full object-cover"
                            />
                            <div className="bg-foreground absolute top-0 right-0 bottom-0 left-0 z-20 opacity-30" />
                        </div>
                    ))}
                </div>
            </section>
            <section
                ref={aboutRef}
                className="about-section flex flex-col gap-6 py-16 md:gap-8 md:py-20"
            >
                <h1
                    ref={aboutHeaderRef}
                    className="section-heading w-full text-gray-300 lg:w-3/4"
                >
                    {homeData.about.title}
                </h1>
                <div className="images flex flex-col gap-2 md:flex-row md:gap-3 lg:gap-4">
                    {homeData.about.images.map((img, idx) => (
                        <div
                            key={idx}
                            className="aspect-[0.74/1] w-full md:w-1/2"
                        >
                            <Image
                                src={img}
                                alt="Owner Image"
                                width={920}
                                height={1241}
                                className="about-image h-full w-full object-cover"
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
                            className="aspect-square w-full overflow-hidden md:w-[calc(50%-6px)] lg:w-[calc(33.33%-12px)]"
                        >
                            <ServiceCard
                                title={service.name}
                                img={service.img}
                                data-speed="auto"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex w-fit flex-col gap-2 md:flex-row md:gap-3 lg:gap-6">
                    <Button title="View All Services" variant="secondary" />
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
                    className="flex w-1/2 flex-wrap gap-2 md:gap-3 lg:gap-4"
                >
                    {homeData.results.images.map((img, idx) => (
                        <div
                            key={idx}
                            className="aspect-[0.81/1] w-full md:w-[calc(50%-6px)] lg:w-[calc(33.33%-11px)]"
                        >
                            <Image
                                src={img}
                                alt={"Before and After Image"}
                                width={293}
                                height={363}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </section>
            <section className="testimonial-section flex flex-col items-center justify-center gap-6 overflow-hidden pb-32 md:gap-8">
                <div className="section-heading flex flex-col items-center justify-center">
                    <h1>{homeData.testimonial.title1}</h1>
                    <h1>{homeData.testimonial.title2}</h1>
                </div>
                <div className="testimonial-container flex flex-col gap-2 overflow-x-hidden md:gap-4">
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
                                        className="h-[300px] w-[300px] shrink-0 md:h-[374px] md:w-[434px] lg:h-[512px] lg:w-[412px]"
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
                                        className="h-[300px] w-[300px] shrink-0 md:h-[374px] md:w-[434px] lg:h-[512px] lg:w-[412px]"
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
                                        className="h-[300px] w-[300px] shrink-0 md:h-[374px] md:w-[434px] lg:h-[512px] lg:w-[412px]"
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
                                        className="h-[300px] w-[300px] shrink-0 md:h-[374px] md:w-[434px] lg:h-[512px] lg:w-[412px]"
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
    )
}
