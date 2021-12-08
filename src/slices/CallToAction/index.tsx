import {
	PrismicRichText,
	PrismicText,
	type SliceComponentProps,
} from "@prismicio/react";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { ButtonLink } from "../../components/ButtonLink";
import { BoundedSection } from "../../components/BoundedSection";

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
		<BoundedSection
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="slice call-to-action"
		>
			<div className="call-to-action__content">
				{slice.primary.iconImage.url && (
					<img
						src={slice.primary.iconImage.url}
						alt={slice.primary.iconImage.alt ?? undefined}
						className="call-to-action__image"
					/>
				)}
				<div className="call-to-action__content">
					{prismicH.asText(slice.primary.title) && (
						<h2 className="call-to-action__content__heading">
							<PrismicText field={slice.primary.title} />
						</h2>
					)}
					{prismicH.asText(slice.primary.paragraph) && (
						<div className="call-to-action__content__paragraph">
							<PrismicRichText field={slice.primary.paragraph} />
						</div>
					)}
				</div>
				<ButtonLink
					field={slice.primary.buttonLink}
					variant="green"
					className="call-to-action__button"
				>
					{slice.primary.buttonLabel || "Learn more…"}
				</ButtonLink>
			</div>
		</BoundedSection>
	);
}
