import { cx } from "../lib/cx";

type ChevronIconProps = {
	direction: "up" | "down" | "left" | "right";
	className?: string;
} & React.SVGProps<SVGSVGElement>;

export function ChevronIcon({
	direction,
	className,
	...props
}: ChevronIconProps) {
	return (
		<svg
			viewBox="0 0 12 8"
			className={cx("chevron-icon", `chevron-icon--${direction}`, className)}
			{...props}
		>
			<g fill="none">
				<path fill="currentColor" d="M1.41.59 6 5.17 10.59.59 12 2 6 8 0 2z" />
				<path d="M-6-8h24v24H-6z" />
			</g>
		</svg>
	);
}
