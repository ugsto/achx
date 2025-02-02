<script>
	import { login, logout } from '$lib/auth/keycloak';
	import { isAuthenticatedStore } from '$lib/auth/keycloak-store';

	let isAuthenticated = false;
	$: isAuthenticatedStore.subscribe((value) => (isAuthenticated = value));
</script>

<button on:click={login} disabled={isAuthenticated}> Login </button>
<button on:click={logout} disabled={!isAuthenticated}> Logout </button>

{isAuthenticated}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
