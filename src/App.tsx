import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SearchSpace } from './api/Models';
import Search from './components/Search';
import ResultsView from './components/ResultsView';
import _ from 'lodash';

const queryClient = new QueryClient();

const App = () => {
  const [searchSpace, setSearchSpace] = useState<SearchSpace>(SearchSpace.USERS);
  const [searchStr, setSearchStr] = useState<string>('');
  const [inputLoading, setInputLoading] = useState<boolean>(false);

  const handleSearchSpace = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchSpace(Number(event.target.value));
  };
  const handleSearchStr = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(event.target.value);
    handleInputLoading(false);
  };
  const handleInputLoading = (isLoading: boolean) => setInputLoading(isLoading);

  return (
    <QueryClientProvider client={queryClient}>
      <Page>
        <Container>
          <Search
            handleInputLoading={handleInputLoading}
            handleSearchSpace={handleSearchSpace}
            handleSearchStr={handleSearchStr}
          />
          <ResultsView inputLoading={inputLoading} searchSpace={searchSpace} searchStr={searchStr} />
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
  overflow: scroll;
`;
const Container = styled.div`
  width: 75%;
  height: 75%;
  margin-bottom: 50px;
`;
export const WrappedText = styled.div`
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  width: -webkit-fill-available;
  text-align: center;
`;
