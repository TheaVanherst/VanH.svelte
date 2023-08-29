<script>
    import { fly } from 'svelte/transition';

    export let characterData

	let active = false;
</script>

<div class="card regularBorder {active ? 'hovered' : ''}"
	 on:mouseenter={() => {active = true;}}
	 on:mouseleave={() => {active = false;}}>
	<h3 class="titleH4">
		{characterData.name}
	</h3>
	<div class="showcase imageWrapper regularBorder">
		<img src="/characters/{characterData.path}"/>
		{#if active}
			<div class="citation" transition:fly={{y: 50, duration: 400 }}>
				<div class="wrapper">
					<h4>
						{characterData.fullName}
					</h4>

					<p class="descriptionTitle">
						Origin
					</p>

					<div class="description">
						{#if characterData.nationality}
							<p id="nationality">
								<span>Nationality</span>: {characterData.nationality}
							</p>
						{/if}
						{#if characterData.timePeriod}
							<p id="timePeriod">
								<span>Time period</span>: {characterData.timePeriod}
							</p>
						{/if}
						{#if characterData.age}
							<p id="age">
								<span>Age</span>: {characterData.age}
							</p>
						{/if}
					</div>

					<p class="descriptionTitle">
						About
					</p>
					<div class="description">
						{#if characterData.sexuality}
							<p id="sexuality">
								<span>Sexuality</span>:{characterData.sex} {characterData.sexuality}
							</p>
						{/if}
						{#if characterData.partner}
							<p id="partner">
								<span>Partner(s)</span>: {characterData.partner}
							</p>
						{/if}
					</div>

					<!-- Heights -->
					<p class="descriptionTitle">
						Height
					</p>
					<div class="description">
						<p id="cannonHeight">
							<span>Canon</span>: {characterData.canonHeight}
						</p>
						{#if characterData.nonCanHeight}
							<p id="nonCannonHeight">
								<span>Non-canon</span>: {characterData.nonCanHeight}
							</p>
						{/if}
						{#if characterData.beastarCanon}
							<p id="beastarCannonHeight">
								<span>Beastars Canon</span>: {characterData.beastarCanon}
							</p>
						{/if}
					</div>

					<!-- Description -->
					<div class="partition">
						{#if characterData.occupation}
							<p class="descriptionTitle">
								Occupation
							</p>
						{/if}
						<p class="description">
							{characterData.occupation}
						</p>
					</div>

					{#if characterData.desc}
						<p class="descriptionTitle">
							Description
						</p>
						<p class="description">
							{characterData.desc}
						</p>
					{/if}
					{#if characterData.creationDate[0]}
						<div class="description">
							<p id="creationDate">
								<span>Creation Date</span>: {characterData.creationDate[0]}
							</p>
							{#if characterData.creationDate[1]}
								<p id="IterationsDate">
									<span>Previous Iterations</span>: {characterData.creationDate[1]}
								</p>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "./src/commonStyles.scss";

	* {	transition: .5s ease; }

	.hovered {
		.titleH4 {
			@include rainbowTransition();}
		img {
			transform: scale(1.1);
			opacity: 0.3;}}

	.showcase,
	.citation {
		height: 		520px;}

	.card {
		margin-bottom: 	30px;
		height: 		550px;
		.showcase {
			background: black;
			display: 	flex;}}

	.citation {
		position: 		absolute;
		overflow-y:		scroll;

		.wrapper {
			padding: 	15px 15px 15px 15px;}

		h4 {
			padding-bottom: 	9px;}

		.partition {
			padding-top: 	10px;
			margin-top: 	5px;
			border-top: 	1px solid var(--accent9);}
		.descriptionTitle {
			padding: 		0 0 4px 0;}
		.description {
			padding: 		0 0 7px 2px;}}

	@mixin cfc($colour,$invert){
		> span { color: $colour; }
		::selection {
			color: 				$invert;
			background-color: 	$colour;}}

	#nationality, #beastarCannonHeight {
		@include cfc(var(--accent1),black);}
	#cannonHeight, #timePeriod {
		@include cfc(var(--accent7),black);}
	#IterationsDate, #age {
		@include cfc(var(--accent3),black);}
	#sexuality, #creationDate {
		@include cfc(var(--accent6),black);}
	#nonCannonHeight {
		@include cfc(var(--accent5),black);}
	#partner {
		@include cfc(var(--accent4),black);}

</style>