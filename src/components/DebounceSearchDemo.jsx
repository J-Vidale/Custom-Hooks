import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export default function DebounceSearchDemo() {
  const [input, setInput] = useState('');
  const [delay, setDelay] = useState(500);
  const debouncedValue = useDebounce(input, delay);

  useEffect(() => {
    if (debouncedValue) {
      console.log('Searching for:', debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="search-container">
      <h2>Debounce Search Demo</h2>

      <label>
        Debounce Delay (ms):{' '}
        <input
          type="number"
          value={delay}
          onChange={e => setDelay(Number(e.target.value))}
        />
      </label>
      <br />

      <input
        type="text"
        placeholder="Type to search..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <p>Current Input: <strong>{input}</strong></p>
      <p>Debounced Value: <strong>{debouncedValue}</strong></p>
    </div>
  );
}
