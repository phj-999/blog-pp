/**
 * antd 提醒
 */
import {
    notification
} from 'ant-design-vue'

export const useNotice = (type) => ({
    message,
    description,
    duration = 1
}) => {
    notification[type]({
        message,
        description,
        duration
    })
}

export const useSuccessNotice = useNotice('success')
export const useInfoNotice = useNotice('info')
export const useWarningNotice = useNotice('warning')
export const useErrorNotice = useNotice ('error')