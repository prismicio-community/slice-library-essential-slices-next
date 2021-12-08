import {
	PrismicRichText,
	PrismicText,
	type SliceComponentProps,
} from "@prismicio/react";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { cx } from "../../lib/cx";
import { ButtonLink } from "../../components/ButtonLink";
import { BoundedSection } from "../../components/BoundedSection";

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
		<div className={cx("plan-card", `plan-card--${variant}`, className)}>
			<div className="plan-card__content">
				{prismicH.asText(title) && (
					<h3 className="plan-card__content__title">
						<PrismicText field={title} />
					</h3>
				)}
				{prismicH.asText(priceOption) && (
					<p className="plan-card__content__price">
						<PrismicText field={priceOption} />
					</p>
				)}
				{prismicH.asText(features) && (
					<div className="plan-card__content__features">
						<PrismicRichText field={features} />
					</div>
				)}
			</div>
			<ButtonLink field={callToAction} className="plan-card__button">
				{prismicH.asText(callToActionText) || "Learn more…"}
			</ButtonLink>
		</div>
	);
}

export default function PricingTable({
	slice,
}: SliceComponentProps<PricingTableSlice>) {
	return (
		<BoundedSection
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="essential-slice pricing-table"
		>
			<div className="pricing-table__content">
				<div className="pricing-table__intro">
					{prismicH.asText(slice.primary.eyebrowHeadline) && (
						<p className="pricing-table__intro__eyebrow">
							<PrismicText field={slice.primary.eyebrowHeadline} />
						</p>
					)}
					{prismicH.asText(slice.primary.title) && (
						<h2 className="pricing-table__intro__headline">
							<PrismicText field={slice.primary.title} />
						</h2>
					)}
					{prismicH.asText(slice.primary.description) && (
						<div className="pricing-table__intro__description">
							<PrismicRichText field={slice.primary.description} />
						</div>
					)}
				</div>
				{slice.items.length > 0 && (
					<ul className="pricing-table__plans">
						{slice.items.map((item, i) => (
							<li
								key={prismicH.asText(item.planTitle)}
								className="pricing-table__plan"
							>
								<PlanCard
									variant={i % 2 ? "white" : "beige"}
									title={item.planTitle}
									priceOption={item.priceOption}
									features={item.features}
									callToAction={item.callToAction}
									callToActionText={item.callToActionText}
									className="pricing-table__plan__card"
								/>
							</li>
						))}
					</ul>
				)}
			</div>
		</BoundedSection>
	);
}
