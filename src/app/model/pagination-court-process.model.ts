import { CourtProcess } from "./court-process.model";

export interface PaginationCourtProcess {
    content: CourtProcess[],
    totalElements: number,
    totalPages: number,
    last: boolean,
}