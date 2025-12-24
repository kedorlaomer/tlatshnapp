import parseSource from '@/helpers/parseSource';

export default function simplifySource(source: string): string {
    const pieces = parseSource(source);

    if (pieces[2] === 1) {
        if (pieces[1] === 1) {
            return source;
        }

        return `${pieces[1]}:${pieces[2]}`;
    }

    return pieces[2].toString();
}
