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

export const useColorMap = (map) => {
    return (key)=>map.get(key)
}
//export const useColorMap = (map) => key =>map.get(key)
