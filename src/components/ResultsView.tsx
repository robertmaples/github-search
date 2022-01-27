import React from 'react';
import { SearchSpace } from '../api/Models';
import UsersView from './UsersView';
import ReposView from './ReposView';

interface IProps {
  searchStr: string;
  searchSpace: SearchSpace;
}
const ResultsView: React.FC<IProps> = ({ searchStr, searchSpace }) => {
  if (searchStr.length === 0) return <div>Results</div>;

  return searchSpace === SearchSpace.USERS ? <UsersView searchStr={searchStr} /> : <ReposView searchStr={searchStr} />;
};

export default ResultsView;
