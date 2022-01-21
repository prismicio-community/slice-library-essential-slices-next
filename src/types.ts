import * as prismicT from "@prismicio/types";

export type SliceLike<SliceType extends string = string> = Pick<
	prismicT.Slice<SliceType>,
	"slice_type"
>;

export type SliceZoneLike<TSlice extends SliceLike> = readonly TSlice[];

export type SliceComponentProps<TSlice extends SliceLike = SliceLike> = {
	slice: TSlice;
	index: number;
	slices: SliceZoneLike<SliceLike>;
};
