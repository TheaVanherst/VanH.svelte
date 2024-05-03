<script>
    import { slide } from "svelte/transition";
    import { onMount } from "svelte";

    import { navigationData } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import Container 		from "$root/components/generic/containers/container.svelte";
    import RedirectBuilder 	from "$root/components/generic/wrappers/redirectBuilder.svelte";

    export let data;

    onMount(async () => {
        navigationData.set(e => ({...e, logo: true, navigation: false, socials: false, search: false }));
	});
</script>

<div class="center" transition:slide>
	<Container>
		<div class="wrapper">
			<p>Welcome to VanH. This site is still in development, this page is just filler until I find better use for it.</p>
			<p>Please report any bugs to me directly, or in that chatbox.</p>
		</div>
	</Container>
	<RedirectBuilder url={"/featured"}>
		<div class="button regularBorder unfilter">
			<h4>Continue To Site</h4>
		</div>
	</RedirectBuilder>
</div>

<style lang="scss">
	.center {
		max-width: 	450px;
		width: 		100%;
		margin: 	20px auto auto auto;}

	.wrapper {
		display: 	grid;
		gap: 		10px;}

	.textWrapper {
		* {
			display: 	flex;
			margin: 	0 auto;
			text-align: center;}}

	.button {
		transition: background .3s ease;

		h4 {
			width: 		max-content;
			margin: 	-2px auto 0 auto;
			padding: 	5px;
			color: 		black;
			transition: color .3s ease;
		}

		&.filter {	background: var(--accent10);}
		&.unfilter {background: var(--accent3);}
		&:hover {	background: var(--accent7);
			h4 {	color: 		var(--accent10);}}}
</style>