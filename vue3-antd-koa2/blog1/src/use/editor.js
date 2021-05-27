import E from "wangeditor"
import { onMounted, onUnmounted } from "vue"

export const useEditor = (id = "editor") => {
	const editor = new E(`#${id}`)
	onMounted(() => editor.create())
	onUnmounted(() => editor.destroy())
	return editor
}
