import { test } from 'node:test';
import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const industries = ['shopping-malls', 'retail', 'parking', 'hotels', 'corporate', 'construction-sites', 'healthcare', 'social-housing', 'businesses', 'communities'];
const services = ['tactical-security', 'commercial-security', 'residential-security', 'concierge-security', 'access-control', 'intrusion-alarms', 'security-cameras', 'alarm-monitoring'];
const jobs = ['concierge-customer-service', 'static-security-guard'];

test('new industry and service routes exist and appear in sitemap', async () => {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const [prefix, slugs] of [['industries', industries], ['services', services]]) {
    for (const slug of slugs) {
      assert.equal((await fetch(`${base}/${prefix}/${slug}`)).status, 200, slug);
      assert.ok(sitemap.includes(`/${prefix}/${slug}`), slug);
    }
  }
});

test('each open job has matching structured data and an email application', async () => {
  for (const slug of jobs) {
    const response = await fetch(`${base}/careers/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    const job = scripts.find(item => item['@type'] === 'JobPosting');
    assert.ok(job, slug);
    assert.equal(job.datePosted, '2026-11-09');
    assert.equal(job.hiringOrganization.name, 'Cliffs Security');
    assert.equal(job.employmentType, 'FULL_TIME');
    assert.match(html, /mailto:info@cliffssecurity\.ca/);
  }
  const index = await (await fetch(`${base}/careers`)).text();
  assert.doesNotMatch(index, /"@type":"JobPosting"/);
});
