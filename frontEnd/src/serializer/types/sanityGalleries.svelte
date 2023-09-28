<script>
    import { onMount } from "svelte";
    // import CitationBlock from "$lib/serializer/types/citationBlock.svelte";

    export let
        portableText = null;

    export let
        margin = 5,
        citations = true;

    let value = portableText?.value ? portableText?.value : portableText;

    const sideArr = [
        "Left ",	"Right ",	"Centre "];
    const NumArr = [
        "First ",	"Second ",	"Third ",
        "Fourth ",	"Fifth ",	"Sixth ",
        "Seventh ",	"Eighth ",	"Ninth ",
        "Tenth "];

    let returnSheet = 	null;

    let imageArray = 	[],
        commentArray = 	[],
        titles = 		[];

    let length = 		0;

    const
        horizontalRow = () => { // Carousel, Scroll, Vertical
            commentArray[0] = [];
            imageArray = value.images;

            for (let x in value.images) {
                if (value.images[x].desc) {
                    length++;
                    commentArray[0][x] = [NumArr[x] + "image: ",value.images[x].desc];
                }}},

        regularGrid = (width) => { // Dynamic Grid, Grid
            // splits into a grid format, and goes left to right.
            if (!width) {
                width = 2; //fallback if no column count is not declared.
            }

            for (let x = 0; x < Math.ceil(value.images.length / width); x++) {
                imageArray[x] = 	[];
                commentArray[x] = 	[]; // establishes 2d arrs

                for (let y = 0; y < width; y++) {
                    let pos = y + (x * width);

                    if (value.images[pos]) {
                        imageArray[x][y] = value.images[pos];

                        if (value.images[pos].desc) {
                            length++;
                            let text = value.images.length === pos + 1 && pos % width === 0 ? sideArr[2] : sideArr[y];
                            commentArray[x][y] = [text + "image: ", value.images[pos].desc];
                        }}}

                if (commentArray[x].length > 0) { //if the column includes citation, declare which column it's in.
                    titles[x] = NumArr[x] + "row;";}
            }

            if (titles && titles.length <= 1){
                titles = [];}
        },

        dynamicGrid = (width) => { // Dynamic Vertical
            // splits into columns, and goes downwards.
            if (!width) {
                width = 2; //fallback if no column count is not declared.
            }

            for (let y = 0; y < width; y++) {
                imageArray[y] = 	[];
                commentArray[y] = 	[]; // establishes 2d arrs

                for (let x = 0; x < Math.ceil(value.images.length / width); x++) {
                    let pos = y + (x * width); // calculated vertical placement in row

                    if (value.images[pos]) { //checks if image exists
                        imageArray[y][x] = value.images[pos]; //assigns image to 2d arr
                        if (value.images[pos].desc) { //checks for citation
                            length++;
                            commentArray[y][x] = [NumArr[x] + "image: ",value.images[pos].desc]; //adds citation accordance of image arr
                        }}}

                if (commentArray[y].length > 0) { //if the column includes citation, declare which column it's in.
                    titles[y] = sideArr[y] + "column;";}
            }
        };

    // general fallbacks to prevent weird instances of showcases that don't make sense
    if (value.images.length <= 1) {
        value.display = "vertical";} // prevents scroll / carousel being used for 1 image cases.
    else if (
        value.images.length === 2 &&
        value.display === "dynamicvertical") {
        value.display = "grid";} // prevents flex containers ruining images for a single row.

    onMount(async () => {
        switch (value.display) {
            case "carousel":
                horizontalRow();
                returnSheet = (await import(`./galleryTypes/carousel.svelte`)).default;
                break;
            case "dynamicgrid":
                regularGrid();
                returnSheet = (await import(`./galleryTypes/dynamicGrid.svelte`)).default;
                break;
            case "dynamicvertical":
                dynamicGrid();
                returnSheet = (await import(`./galleryTypes/dynamicVertical.svelte`)).default;
                break;
            case "grid":
                regularGrid();
                returnSheet = (await import(`./galleryTypes/grid.svelte`)).default;
                break;
            case "scroll":
                horizontalRow();
                returnSheet = (await import(`./galleryTypes/scroll.svelte`)).default;
                break;
            case "vertical":
                horizontalRow();
                returnSheet = (await import(`./galleryTypes/vertical.svelte`)).default
                break;
            default: //fallback, "JUST INCASE".
                dynamicGrid();
                returnSheet = (await import(`./galleryTypes/grid.svelte`)).default;
                break;
        }
    });
</script>

{#if returnSheet} <!-- waits for return sheet -->
	<svelte:component this={returnSheet} push="{imageArray}"/>
{:else} <!-- preview animations -->
	<div class="imagePreview gen{Math.floor(Math.random() * 3)}">
		<div></div>
	</div>
{/if}

<!--{#if returnSheet && length > 0 && citations} &lt;!&ndash; checks if citations exist &ndash;&gt;-->
<!--	{#if returnSheet}-->
<!--		<div style="margin-bottom:{margin}px">-->
<!--			<CitationBlock push={commentArray} titles={titles}/>-->
<!--		</div>-->
<!--	{:else} &lt;!&ndash; preview animations &ndash;&gt;-->
<!--		<div style="margin-bottom:{margin - 2}px"-->
<!--			 class="citePreview"></div>-->
<!--	{/if}-->
<!--{/if}-->

<style lang="scss">
	$backgroundSize: 800px; // gradient resolution in X.

	@mixin cgm($aspect, $cols, $height){
		aspect-ratio: 	calc(1 / $aspect);
		column-count: 	$cols;
		> * {
			height: 	$height;}}

	.gen0 {@include cgm(1, 1, 100%);}
	.gen1 {@include cgm(0.5, 2, 200%);}
	.gen2 {@include cgm(0.3, 3, 300%);}

	.shimmer {
		width: 	100%;

		animation-duration: 	2s;
		animation-fill-mode: 	forwards;
		animation-name: 		placeHolderShimmer;

		animation-iteration-count: 	infinite;
		animation-timing-function: 	linear;

		background: linear-gradient(to right,
				var(--backgroundAccent2) 8%,
				var(--backgroundAccent1) 18%,
				var(--backgroundAccent2) 33%);
		background-size: $backgroundSize 104px;
	}

	.imagePreview {
		width: 		100%;
		gap: 		var(--imageSpacing);

		> * {
			@extend .shimmer;
			display: 	flex;}}

	.citePreview {
		@extend .shimmer;
		height: 20px;
		margin: var(--imageSpacing) 0;}

	@keyframes placeHolderShimmer {
		0% {    background-position:    0 0}
		100% {  background-position:    $backgroundSize 0}}
</style>