import React, { useEffect, useState } from 'react';
import { FileText, Download, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the worker source to a known good version on CDN
// Note: Using version 3.4.120 which is known to be available on cdnjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl, title, allowDownload = true }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [error, setError] = useState(null);
    const [fileType, setFileType] = useState(null); // 'pdf', 'text', 'rawtext' ou null
    const [textContent, setTextContent] = useState(''); // Contenu du fichier texte

    // Fonction pour nettoyer les balises <think> de DeepSeek
    const cleanThinkTags = (text) => {
        // Enlève les balises <think> et </think> et tout leur contenu
        return text.replace(/<think>[\s\S]*?<\/think>/g, '');
    };

    // Vérifier si la chaîne est une URL valide
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    // Déterminer le type de fichier à partir de l'extension de l'URL
    const getFileTypeFromUrl = (url) => {
        if (!isValidUrl(url)) {
            return 'rawtext'; // S'il ne s'agit pas d'une URL, c'est du texte brut
        }

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
        // Reset errors when fileUrl changes
        setError(null);

        // Log for debugging
        console.log("Processing file URL:", fileUrl);

        const type = getFileTypeFromUrl(fileUrl);
        console.log('Type de fichier détecté :', type);

        setFileType(type);

        if (type === 'rawtext') {
            // Si c'est du texte brut, pas besoin de fetch
            // Nettoyer les balises <think> de DeepSeek
            const cleanedText = cleanThinkTags(fileUrl);
            setTextContent(cleanedText);
            setIsLoading(false);
        } else if (type === 'text') {
            // Récupérer le contenu du fichier texte
            fetch(fileUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then((text) => {
                    setTextContent(text);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Text file fetch error:", err);
                    setError(`Impossible de charger le fichier texte: ${err.message}`);
                    setIsLoading(false);
                });
        } else if (type === 'pdf') {
            // Pour les PDF, react-pdf gère le chargement
            setIsLoading(true);
            // PDF loading will be handled by react-pdf Document component
        } else if (!type) {
            setError('Type de fichier non supporté.');
            setIsLoading(false);
        }
    }, [fileUrl]);

    const handleDownload = () => {
        if (fileType === 'rawtext') {
            // Pour le texte brut, créer un blob et le télécharger
            const blob = new Blob([textContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${title.replace(/\s+/g, '_')}.txt`;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            // Pour les URL de fichiers
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = `${title.replace(/\s+/g, '_')}.${fileType === 'pdf' ? 'pdf' : 'txt'}`;
            link.target = '_blank';
            link.click();
        }
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
        setError(`Impossible de charger le PDF: ${error.message || 'Erreur inconnue'}`);
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
                    {fileType === 'pdf' && !error && (
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
                    {allowDownload && !error && (
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
                                loading={
                                    <div className="w-full max-w-[595px] aspect-[1/1.414] bg-white rounded shadow-sm overflow-hidden">
                                        <Skeleton className="w-full h-full" />
                                    </div>
                                }
                                options={{
                                    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/',
                                    cMapPacked: true,
                                }}
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
                    ) : (fileType === 'text' || fileType === 'rawtext') ? (
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
                                    Seuls les fichiers PDF, texte (.txt) et le texte brut sont supportés.
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