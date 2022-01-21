import { SliceSimulator } from "@prismicio/slice-simulator-react";
import SliceZone from "next-slicezone";

import state from "../.slicemachine/libraries-state.json";
import * as slices from "../src/slices";

const resolver = ({ sliceName }) => {
	return slices[sliceName];
};

const SliceCanvas = () => {
	return (
		<SliceSimulator
			sliceZone={({ slices }) => (
				<SliceZone slices={slices} resolver={resolver} />
			)}
			state={state}
		/>
	);
};

export default SliceCanvas;
