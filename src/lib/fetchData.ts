export const fetchData = async (
  url: string,
  method: string,
  body?: object
): Promise<{ responseData: any; ok: boolean }> => {
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const responseData = await response.json();

  return { responseData: responseData, ok: response.ok };
};
