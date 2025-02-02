import {
	PUBLIC_KEYCLOAK_URL,
	PUBLIC_KEYCLOAK_REALM,
	PUBLIC_KEYCLOAK_CLIENT_ID,
	PUBLIC_KEYCLOAK_REFRESH_INTERVAL,
	PUBLIC_KEYCLOAK_MIN_VALIDITY,
	PUBLIC_KEYCLOAK_TOKEN_TTL
} from '$env/static/public';
import Keycloak from 'keycloak-js';
import { isAuthenticatedStore, tokenStore } from './keycloak-store';

let tokenRefreshInterval: ReturnType<typeof setInterval> | undefined = undefined;

const refreshInterval = Number.parseInt(PUBLIC_KEYCLOAK_REFRESH_INTERVAL);
const minValidty = Number.parseInt(PUBLIC_KEYCLOAK_MIN_VALIDITY);
const tokenTtl = Number.parseInt(PUBLIC_KEYCLOAK_TOKEN_TTL);

export const keycloak = new Keycloak({
	url: PUBLIC_KEYCLOAK_URL,
	realm: PUBLIC_KEYCLOAK_REALM,
	clientId: PUBLIC_KEYCLOAK_CLIENT_ID
});

export async function initAuth() {
	try {
		await keycloak.init({
			onLoad: 'check-sso',
			checkLoginIframe: false,
			pkceMethod: 'S256',
			silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`
		});
	} catch (error) {
		console.error('Keycloak initialization error:', error);
	}

	const isAuthenticated = keycloak.authenticated ?? false;

	isAuthenticatedStore.set(isAuthenticated);
	tokenStore.set(keycloak.token);

	if (isAuthenticated) {
		startTokenRefresh();
	}
}

function startTokenRefresh() {
	if (tokenRefreshInterval !== undefined) {
		return;
	}
	tokenRefreshInterval = setInterval(async () => {
		if (await keycloak.updateToken(minValidty)) {
			return;
		}
		try {
			await keycloak.updateToken(tokenTtl);
			tokenStore.set(keycloak.token);
		} catch (error) {
			console.error('Failed to refresh token', error);
			logout();
		}
	}, refreshInterval * 1000);
}

export function stopTokenRefresh() {
	if (tokenRefreshInterval === undefined) {
		return;
	}
	clearInterval(tokenRefreshInterval);
	tokenRefreshInterval = undefined;
}

export async function login() {
	try {
		await keycloak.login();
	} catch (error) {
		console.error('Login failed:', error);
		return;
	}
	isAuthenticatedStore.set(true);
	tokenStore.set(keycloak.token);
}

export async function logout() {
	try {
		await keycloak.logout();
	} catch (error) {
		console.error('Logout failed:', error);
		return;
	}
	isAuthenticatedStore.set(false);
	tokenStore.set(undefined);
}
