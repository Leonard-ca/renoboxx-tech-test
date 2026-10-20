import { getJobsForDay, dayTotal } from './jobs.mjs';

const [betriebId = 'betrieb-schmidt', day = '2026-10-20'] = process.argv.slice(2);

const jobs = await getJobsForDay(betriebId, day);

console.log(`Day view ${day} – ${betriebId}`);
for (const job of jobs) {
  console.log(`  ${job.id}  ${job.title.padEnd(22)} ${job.price} EUR`);
}
console.log(`  Day total: ${dayTotal(jobs)} EUR`);
