export default function parseSource(source: string): [string, number, number] {
    const pieces = source.split(' ');
    const book = pieces.slice(0, pieces.length-1).join(' ')
    const [verse, chapter] = pieces[pieces.length-1].split(":")
    return [book, parseInt(verse), parseInt(chapter)];
}
