# Chat Assistant Raw Kit

## Происхождение

Основной кодовый референс по `INV-10` — ChatModule:

- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/ChatModule/repos/ChatModule/packages/chat-ui/src/components/chat-module-shell.tsx`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/ChatModule/repos/ChatModule/packages/chat-ui/src/components/chat-composer.tsx`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/ChatModule/repos/ChatModule/packages/chat-ui/src/components/chat-message-item.tsx`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/ChatModule/repos/ChatModule/packages/chat-ui/src/components/semantic-block-renderer.tsx`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/ChatModule/repos/ChatModule/packages/chat-domain/src/types.ts`.

REVERIE используется как UX-референс для page-level assistant, onboarding, task panel, feedback и compact floating panel.

## Что перенесено

- Chat contracts: role, mode, message, attachment, semantic block, model option, task.
- Fullscreen/page-level assistant shell.
- Composer with attachments, command/model placeholders.
- Message renderer with text, banner, card, table, tool-status and image placeholder blocks.
- Task panel and compact floating panel preview.

## Текущие ограничения

- Это UI raw kit, не backend orchestration.
- Streaming, SSE, persistence, voice, feedback API и model policy не перенесены.
- Markdown рендерится как plain text до выбора зависимости (`react-markdown` или свой renderer).
- Compact panel взят как UX-паттерн, без старого prototype-web кода.
- Resizable/docked mode будет проектироваться отдельно на базе `editor-workspace` из `INV-08`.

## Следующий шаг

После Figma-слепка разделить на:

- `packages/ui-react/chat` для composer/message/markdown/typing/attachments;
- `packages/patterns/chat-assistant` для shell, thread, compact, docked, task panel;
- возможный `packages/chat-core` для message/block contracts и adapter interfaces.
