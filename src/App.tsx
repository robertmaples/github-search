import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SearchSpace } from './api/Models';
import Search from './components/Search';
import ResultsView from './components/ResultsView';

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
          <Search handleSearchSpace={handleSearchSpace} handleSearchStr={handleSearchStr} />
          <ResultsView searchSpace={searchSpace} searchStr={searchStr} />
        </Container>
      </Page>
    </QueryClientProvider>
  );
};

export default App;

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
const Results = styled.div``;
