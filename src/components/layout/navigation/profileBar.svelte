<script>
    import { motion } from '$lib/stores/accessibilityController.js'

    import navigation from '$lib/stores/navigationDirectories.js';
    import Button from "$components/layout/navigation/navButton.svelte";
    import Switch from '$components/globals/toggleSwitch.svelte';
</script>

<div class="profileGraphic">
	<img src="/profileGraphic.png"/>
</div>

<div class="buttonWrapper">
	<div class="wrapperOffset">
		{#each navigation as item}
			<Button push="{item.path}">{item.title}</Button>
		{/each}
	</div>
</div>

<Switch label="Reduced Motion" bind:bool={$motion}/>

<style lang="scss">
	.profileGraphic {
		height: 500px;
		width:  100%;
		margin: 0 0 var(--containerPadding) 0;

		display:            flex;
		justify-content:    center;

		> img {
			height:     550px;
			margin:     0 auto;

			position:   absolute;
			animation:  float 6s ease-in-out infinite;
		}
	}

	@keyframes float {
		0% {	transform:  translatey(0px);}
		50% {	transform:  translatey(-20px);}
		100% {	transform:  translatey(0px);}
	}
</style>