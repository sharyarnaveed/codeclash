const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { delay };

export async function fetchWithDelay<T>(data: T, ms = 400): Promise<T> {
  await delay(ms);
  return data;
}
