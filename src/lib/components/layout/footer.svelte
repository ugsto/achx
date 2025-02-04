<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import DiscordIcon from 'virtual:icons/mdi/discord';
	import GithubIcon from 'virtual:icons/mdi/github';
	import Separator from '../functional/separator.svelte';

	const currentYear = new Date().getFullYear();

	const footerLinks = [
		{ href: '/about', label: m.about },
		{ href: '/contact', label: m.contact },
		{ href: '/privacy', label: m.privacy },
		{ href: '/terms', label: m.terms }
	];

	const socialLinks = [
		{ href: 'https://discord.gg/vxRN3N94', icon: DiscordIcon, label: 'Discord' },
		{ href: 'https://github.com/achx-org', icon: GithubIcon, label: 'GitHub' }
	];
</script>

<footer class="bg-grass-1 text-grass-11 border-grass-6 border-t">
	<div class="container mx-auto flex flex-col items-center gap-8 px-6 py-4">
		<nav class="flex flex-wrap justify-center gap-6">
			{#each footerLinks as link}
				<a
					href={link.href}
					class="text-grass-11 hover:text-grass-12 focus-ring-grass rounded text-sm transition-colors duration-200"
				>
					{link.label()}
				</a>
			{/each}
		</nav>

		<div class="flex gap-4">
			{#each socialLinks as { href, icon: Icon, label }}
				<a
					{href}
					target="_blank"
					rel="noopener noreferrer"
					class="text-grass-11 hover:text-grass-12 focus-ring-grass rounded transition-colors duration-200"
					aria-label={label}
				>
					<Icon class="h-6 w-6" />
				</a>
			{/each}
		</div>

		<p class="text-center text-sm">
			© {currentYear} André Augusto Bortoli<Separator orientation="vertical" />
			{m.allRightsReserved()}
		</p>
	</div>
</footer>
