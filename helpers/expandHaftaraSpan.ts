export function expandHaftaraSpan(span: string): [string, string] {
    if (!span) return [null, null];
    
    const [start, end] = span.split('-').map(x => x.trim());
    if (!end) return [null, null];

    // Cases:
    // 1. "Isaiah 40:1-9" -> ["Isaiah 40:1", "Isaiah 40:9"]
    // 2. "Isaiah 40:1-41:4" -> ["Isaiah 40:1", "Isaiah 41:4"]
    // 3. "Isaiah 40:1-16" -> ["Isaiah 40:1", "Isaiah 40:16"]
    
    const [book_chapter_verse, verse_or_chapter_verse] = [start, end];
    const [book, chapter_verse] = book_chapter_verse.split(' ');
    const [start_chapter, start_verse] = chapter_verse.split(':');

    if (verse_or_chapter_verse.includes(':')) {
        // Case 2: full chapter:verse specification
        return [
            `${book} ${start_chapter}:${start_verse}`,
            `${book} ${verse_or_chapter_verse}`
        ];
    } else {
        // Case 1 & 3: just verse number
        return [
            `${book} ${start_chapter}:${start_verse}`,
            `${book} ${start_chapter}:${verse_or_chapter_verse}`
        ];
    }
}
