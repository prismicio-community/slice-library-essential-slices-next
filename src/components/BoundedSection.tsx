import clsx from "clsx";

export type BoundedSectionProps = {
	innerClassName?: string;
} & React.ComponentProps<"section">;

export function BoundedSection({
	children,
	className,
	innerClassName,
	...restProps
}: BoundedSectionProps) {
	return (
		<section className={clsx("bounded-box", className)} {...restProps}>
			<div className={clsx("bounded-box__content", innerClassName)}>
				{children}
			</div>
		</section>
	);
}
