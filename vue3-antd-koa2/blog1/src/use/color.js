/**
 *  随机颜色
 * @returns `rgb(${useRandomNum(),useRandomNum()},${useRandomNum()})`
 */

export const useRandomColor = () => {
    const useRandomNum = () => Math.random() * 255
    return `rgb(
        ${useRandomNum()}, ${useRandomNum()}, ${useRandomNum()}
    )`
}