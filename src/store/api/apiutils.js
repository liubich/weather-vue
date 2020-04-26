export default function getAPIData(APIUrl, headers = {}) {
  return fetch(APIUrl, { headers }).then((response) => {
    if (response.ok) return response.json();
    throw new Error(`Network error, status = ${response.status}`);
  });
}
