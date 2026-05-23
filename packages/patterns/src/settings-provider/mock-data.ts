import type { ProviderConnectionFixture } from "./contracts"

export const settingsProviderConnectedMock: ProviderConnectionFixture = {
  providerName: "OpenRouter",
  providerDescription:
    "Ключ используется backend-сервисом для AI-функций CMS: генерации обложек, иллюстраций и проверки лимитов.",
  state: "connected",
  connected: true,
  expanded: true,
  maskedCredential: "sk-or-...9f3a",
  message: "Настройки OpenRouter сохранены.",
  checkedAt: "23.05.2026, 14:30",
  activeSection: "integrations",
  credentialPlaceholder: "sk-or-...",
  sections: [
    {
      id: "user",
      title: "Пользователь",
      description: "Профиль, уведомления и персональные параметры.",
    },
    {
      id: "administration",
      title: "Администрирование",
      description: "Роли, доступы, публикации и системные ограничения.",
    },
    {
      id: "integrations",
      title: "Интеграции",
      description: "Внешние сервисы, ключи и AI-провайдеры.",
    },
  ],
  fields: [
    {
      id: "imageModel",
      label: "Модель изображений",
      kind: "select",
      value: "google/gemini-2.5-flash-image",
      options: [
        {
          id: "google/gemini-2.5-flash-image",
          label: "Google: Nano Banana",
          description: "image output",
        },
        {
          id: "openai/gpt-image-1",
          label: "OpenAI: Image",
          description: "fallback option",
        },
      ],
    },
    {
      id: "imageAspectRatio",
      label: "Пропорции",
      kind: "select",
      value: "16:9",
      options: [
        { id: "16:9", label: "16:9" },
        { id: "3:2", label: "3:2" },
        { id: "1:1", label: "1:1" },
        { id: "9:16", label: "9:16" },
      ],
    },
    {
      id: "imageSize",
      label: "Размер",
      kind: "select",
      value: "2K",
      options: [
        { id: "0.5K", label: "0.5K" },
        { id: "1K", label: "1K" },
        { id: "2K", label: "2K" },
        { id: "4K", label: "4K" },
      ],
    },
    {
      id: "imagePrompt",
      label: "Системная инструкция",
      kind: "textarea",
      rows: 3,
      value:
        "Создавать чистые B2B-обложки без текста, логотипов, интерфейсного шума и дешевого stock-photo look.",
    },
    {
      id: "imageVisualFocus",
      label: "Сюжет / visual focus",
      kind: "textarea",
      rows: 5,
      value:
        "Абстрактная редакторская система: контентные блоки, аккуратные панели, тонкая сетка и ощущение контроля.",
    },
    {
      id: "imageNegativePrompt",
      label: "Negative prompt",
      kind: "textarea",
      rows: 4,
      value:
        "Без реальных брендов, букв, водяных знаков, агрессивного киберпанка, улыбающихся колл-центров и 3D-игрушечности.",
    },
  ],
  metrics: [
    { id: "keyRemaining", label: "Остаток на ключе", value: "$38.4200", tone: "success" },
    { id: "keyLimit", label: "Лимит ключа", value: "$50.0000" },
    { id: "daily", label: "Использовано сегодня", value: "$1.1800" },
    { id: "monthly", label: "Использовано за месяц", value: "$12.7640" },
    { id: "credits", label: "Остаток аккаунта", value: "$142.0100", tone: "success" },
    {
      id: "creditsHint",
      label: "Статус credits",
      value: "partial",
      tone: "warning",
      hint: "Общий баланс аккаунта доступен только management key.",
    },
  ],
}

export const settingsProviderDisconnectedMock: ProviderConnectionFixture = {
  ...settingsProviderConnectedMock,
  state: "disconnected",
  connected: false,
  expanded: true,
  maskedCredential: undefined,
  message: undefined,
  checkedAt: undefined,
  metrics: [],
}

export const settingsProviderErrorMock: ProviderConnectionFixture = {
  ...settingsProviderDisconnectedMock,
  state: "error",
  error: "Вставьте OpenRouter API key.",
}
