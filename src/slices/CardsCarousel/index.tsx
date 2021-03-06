import { RichText } from "prismic-reactjs";
import type * as prismicT from "@prismicio/types";
import * as prismicH from "@prismicio/helpers";
import { useKeenSlider } from "keen-slider/react";

import { ChevronIcon } from "../../components/ChevronIcon";
import { SliceComponentProps } from "../../types";

export type CardsCarouselSlice = prismicT.SharedSlice<
	"custom_logos",
	prismicT.SharedSliceVariation<
		"default-slice",
		{
			eyebrowHeadline: prismicT.TitleField;
			title: prismicT.TitleField;
			description: prismicT.RichTextField;
		},
		{
			image: prismicT.ImageField;
			title: prismicT.TitleField;
			content: prismicT.RichTextField;
		}
	>
>;

export default function CardsCarousel({
	slice,
}: SliceComponentProps<CardsCarouselSlice>) {
	const [sliderRef, slider] = useKeenSlider({
		loop: true,
		slides: {
			perView: 1,
			spacing: 32,
		},
		breakpoints: {
			"(min-width: 640px)": {
				slides: {
					perView: 2,
					spacing: 32,
				},
			},
			"(min-width: 896px)": {
				slides: {
					perView: 3,
					spacing: 32,
				},
			},
			"(min-width: 1600px)": {
				slides: {
					perView: 4,
					spacing: 32,
				},
			},
		},
	});

	// The list of cards is duplicated to avoid carousel rendering issues.
	// When less than 4 cards are available, cards will flash into
	// existance on next/prev movements.
	const items = [...slice.items, ...slice.items];

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="essential-slice es-bounded es-cards-carousel"
		>
			<div className="es-bounded__content es-cards-carousel__content">
				<div className="es-cards-carousel__intro">
					{prismicH.asText(slice.primary.eyebrowHeadline) && (
						<p className="es-cards-carousel__intro__eyebrow">
							{prismicH.asText(slice.primary.eyebrowHeadline)}
						</p>
					)}
					{prismicH.asText(slice.primary.title) && (
						<h2 className="es-cards-carousel__intro__headline">
							{prismicH.asText(slice.primary.title)}
						</h2>
					)}
					{prismicH.asText(slice.primary.description) && (
						<div className="es-cards-carousel__intro__description">
							<RichText render={slice.primary.description} />
						</div>
					)}
				</div>
				{slice.items.length > 0 && (
					<div className="es-cards-carousel__carousel">
						<div
							ref={sliderRef}
							className="es-cards-carousel__carousel__cards keen-slider"
						>
							{items.map((item, index) => (
								<div
									key={`${prismicH.asText(item.title)}-${index}`}
									className="es-cards-carousel__card keen-slider__slide"
								>
									{item.image.url && (
										<img
											src={item.image.url}
											alt={item.image.alt ?? undefined}
											className="es-cards-carousel__card__image"
										/>
									)}
									{prismicH.asText(item.title) && (
										<h3 className="es-cards-carousel__card__title">
											{prismicH.asText(item.title)}
										</h3>
									)}
									{prismicH.asText(item.content) && (
										<div className="es-cards-carousel__card__content">
											<RichText render={item.content} />
										</div>
									)}
								</div>
							))}
						</div>
						<button
							onClick={() => slider.current?.prev()}
							aria-label="Previous card"
							className="es-cards-carousel__carousel__control es-cards-carousel__carousel__control--prev"
						>
							<ChevronIcon
								direction="left"
								aria-hidden={true}
								className="es-cards-carousel__carousel__control__icon"
							/>
						</button>
						<button
							onClick={() => slider.current?.next()}
							aria-label="Next card"
							className="es-cards-carousel__carousel__control es-cards-carousel__carousel__control--next"
						>
							<ChevronIcon
								direction="right"
								aria-hidden={true}
								className="es-cards-carousel__carousel__control__icon"
							/>
						</button>
					</div>
				)}
			</div>
		</section>
	);
}
