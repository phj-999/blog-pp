import { Button, Avatar, Tag, Card, Pagination, Timeline, Form, Input  } from "ant-design-vue"

const components = [Button, Avatar, Tag, Card, Pagination, Timeline, Form, Input ]

export const componentsPlugin = app =>
	components.forEach(app.use, app)

