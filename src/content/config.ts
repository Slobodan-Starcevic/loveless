import { defineCollection, z } from 'astro:content';

const eventsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    date: z.string(),
    ticketLink: z.string().url(),
    banner: z.string(),
    images: z.array(z.object({ image: z.string() })),
  }),
});

export const collections = {
  events: eventsCollection,
};