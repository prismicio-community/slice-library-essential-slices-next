import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { Box } from "theme-ui";

import { Button, Wrap, Desc, Slice } from "../../components";

const CallToAction = ({ slice }) => {
  const styles = {
    header: {
      mb: ["hPaddingHalf", null, "hPadding"],
    },
    icon: {
      mb: "cMargin",
      mx: "auto",
      img: {
        width: "120px",
      },
    },
  };

  return (
    <Slice sx={{ textAlign: "center" }}>
      <Wrap>
        <Box as="header" sx={styles.header}>
          {slice.primary.icon_image && (
            <Box sx={styles.icon}>
              <Box
                as="img"
                alt={slice.primary.icon_image.alt}
                src={slice.primary.icon_image.url}
              />
            </Box>
          )}
          <PrismicRichText field={slice.primary.title} />
        </Box>

        {slice.primary.paragraph && (
          <Desc>
            <PrismicRichText field={slice.primary.paragraph} />
          </Desc>
        )}

        <Button
          label={slice.primary.button_label}
          link={slice.primary.button_link}
          resolver={linkResolver}
          variant="primary"
        />
      </Wrap>
    </Slice>
  );
};

export default CallToAction;
