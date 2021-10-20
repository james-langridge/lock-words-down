export type Syllable = {
  id: string;
  content: string;
};

export type Word = {
  id: string;
  content: string;
};

export type Column = {
  id: string;
  title: string;
  syllableIds: string[];
  src: string;
};

export type AlphaSortColumn = {
  id: string;
  title: string;
  wordIds: string[];
};

export type ColumnsData = {
  term: string;
  image_url?: string;
};

export type GivenAnswer = {
  columnId: string;
  term: string;
  syllable: string | string[];
};

export type CorrectAnswer = {
  term: string;
  syllable: string;
};
