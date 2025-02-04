<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { register } from '$lib/auth/keycloak';
</script>

<main class="bg-grass-1 min-h-screen">
	<section class="bg-grass-9 text-grass-1">
		<div class="container mx-auto px-6 py-24">
			<h1 class="mb-4 text-5xl font-bold">{m.welcome()}</h1>
			<p class="mb-8 text-xl">{m.tagline()}</p>
			<button
				onclick={register}
				class="bg-grass-1 text-grass-11 hover:bg-grass-3 rounded-full px-6 py-2 text-lg font-semibold transition duration-300"
			>
				{m.getStarted()}
			</button>
		</div>
	</section>

	<section class="bg-grass-2 py-20">
		<div class="container mx-auto px-6">
			<h2 class="text-grass-12 mb-12 text-center text-3xl font-bold">{m.features()}</h2>
			<div class="grid grid-cols-1 gap-12 md:grid-cols-3">
				{#snippet card(title: string, description: string)}
					<div class="bg-grass-1 rounded-lg p-6 shadow-md">
						<h3 class="text-grass-11 mb-4 text-xl font-semibold">
							{title}
						</h3>
						<p class="text-grass-11">{description}</p>
					</div>
				{/snippet}
				{@render card(m.createChallenges(), m.createChallengesDesc())}
				{@render card(m.launchInstances(), m.launchInstancesDesc())}
				{@render card(m.trackProgress(), m.trackProgressDesc())}
			</div>
		</div>
	</section>

	<section class="bg-grass-3 py-20">
		<div class="container mx-auto px-6">
			<h2 class="text-grass-12 mb-12 text-center text-3xl font-bold">{m.howItWorks()}</h2>
			<div class="flex flex-col justify-between gap-8 md:flex-row">
				{#snippet card(idx: number, title: string, description: string)}
					<div class="mb-8 h-full text-center md:mb-0 md:w-1/4">
						<div
							class="bg-grass-9 text-grass-1 mx-auto mb-4 flex h-16 w-16 select-none
							items-center justify-center rounded-full text-2xl font-bold"
						>
							{idx}
						</div>
						<h3 class="text-grass-11 mb-2 text-xl font-semibold">{title}</h3>
						<p class="text-grass-11">{description}</p>
					</div>
				{/snippet}
				{@render card(1, m.signUp(), m.signUpDesc())}
				{@render card(2, m.chooseChallenge(), m.chooseChallengeDesc())}
				{@render card(3, m.solveSubmit(), m.solveSubmitDesc())}
				{@render card(4, m.earnPoints(), m.earnPointsDesc())}
			</div>
		</div>
	</section>

	<section class="bg-grass-2 py-20">
		<div class="container mx-auto px-6 text-center">
			<h2 class="text-grass-12 mb-8 text-3xl font-bold">{m.readyToTest()}</h2>
			<button
				onclick={register}
				class="bg-grass-9 text-grass-1 hover:bg-grass-10 rounded-full px-8 py-3 text-lg font-semibold transition duration-300"
			>
				{m.joinNow()}
			</button>
		</div>
	</section>
</main>
