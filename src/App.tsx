import React from "react";
import "./App.css";
import styled from "styled-components";
// @ts-ignore
import GithubLogo from "./resources/github-logo.png";

const App = () => {
  return (
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
              <Input type={"search"} placeholder="Start typing to search .." />
              <Dropdown>
                <option>Users</option>
                <option>Repositories</option>
              </Dropdown>
            </div>
          </div>
        </Search>
        <Results>Results</Results>
      </Container>
    </Page>
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
