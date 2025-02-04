import { AchxError } from '$lib/exceptions';

export class KeycloakError extends AchxError {}

export class KeycloakInitializationError extends KeycloakError {
	constructor() {
		super(`Keycloak initialization error`);
	}
}

export class KeycloakTokenRefreshError extends KeycloakError {
	constructor() {
		super(`Failed to refresh token`);
	}
}

export class KeycloakLoginError extends KeycloakError {
	constructor() {
		super(`Login failed`);
	}
}

export class KeycloakLogoutError extends KeycloakError {
	constructor() {
		super(`Logout failed`);
	}
}
