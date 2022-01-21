import { useState } from "react";
import { RichText } from "prismic-reactjs";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import { useKeenSlider } from "keen-slider/react";

import { cx } from "../../cx";
import { ChevronIcon } from "../../components/ChevronIcon";
import { SliceComponentProps } from "../../types";

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
		<figure className="es-testimonials-slider__slide">
			{image.url && (
				<img
					src={image.url}
					alt={image.alt ?? undefined}
					className="es-testimonials-slider__slide__image"
				/>
			)}
			<figcaption className="es-testimonials-slider__slide__testimonial">
				{prismicH.asText(testimonial) && (
					<div className="es-testimonials-slider__slide__testimonial__content">
						<RichText render={testimonial} />
					</div>
				)}
				<div className="es-testimonials-slider__slide__testimonial__person">
					{person && (
						<span className="es-testimonials-slider__slide__testimonial__person__name">
							{person}
						</span>
					)}
					{title && (
						<span className="es-testimonials-slider__slide__testimonial__person__title">
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
			className="essential-slice es-bounded es-testimonials-slider"
		>
			<div className="es-bounded__content es-testimonials-slider__content">
				<div className="es-testimonials-slider__intro">
					{prismicH.asText(slice.primary.eyebrowHeadline) && (
						<p className="es-testimonials-slider__intro__eyebrow">
							{prismicH.asText(slice.primary.eyebrowHeadline)}
						</p>
					)}
					{prismicH.asText(slice.primary.title) && (
						<h2 className="es-testimonials-slider__intro__headline">
							{prismicH.asText(slice.primary.title)}
						</h2>
					)}
					{prismicH.asText(slice.primary.paragraph) && (
						<div className="es-testimonials-slider__intro__description">
							<RichText render={slice.primary.paragraph} />
						</div>
					)}
				</div>
				{slice.items.length > 0 && (
					<div className="es-testimonials-slider__slider">
						<ul
							ref={sliderRef}
							className="es-testimonials-slider__slider__slides keen-slider"
						>
							{slice.items.map(
								(item) =>
									item.image.url && (
										<li
											key={item.image.url}
											className="es-testimonials-slider__slider__slide keen-slider__slide"
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
						<div className="es-testimonials-slider__slider__controls">
							{slice.items.map(
								(item, index) =>
									item.image.url && (
										<button
											key={item.image.url}
											onClick={() => slider.current?.moveToIdx(index)}
											aria-label={`Go to slide ${index + 1}`}
											className="es-testimonials-slider__slider__dot-control"
										>
											<div
												className={cx(
													"es-testimonials-slider__slider__dot-control__dot",
													activeSlideIndex === index &&
														"es-testimonials-slider__slider__dot-control__dot--active",
												)}
											/>
										</button>
									),
							)}
							<button
								onClick={() => slider.current?.prev()}
								aria-label="Previous card"
								className="es-testimonials-slider__slider__arrow-control es-testimonials-slider__slider__arrow-control--prev"
							>
								<ChevronIcon
									direction="left"
									aria-hidden={true}
									className="es-testimonials-slider__slider__arrow-control__icon"
								/>
							</button>
							<button
								onClick={() => slider.current?.next()}
								aria-label="Next card"
								className="es-testimonials-slider__slider__arrow-control es-testimonials-slider__slider__arrow-control--next"
							>
								<ChevronIcon
									direction="right"
									aria-hidden={true}
									className="es-testimonials-slider__slider__arrow-control__icon"
								/>
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
