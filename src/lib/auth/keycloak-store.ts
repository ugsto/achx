import { writable } from 'svelte/store';

export const isAuthenticatedStore = writable(false);
export const tokenStore = writable<string | undefined>(undefined);
