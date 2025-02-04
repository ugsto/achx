/**
 * @see https://svelteui.dev/actions/use-click-outside
 */
export function clickoutside(
	node: HTMLElement,
	params: { enabled: boolean; callback: (node: HTMLElement) => void }
) {
	const { enabled: initialEnabled, callback } = params;

	const handleOutsideClick = ({ target }: MouseEvent) => {
		if (!node.contains(target as Node)) callback(node);
	};

	function update({ enabled }: { enabled: boolean }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}
	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		}
	};
}
