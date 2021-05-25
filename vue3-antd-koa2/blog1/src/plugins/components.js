import { Button, Avatar, Tag } from "ant-design-vue"

const components = [Button, Avatar, Tag]

export const componentsPlugin = app =>
	components.forEach(app.use, app)

