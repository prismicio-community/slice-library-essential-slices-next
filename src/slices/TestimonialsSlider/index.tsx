import { useState } from "react";
import {
	PrismicRichText,
	PrismicText,
	type SliceComponentProps,
} from "@prismicio/react";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import { useKeenSlider } from "keen-slider/react";

import { cx } from "../../lib/cx";
import { ChevronIcon } from "../../components/ChevronIcon";

export type TestimonialsSliderSlice = prismicT.SharedSlice<
	"image_slider",
	prismicT.SharedSliceVariation<
		"default-slice",
		{
			eyebrowHeadline: prismicT.RichTextField;
			title: prismicT.TitleField;
			paragraph: prismicT.RichTextField;
		},
		{
			image: prismicT.ImageField;
			testimonial: prismicT.RichTextField;
			person: prismicT.KeyTextField;
			title: prismicT.KeyTextField;
		}
	>
>;

type SliderImageProps = {
	image: prismicT.ImageField;
	testimonial: prismicT.RichTextField;
	person: prismicT.KeyTextField;
	title: prismicT.KeyTextField;
};

function Slide({ image, testimonial, person, title }: SliderImageProps) {
	return (
		<figure className="testimonials-slider__slide">
			{image.url && (
				<img
					src={image.url}
					alt={image.alt ?? undefined}
					className="testimonials-slider__slide__image"
				/>
			)}
			<figcaption className="testimonials-slider__slide__testimonial">
				{prismicH.asText(testimonial) && (
					<div className="testimonials-slider__slide__testimonial__content">
						<PrismicRichText field={testimonial} />
					</div>
				)}
				<div className="testimonials-slider__slide__testimonial__person">
					{person && (
						<span className="testimonials-slider__slide__testimonial__person__name">
							{person}
						</span>
					)}
					{title && (
						<span className="testimonials-slider__slide__testimonial__person__title">
							{title}
						</span>
					)}
				</div>
			</figcaption>
		</figure>
	);
}

export default function TestimonialsSlider({
	slice,
}: SliceComponentProps<TestimonialsSliderSlice>) {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const [sliderRef, slider] = useKeenSlider({
		loop: true,
		slides: {
			perView: 1,
			spacing: 32,
		},
		slideChanged: (slider) => {
			setActiveSlideIndex(slider.track.details.rel);
		},
	});

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="essential-slice bounded testimonials-slider"
		>
			<div className="bounded__content testimonials-slider__content">
				<div className="testimonials-slider__intro">
					{prismicH.asText(slice.primary.eyebrowHeadline) && (
						<p className="testimonials-slider__intro__eyebrow">
							<PrismicText field={slice.primary.eyebrowHeadline} />
						</p>
					)}
					{prismicH.asText(slice.primary.title) && (
						<h2 className="testimonials-slider__intro__headline">
							<PrismicText field={slice.primary.title} />
						</h2>
					)}
					{prismicH.asText(slice.primary.paragraph) && (
						<div className="testimonials-slider__intro__description">
							<PrismicRichText field={slice.primary.paragraph} />
						</div>
					)}
				</div>
				{slice.items.length > 0 && (
					<div className="testimonials-slider__slider">
						<ul
							ref={sliderRef}
							className="testimonials-slider__slider__slides keen-slider"
						>
							{slice.items.map(
								(item) =>
									item.image.url && (
										<li
											key={item.image.url}
											className="testimonials-slider__slider__slide keen-slider__slide"
										>
											<Slide
												image={item.image}
												testimonial={item.testimonial}
												person={item.person}
												title={item.title}
											/>
										</li>
									),
							)}
						</ul>
						<div className="testimonials-slider__slider__controls">
							{slice.items.map(
								(item, index) =>
									item.image.url && (
										<button
											key={item.image.url}
											onClick={() => slider.current?.moveToIdx(index)}
											aria-label={`Go to slide ${index + 1}`}
											className="testimonials-slider__slider__dot-control"
										>
											<div
												className={cx(
													"testimonials-slider__slider__dot-control__dot",
													activeSlideIndex === index &&
														"testimonials-slider__slider__dot-control__dot--active",
												)}
											/>
										</button>
									),
							)}
							<button
								onClick={() => slider.current?.prev()}
								aria-label="Previous card"
								className="testimonials-slider__slider__arrow-control testimonials-slider__slider__arrow-control--prev"
							>
								<ChevronIcon
									direction="left"
									aria-hidden={true}
									className="testimonials-slider__slider__arrow-control__icon"
								/>
							</button>
							<button
								onClick={() => slider.current?.next()}
								aria-label="Next card"
								className="testimonials-slider__slider__arrow-control testimonials-slider__slider__arrow-control--next"
							>
								<ChevronIcon
									direction="right"
									aria-hidden={true}
									className="testimonials-slider__slider__arrow-control__icon"
								/>
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
