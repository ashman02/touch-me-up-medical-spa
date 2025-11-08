import React from "react"
import { twMerge } from "tailwind-merge"

interface SectionHeadingProps {
	headingOne: string
	headingTwo?: string
	classes? : string
}

const SectionHeading = ({
	headingOne,
	headingTwo = "",
	classes = "",
}: SectionHeadingProps) => {
	return (
		<h1 className={twMerge("section-heading", classes)}>
			<div>{headingOne}</div>
			{headingTwo && <div>{headingTwo}</div>}
		</h1>
	)
}

export default SectionHeading
