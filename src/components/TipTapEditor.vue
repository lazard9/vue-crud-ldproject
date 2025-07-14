<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

/**
 * Initializes the TipTap editor with initial content from `props.modelValue`
 * and loads the required extensions (StarterKit + Placeholder).
 * 
 * On every content update inside the editor, the new HTML is emitted
 * to the parent component via the `update:modelValue` event.
 * 
 * A watcher is also set up to listen for changes to `props.modelValue`.
 * If the external value differs from the current editor content,
 * the editor content is updated accordingly.
 * 
 * This ensures two-way synchronization between the parent model and the editor.
 */
const editor = useEditor({
    content: props.modelValue || '',
    extensions: [
        StarterKit,
        Placeholder.configure({
            placeholder: 'Full destination description...',
        }),
    ],

    /**
     * Handles editor content updates.
     * 
     * This function is triggered whenever the content inside the editor is updated.
     * It checks if the editor exists and has a `getHTML` method. If so, it emits
     * the current HTML content of the editor using the `update:modelValue` event.
     * This ensures the parent component's model is synchronized with the editor's content.
     * 
     * @param {Object} param - An object containing the editor instance.
     * @param {Editor} param.editor - The editor instance with content manipulation methods.
     */
    onUpdate: ({ editor }) => {
        if (editor && typeof editor.getHTML === 'function') {
            emit('update:modelValue', editor.getHTML());
        }
    },
});

watch(
    () => props.modelValue,
    (newValue) => {
        if (
            editor &&
            editor.value &&
            typeof editor.value.getHTML === 'function' &&
            newValue &&
            newValue !== editor.value.getHTML()
        ) {
            editor.value.commands.setContent(newValue, false);
        }
    },
    { immediate: true }
);
</script>

<template>
    <div v-if="editor" class="tiptap-editor space-y-2">
        <!-- Toolbar -->
        <div
            class="flex flex-wrap gap-2 border border-[var(--color-border)] rounded-md p-2 bg-[var(--color-background-soft)]">

            <button @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'font-bold text-blue-600': editor.isActive('bold') }" type="button">
                Bold
            </button>

            <button @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'italic text-blue-600': editor.isActive('italic') }" type="button">
                Italic
            </button>

            <button @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'text-blue-600': editor.isActive('bulletList') }" type="button">
                • Bullet List
            </button>

            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'text-blue-600': editor.isActive('heading', { level: 2 }) }" type="button">
                H2
            </button>

            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'text-blue-600': editor.isActive('heading', { level: 3 }) }" type="button">
                H3
            </button>

            <button @click="editor.chain().focus().undo().run()" type="button">Undo</button>
            <button @click="editor.chain().focus().redo().run()" type="button">Redo</button>
        </div>

        <!-- Editor Content -->
        <div
            class="tiptap-wrapper border border-[var(--color-border)] rounded-md p-2 bg-[var(--color-background-soft)] min-h-[150px]">
            <EditorContent :editor="editor" />
        </div>
    </div>
</template>

<style scoped>
.tiptap-wrapper :deep(.ProseMirror) {
    outline: none;
    min-height: 150px;
    padding: 0.5rem;
    color: var(--color-text);
}

.tiptap-wrapper :deep(.ProseMirror p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    color: #999;
    pointer-events: none;
    height: 0;
}

.tiptap-wrapper :deep(.ProseMirror h2) {
    font-size: 1.5rem;
    /* 24px */
    font-weight: 500;
    margin: 1rem 0 0.75rem 0;
    color: var(--color-heading);
}

.tiptap-wrapper :deep(.ProseMirror h3) {
    font-size: 1.25rem;
    /* 20px */
    font-weight: 500;
    margin: 0.75rem 0 0.5rem 0;
    color: var(--color-heading);
}

.tiptap-wrapper :deep(.ProseMirror ul) {
    padding-left: 1.5rem;
    margin: 1rem 0;
    list-style-type: disc;
    color: var(--color-text);
}

.tiptap-wrapper :deep(.ProseMirror ul > li) {
    margin-bottom: 0.5rem;
    line-height: 1.5;
}
</style>
