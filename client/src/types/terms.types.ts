export type TermEntry = {
    _id: string,
    term: string,
    syllable: string,
    created_by: string,
    createdAt: string,
    updatedAt: string,
    image_url?: string,
    __V: number
}

export type Selection = {
    _id: string,
    selectionTitle: string,
    selection: TermEntry[],
    gameTitle: string,
    created_by: string,
    __V: number
}

export type Option = {
    id: string,
    label: string
}