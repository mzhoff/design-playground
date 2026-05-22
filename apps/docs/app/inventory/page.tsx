export default function InventoryPage() {
  return (
    <article className="docs-page">
      <section className="docs-hero">
        <div className="docs-kicker">Inventory</div>
        <h1>Источники компонентов</h1>
        <p>
          Инвентаризация начинается с существующих проектов, где уже накоплены рабочие UI-решения.
          Сначала переносим сырье, потом стандартизируем.
        </p>
      </section>

      <section className="docs-card">
        <h2>Первичные источники</h2>
        <ul>
          <li>REVERIE app: графики и аналитические паттерны.</li>
          <li>prodSQL: канвас, layout, меню и панели.</li>
          <li>Security Sphere: админка, редакторы, поля, сайт и анимации.</li>
          <li>Gigonom 2026: первый потребитель и среда проверки.</li>
          <li>Gigonom UI в Figma: дизайн-решения и библиотечные фреймы.</li>
        </ul>
      </section>
    </article>
  )
}
