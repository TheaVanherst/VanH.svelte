
export async function slugUniqueCheck(slug, context) {
  const { document, getClient } = context;

  const
    query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`,
    client = getClient({ apiVersion: '2022-12-07' }),
    id = document._id.replace(/^drafts\./, '');

  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };

  return await client.fetch(query, params)
};