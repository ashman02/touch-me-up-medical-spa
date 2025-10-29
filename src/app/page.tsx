import Button from "@/components/Button"
import ServiceCard from "@/components/ServiceCard"
import TestimonialCard from "@/components/TestimonialCard"
import { homeData } from "@/utils/data"
import Image from "next/image"

export default function Home() {
	return (
		<main className="my-container flex flex-col gap-32 pb-10 overflow-hidden">
			<section className=" flex flex-col items-center gap-5 md:gap-6 lg:gap-8 pt-24 md:pt-32 relative h-screen min-h-[700px] lg:min-h-[600px] w-full">
				<h1 className="hero-heading w-full flex flex-col items-center justify-center">
					<div className="text-center">{homeData.hero.title1}</div>
					<div className="text-center">{homeData.hero.title2}</div>
				</h1>
				<p className="w-full md:w-11/12 lg:w-2/3 text-center paragraph-text">
					{homeData.hero.subHeading}
				</p>
				<Button title={homeData.hero.cta} variant="primary" />
				<div className="randomImages absolute w-full h-full top-0 -z-10">
					{/* Image  1 */}
					<div className="w-32 h-[82px] md:w-48 md:h-[123px] lg:w-[264px] lg:h-[169px] absolute top-[60%] md:top-1/2 left-0 lg:top-1/5 lg:left-[5%]">
						<Image
							src={homeData.hero.images[0]}
							alt="Result Image 1"
							width={264}
							height={169}
							preload
							quality={100}
							className="w-full h-full object-cover"
						/>
					</div>
					{/* Image 2 */}
					<div className="w-32 h-[82px] md:w-48 md:h-[123px] lg:w-[264px] lg:h-[169px] absolute bottom-[15%] md:bottom-[5%] left-0 lg:bottom-1/10 lg:left-1/4">
						<Image
							src={homeData.hero.images[1]}
							alt="Result Image 1"
							width={264}
							height={169}
							preload
							quality={100}
							className="w-full h-full object-cover"
						/>
					</div>
					{/* Image 3 */}
					<div className="w-32 h-[82px] md:w-48 md:h-[123px] lg:w-[264px] lg:h-[169px] absolute bottom-[5%] md:bottom-[2%] right-0 lg:bottom-1/12 lg:right-1/5">
						<Image
							src={homeData.hero.images[2]}
							alt="Result Image 1"
							width={264}
							height={169}
							preload
							quality={100}
							className="w-full h-full object-cover"
						/>
					</div>
					{/* Image 4 */}
					<div className="w-32 h-[82px] md:w-48 md:h-[123px] lg:w-[264px] lg:h-[169px] absolute top-[70%] md:top-[60%] right-0 lg:top-1/4 lg:right-[5%]">
						<Image
							src={homeData.hero.images[3]}
							alt="Result Image 1"
							width={264}
							height={169}
							preload
							quality={100}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
			</section>
			<section className="about-section py-16 md:py-20 flex flex-col gap-6 md:gap-8">
				<h1 className="section-heading w-full lg:w-3/4 text-gray-300">
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
								className="w-full h-full object-cover"
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
							className="w-full md:w-[calc(50%-6px)] lg:w-[calc(33.33%-12px)]"
						>
							<ServiceCard
								title={service.name}
								img={service.img}
							/>
						</div>
					))}
				</div>
				<div className="flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-6 w-fit">
					<Button title="View All Services" variant="secondary" />
					<Button title="Book Your Free Consultation" />
				</div>
			</section>
			<section className="result-section flex h-screen min-h-[600px] overflow-hidden">
				<div className="w-1/2">
					<h1 className="section-heading w-full lg:w-3/5">
						{homeData.results.title}
					</h1>
				</div>
				<div className="w-1/2 flex flex-wrap gap-2 md:gap-3 lg:gap-4">
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
				<div className="testimonial-container flex flex-col gap-2 md:gap-4 overflow-hidden">
					<div className="overflow-x-visible">
						<div className="row-1 flex gap-2 md:gap-4">
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
						<div className="row-2 flex gap-2 md:gap-4">
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
	)
}
