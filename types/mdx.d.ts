// types/mdx.d.ts
declare module "*.mdx" {
	let MDXComponent: (props) => import("react").JSX.Element;
	export default MDXComponent;
}
