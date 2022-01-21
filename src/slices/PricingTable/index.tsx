import { RichText } from "prismic-reactjs";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { cx } from "../../cx";
import { ButtonLink } from "../../components/ButtonLink";
import { SliceComponentProps } from "../../types";

export type PricingTableSlice = prismicT.SharedSlice<
	"custom_logos",
	prismicT.SharedSliceVariation<
		"default-slice",
		{
			eyebrowHeadline: prismicT.TitleField;
			title: prismicT.TitleField;
			description: prismicT.RichTextField;
		},
		{
			planTitle: prismicT.TitleField;
			priceOption: prismicT.RichTextField;
			features: prismicT.RichTextField;
			callToAction: prismicT.LinkField;
			callToActionText: prismicT.RichTextField;
		}
	>
>;

type PlanCardProps = {
	variant?: "beige" | "white";
	title: prismicT.TitleField;
	priceOption: prismicT.RichTextField;
	features: prismicT.RichTextField;
	callToAction: prismicT.LinkField;
	callToActionText: prismicT.RichTextField;
	className?: string;
};

function PlanCard({
	variant = "beige",
	title,
	priceOption,
	features,
	callToAction,
	callToActionText,
	className,
}: PlanCardProps) {
	return (
		<div
			className={cx(
				"es-pricing-table__plan-card",
				`es-pricing-table__plan-card--${variant}`,
				className,
			)}
		>
			<div className="es-pricing-table__plan-card__content">
				{prismicH.asText(title) && (
					<h3 className="es-pricing-table__plan-card__content__title">
						{prismicH.asText(title)}
					</h3>
				)}
				{prismicH.asText(priceOption) && (
					<p className="es-pricing-table__plan-card__content__price">
						{prismicH.asText(priceOption)}
					</p>
				)}
				{prismicH.asText(features) && (
					<div className="es-pricing-table__plan-card__content__features">
						<RichText render={features} />
					</div>
				)}
			</div>
			<ButtonLink
				field={callToAction}
				className="es-pricing-table__plan-card__button"
			>
				{prismicH.asText(callToActionText) || "Learn more…"}
			</ButtonLink>
		</div>
	);
}

export default function PricingTable({
	slice,
}: SliceComponentProps<PricingTableSlice>) {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="essential-slice es-bounded es-pricing-table"
		>
			<div className="es-bounded__content es-pricing-table__content">
				<div className="es-pricing-table__intro">
					{prismicH.asText(slice.primary.eyebrowHeadline) && (
						<p className="es-pricing-table__intro__eyebrow">
							{prismicH.asText(slice.primary.eyebrowHeadline)}
						</p>
					)}
					{prismicH.asText(slice.primary.title) && (
						<h2 className="es-pricing-table__intro__headline">
							{prismicH.asText(slice.primary.title)}
						</h2>
					)}
					{prismicH.asText(slice.primary.description) && (
						<div className="es-pricing-table__intro__description">
							<RichText render={slice.primary.description} />
						</div>
					)}
				</div>
				{slice.items.length > 0 && (
					<ul className="es-pricing-table__plans">
						{slice.items.map((item, i) => (
							<li
								key={prismicH.asText(item.planTitle)}
								className="es-pricing-table__plan"
							>
								<PlanCard
									variant={i % 2 ? "white" : "beige"}
									title={item.planTitle}
									priceOption={item.priceOption}
									features={item.features}
									callToAction={item.callToAction}
									callToActionText={item.callToActionText}
									className="es-pricing-table__plan__card"
								/>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
}
