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
		.showcase {
			display: 			flex;
			justify-content: 	center;
			height: 			100%;}}
</style>