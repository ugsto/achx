<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { initAuth } from '$lib/auth/keycloak';
	let { children } = $props();

	onMount(async () => {
		await initAuth();
	});
</script>

{@render children()}
