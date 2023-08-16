<script>
	export let data

	let show = false;
</script>

<div class="card regularBorder {data.nsfw && !show ? 'nsfw' : ''}"
	 on:click={() => {show = true;}}>
	<a href="https://twitter.com/TheaVanherst/status/{data.source}" target="_blank">
		<h3 class="titleH4">
			{data.title}
		</h3>
		<div class="showcase regularBorder">
			<div class="blurCont">
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

	* { transition: ease .3s;}

	.card {
		height: 		550px;
		margin-bottom: 	25px;

		&.nsfw {
			> a {
				pointer-events: none;}

			.commType,
			.socialIco {
				opacity: 0;}

			&:hover {
				.blurCont {
					&:before, &:after {
						background: black;}
					img {
						transform: scale(1.15);}}}

			.blurCont {
				position: relative;
				width: 100%;
				height: 100%;

				&:before, &:after {
					position: 	absolute;
					z-index: 	100;
					transition: ease .3s;

					left: 		50%;
					top: 		50%;
					font-family:    "Helvetica", Sans-serif;
					white-space: 	nowrap;
					color: 			white;

					padding: 		5px 20px;
					border-radius: 	5px;
					background: 	var(--backgroundTrans);}
				&:before {
					content: 		"Content Warning";
					font-weight: 	600;

					transform: 	translate(-50%, -156%);}
				&:after {
					content: 		"Click to preview";
					transform: 	translate(-50%, -39%);
					font-size: 11px;}

				img {
					filter: blur(10px);
					transform: scale(1.05);}}}

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