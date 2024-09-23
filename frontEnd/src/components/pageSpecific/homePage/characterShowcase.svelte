<script>
    import { fly } 	from 'svelte/transition';

    import { clickOutside } 		from "$lib/controllers/layoutControllers/transitionPresets.js";
    import { navigationControls } 	from "$lib/controllers/layoutControllers/navigationHandling.js";
    import { standardShorthand, standardTinyhand } from "$lib/builders/measurementConverters.js";

    import Carousel 		from "$root/components/generic/containers/imageContainers/carousel.svelte";
    import SanityImage 		from "$root/serializer/sanityImage.svelte";
    import RedirectBuilder 	from "$root/components/generic/wrappers/tags & Inline/redirects/internalRedirectBuilder.svelte";

    import ImageTag 		from "$root/components/generic/containers/imageContainers/imageTag.svelte";

    export let dataset = {};

    dataset.map(i=>{i.active = false; i.timer;})


    const
        iterationBuilder = (c,s) => c ? s ? `${standardTinyhand(c)} - ${standardTinyhand(s)}` : standardTinyhand(c) : s ? standardTinyhand(s) : "",
        ftConverter = (h) => h.measurement === 'ft' ? h.height.toString().replaceAll(".","'") + h.measurement.replaceAll("ft","''") : h.height + h.measurement;
</script>

{#if dataset}
	<Carousel>
		{#if !!dataset}
			{#each dataset as char, i}
				{#if char && $navigationControls.localNsfwCheck(char.nsfw)}
					<swiper-slide>
						<div class="card"
							 use:clickOutside
							 on:click_outside={() => char.active = false}
							 on:mouseenter={() => clearTimeout(char.timer)}
							 on:mouseleave={() => char.timer = setTimeout(() => {char.active = false},750)}>
							<div class="characterCard wideBorder">
								<div class="imageWrapper" on:click={() => {char.active = true}}> <!-- compensates for mobile -->
									<SanityImage image={char.render}/>
									<ImageTag active={char.active}>
										<p>{char.developmentStatus}</p>
									</ImageTag>
								</div>

								{#if !char.active}
									<div class="previewCard" on:click={() => {char.active = true}}
										 transition:fly={{y: 50, duration: 400 }}>
										<div class="title regularBorder">
											<h4>{char.nickName}</h4>
											<p>{char.job}</p>
										</div>
									</div>
								{:else}
									<div class="infoPlate" on:click={() => {char.active = false}}
										 transition:fly={{y: -50, duration: 400 }}>

										<div class="plate regularBorder redirect">
											<RedirectBuilder url="/artwork/?query=:{char.slug.replaceAll(' ','-')}">
												<div class="table">
													<div class="cell">
														<div class="characterIcon">
															<SanityImage image={char.icon}/>
														</div>
													</div>
													<div class="cell">
														<h4>{char.fullName}</h4>
														<p>{char.job}</p>
													</div>
												</div>
											</RedirectBuilder>
										</div>

										<div class="plate regularBorder">
											<div class="description">
												{#if !!char.sexuality}
													<p><span>Sexuality</span>:{char.sex} {char.sexuality}</p>{/if}
												{#if !!char.species}
													<p><span>Species</span>: {char.species}</p>{/if}
												{#if !!char.nationality}
													<p><span>Nationality</span>: {char.nationality}</p>{/if}
												{#if !!char.timePeriod}
													<p><span>Time period</span>: {char.timePeriod}</p>{/if}
												{#if !!char.birthday}
													<p><span>Birthday</span>: {standardShorthand(char.birthday)}</p>{/if}
												{#if !!char.age}
													<p><span>Age</span>: {char.age.years} {char.age.measurement} years</p>{/if}
											</div>
										</div>

										<div class="plate regularBorder">
											<div class="description">
												<p class="subtitle">Height</p>
												{#if char.heights.length > 0}
													{#each char.heights as heightset}
														<p class="{heightset.loreType}Height">
															<span>{heightset.loreType}</span>: {ftConverter(heightset.lowestHeight)} {!!heightset?.maxHeight?.height ? " - " + ftConverter(heightset.maxHeight) : ''}
														</p>
													{/each}
												{/if}
											</div>
										</div>

										<div class="plate regularBorder">
											<div class="description">
												<p class="subtitle">Description</p>
												<p id="bio">{char.description}</p>
											</div>
										</div>

										<div class="plate regularBorder">
											{#if char.creation}
												<div class="description">
													<p class="subtitle">Design Iterations</p>
													<p id="creationDate"><span>Creation Date</span>: {standardTinyhand(char.creation)}</p>
													{#if char.prevcreation}
														{#each char.prevcreation as iteration}
															<p id="IterationsDate">
																<span>Previous Iterations</span>: {iterationBuilder(iteration.creation, iteration.scrapped)}
															</p>
														{/each}
													{/if}
												</div>
											{/if}
										</div>
									</div>
								{/if}
							</div>
						</div>
					</swiper-slide>
				{/if}
			{/each}
		{/if}
	</Carousel>
{/if}

<style lang="scss">

	h4, p { 	white-space: normal;
		color: 	black;}
	h4 { 		margin: 0 0 5px 0;}
	p span { 	color: 	var(--accent7); }

	.card { height: 	520px;}

	:global(.characterCard *) {
		color: 		black;}

	.characterCard {
		display: 	flex;
		position: 	relative;
		overflow: 	hidden;
		height:		100%;

		&:hover	.title {
				border: 	1px solid var(--accent7);
				background: var(--accent10);}}

	.previewCard {
		position: 	absolute;
		bottom: 	0;
		width: 		100%;

		.title {
			transition: ease .5s background, ease .3s border;
			margin:     5px 5px 5px 5px;
			padding: 	7px 10px 10px 10px;
			border: 	1px solid transparent;
			background: var(--TransWhite);}}

	.infoPlate {
		position: 	absolute;
		overflow-y:	scroll;
		height: 	100%;}


	.table {		display: 	flex;
		gap: 		10px;
		.cell {		display: flex;
			&:last-of-type {
				display: 	inline-grid;
				margin: 	0 auto 0 0;}
			> * {	display: 	block;}}}

	.characterIcon {	border-radius: 	50%;
		overflow: 		hidden;
		height: 		40px;
		width: 			40px;}
	.subtitle {			text-decoration: 	underline;
		padding: 			0 0 5px 0;}
	.description {			padding: 		0 0 8px 2px;
		#bio {				white-space: 	pre-wrap;}
		&:last-of-type {	padding:	 	0 0 0 2px;
			word-break: 	unset;}}
	.plate {	background: white;
		padding: 	10px;
		margin: 	5px;
		&.redirect {	transition: color .3s ease,
		background .3s ease;
			&:hover {	background: var(--accent7);
				p, h4 {	color: white;}}}}
</style>
