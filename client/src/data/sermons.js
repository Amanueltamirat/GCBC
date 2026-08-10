// youtubeId is a PLACEHOLDER on every entry below — swap in real video IDs
// when sermons go live. SermonDetail.jsx and SermonCard.jsx both detect the
// placeholder and show a friendly "video coming soon" state instead of
// trying to embed/thumbnail a fake ID.
export const PLACEHOLDER_YOUTUBE_ID = 'REPLACE_WITH_YOUTUBE_ID';

const sermons = [
  {
    id: 's1',
    title: 'God: Creator and Redeemer',
    preacher: 'Pastor Amanuel Tamirat',
    series: 'Foundations',
    scripture: 'Genesis 1:1',
    date: '2026-07-19',
    youtubeId: PLACEHOLDER_YOUTUBE_ID,
    description:
      'An introduction to who God is as both the one who made all things and the one who redeems them.',
  },
  {
    id: 's2',
    title: 'The Lowly Things of This World',
    preacher: 'Pastor Amanuel Tamirat',
    series: 'Foundations',
    scripture: '1 Corinthians 1:26-31',
    date: '2026-07-12',
    youtubeId: PLACEHOLDER_YOUTUBE_ID,
    description: 'Why God so often chooses what the world overlooks.',
  },
  {
    id: 's3',
    title: 'Made Disciples of All Nations',
    preacher: 'Elder Yohannes Bekele',
    series: 'The Great Commission',
    scripture: 'Matthew 28:18-20',
    date: '2026-07-05',
    youtubeId: PLACEHOLDER_YOUTUBE_ID,
    description: 'What it means to go, baptize, and teach in our own context.',
  },
  {
    id: 's4',
    title: 'Equipped for the Work of Service',
    preacher: 'Pastor Amanuel Tamirat',
    series: 'The Church at Work',
    scripture: 'Ephesians 4:12-14',
    date: '2026-06-28',
    youtubeId: PLACEHOLDER_YOUTUBE_ID,
    description: 'Every believer has a part to play in building up the body.',
  },
];

export default sermons;
