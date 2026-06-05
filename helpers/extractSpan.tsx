export default function extractSpan(text: Map<string, string>, from_: string, to_: string): [string, string][] {
    const accu: [string, string][] = [];
    let found = false;
    
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

    return accu;
}