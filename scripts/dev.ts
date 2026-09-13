import { dev } from 'astro';

// Keep a foreground server in terminals and agent/container environments alike.
// Astro's CLI may otherwise reuse an existing background server and return success.
try {
  const server = await dev({});
  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, async () => {
      await server.stop();
      process.exit(0);
    });
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
