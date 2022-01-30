import React from 'react';
import styled from 'styled-components';
import { SearchSpace } from '../api/Models';
import GithubLogo from '../resources/github-logo.png';
import _ from 'lodash';

const DEBOUNCE_TIME_MS = 3000;

interface IProps {
  handleSearchSpace: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearchStr: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputLoading: (isLoading: boolean) => void;
}

const Search: React.FC<IProps> = ({ handleSearchSpace, handleSearchStr, handleInputLoading }) => {
  const debouncedSearch = _.debounce(handleSearchStr, DEBOUNCE_TIME_MS);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputLoading(true);
    debouncedSearch(event);
  };

  return (
    <Container>
      <div>
        <SearchDescriptor>
          <Logo src={GithubLogo} />
          <div>
            <Title>GitHub Searcher</Title>
            <Subtitle>Search users or repositories below</Subtitle>
          </div>
        </SearchDescriptor>
        <div>
          <Input onChange={onChangeInput} type={'search'} placeholder="Start typing to search .." />
          <Dropdown onChange={handleSearchSpace}>
            <option value={SearchSpace.USERS}>Users</option>
            <option value={SearchSpace.REPOS}>Repositories</option>
          </Dropdown>
        </div>
      </div>
    </Container>
  );
};

export default Search;

const Container = styled.div`
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
