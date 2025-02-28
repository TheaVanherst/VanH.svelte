<script>
	import SanityImage from "$root/serializer/sanityImage.svelte";

	export let
		inv = false,
		active = false,
		tag;

    //TODO: fix this trash

    const colours = [
        { name:'characterTags', colour:'#2a2a2a', text: '#fff'},
        { name:'nsfwTags', 		colour:'#ff34c2', text: '#fff'},
        { name:'genericTags', 	colour:'#cbcbcb', text: '#000'},
        { name:'genreTag', 		colour:'#ffac40', text: '#000'},
        { name:'explicitTags',	colour:'#eb67ff', text: '#fff'},
        { name:'designTags',    colour:'#00ffb2', text: '#000'},
        { name:'cultureTags',   colour:'#8400ff', text: '#fff'}];

    let placement = colours.findIndex(x => x.name === tag.type);
    let tagColours = inv ?
		{	back: colours[placement].colour, 	text: colours[placement].text, 		edge: colours[placement].colour,
			backHov: "var(--accent1)", 			textHov: 	"#fff",					edgeHov: "var(--accent1)"} :
		{	back: "transparent", 				text: 		"inherit", 				edge: colours[placement].colour,
            backHov: colours[placement].colour, textHov: colours[placement].text,   edgeHov: colours[placement].colour}
</script>

<p class="inlineTag" style="
	--back: 	{tagColours.back};
	--backHov: 	{tagColours.backHov};
	--edges: 	{tagColours.edge};
	--edgeHov:  {tagColours.edgeHov};
	--text: 	{tagColours.text};
	--textHov: 	{tagColours.textHov}" class:active>
	{#if tag.type === "characterTags"}
		<div class="wrapper">
			<div class="characterIconWrapper mediaIcon imageWrapper rounded">
				<SanityImage image="{tag.icon}"/>
			</div>
		</div>
	{:else}
		<b>#</b>
	{/if}
	{tag.title.replaceAll("_"," ").replaceAll(":"," ")}
</p>

<style lang="scss">
	.inlineTag {
		b {	color: 	var(--text);}
			color: 	var(--text);

		.wrapper {
			position: relative;
			width: 24px;
			padding: 0 3px 0 0;
			display: flex;
			align-items: center;

			.characterIconWrapper {
				position: 	absolute;
				display: 	flex;
				align-items: center;
				margin: auto 7px auto -3px;
				border: 1px solid var(--back);}}

		margin: 	0 4px 6px 0;
		padding: 	3px 8px 2px 8px;
		border: 	1px solid var(--edges);
		transition: border .2s ease, background .3s ease;
		background: var(--back);

		&.active {	background: var(--back);}
		&:hover {	background: var(--backHov);
					border: 	1px solid var(--edgeHov);
					color: 	var(--textHov);
				.characterIconWrapper {
					border: 1px solid var(--backHov);}
				b {	color: 	var(--textHov);}}
		&.active:hover {	border: 	1px solid var(--edgeHov);}}
</style>