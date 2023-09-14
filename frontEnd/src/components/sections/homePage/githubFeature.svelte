<script>
    import { screenType } from '$lib/controllers/accessibilityController.js';

    import Container from "../../generic/container.svelte";
    import Carousel from "$root/components/generic/carousel.svelte";
	import GithubCard from "$root/components/sections/githubCard.svelte";

    export let dataset = [];
</script>

<Container bottom="{10}">
	<Carousel customCalc={$screenType > 2 ? 2 : 1}>
		{#each dataset as dataEntry}
			<swiper-slide>
				<GithubCard data={dataEntry}/>
			</swiper-slide>
		{/each}
	</Carousel>
</Container>
