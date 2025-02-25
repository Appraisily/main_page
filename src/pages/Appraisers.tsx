import React from 'react';
import { Helmet } from 'react-helmet-async';
import AppraiserDirectory from './appraisers/src/components/AppraisersDirectory';

// This component serves as an adapter between the imported AppraisersDirectory 
// component and our main application
const Appraisers = () => {
  return (
    <>
      <Helmet>
        <title>Find Art Appraisers | Appraisily</title>
        <meta 
          name="description" 
          content="Find qualified art appraisers in the US and Canada. Our comprehensive directory helps you locate professional appraisers specializing in various art forms and collectibles."
        />
      </Helmet>

      {/* Render the imported AppraiserDirectory component */}
      <AppraiserDirectory />
    </>
  );
};

export default Appraisers; 