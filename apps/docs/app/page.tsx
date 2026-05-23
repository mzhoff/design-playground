import Link from "next/link"

export default function DocsHomePage() {
  return (
    <article className="docs-page">
      <section className="docs-hero">
        <div className="docs-kicker">Design Playground</div>
        <h1>Документация внутренней дизайн-системы Gigonom</h1>
        <p>
          Здесь фиксируем продуктовые правила, этапы, источники инвентаризации и будущий контракт
          компонентов. Это не финальная внешняя упаковка, а рабочая документационная поверхность
          первого этапа.
        </p>
      </section>

      <section className="docs-grid" aria-label="Разделы документации">
        <Link className="docs-card" href="/process">
          <h2>Процесс</h2>
          <p>Этапы, критерии готовности и правило передачи результата через PR.</p>
        </Link>
        <Link className="docs-card" href="/foundations">
          <h2>Foundations</h2>
          <p>Будущие слои токенов: цвета, типографика, отступы, радиусы и motion.</p>
        </Link>
        <Link className="docs-card" href="/inventory">
          <h2>Инвентаризация</h2>
          <p>Проекты-источники, из которых будем переносить рабочие UI-наработки.</p>
        </Link>
      </section>
    </article>
  )
}
