import { useEffect, useState } from "react";
import { FilePdfIcon } from '@navikt/aksel-icons';
import { IDocument } from "../types";
import "./DocumentViewer.css";

interface DocumentItemProps {
    document: IDocument;
    addGlobalDocument: (document: IDocument) => void;
    isSelected: boolean;
    selectStateDocument: (documentToAdd: IDocument) => void
    isModal: boolean;
    isStateSelected: boolean;
}

const DocumentItem = ({ document, addGlobalDocument, isSelected, selectStateDocument, isModal, isStateSelected}: DocumentItemProps) => {

    const select = () => {
        if(isModal){
            selectStateDocument(document)
        }else{
            addGlobalDocument(document);
        }
        
    };

    return (
    
    <div
        key={document.dokumentInfoId}
        onClick={select}
        className={`document-preview ${
            isModal ? (isStateSelected ? "selected" : "") : isSelected ? "selected" : ""
          }`}
    >
        <div className="document-id-wrapper">
            <FilePdfIcon title="Heyyy" fontSize="1.5rem"></FilePdfIcon>
            <p>#{document.dokumentInfoId}</p>
        </div>
       
    </div>
    );
};

interface DocumentViewerProps {
    documentsToView: IDocument[];
    addGlobalDocument: (document: IDocument) => void;
    documents: IDocument[];
    isModal: boolean;
}

export const DocumentViewer = ({ documentsToView, addGlobalDocument, documents, isModal: isModal }: DocumentViewerProps) => {
    const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
    const [stateDocuments, setStateDocuments] = useState<IDocument[]>([])
   
    const addDocument = (documentToAdd: IDocument) => {
        // Find the document to add based on its ID
        if (documentToAdd) {
            setStateDocuments(prevStateDocuments => {
                // Check if the document already exists in the documents state
                const isDocumentExist = prevStateDocuments.some(document => document.dokumentInfoId === documentToAdd.dokumentInfoId);
    
                // If the document doesn't exist, add it to the documents state
                if (!isDocumentExist) {
                    return [...prevStateDocuments, documentToAdd];
                } else {
                    // If the document already exists, filter it out from the documents state
                    return prevStateDocuments.filter(document => document.dokumentInfoId !== documentToAdd.dokumentInfoId);
                }
            });
        }
        console.log(stateDocuments)
    };

    useEffect(()=>{
        const selecteIds = documents.map(document => document.dokumentInfoId)
        if(!isModal){
            setSelectedDocuments(selecteIds)
        }
    }, [documents])

    return (
    <div className="documents-wrapper">
        {documentsToView.map((document) => (
        <div className="document-data" key={document.dokumentInfoId}>
            <DocumentItem 
                document={document} 
                addGlobalDocument={addGlobalDocument} 
                isSelected={selectedDocuments.includes(document.dokumentInfoId)}
                isStateSelected={stateDocuments.includes(document)}
                selectStateDocument={addDocument}
                isModal={isModal}
            />
            <p>{document.tittel}.pdf</p>
        </div>  
       
        ))} 
    </div>
    );
};

export default DocumentViewer;