import { Button, Avatar, Tag, Card, Pagination, Timeline  } from "ant-design-vue"

const components = [Button, Avatar, Tag, Card, Pagination, Timeline ]

export const componentsPlugin = app =>
	components.forEach(app.use, app)

