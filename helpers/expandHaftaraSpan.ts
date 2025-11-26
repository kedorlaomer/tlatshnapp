export function expandHaftaraSpan(span: string): [string, string] {
    if (!span) return [null, null];
    
    if (!end) return [null, null];

    // Cases:
    // 1. "Isaiah 40:1-9" -> ["Isaiah 40:1", "Isaiah 40:9"]
    // 2. "Isaiah 40:1-41:4" -> ["Isaiah 40:1", "Isaiah 41:4"]
    
    const pieces = start.match(/^(\D+) (\d+):(\d+)-(\d+):?(\d+)?$/)[0].trim()
    const start = `${pieces[1]} ${pieces[2]}:${pieces[3]}`
    const end = pieces[5]? 
        `${pieces[1]} ${pieces[4]}:${pieces[5]}` : 
            `${pieces[1]} ${pieces[2]}:${pieces[4]}`
    return [start, end]
}
