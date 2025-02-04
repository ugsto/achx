import type { Config } from 'tailwindcss';
import * as radixColors from '@radix-ui/colors';

type ColorMap = Record<string, Record<string, string>>;

const VARIANT_SUFFIXES = ['', 'A', 'Dark', 'DarkA'];
const VARIANT_NEW_PREFIXES = ['', 'a', 'd', 'da'];

function getColorVariants(color: string) {
	return VARIANT_SUFFIXES.map((suffix) => `${color}${suffix}`);
}

function getColorScale(colors: ColorMap, color: string) {
	const colorHexes = getColorVariants(color).map((variant) => Object.values(colors[variant]));
	const length = colorHexes[0].length;

	return Object.fromEntries(
		Array.from({ length }, (_, i) =>
			VARIANT_NEW_PREFIXES.map((prefix, j) => [`${prefix}${i + 1}`, colorHexes[j][i]])
		).flat()
	);
}

function getColorNames(colors: ColorMap) {
	return Object.keys(colors).filter((color, _, colors) =>
		getColorVariants(color).every((variant) => colors.includes(variant))
	);
}

const colors = getColorNames(radixColors).reduce(
	(acc, color) => ({ ...acc, [color]: getColorScale(radixColors, color) }),
	{}
);

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: { colors }
	},
	plugins: []
} satisfies Config;
