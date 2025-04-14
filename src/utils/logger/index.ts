export async function logger<T>(data: T): Promise<void> {
  console.log(data);
}
