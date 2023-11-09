<script>
	const colours = [
        { name:'nsfwTags', 		colour:'#ff0582', text: '#fff'},
        { name:'genericTags', 	colour:'#c9c9c9', text: '#000' },
        { name:'genreTag', 		colour:'#ffac40', text: '#000' },
        { name:'explicitTags',	colour:'#a83fff', text: '#fff'}];

	export let tag;

    let placement = colours.findIndex(x => x.name === tag.type),
		tagColour = colours[placement].colour,
		tagText = colours[placement].text;
</script>

<p style="
	--tagColour: {tagColour};
	--textColour: {tagText}">
		{tag.title}
</p>

<style lang="scss">
	p {
		padding: 	2px 8px 1px 8px;
		margin: 	0 5px 5px 0;

		width:	 max-content;
		display: inline-flex;

		border: 		1px solid var(--tagColour);
		background: 	transparent;
		border-radius: 	10px;
		transition: 	.3s ease background, .2s ease color;

		&:hover {
			color: 		var(--textColour);
			background: var(--tagColour);}}
</style>