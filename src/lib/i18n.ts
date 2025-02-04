import * as runtime from '$lib/paraglide/runtime';
import { createI18n } from '@inlang/paraglide-sveltekit';
import type { Component } from 'svelte';
import LangPtBrIcon from 'virtual:icons/circle-flags/br';
import LangEnUsIcon from 'virtual:icons/circle-flags/lang-en-us';
export const i18n = createI18n(runtime);

export const languageTagToLabel: Record<runtime.AvailableLanguageTag, string> = {
	'pt-br': 'Português',
	en: 'English'
};

export const availableLanguages: {
	code: runtime.AvailableLanguageTag;
	label: string;
	flag: Component;
}[] = [
	{ code: 'pt-br', label: 'Português', flag: LangPtBrIcon },
	{ code: 'en', label: 'English', flag: LangEnUsIcon }
];
