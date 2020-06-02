import React from 'react';
import './ChatSearch.scss';

export default function ChatSearch() {
    return (
      <div className="conversation-search">
        <input
          type="search"
          className="conversation-search-input"
          placeholder="Search Messages"
        />
      </div>
    );
}
