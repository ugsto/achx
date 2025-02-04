<script lang="ts">
	import { tick, type Snippet } from 'svelte';
	import { clickoutside } from '$lib/events';
	import { fly } from 'svelte/transition';

	const {
		trigger,
		items,
		triggerWrapperClass
	}: { trigger: Snippet; items: Snippet; triggerWrapperClass: string } = $props();

	let isOpen = $state(false);
	let menuRef: HTMLUListElement | null = $state(null);
	let buttonRef: HTMLButtonElement | null = null;
	let menuItems: HTMLElement[] = [];

	function toggle() {
		isOpen = !isOpen;
		if (isOpen) {
			tick().then(() => {
				updateMenuItems();
				menuItems[0]?.focus();
			});
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!isOpen) return;
		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				closeMenu();
				break;
			case 'Tab':
				event.preventDefault();
				if (event.shiftKey) {
					focusPreviousMenuItem();
					break;
				}
				focusNextMenuItem();
				break;
			case 'ArrowDown':
				event.preventDefault();
				focusNextMenuItem();
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusPreviousMenuItem();
				break;
		}
	}

	function closeMenu() {
		isOpen = false;
		buttonRef?.focus();
	}

	async function updateMenuItems() {
		await tick();
		if (!menuRef) {
			return;
		}
		menuItems = Array.from(menuRef.querySelectorAll('[role="menuitem"]')) as HTMLElement[];
	}

	function focusNextMenuItem() {
		if (menuItems.length === 0) return;
		const currentIndex = menuItems.findIndex((item) => item === document.activeElement);
		const nextIndex = (currentIndex + 1) % menuItems.length;
		menuItems[nextIndex]?.focus();
	}

	function focusPreviousMenuItem() {
		if (menuItems.length === 0) return;
		const currentIndex = menuItems.findIndex((item) => item === document.activeElement);
		const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
		menuItems[prevIndex]?.focus();
	}
</script>

<div
	use:clickoutside={{
		enabled: isOpen,
		callback: () => {
			closeMenu();
		}
	}}
	class="relative"
	role="presentation"
	onkeydown={handleKeydown}
>
	<button
		bind:this={buttonRef}
		onclick={toggle}
		aria-haspopup="true"
		aria-expanded={isOpen}
		aria-controls="menu"
		aria-label="Toggle menu"
		class={triggerWrapperClass}
	>
		{@render trigger()}
	</button>

	{#if isOpen}
		<ul
			bind:this={menuRef}
			id="menu"
			role="menu"
			tabindex="-1"
			aria-hidden={!isOpen}
			transition:fly={{ y: 10, duration: 200, opacity: 0 }}
			class="absolute right-0 z-10 mt-2 w-56 overflow-hidden rounded-lg bg-white shadow-lg"
		>
			{@render items()}
		</ul>
	{/if}
</div>
