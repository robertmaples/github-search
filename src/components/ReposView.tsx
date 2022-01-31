import React from 'react';
import { useQuery } from 'react-query';
import { getRepos } from '../api/Calls';
import { IRepoSearch } from '../api/Models';
import styled from 'styled-components';
import { Card, Container, IntermediateContainer, RowItem } from './ResultsView';
import moment from 'moment';

interface IReposViewProps {
  searchStr: string;
}
const ReposView: React.FC<IReposViewProps> = ({ searchStr }) => {
  const { isLoading, error, data } = useQuery<any, Error, IRepoSearch>(searchStr, () => getRepos(searchStr));

  if (isLoading) return <IntermediateContainer>Loading...</IntermediateContainer>;
  if (error) {
    if (error.message === '403') {
      return (
        <IntermediateContainer>
          You've hit the limit for requests per minute! Please wait a minute before resuming your next search.
        </IntermediateContainer>
      );
    }
    return <IntermediateContainer>An error occurred while fetching repos.{error.message}</IntermediateContainer>;
  }
  if (!data || !data.items || data.items.length === 0)
    return <IntermediateContainer>Data not available for this search.</IntermediateContainer>;

  return (
    <Container>
      {data.items.map((repo, i) => (
        <RowItem key={i}>
          <Card>
            <WrappedText>
              <h2>{repo.name}</h2>
            </WrappedText>
            <Description>{repo.description}</Description>
            <div>Number of Forks: {repo.forks_count}</div>
            <div>Created: {moment(repo.created_at).format('MMM Do YY')}</div>
            <div>Owner: {repo.owner ? repo.owner.login : 'N/A'}</div>
            <LinkContainer>
              <a href={repo.html_url} target="_blank">
                {repo.html_url}
              </a>
            </LinkContainer>
          </Card>
        </RowItem>
      ))}
    </Container>
  );
};

export default ReposView;

const WrappedText = styled.div`
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
const Description = styled(WrappedText)`
  text-align: center;
  margin-bottom: 10px;
`;
const LinkContainer = styled(WrappedText)`
  margin-top: 10px;
`;
