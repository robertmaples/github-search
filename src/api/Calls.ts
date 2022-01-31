export function getUsers(search: string): Promise<Response> {
  return fetch(`https://api.github.com/search/users?q=${search}`).then((res) => {
  if (res.status === 403) throw Error('403')
  return res.json();
});
}

export function getRepos(search: string): Promise<Response> {
  return fetch(`https://api.github.com/search/repositories?q=${search}`).then((res) => {
  if (res.status === 403) throw Error('403')
  return res.json()});
}