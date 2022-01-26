import React, { useEffect, useState } from 'react';
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
          <ResultsView searchStr={searchStr} searchSpace={searchSpace} />
        </Container>
      </Page>
    </QueryClientProvider>
  );
};

export default App;

function getUsers(search: string): Promise<Response> {
  return fetch(`https://api.github.com/search/users?q=${search}`).then((res) => res.json());
}

interface IProps {
  searchStr: string;
  searchSpace: SearchSpace;
}
const ResultsView: React.FC<IProps> = ({ searchStr, searchSpace }) => {
  useEffect(() => {
    console.log('useEffect');
  }, [searchStr, searchSpace]);

  const { isLoading, error, data } = useQuery<any, Error, any>('repoData', () => getUsers(searchStr));

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
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
