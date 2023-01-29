const site = {
  author: 'Piotr Stojanow',
  ogLanguage: 'en_GB',
  siteLanguage: 'en-GB',
  siteTitle: 'Piotr Stojanow',
  siteUrl: import.meta.env ? import.meta.env.PUBLIC_SITE_URL : '',
  siteDescription: 'All the essays, tweetstorms, book notes and blog in one place.',
  icon: 'public/icon.png',
  substackUrl:
    'https://stojanow.substack.com/subscribe?simple=true&next=https%3A%2F%2Fstojanow.substack.com',
  contactEmail: import.meta.env ? import.meta.env.PUBLIC_CONTACT_EMAIL : '',
  githubUsername: import.meta.env ? import.meta.env.PUBLIC_GITHUB_USERNAME : '',
  twitterUsername: import.meta.env ? import.meta.env.PUBLIC_TWITTER_USERNAME : '',
};

export default site;
