import { SliceCanvasRenderer } from "@prismicio/slice-canvas-renderer-react";
import { SliceZone } from "@prismicio/react";

import state from "../.slicemachine/libraries-state.json";
import * as slices from "../src/slices";

const components = {
	alternate_grid: slices.AlternateGrid,
	call_to_action: slices.CallToAction,
	customer_logos: slices.CustomerLogos,
	faq_section: slices.FaqSection,
	pricing_table: slices.PricingTable,
	video_highlights: slices.VideoHighlights,
};

const SliceCanvas = () => {
	return (
		<SliceCanvasRenderer
			sliceZone={({ slices }) => (
				<SliceZone slices={slices} components={components} />
			)}
			state={state}
		/>
	);
};

export default SliceCanvas;
