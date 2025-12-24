import simplifySource from '@/helpers/simplifySource';

export default function extractSpan(text: Map<string, string>, from_: string, to_: string): [string, string][] {
    const accu: [string, string][] = [];
    let found = false;
    
    // Directly iterate over the Map entries
    text.forEach((v, k) => {
        if (k == from_) {
            found = true;
        }

        if (found) {
            accu.push([k, v]);
            if (k == to_) {
                found = false;
            }
        }
    });

    // Apply simplifySource to all entries except the first one
    for (let i = 1; i < accu.length; i++) {
        accu[i][0] = simplifySource(accu[i][0]);
    }

    return accu;
}