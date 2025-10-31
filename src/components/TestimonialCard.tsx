interface CardProps {
	content: string
	name: string
}

const TestimonialCard = ({ content, name }: CardProps) => {
	return (
		<div className="testimonial-card w-full h-full p-3 md:p-4 lg:p-6 flex flex-col justify-between bg-gray-100 rounded-lg shadow-md sleek-scrollbar">
			<p className="paragraph-text h-3/4 overflow-y-scroll text-gray-500">
				{content}
			</p>
			<h1 className="section-heading text-gray-700">{name}</h1>
		</div>
	)
}

export default TestimonialCard
