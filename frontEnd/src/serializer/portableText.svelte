<script>
	import { PortableText } from "@portabletext/svelte";
    //blocks
	import customHeading 	from "$root/serializer/contentBlock/customHeading.svelte";
    import defaultText 		from "$root/serializer/contentBlock/defaultText.svelte";
    // listItems
	import listItems 		from "$root/serializer/contentBlock/listItems.svelte";
	// marks
	import floatController 	from "$root/serializer/contentBlock/floatController.svelte";
    import linkGenerator 	from "$root/serializer/contentBlock/linkGenerator.svelte";
	//types
	import sanityImage 		from "$root/serializer/sanityImage.svelte";
    import sanityGalleries 	from "$root/serializer/sanityGalleries.svelte";
    import separator 		from "$root/serializer/contentBlock/separator.svelte";
    import blockQuote 		from "$root/serializer/contentBlock/blockQuote.svelte";

	export let
		data;
</script>

<PortableText
	value={data}
	components={{
		block: {
            normal: defaultText,
		  	h1: customHeading,
		  	h2: customHeading,
		  	h3: customHeading,
		  	h4: customHeading,
		  	h5: customHeading
		},
		listItem: {
            normal: listItems,
		},
        marks: {
            floatRight:     floatController,
            floatCenter:    floatController,
            externalLink:   linkGenerator,
            internalLink:   linkGenerator,
		},
		types: {
			image:      sanityImage,
            gallery:    sanityGalleries,
            separator:  separator,
            blockQuote: blockQuote,
		},
	}}
/>