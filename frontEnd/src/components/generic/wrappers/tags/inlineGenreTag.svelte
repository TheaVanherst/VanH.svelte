<script>
	export let
		tag,
		active = false;

    const colours = [
        { name:'nsfwTags', 		colour:'#ff0582', text: '#fff'},
        { name:'genericTags', 	colour:'#c9c9c9', text: '#000'},
        { name:'genreTag', 		colour:'#ffac40', text: '#000'},
        { name:'explicitTags',	colour:'#f367ff', text: '#fff'},
        { name:'designTags',    colour:'#00ff6f', text: '#000'},
        { name:'cultureTags',   colour:'#8400ff', text: '#fff'}];

    let placement = colours.findIndex(x => x.name === tag.type),
		tagColour = colours[placement].colour,
		tagText = colours[placement].text;
</script>

<p class="inlineTag" style="
	--tagColour: {tagColour};
	--textColour: {tagText}" class:active>
	<b>#</b> {tag.title.replaceAll("_"," ")}
</p>

<style lang="scss">
	p, b {
		color: 		inherit;
		&:hover, &.active {
			color: 		var(--textColour);}}

	.inlineTag {
		margin: 	0 3px 6px 0;
		padding: 	3px 8px 2px 8px;
		border: 	1px solid var(--tagColour);
		transition: border .2s ease, background .3s ease;
		background: 'transparent';

		&:hover, &.active {
			background: var(--tagColour);}
		&.active:hover {
			border: 	1px solid var(--textColour);}}
</style>