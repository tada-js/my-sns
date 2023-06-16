import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATESET,
  useCdn: false,
  apiVersion: '2023-06-16',
  token: process.env.SANITY_SECRET_TOKEN,
});
