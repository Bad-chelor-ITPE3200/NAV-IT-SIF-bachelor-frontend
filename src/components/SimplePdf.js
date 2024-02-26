import React, { useState } from 'react';

function SimplePdf() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPdf = () => {
    setLoading(true);
    setError('');
    fetch('http://localhost:8080/hentDokumenter?dokumentInfoId=00002222')
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
  };

  const fetchJson = () => {
    setLoading(true);
    setError('');
    // Endre URL-en til den faktiske endepunktet som returnerer JSON-responsen
    fetch('http://localhost:8080/hentDokumenter-test?dokumentId=00001111')
      .then(response => {
        if (response.ok) {
          return response.text(); // Endre fra .json() til .text()
        }
        throw new Error('Nettverksrespons var ikke ok');
      })
      .then(data => {
        setJsonData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Feil ved henting av data fjert:', error);
        setError('Feil ved henting av data fjerteing');
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>PDF Dokument</h2>
      <button onClick={fetchPdf} disabled={loading}>
        {loading ? 'Laster...' : 'Hent PDF'}
      </button>
      <button onClick={fetchJson} disabled={loading}>
        {loading ? 'Laster...' : 'Hent JSON'}
      </button>
      {error && <p>{error}</p>}
      {pdfUrl && !loading && (
        <iframe src={pdfUrl} style={{ width: '100%', height: '500px' }} title="PDF Viewer"></iframe>
      )}
      {jsonData && !loading && (
        <div>
          <h3>JSON Data</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SimplePdf;
