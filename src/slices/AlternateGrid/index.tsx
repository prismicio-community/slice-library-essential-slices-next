import { RichText } from "prismic-reactjs";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { cx } from "../../cx";
import { SliceComponentProps } from "../../types";

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
			className="essential-slice es-bounded es-alternate-grid"
		>
			<div
				className={cx(
					"es-bounded__content",
					"es-alternate-grid__content",
					slice.primary.optionalImage.url &&
						"es-alternate-grid__content--with-image",
				)}
			>
				{slice.primary.optionalImage.url && (
					<img
						src={slice.primary.optionalImage.url}
						alt={slice.primary.optionalImage.alt ?? undefined}
						className={cx(
							"es-alternate-grid__image",
							slice.primary.imageSide === "left"
								? "es-alternate-grid__image--left"
								: "es-alternate-grid__image--right",
						)}
					/>
				)}
				<div className="es-alternate-grid__primary-content">
					<div className="es-alternate-grid__primary-content__intro">
						{prismicH.asText(slice.primary.eyebrowHeadline) && (
							<p className="es-alternate-grid__primary-content__intro__eyebrow">
								{prismicH.asText(slice.primary.eyebrowHeadline)}
							</p>
						)}
						{prismicH.asText(slice.primary.title) && (
							<h2 className="es-alternate-grid__primary-content__intro__headline">
								{prismicH.asText(slice.primary.title)}
							</h2>
						)}
						{prismicH.asText(slice.primary.description) && (
							<div className="es-alternate-grid__primary-content__intro__description">
								<RichText render={slice.primary.description} />
							</div>
						)}
					</div>
					{slice.items.length > 0 && (
						<div className="es-alternate-grid__primary-content__items">
							{slice.items.map((item) => (
								<div className="es-alternate-grid__item">
									{item.optionalIcon.url && (
										<img
											src={item.optionalIcon.url}
											alt={item.optionalIcon.alt ?? undefined}
											className="es-alternate-grid__item__icon"
										/>
									)}
									{prismicH.asText(item.title) && (
										<h3 className="es-alternate-grid__item__heading">
											{prismicH.asText(item.title)}
										</h3>
									)}
									{prismicH.asText(item.description) && (
										<div className="es-alternate-grid__item__description">
											<RichText render={item.description} />
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
