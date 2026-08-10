// This is the notification mailing list — NOT the same thing as the demo
// login accounts in users.js. Those two accounts control what someone can
// DO on the site (sign in as member/admin); this list controls who
// actually RECEIVES an email when a post goes out.
//
// IMPORTANT: EmailJS sends real email. Before pointing this at your real
// congregation, replace these with a couple of addresses you personally
// control and test end to end. Do not put real members' emails here
// without their consent to be on a mailing list.
const memberSubscribers = [
  { name: 'Test Member One', email: 'amanuel.boyika22@gmail.com' },
  { name: 'Test Member Two', email: 'replace-with-another-test-email@example.com' },
];

export default memberSubscribers;
