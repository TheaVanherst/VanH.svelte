<script>
	import RainbowButtonWrap from "$root/components/generic/buttons/rainbowButtonWrap.svelte";

    export let
		rows,
		perPage,
    	trimmedRows,
        lastPage,
		transitionStatus;

    let currentPage = 0;

    let totalRows, totalPages,
        start, end;

    $: totalRows = rows.length
    $: currentPage = 0
    $: totalPages = Math.ceil(totalRows / perPage)
    $: start = currentPage * perPage
    $: end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1  ;

	$: trimmedRows = rows.slice(start, end + 1);
    $: lastPage = currentPage === totalPages - 1;

	const
		nextPage = (next = true) => {
            trimmedRows = undefined;
            window.scrollTo({
                top: 0,
                behavior: 'smooth'});
            transitionStatus = true;

        	setTimeout(() => {
                trimmedRows = rows.slice(start, end + 1);
                currentPage = next ? currentPage + 1 : currentPage - 1;
                transitionStatus = false;
			}, 500)
		};
</script>

{#if totalRows && totalRows > perPage}
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
{/if}

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