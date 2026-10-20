import { db } from './db.mjs';

const cache = new Map();

function toDay(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Jobs of one Betrieb on one day (day = 'YYYY-MM-DD'), used by the day view.
export async function getJobsForDay(betriebId, day) {
  if (cache.has(day)) {
    return cache.get(day);
  }

  const { rows } = await db.query('select * from jobs where betrieb_id = $1', [betriebId]);
  const jobs = rows.filter((job) => toDay(job.start_at) === day);

  cache.set(day, jobs);
  return jobs;
}

// Sum of all job prices in EUR, shown at the bottom of the day view.
export function dayTotal(jobs) {
  return jobs.reduce((sum, job) => sum + job.price, 0);
}
