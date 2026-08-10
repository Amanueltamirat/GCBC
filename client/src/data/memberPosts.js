const memberPosts = [
  {
    id: 'p1',
    type: 'newsletter',
    title: 'Weekly Newsletter — August 3',
    date: '2026-08-03',
    body: 'This week: baptism testimonies from Sunday, a note from the elders on the fall Bible study schedule, and prayer requests for three families.',
    likes: ['member@sbc.org'],
    comments: [
      {
        id: 'c1',
        parentId: null,
        author: 'Selam Bekele',
        authorRole: 'member',
        body: 'So encouraged by the baptism testimonies this week!',
        date: '2026-08-03',
      },
      {
        id: 'c2',
        parentId: 'c1',
        author: 'Admin',
        authorRole: 'admin',
        body: 'Same here — thank you for being there, Selam.',
        date: '2026-08-03',
      },
    ],
  },
  {
    id: 'p2',
    type: 'announcement',
    title: 'Fall Bible Study Registration Opens Monday',
    date: '2026-08-01',
    body: 'Sign-up for the fall Bible study track opens this Monday after service. Two tracks this term: Romans and Baptist Church History.',
    likes: [],
    comments: [],
  },
  {
    id: 'p3',
    type: 'update',
    title: 'Building Fund Update',
    date: '2026-07-27',
    body: 'We are now 62% of the way to our goal for the new fellowship hall roof. Thank you for your continued generosity.',
    likes: ['member@sbc.org', 'admin@sbc.org'],
    comments: [
      {
        id: 'c3',
        parentId: null,
        author: 'Selam Bekele',
        authorRole: 'member',
        body: 'Praying we reach the goal before the rains start.',
        date: '2026-07-27',
      },
    ],
  },
  {
    id: 'p4',
    type: 'announcement',
    title: 'Members\u2019 Meeting — August 17',
    date: '2026-07-22',
    body: 'Quarterly members\u2019 meeting after the service on August 17. Childcare will be provided.',
    likes: [],
    comments: [],
  },
];

export const POST_TYPE_LABELS = {
  newsletter: 'Newsletter',
  announcement: 'Announcement',
  update: 'Update',
};

export default memberPosts;
