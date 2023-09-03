<script>
    import {
            directionProcessing, screenType,
            directory, transitioning, nsfw
        } from '$lib/controllers/accessibilityController.js';
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let push = "",
            smaller = false, blank = false,
            faded = false;

    let active = false;

    const redirectCheck = (e, s) => {
        if (s) {
            $nsfw = $page.params.sfw === "nsfw";

            let paraLength = Object.keys($page.params).length;
            let newRoute = paraLength > 0 ? `/${$page.params.sfw}${e}/` : e;

            if (newRoute !== $directory && !$transitioning) {
                directionProcessing($directory, newRoute, newRoute, paraLength);
                $transitioning = true;

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'})

                setTimeout(() => {
                    goto(newRoute)
                    $transitioning = false;
                }, 250);}}}
</script>

<a href={smaller ? '' : `https://www.${push.path}`}
   target={blank ? '_blank' : ''}
   class={faded ? 'fade' : ''}
    on:mousedown|preventDefault={() => redirectCheck(push.path, smaller)}
    on:mouseenter={() => active = true}
    on:mouseleave={() => active = false}>
    <div class="title">
        {#if smaller}
            <div class="navigation">
                <h5>
                    {push.title}
                </h5>
            </div>
        {:else}
            {#if $screenType > 2}
                <div class="socials">
                    <h3>
                        {push.title}
                    </h3>
                </div>
            {/if}
        {/if}
        {#if push.imagePath}
            <div class="mediaIcon">
                <img src="/icons/{push.imagePath}.webp">
            </div>
        {/if}
    </div>
</a>

<style lang="scss">
    @import "./src/commonStyles.scss";

    * { transition: ease .3s; }

    a { &:hover {
            @include rainbowTransition();}

        &.fade {
            pointer-events: none;
            h5 {
                color: var(--accent2);

                &::after {
                    opacity: 1;
                    bottom: -4px;}}}

        .title {
            padding:    10px;
            display:    inline-flex;

            > * {       display: flex;}
            h3, h5 {    text-transform: uppercase;}

            .socials {      margin: auto 8px auto 0;
                h3 {        margin: -4px 0 0 0;}}
            .navigation {   margin: auto 0;
                h5 {        margin: -1px 0 0 0;}}}}

    h5 {
        &::after {
            content: '';

            position:   absolute;
            transition: ease 300ms;

            bottom:     -14px;
            width:      100%;
            height:     1px;
            opacity:    0;

            transform:  translate3d(-100%, 0, 0);
            background: var(--accent2);}}
</style>