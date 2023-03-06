export default interface Note {
    id?: number;
    body: string;
    title?: string;
    images?: string[];
    is_archived?: boolean;
    is_pinned?: boolean;
}
