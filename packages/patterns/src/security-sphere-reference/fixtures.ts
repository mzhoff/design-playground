import type {
  SecuritySphereAdminRow,
  SecuritySphereCatalogFilter,
  SecuritySphereFormTab,
  SecuritySphereUploadState,
  SecuritySphereWebsiteCard,
} from "./types"

export const securitySphereWebsiteCardsFixture: SecuritySphereWebsiteCard[] = [
  {
    id: "course-card",
    kind: "course",
    title: "Информационная безопасность для руководителей",
    eyebrow: "Курс SS-104",
    meta: "72 часа",
    cta: "42 000 ₽",
    tone: "from-blue-200 via-sky-100 to-white",
  },
  {
    id: "article-card",
    kind: "article",
    title: "Как выстроить обучение сотрудников без хаоса в документах",
    eyebrow: "Статья",
    meta: "7 мин",
    cta: "Методология",
    tone: "from-zinc-200 via-slate-100 to-white",
  },
  {
    id: "info-card",
    kind: "course",
    title: "Программа повышения квалификации",
    eyebrow: "Каталог",
    meta: "Документы и учебный план",
    cta: "Подробнее",
    tone: "from-emerald-200 via-teal-100 to-white",
  },
]

export const securitySphereCatalogFiltersFixture: SecuritySphereCatalogFilter[] = [
  { id: "all", label: "Все программы", active: true },
  { id: "security", label: "Безопасность" },
  { id: "docs", label: "Документы" },
  { id: "online", label: "Онлайн" },
]

export const securitySphereAdminRowsFixture: SecuritySphereAdminRow[] = [
  {
    id: "row-1",
    title: "Курс по защите персональных данных",
    status: "active",
    meta: "Опубликован в каталоге",
    updatedAt: "Сегодня, 11:20",
  },
  {
    id: "row-2",
    title: "Статья о проверках и документах",
    status: "review",
    meta: "Ожидает редакторской проверки",
    updatedAt: "Вчера, 18:40",
  },
  {
    id: "row-3",
    title: "Документ: политика обработки данных",
    status: "draft",
    meta: "Черновик формы документа",
    updatedAt: "20 мая, 09:15",
  },
]

export const securitySphereFormTabsFixture: SecuritySphereFormTab[] = [
  { id: "general", label: "Основное", state: "saved" },
  { id: "content", label: "Контент", state: "clean" },
  { id: "relations", label: "Связи", state: "clean" },
  { id: "seo", label: "SEO", state: "invalid" },
]

export const securitySphereUploadStatesFixture: SecuritySphereUploadState[] = [
  {
    id: "upload-empty",
    filename: "",
    type: "image",
    state: "empty",
    caption: "Можно загрузить изображение или документ",
  },
  {
    id: "upload-image",
    filename: "course-cover.jpg",
    type: "image",
    state: "uploaded",
    caption: "Preview, open and clear actions",
  },
  {
    id: "upload-file",
    filename: "program-document.pdf",
    type: "document",
    state: "uploading",
    caption: "Загрузка файла и статус процесса",
  },
]
