import { SliceCanvasRenderer } from "@prismicio/slice-canvas-renderer-react";
import { SliceZone } from "@prismicio/react";

import { components } from "../slices";
import state from "../.slicemachine/slice-canvas-state.json";

const SliceCanvas = () => (
  <SliceCanvasRenderer
    sliceZone={(slices) => (
      <SliceZone slices={slices} components={components} />
    )}
    state={state}
  />
);

export default SliceCanvas;
