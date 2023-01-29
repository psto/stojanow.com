/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly DB_PASSWORD: string;
  readonly PUBLIC_POKEAPI: string;
  readonly PUBLIC_GITHUB_USERNAME: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
  readonly PUBLIC_LINKEDIN_PROFILE: string;
  readonly PUBLIC_TWITTER_USERNAME: string;
  readonly PUBLIC_DOMAIN: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_TWITTER_BEARER_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

