import Image from "next/image"

interface CardProps {
	title: string
	img: string
}

const ServiceCard = ({ title, img, ...props }: CardProps) => {
	return (
		<div className="card relative w-full h-full">
			<div className="w-full h-full overflow-hidden">
				<Image
					src={img}
					alt={title}
					width={500}
					height={500}
					className="w-full h-full object-cover scale-110"
					{...props}
				/>
			</div>
			<h1 className="section-heading text-background absolute bottom-3 lg:bottom-4 left-2 lg:left-4 z-10">
				{title}
			</h1>
			{/* <div className="bg-linear-to-t from-foreground to-foreground/0 absolute bottom-0 w-full h-16 opacity-50" /> */}
		</div>
	)
}

export default ServiceCard
