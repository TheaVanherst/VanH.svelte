<script>
	const colours = [
        { name:'nsfwTags', 		colour:'#ff0582', text: '#fff'},
        { name:'genericTags', 	colour:'#c9c9c9', text: '#000'},
        { name:'genreTag', 		colour:'#ffac40', text: '#000'},
        { name:'explicitTags',	colour:'#f367ff', text: '#fff'},
        { name:'designTags',    colour:'#00ff6f', text: '#000'},
        { name:'cultureTags',   colour:'#8400ff', text: '#fff'}
	];

	export let tag;
    export let colour = undefined;
    export let active = false;

    let placement = colours.findIndex(x => x.name === tag.type),
		tagColour = colours[placement].colour,
		tagText = colours[placement].text;
</script>

<p class="inlineTag" style="
	--tagColour: {tagColour};
	--textColour: {tagText}" class:active>
	{tag.title.replaceAll("_"," ")}
</p>

<style lang="scss">
	p {
		margin: 	0 4px 5px 0;
		padding: 	2px 8px 1px 8px;
		border: 	1px solid var(--tagColour);
		transition: border .2s ease, background .3s ease;

		background: transparent;
		color: 		inherit;

		&:hover, &.active {
			color: 		var(--textColour);
			background: var(--tagColour);}
		&.active:hover {
			border: 	1px solid var(--textColour);}
	}
</style>