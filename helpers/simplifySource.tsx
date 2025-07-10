import parseSource from '@/helpers/parseSource.tsx';

export default function simplifySource(source1: string, source2: string): string {
    // strip common prefix of source2 relative to source1
    console.log("simplifying " + source1 + " and " + source2)
    const pieces1 = parseSource(source1)
    const pieces2 = parseSource(source2)
    console.log(pieces1);
    console.log(pieces2);

    if (pieces1[0] != pieces2[0]) {
        console.log("books are different: " + pieces1[0] + " and " + pieces2[0])
        return source2
    }

    if (pieces1[1] != pieces2[1]) {
        console.log("chapters are different: " + pieces1[1] + " and " + pieces2[1])
        return pieces2[1] + ":" + pieces2[2]
    }

    console.log("only verses are different …")
    return pieces2[2]
}
