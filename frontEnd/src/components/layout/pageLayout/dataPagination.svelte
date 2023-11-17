<script>
    import { urlSerializer } from "$lib/controllers/layoutControllers/searchController.js";
    import { directoryData } from "$lib/controllers/layoutControllers/redirectHandling.js";

    export let
		rows, trimmedRows, perPage,
		goto, currentPage = 0,
        lastPage;

    let totalRows, totalPages,
        start, end;

    $: totalRows = rows.length;
    $: totalPages = Math.ceil(totalRows / perPage);
    $: currentPage  = Number(goto) ?? 0;

	const
		toTop = () => {
            window.scrollTo({top: 0, behavior: 'smooth'});},
		serializer = () => {
            $directoryData.direction = [0,0];
            setTimeout(() => { // this allows the pagination to update
                urlSerializer({'page': currentPage});
            }, 500);},
		directPage = (index) => {
            toTop();
            setTimeout(() => {currentPage = index;}, 500);
            serializer();}

    $: start = currentPage * perPage;
    $: end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1;
    $: trimmedRows = rows.slice(start, end + 1) ?? [];

	let fakeArray = Array(totalPages);
    const pageCountUpdate = () => {
        fakeArray = [...Array(totalPages).keys()];
        lastPage = currentPage >= totalPages - 1;};

    $: totalPages && pageCountUpdate();
</script>

<div class='pagination'>
	{#each fakeArray as _, index (index)}
		<div class="pagingDot"
			 class:active={index === currentPage}
			 on:click={() => directPage(index)}>
		</div>
	{/each}
</div>

<style lang="scss">
	.pagination {
		display: 			flex;
		align-items: 		center;
		justify-content: 	center;
		pointer-events: 	all;
		gap: 				5px;}
</style>