import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export const token = writable<string | undefined>(undefined);
