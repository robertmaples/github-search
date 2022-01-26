export function getUsers(search: string): Promise<Response> {
  return fetch(`https://api.github.com/search/users?q=${search}`).then((res) => res.json());
}

export function getRepos(search: string): Promise<Response> {
  return fetch(`https://api.github.com/search/repos?q=${search}`).then((res) => res.json());
}