import React, { useState, useEffect } from 'react';

function SimplePdf() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Gjør en GET-forespørsel for å hente PDF
    fetch('http://localhost:8080/get-simple-pdf') // Anta at dette er URL-en til PDF-en din
      .then(response => {
        if (response.ok) {
          return response.blob(); // Behandler responsen som en blob hvis responsen er OK
        }
        throw new Error('Nettverksrespons var ikke ok');
      })
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob); // Oppretter en URL for blob-objektet
        setPdfUrl(objectUrl); // Lagrer URL-en for å bruke i <iframe> eller <object>
        setLoading(false);
      })
      .catch(error => {
        console.error('Feil ved henting av PDF:', error);
        setError('Feil ved henting av PDF');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Laster...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>PDF Dokument</h2>
      {pdfUrl && (
        <iframe src={pdfUrl} style={{ width: '100%', height: '500px' }} title="PDF Viewer"></iframe>
        // Alternativt kan du bruke et <object> element istedenfor <iframe>
        // <object data={pdfUrl} type="application/pdf" width="100%" height="500px">
        //   PDF kan ikke vises
        // </object>
      )}
    </div>
  );
}

export default SimplePdf;
