
import {createClient} from '@sanity/client'

const client = createClient({
    projectId: 'pvetsaze',
    dataset: 'production',
    apiVersion: '2023-09-13',
    useCdn: true,
});

export default client;