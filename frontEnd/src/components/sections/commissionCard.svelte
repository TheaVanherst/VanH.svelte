<script>
	export let data

	let show = false;
</script>

<div class="card regularBorder {data.nsfw ? 'nsfw' : ''} {!show ? 'hidden' : ''} hoverable"
	 on:click={() => {show = true;}}>
	<a 	href="https://twitter.com/TheaVanherst/status/{data.source}"
	   	target="_blank">
		<h3 class="titleH4">
			{data.title}
		</h3>
		<div class="showcase regularBorder imageWrapper">
			<div class="{data.nsfw && !show ? 'blurCont' : ''}">
				<img 	class="commissionPreview"
						src="/commissions/{data.img}.webp">
			</div>
			<p class="imageCite shortBorder">
				Example type: {data.type}
			</p>
		</div>
	</a>
</div>

<style lang="scss">
	* {		transition: 		ease .3s; }
	.card {	height: 			550px;
			overflow: 			hidden;
			width: 				100%;
			position: 			relative;
		.showcase {
			height: 			515px;
			display: 			flex;
			justify-content: 	center;}}
</style>