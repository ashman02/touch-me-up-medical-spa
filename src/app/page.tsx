import Button from "@/components/Button"
import ServiceCard from "@/components/ServiceCard"
import { homeData } from "@/utils/data"
import Image from "next/image"

export default function Home() {
	return (
		<main className="flex flex-col gap-32">
			<section className="flex flex-col items-center gap-8 pt-32 relative h-screen min-h-[600px] w-full">
				<h1 className="hero-heading flex flex-col items-center justify-center">
					<div>{homeData.hero.title1}</div>
					<div>{homeData.hero.title2}</div>
				</h1>
				<p className="w-2/3 text-center paragraph-text">
					{homeData.hero.subHeading}
				</p>
				<Button title={homeData.hero.cta} variant="primary" />
				<div className="randomImages absolute w-full h-full top-0 -z-10">
					{/* Image  1 */}
					<div className="w-[264px] h-[169px] absolute top-1/5 left-[5%]">
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
					<div className="w-[264px] h-[169px] absolute bottom-1/10 left-1/4">
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
					<div className="w-[264px] h-[169px] absolute bottom-1/12 right-1/5">
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
					<div className="w-[264px] h-[169px] absolute top-1/4 right-[5%]">
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
			<section className="aboutSection my-container py-20 flex flex-col gap-8">
				<h1 className="section-heading w-3/4 text-gray-300">
					{homeData.about.title}
				</h1>
				<div className="images flex gap-4">
					{homeData.about.images.map((img, idx) => (
						<div key={idx} className="w-1/2 aspect-[0.74/1]">
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
			<section className="servicesSection my-container flex flex-col gap-8 pb-10">
				<h1 className="section-heading w-1/2">
					{homeData.services.title}
				</h1>
				<div className="services flex flex-wrap gap-4">
					{homeData.services.servicesArray.map((service) => (
						<div key={service.id} className="w-[calc(33.33%-12px)]">
							<ServiceCard
								title={service.name}
								img={service.img}
							/>
						</div>
					))}
				</div>
				<div className="flex gap-6">
					<Button title="View All Services" variant="secondary" />
					<Button title="Book Your Free Consultation"  />
				</div>
			</section>
		</main>
	)
}
