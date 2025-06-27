import React from 'react';
import PaginationDemo from './components/PaginationDemo';
import DebounceSearchDemo from './components/DebounceSearchDemo';
import './styles.css';

export default function App() {
  return (
    <div>
      <PaginationDemo />
      <hr />
      <DebounceSearchDemo />
    </div>
  );
}
