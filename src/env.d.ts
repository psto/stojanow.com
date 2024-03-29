/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_GITHUB_USERNAME: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
  readonly PUBLIC_LINKEDIN_PROFILE: string;
  readonly PUBLIC_TWITTER_USERNAME: string;
  readonly PUBLIC_DOMAIN: string;
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

