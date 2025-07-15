import parseSource from '@/helpers/parseSource.tsx';

export default function simplifySource(source1: string, source2: string): string {
    // strip common prefix of source2 relative to source1
    const pieces1 = parseSource(source1)
    const pieces2 = parseSource(source2)

    if (pieces1[0] != pieces2[0]) {
        return source2
    }

    if (pieces1[1] != pieces2[1]) {
        return pieces2[1] + ":" + pieces2[2]
    }

    return pieces2[2]
}
