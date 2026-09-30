export function logger(message) {
  console.log(`[Playwright] ${new Date().toISOString()} :: ${message}`);
}
