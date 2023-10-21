<script>
    import { onMount } from "svelte";
    export let portableText = null;
    let value = portableText?.value ? portableText?.value : portableText;

    let returnSheet = 	null

    let imageArray = 	[],
        commentArray = 	[]
    let length = 		0;

    const
        horizontalRow = () => { // Carousel, Scroll, Vertical

            commentArray[0] = [];
            imageArray = value.images;

            for (let x in value.images) {
                if (value.images[x].desc) {
                    length++;
                    commentArray[x] = value.images[x].desc;}}},

        regularGrid = (width) => { // Dynamic Grid, Grid
            // splits into a grid format, and goes left to right.
            if (!width) {
                width = 2;} //fallback if no column count is not declared.

            for (let x = 0; x < Math.ceil(value.images.length / width); x++) {
                imageArray[x] = 	[];
                commentArray[x] = 	[]; // establishes 2d arrs

                for (let y = 0; y < width; y++) {
                    let pos = y + (x * width);
                    if (value.images[pos]) {
                        imageArray[x][y] = value.images[pos];
                        if (value.images[pos].desc) {
                            commentArray[x][y] = value.images[pos].desc;}}}}},

        dynamicGrid = (width) => { // Dynamic Vertical
            // splits into columns, and goes downwards.
            if (!width) {
                width = 2;} //fallback if no column count is not declared.

            for (let y = 0; y < width; y++) {
                imageArray[y] = 	[];
                commentArray[y] = 	[]; // establishes 2d arrs

                for (let x = 0; x < Math.ceil(value.images.length / width); x++) {
                    let pos = y + (x * width); // calculated vertical placement in row

                    if (value.images[pos]) { //checks if image exists
                        imageArray[y][x] = value.images[pos]; //assigns image to 2d arr
                        if (value.images[pos].desc) { //checks for citation
                            commentArray[y][x] = [value.images[pos].desc];}}}}}; //adds citation accordance of image arr

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
                break;}});
</script>

{#if returnSheet} <!-- waits for return sheet -->
	<svelte:component this={returnSheet} push={imageArray} citation={commentArray}/>
{/if}