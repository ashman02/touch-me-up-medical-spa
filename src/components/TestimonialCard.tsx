interface CardProps {
	content: string
	name: string
}

const TestimonialCard = ({ content, name }: CardProps) => {
	return (
		<div className="testimonial-card w-full h-full p-3 md:p-4 lg:p-6 flex flex-col justify-between border border-foreground">
			<p className="paragraph-text h-3/4 overflow-hidden">{content}</p>
			<h1 className="section-heading">{name}</h1>
		</div>
	)
}

export default TestimonialCard
