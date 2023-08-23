<script>
	export let item;
</script>

<a href="https://steamcommunity.com/sharedfiles/filedetails/?id={item.url}" target="_blank">
	<img class="thumbnail regularBorder" src="/workshop/mnis/{item.thumbnail}.webp">
	<img class="gameIcon shortBorder" src="/workshop/gameIcons/{item.game.url}.webp">
</a>

<style lang="scss">
	a {
		width: 		80px;
		height: 	70px;
		opacity: 	0.75;

		display: 	flex;
		position:   relative;
		transition: ease .4s;

		margin: 10px 0;

		.thumbnail {
			margin: 	0 5px;
			width: 		100%;
			height: 	100%}

		.gameIcon {
			position: 		absolute;

			width: 	18px;
			height: 18px;

			bottom: 0;
			right:	0;
			margin: 3px 8px 3px 3px;}

		&:hover {
			opacity: 	1;
			z-index: 	1;
			transform: 	scale(1.2);}}
</style>