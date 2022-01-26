import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
// @ts-ignore
import GithubLogo from './resources/github-logo.png';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

enum SearchSpace {
  USERS,
  REPOS,
}

const queryClient = new QueryClient();

const App = () => {
  const [searchSpace, setSearchSpace] = useState<SearchSpace>(SearchSpace.USERS);
  const [searchStr, setSearchStr] = useState<string>('');

  const handleSearchSpace = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchSpace(Number(event.target.value));
  };
  const handleSearchStr = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(event.target.value);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Page>
        <Container>
          <Search>
            <div>
              <SearchDescriptor>
                <Logo src={GithubLogo} />
                <div>
                  <Title>GitHub Searcher</Title>
                  <Subtitle>Search users or repositories below</Subtitle>
                </div>
              </SearchDescriptor>
              <div>
                <Input onChange={handleSearchStr} type={'search'} placeholder="Start typing to search .." />
                <Dropdown onChange={handleSearchSpace}>
                  <option value={SearchSpace.USERS}>Users</option>
                  <option value={SearchSpace.REPOS}>Repositories</option>
                </Dropdown>
              </div>
            </div>
          </Search>
          <ResultsView searchSpace={searchSpace} searchStr={searchStr} />
        </Container>
      </Page>
    </QueryClientProvider>
  );
};

export default App;

function getUsers(search: string): Promise<Response> {
  return fetch(`https://api.github.com/search/users?q=${search}`).then((res) => res.json());
}
function getRepos(search: string): Promise<Response> {
  return fetch(`https://api.github.com/search/repos?q=${search}`).then((res) => res.json());
}

interface IRepos {
  data: Object;
}
interface IUserSearch {
  incomplete_results: boolean;
  items: IUser[];
  total_count: number;
}
interface IUser {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}
interface IProps {
  searchStr: string;
  searchSpace: SearchSpace;
}
const ResultsView: React.FC<IProps> = ({ searchStr, searchSpace }) => {
  if (searchStr.length === 0) return <div>Results</div>;

  return searchSpace === SearchSpace.USERS ? <UsersView searchStr={searchStr} /> : <div>Repo View</div>;
};

interface IUsersViewProps {
  searchStr: string;
}
const UsersView: React.FC<IUsersViewProps> = ({ searchStr }) => {
  const { isLoading, error, data } = useQuery<any, Error, IUserSearch>(searchStr, () => getUsers(searchStr));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching users.{error.message}</div>;
  if (!data) return <div>Data not available for this search.</div>;

  return (
    <div>
      Results!
      {data.items.map((user) => (
        <div>{user.login}</div>
      ))}
    </div>
  );
};

const Page = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #313639;
  font-size: 9pt;
`;
const Container = styled.div`
  width: 75%;
  height: 75%;
`;
const Search = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 11pt;
`;
const Subtitle = styled.div`
  color: #a9a9a9;
`;
const SearchDescriptor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const Logo = styled.img`
  width: 50px;
  height: 50px;
`;
const Dropdown = styled.select`
  height: 35px;
  margin-left: 10px;
`;
const Input = styled.input`
  height: 35px;
  width: 250px;
`;
const Results = styled.div``;
