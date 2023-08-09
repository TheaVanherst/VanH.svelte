<script>
	export let item;
</script>

<a href="https://steamcommunity.com/sharedfiles/filedetails/?id={item.url}">
	<img class="thumbnail" src="/workshop/mnis/{item.thumbnail}.webp">
	<img class="gameIcon" src="/workshop/gameIcons/{item.game.url}.webp">
</a>

<style lang="scss">
	a {
		width: 		80px;
		height: 	70px;
		opacity: 	0.75;

		display: 	flex;
		position:   relative;
		transition: ease .4s;

		.thumbnail {
			margin: 	0 5px;
			width: 		calc(100% - 10px);
			height: 	calc(100%);

			border-radius: 	5px;
			overflow: 		hidden;
		}

		.gameIcon {
			border-radius: 	3px;
			overflow: 		hidden;
			position: 		absolute;

			width: 	18px;
			height: 18px;

			bottom: 0;
			right:	0;
			margin: 3px 8px 3px 3px;
		}

		&:hover {
			opacity: 	1;
			transform: 	scale(0.9);
		}
	}
</style>