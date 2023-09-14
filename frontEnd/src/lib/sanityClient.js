
import sanityClient from "@sanity/client"

const client = sanityClient({
    projectId: 'pvetsaze',
    dataset: 'production',
    token: '', // or leave blank for unauthenticated usage
    useCdn: true,
});

export default client;