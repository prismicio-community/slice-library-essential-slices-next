import { CallToAction, CallToActionSlice } from "./index";
import mocks from "../../../.slicemachine/assets/src/slices/CallToAction/mocks.json";

export default {
	title: "Slices/CallToAction",
	component: CallToAction,
};

export const Simple = () => (
	<CallToAction
		slice={mocks[0] as unknown as CallToActionSlice}
		slices={[mocks[0]]}
		index={0}
		context={{}}
	/>
);

Simple.story = {
	name: "Simple Example",
};
