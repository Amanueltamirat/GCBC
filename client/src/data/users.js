// DEMO ACCOUNTS ONLY — there is no real backend yet. Passwords are stored
// in plain text in browser state purely for this front-end demo; a real
// implementation must hash passwords server-side and never expose them to
// the client at all.
const users = [
  { name: 'Admin', email: 'admin@sbc.org', password: 'admin123', role: 'admin', status: 'approved' },
  { name: 'Selam Bekele', email: 'member@sbc.org', password: 'member123', role: 'member', status: 'approved' },
];

export default users;
