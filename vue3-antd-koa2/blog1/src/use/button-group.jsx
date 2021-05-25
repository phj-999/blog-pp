import { defineComponent } from 'vue'

export const useButtonGroup = (list = []) => {
    return defineComponent({
        setup() {
            const buttonGroup = list.map(item => (
                <a-button style={{ margin: '8px' }} onClick={item.handle}>
                    {item.icon}
                    {item.text}
                </a-button>
            )
            )
            return () => (
                <section style={{ textAlign: 'center' }}>
                    { buttonGroup}
                </section>
            )
        }
    })
}