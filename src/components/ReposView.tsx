import React from 'react';
import { useQuery } from 'react-query';
import { getRepos } from '../api/Calls';
import { IRepoSearch } from '../api/Models';
import styled from 'styled-components';

/**
 * For each repository display the repository user
 * details returned from API and the repository name,
 * author, stars and other statistics below it.
 */
interface IReposViewProps {
  searchStr: string;
}
const ReposView: React.FC<IReposViewProps> = ({ searchStr }) => {
  const { isLoading, error, data } = useQuery<any, Error, IRepoSearch>(searchStr, () => getRepos(searchStr));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching repos.{error.message}</div>;
  if (!data) return <div>Data not available for this search.</div>;

  console.log('data', data);

  return (
    <div>
      {data.items.map((repo) => (
        <div>{repo.name}</div>
      ))}
    </div>
  );
};

export default ReposView;
