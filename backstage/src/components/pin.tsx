/**
 * g根据antd的星星组件Rate封装相符要用的星星组件
 *  */
import React from 'react'
import { Rate } from 'antd'

interface PinProps extends React.ComponentProps<typeof Rate> {
    checked:boolean
    onCheckedChange?: (checked:boolean) => void
}

export const Pin = (props:PinProps) => {
    const {checked,onCheckedChange,...restProps} = props
    
    return (
        <Rate
        count={1} //1颗星星
        value={checked?1:0}
        onChange={num=>onCheckedChange?.(!!num)}
        {...restProps}
        />
    )
}
