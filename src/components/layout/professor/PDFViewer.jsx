import React, { useEffect, useState } from 'react';
import { FileText, Download, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Document, Page, pdfjs } from 'react-pdf';

// Configuration du worker PDF.js avec un CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl, title, allowDownload = true }) => {
    console.log(fileUrl)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [error, setError] = useState(null);
    const [fileType, setFileType] = useState(null); // 'pdf', 'text', ou null
    const [textContent, setTextContent] = useState(''); // Contenu du fichier texte

    // Déterminer le type de fichier à partir de l'extension de l'URL
    const getFileTypeFromUrl = (url) => {
        // Décoder les caractères encodés dans l'URL
        const decodedUrl = decodeURIComponent(url);

        // Supprimer les paramètres (tout ce qui suit '?')
        const baseUrl = decodedUrl.split('?')[0];

        // Extraire l'extension du fichier
        const extension = baseUrl.split('.').pop().toLowerCase();

        if (extension === 'pdf') return 'pdf';
        if (extension === 'txt') return 'text';
        return null; // Type non supporté
    };

    useEffect(() => {
        const type = getFileTypeFromUrl(fileUrl);
        console.log('Type de fichier détecté :', type); // Ajoutez ce log
        if (!type) {
            setError('Type de fichier non supporté.');
            setIsLoading(false);
            return;
        }
        setFileType(type);
        // ...
    }, [fileUrl]);

    // Charger le fichier en fonction de son type
    useEffect(() => {
        const type = getFileTypeFromUrl(fileUrl);
        if (!type) {
            setError('Type de fichier non supporté.');
            setIsLoading(false);
            return;
        }

        setFileType(type);

        if (type === 'text') {
            // Récupérer le contenu du fichier texte
            fetch(fileUrl)
                .then((response) => response.text())
                .then((text) => {
                    setTextContent(text);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError('Impossible de charger le fichier texte.');
                    setIsLoading(false);
                });
        } else {
            // Pour les PDF, react-pdf gère le chargement
            setIsLoading(false);
        }
    }, [fileUrl]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `${title.replace(/\s+/g, '_')}.${fileType === 'pdf' ? 'pdf' : 'txt'}`;
        link.target = '_blank';
        link.click();
    };

    const handleZoomIn = () => {
        setScale(prev => Math.min(prev + 0.2, 2));
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(prev - 0.2, 0.6));
    };

    const handleRotate = () => {
        setRotation(prev => (prev + 90) % 360);
    };

    const handleNextPage = () => {
        setPageNumber(prev => Math.min(prev + 1, numPages));
    };

    const handlePrevPage = () => {
        setPageNumber(prev => Math.max(prev - 1, 1));
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setIsLoading(false);
    };

    const onDocumentLoadError = (error) => {
        console.error('Erreur lors du chargement du PDF :', error);
        setError('Impossible de charger le PDF. Vérifiez l\'URL.');
        setIsLoading(false);
    };

    return (
        <Card className="w-full overflow-hidden">
            <div className="bg-muted p-3 flex items-center justify-between border-b">
                <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">{title || 'Document'}</span>
                </div>
                <div className="flex items-center space-x-2">
                    {fileType === 'pdf' && (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleZoomOut}
                                title="Zoom arrière"
                            >
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-muted-foreground">{Math.round(scale * 100)}%</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleZoomIn}
                                title="Zoom avant"
                            >
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleRotate}
                                title="Pivoter"
                            >
                                <RotateCw className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                    {allowDownload && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDownload}
                            title="Télécharger"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            <CardContent className="p-0 max-h-[calc(100vh-250px)] overflow-y-auto">
                <div className="flex flex-col items-center min-h-[500px] bg-muted/30 p-4">
                    {isLoading ? (
                        <div className="w-full max-w-[595px] aspect-[1/1.414] bg-white rounded shadow-sm overflow-hidden">
                            <Skeleton className="w-full h-full" />
                        </div>
                    ) : error ? (
                        <div className="w-full max-w-[595px] aspect-[1/1.414] bg-white rounded shadow-sm flex flex-col items-center justify-center p-6">
                            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                            <p className="text-center text-muted-foreground">
                                {error}
                                <br />
                                <span className="text-sm">
                                    Veuillez vérifier que l'URL est correcte et accessible.
                                </span>
                            </p>
                        </div>
                    ) : fileType === 'pdf' ? (
                        <>
                            <Document
                                file={fileUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={onDocumentLoadError}
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    scale={scale}
                                    rotate={rotation}
                                    className="shadow-sm bg-white"
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                />
                            </Document>
                            {numPages > 1 && (
                                <div className="flex items-center justify-center mt-4 space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handlePrevPage}
                                        disabled={pageNumber <= 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm">
                                        Page {pageNumber} sur {numPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleNextPage}
                                        disabled={pageNumber >= numPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : fileType === 'text' ? (
                        <pre className="w-full max-w-[595px] bg-white rounded shadow-sm p-4 overflow-auto">
                            {textContent}
                        </pre>
                    ) : (
                        <div className="w-full max-w-[595px] aspect-[1/1.414] bg-white rounded shadow-sm flex flex-col items-center justify-center p-6">
                            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                            <p className="text-center text-muted-foreground">
                                Type de fichier non supporté.
                                <br />
                                <span className="text-sm">
                                    Seuls les fichiers PDF et texte (.txt) sont supportés.
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default PDFViewer;