import React, { useState } from 'react';

function SimplePdfToken() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Oppdater til false som standard
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const fetchAccessToken = async () => {
    try {
      const tokenResponse = await fetch('http://localhost:52087/default/token', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=expected_client_id&client_secret=your_client_secret',
      });

      const tokenData = await tokenResponse.json();
      setAccessToken(tokenData.access_token);
      return tokenData.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      setError('Feil ved henting av access token');
      setLoading(false);
    }
  };

  const fetchPdf = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetching access token
      const accessToken = await fetchAccessToken();
      if (!accessToken) {
        console.error('Failed to fetch access token');
        setError('Kunne ikke hente access token');
        setLoading(false);
        return;
      }

      // Using access token to fetch PDF
      fetch('http://localhost:8080/get-simple-pdf', {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${accessToken}`, // Including access token in the Authorization header
        },
      })
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Nettverksrespons var ikke ok');
      })
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
        setLoading(false);
      })
      .catch(error => {
        console.error('Feil ved henting av PDF:', error);
        setError('Feil ved henting av PDF');
        setLoading(false);
      });

    } catch (error) {
      console.error('Error fetching PDF data:', error);
      setError('Feil ved henting av PDF data');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>PDF Dokument</h2>
      <button onClick={fetchPdf} disabled={loading}>Hent PDF</button>
      {accessToken && <p>Token: {accessToken}</p>} {/* Viser access token når det er tilgjengelig */}
      {loading && <p>Laster...</p>}
      {error && <p>{error}</p>}
      {pdfUrl && (
        <iframe src={pdfUrl} style={{ width: '100%', height: '500px' }} title="PDF Viewer"></iframe>
      )}
    </div>
  );
}

export default SimplePdfToken;
