import parseSource from '@/helpers/parseSource.tsx';
import simplifySource from '@/helpers/simplifySource.tsx';

export default function extractSpan(text: Map<string, string>, from_: string, to_:string) {
    const [book, chapter1, verse1] = parseSource(from_);
    const [_, chapter2, verse2] = parseSource(to_);

    let accu = [];
    let i = chapter1;
    let j = verse1;
    while (i < chapter2 || (i == chapter2 && j <= verse2)) {
        const index = `${book} ${i}:${j}`;
        if (index in text) {
            accu.push([index, text[index]]);
            j++;
        } else {
            i++;
            j = 1;
        }
    }

    let rv = [accu[0]];
    for (i = 1; i < accu.length; i++) {
        const source1 = accu[i-1][0];
        const [source2, text] = accu[i];
        const source = simplifySource(source1, source2);
        rv.push([source, text]);
    }

    return rv;
}

