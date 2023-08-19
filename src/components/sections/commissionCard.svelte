<script>
	export let data

	let show = false;
</script>

<div class="card regularBorder {data.nsfw ? 'nsfw' : ''} hoverable"
	 on:click={() => {show = true;}}>
	<a href="https://twitter.com/TheaVanherst/status/{data.source}" target="_blank">
		<h3 class="titleH4">
			{data.title}
		</h3>
		<div class="showcase regularBorder">
			<div class="{data.nsfw && !show ? 'blurCont' : ''}">
				<img 	class="commissionPreview"
						src="/commissions/{data.img}.webp">
			</div>
			<p class="commType shortBorder">
				Example type: {data.type}
			</p>
			<img 	class="tinyIco socialIco shortBorder"
					src="/icons/twitterLogo.webp">
		</div>
	</a>
</div>

<style lang="scss">
	@import "./src/commonStyles.scss";

	.card {
		height: 		550px;
		margin-bottom: 	25px;

		.showcase {
			position: 			relative;
			display: 			flex;
			justify-content: 	center;
			background: 		black;
			height: 	100%;
			width: 		100%;

			.commissionPreview {
				height: 	100%;
				width: 		100%;
				object-fit: cover;}

			.commType {
				font-size: 		12px;
				font-family:	"Helvetica", Sans-serif;
				background: 	var(--backgroundTrans);

				padding:	5px 10px;
				bottom: 	50px;
				width: 		max-content;

				position:	absolute;}}}
</style>