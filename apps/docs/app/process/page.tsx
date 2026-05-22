export default function ProcessPage() {
  return (
    <article className="docs-page">
      <section className="docs-hero">
        <div className="docs-kicker">Этап 1</div>
        <h1>Процесс работы</h1>
        <p>
          Проект идет по этапам, чтобы не смешивать архитектуру, инвентаризацию, дизайн-ревью и
          финальную реализацию.
        </p>
      </section>

      <section className="docs-card">
        <h2>Текущий фокус</h2>
        <ul>
          <li>Поднять Playground.</li>
          <li>Поднять документацию.</li>
          <li>Поднять Storybook.</li>
          <li>Настроить workspace-импорты пакетов.</li>
          <li>Подключить PR-проверки.</li>
        </ul>
      </section>
    </article>
  )
}
