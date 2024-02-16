import React, { useState } from 'react';

function JournalpostToken() {
  const [journalpost, setJournalpost] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  const fetchAccessToken = async () => {
    try {
      const tokenResponse = await fetch('http://localhost:53610/default/token', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=your_client_id&client_secret=your_client_secret',
      });

      const tokenData = await tokenResponse.json();
      setAccessToken(tokenData.access_token);
      console.log(tokenData.access_token);
      return tokenData.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const fetchJournalpost = async () => {
    try {
      // Fetching access token
      const accessToken = await fetchAccessToken();
      if (!accessToken) {
        console.error('Failed to fetch access token');
        return;
      }

      // Using access token to fetch journalpost data
      const body = JSON.stringify({ dokumentoversiktBruker: "69" });
      
      const journalpostResponse = await fetch('http://localhost:8080/hentJournalpostListe', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Including access token in the Authorization header
        },
        body: body,
      });

      const journalpostData = await journalpostResponse.json();
      console.log(journalpostData)
      setJournalpost(journalpostData.data.journalpost);
    } catch (error) {
      console.error('Error fetching journalpost data:', error);
    }
  };

  return (
    <div>
      <h2>Journalpost Detaljer</h2>
      <button onClick={fetchJournalpost}>Hent Journalpost</button>
      {accessToken && <p>Token: {accessToken}</p>}
      {journalpost ? (
        <>
          <p><strong>Type:</strong> {journalpost.journalposttype}</p>
          <p><strong>Status:</strong> {journalpost.journalstatus}</p>
          <p><strong>Tema:</strong> {journalpost.tema}</p>
          <p><strong>Tittel:</strong> {journalpost.tittel}</p>
          <div>
            <h3>Dokumenter</h3>
            {journalpost.dokumenter.map((doc, index) => (
              <div key={index}>
                <p><strong>Dokument ID:</strong> {doc.dokumentInfoId}</p>
                <p><strong>Tittel:</strong> {doc.tittel}</p>
              </div>
            ))}
          </div>
          <p><strong>Avsender/Mottaker:</strong> {journalpost.avsenderMottaker.navn}</p>
        </>
      ) : (
        <p>Ingen journalpostdata lastet.</p>
      )}
    </div>
  );
}

export default JournalpostToken;
