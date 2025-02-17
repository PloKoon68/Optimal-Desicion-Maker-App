import React from 'react';
import './CaseTitle.css';

function ProcessingPage({ caseTitle }) {
  return (
    <div className="case-title-container text-center m-8">
      <h2 className="case-title fw-bold">{caseTitle}</h2>
    </div>
  );
}

export default ProcessingPage;
