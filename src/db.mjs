// Stand-in for our Postgres database.
// Rows come back in exactly the format the `pg` driver returns them.

const JOBS = [
  { id: 'A-101', betrieb_id: 'betrieb-schmidt', title: 'Bad fliesen', all_day: true, start_at: '2026-10-19T22:00:00.000Z', price: '49.90' },
  { id: 'A-102', betrieb_id: 'betrieb-schmidt', title: 'Fenster abdichten', all_day: false, start_at: '2026-10-20T07:30:00.000Z', price: '119.00' },
  { id: 'A-103', betrieb_id: 'betrieb-schmidt', title: 'Malerarbeiten Flur', all_day: true, start_at: '2026-10-20T22:00:00.000Z', price: '860.00' },
  { id: 'B-201', betrieb_id: 'betrieb-yilmaz', title: 'Heizung warten', all_day: false, start_at: '2026-10-20T08:00:00.000Z', price: '240.00' },
  { id: 'B-202', betrieb_id: 'betrieb-yilmaz', title: 'Dachrinne reinigen', all_day: true, start_at: '2026-10-19T22:00:00.000Z', price: '95.50' },
  { id: 'B-203', betrieb_id: 'betrieb-yilmaz', title: 'Therme tauschen', all_day: true, start_at: '2026-10-20T22:00:00.000Z', price: '1890.00' },
];

export const db = {
  async query(sql, params = []) {
    await new Promise((resolve) => setTimeout(resolve, 5));

    if (!/from jobs where betrieb_id = \$1/i.test(sql)) {
      throw new Error(`db stub: unsupported query: ${sql}`);
    }

    const rows = JOBS
      .filter((job) => job.betrieb_id === params[0])
      .map((job) => ({ ...job, start_at: new Date(job.start_at) }));

    return { rows, rowCount: rows.length };
  },
};
