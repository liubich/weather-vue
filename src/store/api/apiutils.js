export default function getAPIData(APIUrl) {
  return fetch(APIUrl).then((response) => {
    if (response.ok) return response.json();
    throw new Error(`Network error, status = ${response.status}`);
  });
}
