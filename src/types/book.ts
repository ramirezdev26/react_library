export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}

export interface SearchResult {
  docs: Book[];
}

export interface WorkDetail {
  title: string;
  description?: string | { value: string };
  covers?: number[];
}
