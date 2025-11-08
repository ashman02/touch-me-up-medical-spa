"use client"
import Button from "./Button"
import { footerData, socials } from "@/utils/data"
import Link from "next/link"

const Footer = () => {
	return (
		<footer className="my-container bg-foreground text-background py-20 md:py-24 lg:py-32 space-y-40 md:space-y-48 lg:space-y-64">
			<div className="first-part flex flex-col lg:flex-row lg:justify-between lg:items-start gap-20 md:gap-24">
				<div className="cta-part flex flex-col gap-5 md:gap-6 lg:gap-8">
					<div>
						<h1 className="hero-heading">{footerData.heading1}</h1>
						<h1 className="hero-heading">{footerData.heading2}</h1>
					</div>
					<div>
						<Button title={footerData.cta} />
					</div>
				</div>
				<div className="address-social flex flex-col gap-6 md:gap-12 lg:gap-16">
					<div className="address flex flex-col md:flex-row md:justify-between gap-6 lg:gap-14">
						{footerData.addresses.map((add) => (
							<div
								key={add.name}
								className="flex flex-col gap-3 md:gap-4 lg:gap-5"
							>
								<h3 className="paragraph-text text-gray-300">
									{add.name}
								</h3>
								<div className="add paragraph-text flex flex-wrap md:flex-col md:flex-nowrap gap-2 md:gap-0">
									<p>{add.street}</p>
									<p>{add.city}</p>
									<p>{add.state}</p>
								</div>
							</div>
						))}
					</div>
					<div className="social flex flex-col gap-3 md:gap-4 lg:gap-5">
						<h3 className="paragraph-text text-gray-300">
							{footerData.socialsHeading}
						</h3>
						<div className="flex gap-2 paragraph-text">
							{socials.map((s) => (
								<Link
									key={s.name}
									href={s.link}
									target="_blank"
								>
									{s.name}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="copy-policy text-gray-400 flex flex-col lg:flex-row lg:justify-between gap-6">
				<div className="copyright">
					<p className="button-text">{footerData.copyrightText}</p>
					<Link href={"#"} className="button-text underline">
						{footerData.privacy}
					</Link>
				</div>
				<div className="">
					<p className="button-text">Designer and Developer</p>
					<Link href={"#"} className="button-text underline">
						Ashman Sidhu
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer
