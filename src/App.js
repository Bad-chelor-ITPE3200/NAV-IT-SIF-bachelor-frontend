import './App.css';
import { Arkiv } from './components/Arkiv';
import Greeting from './components/Greeting';
import Journalpost from './components/Journalpost';
import Get from './components/Get'
import PdfViewer from './components/PdfViewer';
import SimplePdf from './components/SimplePdf';



function App() {
  return (
    <div className="App">
      <h1>Arkiv</h1>
    
    <Journalpost/>
   <SimplePdf/> 
      
    </div>
  );
}

export default App;
