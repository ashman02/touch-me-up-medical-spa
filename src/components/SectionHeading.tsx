import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import React, { useRef } from "react"
import { twMerge } from "tailwind-merge"

interface SectionHeadingProps {
    headingOne: string
    headingTwo?: string
    classes?: string
}

gsap.registerPlugin(useGSAP, ScrollTrigger)

const SectionHeading = ({
    headingOne,
    headingTwo = "",
    classes = "",
}: SectionHeadingProps) => {
    const mainRef = useRef<HTMLHeadingElement>(null)
    const headingOneRef = useRef<HTMLDivElement>(null)
    const headingTwoRef = useRef<HTMLDivElement>(null)
    const tlRef = useRef<GSAPTimeline>(null)
    useGSAP(() => {
        if (tlRef.current) tlRef.current.kill()
        tlRef.current = gsap.timeline({
            defaults: {
                duration: 0.5,
                ease: "sine.inOut",
            },
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top 80%",
            },
            onComplete: () => {
                gsap.to(mainRef.current, {
                    overflow: "visible",
                })
            },
        })
        tlRef.current.to(headingOneRef.current, {
            y: 0,
        })
        if (headingTwoRef.current)
            tlRef.current.to(
                headingTwoRef.current,
                {
                    y: 0,
                },
                "<"
            )
    }, [])
    return (
        <h1
            ref={mainRef}
            className={twMerge("section-heading overflow-hidden", classes)}
        >
            <div ref={headingOneRef} className="translate-y-full">
                {headingOne}
            </div>
            {headingTwo && (
                <div ref={headingTwoRef} className="translate-y-full">
                    {headingTwo}
                </div>
            )}
        </h1>
    )
}

export default SectionHeading
