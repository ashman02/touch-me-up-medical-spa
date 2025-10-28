import Button from "@/components/Button"
import { homeData } from "@/utils/data"
import Image from "next/image"

export default function Home() {
	return (
		<main>
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
		</main>
	)
}
