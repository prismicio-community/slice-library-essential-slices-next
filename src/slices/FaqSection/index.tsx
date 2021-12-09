import { useReducer } from "react";
import {
	PrismicRichText,
	PrismicText,
	type SliceComponentProps,
} from "@prismicio/react";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { cx } from "../../lib/cx";

export type FaqSectionSlice = prismicT.SharedSlice<
	"custom_logos",
	prismicT.SharedSliceVariation<
		"default-slice",
		{
			eyebrowHeadline: prismicT.TitleField;
			title: prismicT.TitleField;
			description: prismicT.RichTextField;
			optionalImage: prismicT.ImageField;
		},
		{
			title: prismicT.TitleField;
			text: prismicT.RichTextField;
		}
	>
>;

type ChevronProps = {
	direction: "up" | "down";
	className?: string;
} & React.SVGProps<SVGSVGElement>;

function Chevron({ direction, className, ...props }: ChevronProps) {
	return (
		<svg
			viewBox="0 0 12 8"
			className={cx(
				"faq-section__chevron",
				`faq-section__chevron--${direction}`,
				className,
			)}
			{...props}
		>
			<g fill="none">
				<path fill="currentColor" d="M1.41.59 6 5.17 10.59.59 12 2 6 8 0 2z" />
				<path d="M-6-8h24v24H-6z" />
			</g>
		</svg>
	);
}

type QuestionProps = {
	title: prismicT.TitleField;
	text: prismicT.RichTextField;
};

function Question({ title, text }: QuestionProps) {
	const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);

	return (
		<div className="faq-section__question">
			<button
				onClick={() => toggleIsOpen()}
				className="faq-section__question__toggler"
			>
				<span className="faq-section__question__toggler__label">
					<PrismicText field={title} />
				</span>
				<Chevron
					direction={isOpen ? "up" : "down"}
					aria-hidden={true}
					className="faq-section__question__toggler__icon"
				/>
			</button>
			<div
				className={cx(
					"faq-section__question__content",
					isOpen && "faq-section__question__content--open",
				)}
			>
				<PrismicRichText field={text} />
			</div>
		</div>
	);
}

export default function FaqSection({
	slice,
}: SliceComponentProps<FaqSectionSlice>) {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="essential-slice bounded faq-section"
		>
			<div className="bounded__content faq-section__content">
				<div className="faq-section__intro">
					{prismicH.asText(slice.primary.eyebrowHeadline) && (
						<p className="faq-section__intro__eyebrow">
							<PrismicText field={slice.primary.eyebrowHeadline} />
						</p>
					)}
					{prismicH.asText(slice.primary.title) && (
						<h2 className="faq-section__intro__headline">
							<PrismicText field={slice.primary.title} />
						</h2>
					)}
					{prismicH.asText(slice.primary.description) && (
						<div className="faq-section__intro__description">
							<PrismicRichText field={slice.primary.description} />
						</div>
					)}
				</div>
				<div
					className={cx(
						"faq-section__primary-content",
						slice.primary.optionalImage.url &&
							"faq-section__primary-content--with-image",
					)}
				>
					{slice.primary.optionalImage.url && (
						<img
							src={slice.primary.optionalImage.url}
							alt={slice.primary.optionalImage.alt ?? undefined}
							className="faq-section__primary-content__image"
						/>
					)}
					{slice.items.length > 0 && (
						<ul className="faq-section__primary-content__questions">
							{slice.items.map((item) => (
								<li
									key={prismicH.asText(item.title)}
									className="faq-section__question"
								>
									<Question title={item.title} text={item.text} />
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
}
