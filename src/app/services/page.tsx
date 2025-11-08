"use client"
import Button from "@/components/Button"
import SectionHeading from "@/components/SectionHeading"
import ServiceCard from "@/components/ServiceCard"
import { servicesData } from "@/utils/data"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import React, { useRef } from "react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Services = () => {
    const popularServiceRef = useRef<HTMLDivElement>(null)
    const serviceCaraouselRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        // Popular Services Section Animations
        const mm = gsap.matchMedia()
        mm.add(
            {
                isDesktop: "(min-width: 1120px)",
                isTablet: "(min-width: 768px) and (max-width: 1119px)",
                isMobile: "(max-width: 767px)",
            },
            (context) => {
                const { isDesktop, isTablet } = context.conditions as {
                    isDesktop: boolean
                    isTablet: boolean
                }
                const scrollWidth = () => {
                    if (serviceCaraouselRef.current) {
                        let width =
                            serviceCaraouselRef.current.scrollWidth -
                            window.innerWidth
                        width += isDesktop ? 24 * 2 : isTablet ? 12 * 2 : 8 * 2
                        return width
                    } else {
                        return 2000
                    }
                }
                gsap.to(serviceCaraouselRef.current, {
                    x: () => -scrollWidth(),
                    scrollTrigger: {
                        trigger: popularServiceRef.current,
                        start: "top top",
                        end: () => `+=${scrollWidth()}px`,
                        scrub: 1,
                        pin: true,
                        pinType: "transform",
                        pinSpacing: true,
                        invalidateOnRefresh: true,
                    },
                })
            }
        )

        // CTA Section Animations
        gsap.to(".services-cta-hidden", {
            opacity: 1,
            ease: "sine.inOut",
            scrollTrigger: {
                trigger: ".services-cta-hidden",
                start: "top 80%",
            },
        })
    }, [])
    return (
        <main className="flex flex-col gap-32 overflow-hidden">
            {/* add same kind of effects to all hero sections and I will think about that later so add other animations in mean time*/}
            <section className="my-container flex-gap h-screen min-h-[450px] w-full items-center justify-center">
                <h1 className="hero-heading text-center">
                    <div>{servicesData.hero.heading1}</div>
                    <div>{servicesData.hero.heading2}</div>
                </h1>
                <p className="paragraph-text text-center text-gray-500 md:w-10/12 lg:w-3/4">
                    {servicesData.hero.subHeading}
                </p>
            </section>
            <section ref={popularServiceRef} className="flex-gap">
                <div className="my-container">
                    <SectionHeading
                        headingOne={servicesData.popularServices.heading1}
                        headingTwo={servicesData.popularServices.heading2}
                    />
                </div>
                <div className="caraousel overflow-hidden pl-2 md:pl-3 lg:pl-4">
                    <div
                        ref={serviceCaraouselRef}
                        className="flex gap-2 overflow-visible md:gap-3 lg:gap-4"
                    >
                        {servicesData.popularServices.servicesArray.map(
                            (service) => (
                                <div
                                    key={service.id}
                                    className="h-[600px] w-[320px] shrink-0 overflow-hidden md:h-[650px] md:w-[480px] lg:h-[calc(100vh-128px)] lg:min-h-[400px]"
                                >
                                    <ServiceCard
                                        title={service.name}
                                        img={service.img}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>
            <section className="my-container flex flex-col gap-5">
                <SectionHeading headingOne={servicesData.allServices.heading} />
                <div className="services flex flex-wrap gap-2 md:gap-3 lg:gap-4">
                    {servicesData.allServices.services.map((service) => (
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
            </section>
            <section className="my-container cta-section flex-gap h-screen min-h-[450px] w-full items-center justify-center bg-gray-100">
                <SectionHeading
                    headingOne={servicesData.ctaSection.heading}
                    classes="hero-heading text-center md:w-10/12 lg:w-3/4"
                />
                <p className="paragraph-text services-cta-hidden text-center text-gray-500 opacity-0 md:w-10/12 lg:w-3/4">
                    {servicesData.ctaSection.subHeading}
                </p>
                <div className="services-cta-hidden opacity-0">
                    <Button title={servicesData.ctaSection.cta} />
                </div>
            </section>
        </main>
    )
}

export default Services
