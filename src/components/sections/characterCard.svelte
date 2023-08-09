<script>
    import { fly } from 'svelte/transition';

    export let characterData

	let active = false;
</script>

<div class="card {active ? 'hovered' : ''}"
	 on:mouseenter={() => {active = true;}}
	 on:mouseleave={() => {active = false;}}>
	<div class="title">
		<h3>{characterData.name}</h3>
	</div>
	<div class="showcase">
		<img class="imagePreview" src="/characters/{characterData.path}"/>
		{#if active}
			<div class="citation" transition:fly={{y: 50, duration: 400 }}>
				<div class="wrapper">
					<h4 id="nameTitle">
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

	* {
		transition: .5s ease;}

	.hovered {
		.title {
			filter:
				drop-shadow(0px 0px 1px var(--accent9))
				brightness(0) 	saturate(100%)
				invert(15%) 	sepia(75%)
				saturate(5273%) hue-rotate(271deg)
				brightness(97%) contrast(132%);}
		img {
			opacity: 0.3;}}

	.card {
		border-radius: 	5px;
		overflow: 		hidden;
		height: 		550px;

		> * {
			display: 	table-cell;}

		.title {
			padding: 		7px 5px 5px 8px;

			h3 {
				filter:	 		drop-shadow(0px 0px 0.8px var(--accent9));
				text-transform: uppercase;
				padding: 		0 0 5px 0;}}

		.showcase {
			display: 			flex;
			justify-content: 	center;
			background: 		black;

			height: 			550px;
			border-radius: 		5px;
			overflow: 			hidden;

			img {
				height: 	100%;
				display: 	block;}}}

	.citation {
		border-radius: 	5px;
		height: 		510px;

		position: 		absolute;
		overflow-y:		scroll;

		.wrapper {
			padding: 	15px 15px 25px 15px;
		}

		p {
			font-size: 	12px;}
		h4 {
			text-transform: 	uppercase;
			padding-bottom: 	7px;
			text-decoration: 	underline;}
		::selection {
			color: 				black;
			background-color: 	var(--accent9);}

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

		.partition {
			padding-top: 	10px;
			margin-top: 	5px;
			border-top: 	1px solid var(--accent9);}
		.descriptionTitle {
			padding: 		0 0 4px 0;}
		.description {
			padding: 		0 0 5px 2px;
			font-family: 	"Helvetica", Sans-serif;
			font-size: 		12px;
		}
	}
</style>