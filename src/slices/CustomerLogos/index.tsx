import {
	PrismicLink,
	PrismicText,
	type SliceComponentProps,
} from "@prismicio/react";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import { ButtonLink } from "../../components/ButtonLink";

export type CustomerLogosSlice = prismicT.SharedSlice<
	"custom_logos",
	prismicT.SharedSliceVariation<
		"default-slice",
		{
			eyebrowHeadline: prismicT.TitleField;
			callToAction: prismicT.RichTextField;
			callToActionLink: prismicT.LinkField;
		},
		{
			logo: prismicT.ImageField;
			link: prismicT.LinkField;
		}
	>
>;

export default function CustomerLogos({
	slice,
}: SliceComponentProps<CustomerLogosSlice>) {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="slice customer-logos"
		>
			{prismicH.asText(slice.primary.eyebrowHeadline) && (
				<h2 className="customer-logos__heading">
					<PrismicText field={slice.primary.eyebrowHeadline} />
				</h2>
			)}
			{slice.items.length > 0 && (
				<ul className="customer-logos__logos">
					{slice.items.map(
						(item) =>
							item.logo.url && (
								<li key={item.logo.url} className="customer-logos__logo">
									<PrismicLink
										field={item.link}
										className="customer-logos__link"
									>
										<img
											src={item.logo.url}
											alt={item.logo.alt ?? undefined}
											className="customer-logos__logo__link__image"
										/>
									</PrismicLink>
								</li>
							),
					)}
				</ul>
			)}
			{slice.primary.callToActionLink && (
				<ButtonLink
					field={slice.primary.callToActionLink}
					className="customer-logos__button"
				>
					{prismicH.asText(slice.primary.callToAction) || "Learn more"}
				</ButtonLink>
			)}
		</section>
	);
}
