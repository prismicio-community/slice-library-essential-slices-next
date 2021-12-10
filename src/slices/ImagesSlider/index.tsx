import { useState } from "react";
import {
	PrismicRichText,
	PrismicText,
	type SliceComponentProps,
} from "@prismicio/react";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import { useKeenSlider } from "keen-slider/react";

import { cx } from "../../cx";

export type ImagesSliderSlice = prismicT.SharedSlice<
	"image_slider",
	prismicT.SharedSliceVariation<
		"default-slice",
		{
			eyebrowHeadline: prismicT.RichTextField;
			title: prismicT.TitleField;
			description: prismicT.RichTextField;
		},
		{
			image: prismicT.ImageField;
			description: prismicT.RichTextField;
		}
	>
>;

type SliderImageProps = {
	image: prismicT.ImageField;
	description: prismicT.RichTextField;
};

function Slide({ image, description }: SliderImageProps) {
	return (
		<figure className="es-images-slider__slide">
			{image.url && (
				<img
					src={image.url}
					alt={image.alt ?? undefined}
					className="es-images-slider__slide__image"
				/>
			)}
			{prismicH.asText(description) && (
				<figcaption className="es-images-slider__slide__description">
					<PrismicRichText field={description} />
				</figcaption>
			)}
		</figure>
	);
}

export default function ImagesSlider({
	slice,
}: SliceComponentProps<ImagesSliderSlice>) {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const [sliderRef, slider] = useKeenSlider({
		loop: true,
		slides: { perView: 1 },
		slideChanged: (slider) => {
			setActiveSlideIndex(slider.track.details.rel);
		},
	});

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="essential-slice es-bounded es-images-slider"
		>
			<div className="es-bounded__content es-images-slider__content">
				<div className="es-images-slider__intro">
					{prismicH.asText(slice.primary.eyebrowHeadline) && (
						<p className="es-images-slider__intro__eyebrow">
							<PrismicText field={slice.primary.eyebrowHeadline} />
						</p>
					)}
					{prismicH.asText(slice.primary.title) && (
						<h2 className="es-images-slider__intro__headline">
							<PrismicText field={slice.primary.title} />
						</h2>
					)}
					{prismicH.asText(slice.primary.description) && (
						<div className="es-images-slider__intro__description">
							<PrismicRichText field={slice.primary.description} />
						</div>
					)}
				</div>
				{slice.items.length > 0 && (
					<div className="es-images-slider__slider">
						<ul
							ref={sliderRef}
							className="es-images-slider__slider__slides keen-slider"
						>
							{slice.items.map(
								(item) =>
									item.image.url && (
										<li
											key={item.image.url}
											className="es-images-slider__slider__slide keen-slider__slide"
										>
											<Slide
												image={item.image}
												description={item.description}
											/>
										</li>
									),
							)}
						</ul>
						<div className="es-images-slider__slider__controls">
							{slice.items.map(
								(item, index) =>
									item.image.url && (
										<button
											key={item.image.url}
											onClick={() => slider.current?.moveToIdx(index)}
											aria-label={`Go to slide ${index + 1}`}
											className="es-images-slider__slider__control"
										>
											<div
												className={cx(
													"es-images-slider__slider__control__dot",
													activeSlideIndex === index &&
														"es-images-slider__slider__control__dot--active",
												)}
											/>
										</button>
									),
							)}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
