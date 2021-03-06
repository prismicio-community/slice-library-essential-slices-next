import { RichText } from "prismic-reactjs";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { ButtonLink } from "../../components/ButtonLink";
import { SliceComponentProps } from "../../types";

export type CallToActionSlice = prismicT.SharedSlice<
	"call_to_action",
	prismicT.SharedSliceVariation<
		"default-slice",
		{
			iconImage: prismicT.ImageField;
			title: prismicT.TitleField;
			paragraph: prismicT.RichTextField;
			buttonLink: prismicT.LinkField;
			buttonLabel: prismicT.KeyTextField;
		}
	>
>;

export default function CallToAction({
	slice,
}: SliceComponentProps<CallToActionSlice>) {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="essential-slice es-bounded es-call-to-action"
		>
			<div className="es-bounded__content es-call-to-action__content">
				{slice.primary.iconImage.url && (
					<img
						src={slice.primary.iconImage.url}
						alt={slice.primary.iconImage.alt ?? undefined}
						className="es-call-to-action__image"
					/>
				)}
				<div className="es-call-to-action__content">
					{prismicH.asText(slice.primary.title) && (
						<h2 className="es-call-to-action__content__heading">
							{prismicH.asText(slice.primary.title)}
						</h2>
					)}
					{prismicH.asText(slice.primary.paragraph) && (
						<div className="es-call-to-action__content__paragraph">
							<RichText render={slice.primary.paragraph} />
						</div>
					)}
				</div>
				<ButtonLink
					field={slice.primary.buttonLink}
					variant="green"
					className="es-call-to-action__button"
				>
					{slice.primary.buttonLabel || "Learn more…"}
				</ButtonLink>
			</div>
		</section>
	);
}
