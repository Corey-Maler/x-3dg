export type Parser = (a: string) => any;

const rgbReg = /rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)/;
export const Color: Parser = (cssColor: string): number => {
    const [_, r, g, b] = cssColor.match(rgbReg);
    return (parseInt(r, 10) << 8 << 8) + (parseInt(g, 10) << 8) + parseInt(b, 10);
}


const reg2d = /matrix\((.*)\)/;
const reg3d = /matrix3d\((.*)\)/;

export const Matrix: Parser = (matrix: string):number[] => {
    if (reg3d.test(matrix)) {
        // 3d matrix
        const [, args] = matrix.match(reg3d);
        return args.split(',').map(parseFloat);
    } else {
        // 2d matrix
        const [, args] = matrix.match(reg2d);
        const [a, b, c, d, e, f] = args.split(',').map(parseFloat);
        const s = a === d ? a : 1; // if scale(x) or scale(x,y)

        return [ // transform matrix magic!
            a, c, e, 0,
            b, d, f, 0,
            0, 0, s, 0,
            0, 0, 0, 1
        ]
    }
}