import { useState } from "react";
import {
	PrismicRichText,
	PrismicText,
	type SliceComponentProps,
} from "@prismicio/react";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";

import { cx } from "../../lib/cx";
import { BoundedSection } from "../../components/BoundedSection";

export type VideoHighlightsSlice = prismicT.SharedSlice<
	"custom_logos",
	prismicT.SharedSliceVariation<
		"default-slice",
		{
			eyebrowHeadline: prismicT.TitleField;
			title: prismicT.TitleField;
			description: prismicT.RichTextField;
		},
		{
			videoTitle: prismicT.RichTextField;
			videoSource: prismicT.EmbedField;
		}
	>
>;

export default function VideoHighlights({
	slice,
}: SliceComponentProps<VideoHighlightsSlice>) {
	const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);
	const activeHighlight = slice.items[activeHighlightIndex];

	return (
		<BoundedSection
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="essential-slice video-highlights"
		>
			<div className="video-highlights__content">
				<div className="video-highlights__intro">
					{prismicH.asText(slice.primary.eyebrowHeadline) && (
						<p className="video-highlights__intro__eyebrow">
							<PrismicText field={slice.primary.eyebrowHeadline} />
						</p>
					)}
					{prismicH.asText(slice.primary.title) && (
						<h2 className="video-highlights__intro__headline">
							<PrismicText field={slice.primary.title} />
						</h2>
					)}
					{prismicH.asText(slice.primary.description) && (
						<div className="video-highlights__intro__description">
							<PrismicRichText field={slice.primary.description} />
						</div>
					)}
				</div>
				<div className="video-highlights__highlights">
					<div className="video-highlights__highlights__video">
						<div
							className="video-highlights__highlights__video__embed"
							dangerouslySetInnerHTML={{
								__html: activeHighlight.videoSource.html || "",
							}}
						/>
					</div>
					<ul className="video-highlights__highlights__tabs">
						{slice.items.map((item, index) => (
							<li
								key={item.videoSource.url}
								className={cx(
									"video-highlights__highlights__tab",
									activeHighlightIndex === index &&
										"video-highlights__highlights__tab--active",
								)}
							>
								<button
									className={cx(
										"video-highlights__highlights__tab__button",
										activeHighlightIndex === index &&
											"video-highlights__highlights__tab__button--active",
									)}
									onClick={() => setActiveHighlightIndex(index)}
								>
									<PrismicText field={item.videoTitle} />
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</BoundedSection>
	);
}
