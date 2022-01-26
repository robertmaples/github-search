import React from 'react';
import { SearchSpace } from '../api/Models';
import UsersView from './UsersView';

interface IProps {
  searchStr: string;
  searchSpace: SearchSpace;
}
const ResultsView: React.FC<IProps> = ({ searchStr, searchSpace }) => {
  if (searchStr.length === 0) return <div>Results</div>;

  return searchSpace === SearchSpace.USERS ? <UsersView searchStr={searchStr} /> : <div>Repo View</div>;
};

export default ResultsView;
