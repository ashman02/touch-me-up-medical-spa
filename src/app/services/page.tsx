"use client"
import Button from "@/components/Button"
import SectionHeading from "@/components/SectionHeading"
import ServiceCard from "@/components/ServiceCard"
import { servicesData } from "@/utils/data"
import React from "react"

const Services = () => {
    return (
        <main className="flex flex-col gap-32 overflow-hidden">
            <section className="my-container flex-gap h-screen min-h-[450px] w-full items-center justify-center">
                <h1 className="hero-heading text-center">
                    <div>{servicesData.hero.heading1}</div>
                    <div>{servicesData.hero.heading2}</div>
                </h1>
                <p className="paragraph-text text-center text-gray-500 md:w-10/12 lg:w-3/4">
                    {servicesData.hero.subHeading}
                </p>
            </section>
            <section className="flex-gap">
                <div className="my-container">
                    <SectionHeading
                        headingOne={servicesData.popularServices.heading1}
                        headingTwo={servicesData.popularServices.heading2}
                    />
                </div>
                <div className="caraousel overflow-hidden pl-2 md:pl-3 lg:pl-4">
                    <div className="flex gap-2 overflow-visible md:gap-3 lg:gap-4">
                        {servicesData.popularServices.servicesArray.map(
                            (service) => (
                                <div
                                    key={service.id}
                                    className="h-[600px] w-[320px] shrink-0 overflow-hidden md:h-[650px] md:w-[480px] lg:h-[calc(100vh-80px)] lg:min-h-[400px]"
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
                <p className="paragraph-text text-center text-gray-500 md:w-10/12 lg:w-3/4">
                    {servicesData.ctaSection.subHeading}
                </p>
                <Button title={servicesData.ctaSection.cta} />
            </section>
        </main>
    )
}

export default Services
