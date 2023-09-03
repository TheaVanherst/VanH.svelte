<script>
	export let data
</script>

<div class="card regularBorder hoverable">
	<a 	href="https://twitter.com/TheaVanherst/status/{data.source}"
		  target="_blank">
		<h3 class="titleH4">
			{data.title}
		</h3>
		<div class="showcase regularBorder imageWrapper">
			<img 	class="commissionPreview"
					src="/commissions/{data.img}.webp">
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