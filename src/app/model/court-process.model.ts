export interface CourtProcess {
    id?: number;
	npu: string;
	creationDate: string;
	visualizationDate?: string;
	city: string;
	uf: string;
	pdfFileBase64: string;
}