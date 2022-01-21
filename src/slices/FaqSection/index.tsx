import { useReducer } from "react";
import { RichText } from "prismic-reactjs";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { cx } from "../../cx";
import { ChevronIcon } from "../../components/ChevronIcon";
import { SliceComponentProps } from "../../types";

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

type QuestionProps = {
	title: prismicT.TitleField;
	text: prismicT.RichTextField;
};

function Question({ title, text }: QuestionProps) {
	const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);

	return (
		<div className="es-faq-section__question">
			<button
				onClick={() => toggleIsOpen()}
				className="es-faq-section__question__toggler"
			>
				<span className="es-faq-section__question__toggler__label">
					{prismicH.asText(title)}
				</span>
				<ChevronIcon
					direction={isOpen ? "up" : "down"}
					aria-hidden={true}
					className="es-faq-section__question__toggler__icon"
				/>
			</button>
			<div
				className={cx(
					"es-faq-section__question__content",
					isOpen && "es-faq-section__question__content--open",
				)}
			>
				<RichText render={text} />
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
			className="essential-slice es-bounded es-faq-section"
		>
			<div className="es-bounded__content es-faq-section__content">
				<div className="es-faq-section__intro">
					{prismicH.asText(slice.primary.eyebrowHeadline) && (
						<p className="es-faq-section__intro__eyebrow">
							{prismicH.asText(slice.primary.eyebrowHeadline)}
						</p>
					)}
					{prismicH.asText(slice.primary.title) && (
						<h2 className="es-faq-section__intro__headline">
							{prismicH.asText(slice.primary.title)}
						</h2>
					)}
					{prismicH.asText(slice.primary.description) && (
						<div className="es-faq-section__intro__description">
							<RichText render={slice.primary.description} />
						</div>
					)}
				</div>
				<div
					className={cx(
						"es-faq-section__primary-content",
						slice.primary.optionalImage.url &&
							"es-faq-section__primary-content--with-image",
					)}
				>
					{slice.primary.optionalImage.url && (
						<img
							src={slice.primary.optionalImage.url}
							alt={slice.primary.optionalImage.alt ?? undefined}
							className="es-faq-section__primary-content__image"
						/>
					)}
					{slice.items.length > 0 && (
						<ul className="es-faq-section__primary-content__questions">
							{slice.items.map((item) => (
								<li
									key={prismicH.asText(item.title)}
									className="es-faq-section__question"
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
