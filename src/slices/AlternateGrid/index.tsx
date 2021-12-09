import {
	PrismicRichText,
	PrismicText,
	type SliceComponentProps,
} from "@prismicio/react";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { cx } from "../../lib/cx";

export type AlternateGridSlice = prismicT.SharedSlice<
	"custom_logos",
	prismicT.SharedSliceVariation<
		"default-slice",
		{
			eyebrowHeadline: prismicT.TitleField;
			title: prismicT.TitleField;
			description: prismicT.RichTextField;
			optionalImage: prismicT.ImageField;
			imageSide: prismicT.SelectField<"left" | "right">;
		},
		{
			optionalIcon: prismicT.ImageField;
			title: prismicT.TitleField;
			description: prismicT.RichTextField;
		}
	>
>;

export default function AlternateGrid({
	slice,
}: SliceComponentProps<AlternateGridSlice>) {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="essential-slice bounded alternate-grid"
		>
			<div
				className={cx(
					"bounded__content",
					"alternate-grid__content",
					slice.primary.optionalImage.url &&
						"alternate-grid__content--with-image",
				)}
			>
				{slice.primary.optionalImage.url && (
					<img
						src={slice.primary.optionalImage.url}
						alt={slice.primary.optionalImage.alt ?? undefined}
						className={cx(
							"alternate-grid__image",
							slice.primary.imageSide === "left"
								? "alternate-grid__image--left"
								: "alternate-grid__image--right",
						)}
					/>
				)}
				<div className="alternate-grid__primary-content">
					<div className="alternate-grid__primary-content__intro">
						{prismicH.asText(slice.primary.eyebrowHeadline) && (
							<p className="alternate-grid__primary-content__intro__eyebrow">
								<PrismicText field={slice.primary.eyebrowHeadline} />
							</p>
						)}
						{prismicH.asText(slice.primary.title) && (
							<h2 className="alternate-grid__primary-content__intro__headline">
								<PrismicText field={slice.primary.title} />
							</h2>
						)}
						{prismicH.asText(slice.primary.description) && (
							<div className="alternate-grid__primary-content__intro__description">
								<PrismicRichText field={slice.primary.description} />
							</div>
						)}
					</div>
					{slice.items.length > 0 && (
						<div className="alternate-grid__primary-content__items">
							{slice.items.map((item) => (
								<div className="alternate-grid__item">
									{item.optionalIcon.url && (
										<img
											src={item.optionalIcon.url}
											alt={item.optionalIcon.alt ?? undefined}
											className="alternate-grid__item__icon"
										/>
									)}
									{prismicH.asText(item.title) && (
										<h3 className="alternate-grid__item__heading">
											<PrismicText field={item.title} />
										</h3>
									)}
									{prismicH.asText(item.description) && (
										<div className="alternate-grid__item__description">
											<PrismicRichText field={item.description} />
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
