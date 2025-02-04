<script lang="ts">
	import { login, logout, register } from '$lib/auth/keycloak';
	import Dropdown from '../functional/dropdown.svelte';
	import ExternalLinkIcon from 'virtual:icons/mdi/external-link';
	import UserIcon from 'virtual:icons/mdi/user-circle-outline';
	import SettingsIcon from 'virtual:icons/mdi/settings-outline';
	import HelpIcon from 'virtual:icons/mdi/help-circle-outline';
	import LogoutIcon from 'virtual:icons/mdi/logout';
	import LoginIcon from 'virtual:icons/mdi/login';
	import UserAddIcon from 'virtual:icons/mdi/user-add-outline';
	import SearchIcon from 'virtual:icons/mdi/magnify';
	import ChevronDownIcon from 'virtual:icons/mdi/chevron-down';
	import * as m from '$lib/paraglide/messages';
	import { isAuthenticated } from '$lib/auth/keycloak-store';
	import { languageTag, type AvailableLanguageTag } from '$lib/paraglide/runtime';
	import { i18n, availableLanguages, languageTagToLabel } from '$lib/i18n';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let username = '';
	let searchQuery = '';

	function switchToLanguage(newLanguage: AvailableLanguageTag) {
		const canonicalPath = i18n.route(page.url.pathname);
		const localizedPath = i18n.resolveRoute(canonicalPath, newLanguage);
		goto(localizedPath);
	}

	function handleSearch(event: SubmitEvent) {
		event.preventDefault();
		console.log('Searching for:', searchQuery);
	}
</script>

<header class="bg-blue-1 shadow-md">
	<div class="container mx-auto flex flex-col items-center justify-between px-6 py-3 lg:flex-row">
		<a href="/" class="focus-ring-grass flex gap-2 rounded">
			<img src="/logo.svg" alt="achx logo" class="h-8" />
			<span class="text-green-11 text-2xl font-bold"> achx </span>
		</a>

		<div class="mx-4 my-4 w-full flex-grow lg:my-0 lg:max-w-md">
			<form onsubmit={handleSearch} class="relative">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder={m.search()}
					class="bg-slate-3 text-green-12 placeholder-green-11 focus-ring-grass w-full rounded-full px-4 py-2 pr-10"
				/>
				<button
					type="submit"
					class="focus-ring-grass absolute right-3 top-1/2 -translate-y-1/2 transform rounded"
				>
					<SearchIcon class="text-green-11 h-5 w-5" />
				</button>
			</form>
		</div>

		<div class="flex flex-row gap-2">
			<Dropdown triggerWrapperClass="neon-button-blue-filled px-2">
				{#snippet trigger()}
					<span class="mr-2 text-lg">🌐</span>
					{languageTagToLabel[languageTag()]}
					<ChevronDownIcon class="inline" />
				{/snippet}
				{#snippet items()}
					{@const dropdownItemClass =
						'hover:bg-grass-3 focus:bg-grass-4 flex justify-between w-full items-center px-2 py-1 text-left transition-colors duration-200 focus:outline-none'}
					{#each availableLanguages as { code, label, flag: Flag }}
						<li>
							<button
								tabindex="-1"
								role="menuitem"
								class={dropdownItemClass}
								onclick={() => switchToLanguage(code)}
							>
								<span>{label}</span>
								<Flag />
							</button>
						</li>
					{/each}
				{/snippet}
			</Dropdown>

			{#if $isAuthenticated}
				<div class="group relative">
					<Dropdown triggerWrapperClass="focus-ring-grass rounded-full">
						{#snippet trigger()}
							<img
								src="https://i.pravatar.cc/150?img=68"
								alt="{username}'s avatar"
								class="inline h-10 w-10 overflow-hidden rounded-full object-cover"
							/>
						{/snippet}
						{#snippet items()}
							{@const dropdownItemClass =
								'hover:bg-grass-3 focus:bg-grass-4 flex w-full items-center px-2 py-1 text-left transition-colors duration-200 focus:outline-none'}
							<li>
								<a
									tabindex="-1"
									role="menuitem"
									href="/user/profile"
									class={dropdownItemClass}
								>
									<UserIcon class="text-grass-12 inline" />
									<span class="ml-3">{m.profile()}</span>
								</a>
							</li>
							<li>
								<a
									tabindex="-1"
									role="menuitem"
									href="/user/settings"
									class={dropdownItemClass}
								>
									<SettingsIcon class="text-grass-12 inline" />
									<span class="ml-3">{m.settings()}</span>
								</a>
							</li>
							<li>
								<a
									tabindex="-1"
									role="menuitem"
									href="/help"
									class={dropdownItemClass}
									target="_blank"
								>
									<HelpIcon class="text-grass-12 inline" />
									<span class="ml-3">{m.help()}</span>
									<ExternalLinkIcon class="ml-auto" />
								</a>
							</li>
							<li>
								<button
									tabindex="-1"
									role="menuitem"
									class={dropdownItemClass}
									onclick={logout}
								>
									<LogoutIcon class="text-grass-12 inline" />
									<span class="ml-3">{m.logout()}</span>
								</button>
							</li>
						{/snippet}
					</Dropdown>
				</div>
			{:else}
				<div class="ml-4 space-x-2">
					<button onclick={login} class="neon-button-grass p-2">
						<LoginIcon class="text-grass-12 mr-1 inline" />
						{m.login()}
					</button>
					<button onclick={register} class="neon-button-green-filled p-2">
						<UserAddIcon class="text-grass-12 mr-1 inline" />
						{m.signup()}
					</button>
				</div>
			{/if}
		</div>
	</div>
</header>
