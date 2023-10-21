<script>
	import RainbowButtonWrap from "$root/components/generic/buttons/rainbowButtonWrap.svelte";

    import { urlSerializer } from "$lib/controllers/searchController.js";

    export let
		rows,trimmedRows,
		perPage, lastPage,
		goto, currentPage;

    let totalRows, totalPages,
        start, end;

    $: totalRows = rows.length;
    $: totalPages = Math.ceil(totalRows / perPage);

    $: currentPage  = Number(goto) ?? 0;

    $: start = currentPage * perPage;
    $: end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1;

	$: trimmedRows = rows.slice(start, end + 1);
    $: lastPage = currentPage === totalPages - 1;

    $: totalPages - 1 < currentPage ? currentPage = 0 : false;

	const
		nextPage = (next = true) => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'});

        	setTimeout(() => {
                currentPage = next ? currentPage + 1 : currentPage - 1;
                urlSerializer({'page': currentPage});
                trimmedRows = rows.slice(start, end + 1);
			}, 450);
		};
</script>

<div class='pagination'>
	<div 	on:click={() => nextPage(false)}
			class:disabled={currentPage === 0}>
		<RainbowButtonWrap>
			<img src="/icons/leftIcon.webp">
		</RainbowButtonWrap>
	</div>

	<p>
		{start + 1} - {end + 1} of {totalRows}
	</p>

	<div 	on:click={() => nextPage(true)}
			class:disabled={lastPage}>
		<RainbowButtonWrap>
			<img src="/icons/rightIcon.webp">
		</RainbowButtonWrap>
	</div>
</div>

<style>
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: all;
	}

	.pagination p {
		margin: 5px 20px;

	}

	button {
		display: flex;
	}

	.disabled {
		opacity: 0.6;
		pointer-events: none;
	}

</style>