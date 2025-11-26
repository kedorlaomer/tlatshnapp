import simplifySource from '@/helpers/simplifySource.tsx';

export default function extractSpan(text: Map<string, string>, from_: string, to_: string) {
    const accu = [];
    let index = 0;
    let found = false;
    new Map(Object.entries(text)).forEach((v, k) => {
        if (k == from_) {
            found = true;
        }

        if (found) {
            accu.push([k, v]);
            if (k == to_) {
                found = false;
            }
        }
    })

    for (let i = 1; i < accu.length; i++) {
        accu[i][0] = simplifySource(accu[i][0]);
    }


    return accu;
}
