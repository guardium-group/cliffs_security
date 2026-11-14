import { test } from 'node:test';
import assert from 'node:assert/strict';

const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const slugs = ['edmonton', 'sherwood-park', 'st-albert', 'spruce-grove', 'leduc', 'beaumont', 'devon', 'morinville', 'fort-saskatchewan', 'stony-plain', 'nisku', 'acheson'];

test('community URLs redirect to the consolidated page', async () => {
  for (const slug of slugs) {
    const response = await fetch(`${base}/service-areas/${slug}`, { redirect: 'manual' });
    assert.equal(response.status, 308, slug);
    assert.equal(response.headers.get('location'), '/service-areas', slug);
  }
  assert.equal((await fetch(`${base}/service-areas/not-a-community`, { redirect: 'manual' })).status, 404);
});

test('consolidated page exposes each community and sitemap excludes old URLs', async () => {
  const html = await (await fetch(`${base}/service-areas`)).text();
  for (const slug of slugs) assert.match(html, new RegExp(`id="${slug}"`), slug);
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const slug of slugs) assert.ok(!sitemap.includes(`/service-areas/${slug}`), slug);
});
