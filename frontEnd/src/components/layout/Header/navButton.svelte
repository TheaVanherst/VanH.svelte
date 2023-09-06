<script>
    import { screenType } from '$lib/controllers/accessibilityController.js';
    import RedirectBuilder from "$root/components/generic/redirectBuilder.svelte";

    import RainbowButtonWrap from "$root/components/layout/rainbowButtonWrap.svelte";

    export let
            push =      "",
            redirect =  false,
            blank =     false,
            selected =     false;
</script>

<RedirectBuilder url={push.path} blank={blank} external={redirect}>
    <div class="title {!redirect ? 'socButton' : 'navButton'}">
        {#if redirect}
            <div class="navigation"
                class:currentRoot={selected}>
                <h5>
                    {push.title}
                </h5>
            </div>
        {:else}
            <RainbowButtonWrap padding="{$screenType > 2 ? [5,10] : [6,6]}">
                <div class="central">
                    <div class="mediaIcon"
                        class:enlargen={$screenType < 3}>
                        <img src="/icons/{push.imagePath}.webp">
                    </div>
                    {#if $screenType > 2}
                        <div class="text">
                            <h3> {push.title} </h3>
                        </div>
                    {/if}
                </div>
            </RainbowButtonWrap>
        {/if}
    </div>
</RedirectBuilder>

<style lang="scss">
    @import "../../../commonStyles";

    * { transition: ease .3s; }

    .navigation {
        &:hover {
            @include rainbowTransition();}}

    .title {
        display: inline-flex;

        &.socButton { padding: 0 5px;}
        &.navButton {  padding: 10px;}

        .navigation {
            margin:     auto 0;
            display:    flex;

            &.currentRoot {
                border-bottom: 1px solid;}

            h5 {    margin:         -1px 0 0 0;
                    text-transform: uppercase;}}}

    .central {
        display: 	flex;
        width: 		100%;

        .enlargen.mediaIcon {
            width:  30px;
            height: 30px;}
        .text {
            padding-left: 5px;}}
</style>