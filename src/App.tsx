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

  const handleSearchSpace = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchSpace(Number(event.target.value));
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
                <Input type={'search'} placeholder="Start typing to search .." />
                <Dropdown onChange={handleSearchSpace}>
                  <option value={SearchSpace.USERS}>Users</option>
                  <option value={SearchSpace.REPOS}>Repositories</option>
                </Dropdown>
              </div>
            </div>
          </Search>
          <ResultsView searchStr="robertmaples" searchSpace={searchSpace} />
        </Container>
      </Page>
    </QueryClientProvider>
  );
};

export default App;

interface IProps {
  searchStr: string;
  searchSpace: SearchSpace;
}
// TODO: type query data
const ResultsView: React.FC<IProps> = ({ searchStr, searchSpace }) => {
  const searchSpaceStr = searchSpace === SearchSpace.USERS ? 'users' : 'repos';

  console.log('searchSpace', searchSpace, 'searchStr', searchStr, 'searchSpaceStr', searchSpaceStr);

  const { isLoading, error, data } = useQuery<any, Error, any>('repoData', () =>
    fetch(`https://api.github.com/search/${searchSpaceStr}?q=${searchStr}`).then((res) => res.json()),
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

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
