import { RichText } from "prismic-reactjs";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { SliceComponentProps } from "../../types";
import { ButtonLink } from "../../components/ButtonLink";
import { PrismicLink } from "../../components/PrismicLink";

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
			className="essential-slice es-bounded es-customer-logos"
		>
			<div className="es-bounded__content es-customer-logos__content">
				{prismicH.asText(slice.primary.eyebrowHeadline) && (
					<h2 className="es-customer-logos__heading">
						{prismicH.asText(slice.primary.eyebrowHeadline)}
					</h2>
				)}
				{slice.items.length > 0 && (
					<ul className="es-customer-logos__logos">
						{slice.items.map(
							(item) =>
								item.logo.url && (
									<li key={item.logo.url} className="es-customer-logos__logo">
										<PrismicLink
											field={item.link}
											className="es-customer-logos__link"
										>
											<img
												src={item.logo.url}
												alt={item.logo.alt ?? undefined}
												className="es-customer-logos__logo__link__image"
											/>
										</PrismicLink>
									</li>
								),
						)}
					</ul>
				)}
				<ButtonLink
					field={slice.primary.callToActionLink}
					className="es-customer-logos__button"
				>
					{prismicH.asText(slice.primary.callToAction) || "Learn more"}
				</ButtonLink>
			</div>
		</section>
	);
}
