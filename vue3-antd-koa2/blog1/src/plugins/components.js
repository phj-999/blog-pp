import { Button, Avatar, Tag, Card, Pagination } from "ant-design-vue"

const components = [Button, Avatar, Tag, Card, Pagination]

export const componentsPlugin = app =>
	components.forEach(app.use, app)

