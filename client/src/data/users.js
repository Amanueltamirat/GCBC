// DEMO ACCOUNTS ONLY — there is no real backend yet (see README-rebuild.md).
// Password check is intentionally trivial; do not reuse this pattern once
// real auth is wired up.
const users = [
  { email: 'admin@sbc.org', password: 'admin123', name: 'Admin', role: 'admin' },
  { email: 'member@sbc.org', password: 'member123', name: 'Selam Bekele', role: 'member' },
];

export default users;
