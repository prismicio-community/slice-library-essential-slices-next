// **NOTE**: This file is taken from `@prismicio/react`. Once this library can
// use `@prismicio/react`, this file will be removed and replaced by using the
// PrismicLink component directly from `@prismicio/react`.

import * as React from "react";
import * as prismicH from "@prismicio/helpers";
import * as prismicT from "@prismicio/types";

/**
 * Determines if a URL is internal or external.
 *
 * @param url - The URL to check if internal or external.
 *
 * @returns `true` if `url` is internal, `false` otherwise.
 */
const isInternalURL = (url: string): boolean => {
	const isInternal = /^(\/(?!\/)|#)/.test(url);
	const isSpecialLink = !isInternal && !/^https?:\/\//.test(url);

	return isInternal && !isSpecialLink;
};

/**
 * Props provided to a component when rendered with `<PrismicLink>`.
 */
export interface LinkProps {
	/**
	 * The URL to link.
	 */
	href: string;

	/**
	 * The `target` attribute for anchor elements. If the Prismic field is
	 * configured to open in a new window, this prop defaults to `_blank`.
	 */
	target?: string;

	/**
	 * The `rel` attribute for anchor elements. If the `target` prop is set to
	 * `"_blank"`, this prop defaults to `"noopener noreferrer"`.
	 */
	rel?: string;

	/**
	 * Children for the component. *
	 */
	children?: React.ReactNode;
}

/**
 * Props for `<PrismicLink>`.
 */
export type PrismicLinkProps<
	InternalComponent extends React.ElementType<LinkProps> = React.ElementType<LinkProps>,
	ExternalComponent extends React.ElementType<LinkProps> = React.ElementType<LinkProps>,
	LinkResolverFunction extends prismicH.LinkResolverFunction = prismicH.LinkResolverFunction,
> = Omit<
	React.ComponentProps<InternalComponent> &
		React.ComponentProps<ExternalComponent>,
	keyof LinkProps
> & {
	/**
	 * The Link Resolver used to resolve links.
	 *
	 * @remarks
	 * If your app uses Route Resolvers when querying for your Prismic
	 * repository's content, a Link Resolver does not need to be provided.
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
	 */
	linkResolver?: LinkResolverFunction;

	/**
	 * The component rendered for internal URLs. Defaults to `<a>`.
	 *
	 * If your app uses a client-side router that requires a special Link
	 * component, provide the Link component to this prop.
	 */
	internalComponent?: InternalComponent;

	/**
	 * The component rendered for external URLs. Defaults to `<a>`.
	 */
	externalComponent?: ExternalComponent;

	/**
	 * The `target` attribute for anchor elements. If the Prismic field is
	 * configured to open in a new window, this prop defaults to `_blank`.
	 */
	target?: string | null;

	/**
	 * The `rel` attribute for anchor elements. If the `target` prop is set to
	 * `"_blank"`, this prop defaults to `"noopener noreferrer"`.
	 */
	rel?: string | null;

	/**
	 * Children for the component. *
	 */
	children?: React.ReactNode;
} & (
		| {
				/**
				 * The Prismic Link field containing the URL or document to link.
				 *
				 * @see Learn about Prismic Link fields {@link https://prismic.io/docs/core-concepts/link-content-relationship}
				 */
				field: prismicT.LinkField | null | undefined;
		  }
		| {
				/**
				 * The Prismic document to link.
				 */
				document: prismicT.PrismicDocument | null | undefined;
		  }
		| {
				/**
				 * The URL to link.
				 */
				href: string | null | undefined;
		  }
	);

/**
 * The default component rendered for internal URLs.
 */
const defaultInternalComponent = "a";

/**
 * The default component rendered for external URLs.
 */
const defaultExternalComponent = "a";

/**
 * React component that renders a link from a Prismic Link field.
 *
 * Different components can be rendered depending on whether the link is
 * internal or external. This is helpful when integrating with client-side
 * routers, such as a router-specific Link component.
 *
 * If a link is configured to open in a new window using `target="_blank"`,
 * `rel="noopener noreferrer"` is set by default.
 *
 * @param props - Props for the component.
 *
 * @returns The internal or external link component depending on whether the
 *   link is internal or external.
 */
export const PrismicLink = <
	InternalComponent extends React.ElementType<LinkProps> = typeof defaultInternalComponent,
	ExternalComponent extends React.ElementType<LinkProps> = typeof defaultExternalComponent,
	LinkResolverFunction extends prismicH.LinkResolverFunction = prismicH.LinkResolverFunction,
>(
	props: PrismicLinkProps<
		InternalComponent,
		ExternalComponent,
		LinkResolverFunction
	>,
): JSX.Element | null => {
	const linkResolver = props.linkResolver;

	let href: string | null | undefined;
	if ("href" in props) {
		href = props.href;
	} else if ("document" in props && props.document) {
		href = prismicH.asLink(props.document, linkResolver);
	} else if ("field" in props && props.field) {
		href = prismicH.asLink(props.field, linkResolver);
	}

	const target =
		props.target ||
		("field" in props &&
			props.field &&
			"target" in props.field &&
			props.field.target) ||
		undefined;

	const rel =
		props.rel || (target === "_blank" ? "noopener noreferrer" : undefined);

	const InternalComponent: React.ElementType<LinkProps> =
		props.internalComponent || defaultInternalComponent;

	const ExternalComponent: React.ElementType<LinkProps> =
		props.externalComponent || defaultExternalComponent;

	const isInternal = href && isInternalURL(href);

	const Component = isInternal ? InternalComponent : ExternalComponent;

	const passthroughProps: typeof props = Object.assign({}, props);
	delete passthroughProps.linkResolver;
	delete passthroughProps.internalComponent;
	delete passthroughProps.externalComponent;
	delete passthroughProps.rel;
	delete passthroughProps.target;
	if ("field" in passthroughProps) {
		delete passthroughProps.field;
	} else if ("document" in passthroughProps) {
		delete passthroughProps.document;
	} else if ("href" in passthroughProps) {
		delete passthroughProps.href;
	}

	return href ? (
		<Component {...passthroughProps} href={href} target={target} rel={rel} />
	) : null;
};
