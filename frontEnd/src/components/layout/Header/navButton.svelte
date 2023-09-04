<script>
    import { screenType } from '$lib/controllers/accessibilityController.js';

    import RedirectBuilder from "$root/components/generic/redirectBuilder.svelte";

    export let
            push =      "",
            redirect =  false,
            blank =     false,
            faded =     false;
</script>

<RedirectBuilder url={push.path} blank={blank} external={redirect}>
    <div class="title {!redirect ? 'smaller' : 'larger'}">
        {#if redirect}
            <div class="navigation">
                <h5>
                    {push.title}
                </h5>
            </div>
        {:else}
            <div class="social wideBorder">
                <div class="flex">
                    <div class="mediaIcon">
                        <img src="/icons/{push.imagePath}.webp">
                    </div>
                    {#if $screenType > 2}
                        <div class="text">
                            <h3> {push.title} </h3>
                        </div>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</RedirectBuilder>

<style lang="scss">
    @import "../../../commonStyles";

    * { transition: ease .3s; }

    .navigation {
        &:hover {
            @include rainbowTransition();}}

    .social {
        &:before {
            height: 500px;
            width:  500px;
            left:   -182px;
            top:    -233px;

            position:   absolute;
            z-index:    -2;

            background: conic-gradient(
                            var(--accent2),
                            var(--accent2));
            content:    "";}

        position: relative;
        overflow: hidden;

        .flex {
            background: black;
            filter:     invert(1);

            padding: 		5px 10px;
            margin: 		1px;
            border-radius:  8px;

            display: 		flex;

            .text {
                text-align: 	center;
                white-space: 	nowrap;
                margin: 		0 auto;}
            h3 {
                white-space: 	nowrap;}}

        &:hover {
            transform: 	scale(1.1);

            &:before {
                background: conic-gradient(
                                var(--accent2), var(--accent5), var(--accent6), var(--accent3),
                                var(--accent7), var(--accent1), var(--accent2));
                animation: spin 3s infinite linear;}

            .flex {
                border-radius: 7px;

                margin: 	2px;
                padding: 	4px 9px;}}}


    .title {
        &.smaller {
            padding:    0 5px;}
        &.larger {
            padding: 10px;}

        display:    inline-flex;

        .navigation {
            margin: auto 0;
            display: flex;
            h5 {
                margin: -1px 0 0 0;
                text-transform: uppercase;}}}
</style>