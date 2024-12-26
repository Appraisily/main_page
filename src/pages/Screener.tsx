import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Screener() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [iframeHeight, setIframeHeight] = useState('calc(100vh - 4rem)');

  const screenerUrl = useMemo(() => {
    const baseUrl = 'https://screener.appraisily.com';
    return sessionId ? `${baseUrl}?sessionId=${sessionId}` : baseUrl;
  }, [sessionId]);

  return (
    <div className="w-full">
      <iframe
        src={screenerUrl}
        title="Art Screener"
        className="w-full border-0"
        style={{ height: iframeHeight }}
        allow="camera; microphone; fullscreen"
      />
    </div>
  );
}