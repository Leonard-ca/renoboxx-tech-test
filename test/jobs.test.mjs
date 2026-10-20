// Production servers run in UTC, so the tests do too.
process.env.TZ = 'UTC';

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getJobsForDay, dayTotal } from '../src/jobs.mjs';

const ids = (jobs) => jobs.map((job) => job.id).sort();

test('Schmidt: day view 20.10. shows the right jobs', async () => {
  const jobs = await getJobsForDay('betrieb-schmidt', '2026-10-20');
  assert.deepEqual(ids(jobs), ['A-101', 'A-102']);
});

test('Schmidt: day total 20.10. is 168.90 EUR', async () => {
  const jobs = await getJobsForDay('betrieb-schmidt', '2026-10-20');
  assert.equal(dayTotal(jobs), 168.9);
});

test('Yilmaz: day view 20.10. shows only Yilmaz jobs', async () => {
  const jobs = await getJobsForDay('betrieb-yilmaz', '2026-10-20');
  assert.deepEqual(ids(jobs), ['B-201', 'B-202']);
});

test('Schmidt: day view 21.10. shows the right jobs', async () => {
  const jobs = await getJobsForDay('betrieb-schmidt', '2026-10-21');
  assert.deepEqual(ids(jobs), ['A-103']);
});
