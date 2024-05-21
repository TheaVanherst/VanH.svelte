<script>
    import { onMount } from "svelte";

    export let
		portableText = null;

    let value = portableText?.value ? portableText?.value : portableText;

    let gallery = 	null,
		push = 		[],
        citation = 	[];

    const
        horizontalRow = () => { // Carousel, Scroll, Vertical

            citation[0] = [];
            push = value.images;

            for (let x in value.images) {
                if (value.images[x].desc) {
                    citation[x] = value.images[x].desc;}}},

        regularGrid = (width = 2) => { // Dynamic Grid, Grid
            // splits into a grid format, and goes left to right.

            for (let x = 0; x < Math.ceil(value.images.length / width); x++) {
                push[x] = 		[];
                citation[x] = 	[]; // establishes 2d arrs

                for (let y = 0; y < width; y++) {
                    let pos = y + (x * width);
                    if (value.images[pos]) {
                        push[x][y] = value.images[pos];
                        if (value.images[pos].desc) {
                            citation[x][y] = value.images[pos].desc;}}}}},

        dynamicGrid = (width = 2) => { // Dynamic Vertical
            // splits into columns, and goes downwards.

            for (let y = 0; y < width; y++) {
                push[y] = 		[];
                citation[y] = 	[]; // establishes 2d arrs

                for (let x = 0; x < Math.ceil(value.images.length / width); x++) {
                    let pos = y + (x * width); // calculated vertical placement in row

                    if (value.images[pos]) { //checks if image exists
                        push[y][x] = value.images[pos]; //assigns image to 2d arr
                        if (value.images[pos].desc) { //checks for citation
                            citation[y][x] = [value.images[pos].desc];}}}}}; //adds citation accordance of image arr

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
                gallery = (await import(`./galleryTypes/toDo/carousel.svelte`)).default;
                break;
            case "dynamicgrid":
                regularGrid();
                gallery = (await import(`./galleryTypes/dynamicGrid.svelte`)).default;
                break;
            case "dynamicvertical":
                dynamicGrid();
                gallery = (await import(`./galleryTypes/dynamicVertical.svelte`)).default;
                break;
            case "grid":
                regularGrid();
                gallery = (await import(`./galleryTypes/grid.svelte`)).default;
                break;
            case "scroll":
                horizontalRow();
                gallery = (await import(`./galleryTypes/toDo/scroll.svelte`)).default;
                break;
            case "vertical":
                horizontalRow();
                gallery = (await import(`./galleryTypes/vertical.svelte`)).default
                break;
            default: //fallback, "JUST INCASE".
                dynamicGrid();
                gallery = (await import(`./galleryTypes/grid.svelte`)).default;
                break;}});
</script>

{#if gallery} <!-- waits for return sheet -->
	<svelte:component this={gallery} {push} {citation}/>
{/if}