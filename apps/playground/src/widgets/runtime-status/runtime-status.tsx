import { compileCssVariables } from "@design-playground/theme-compiler";
import { UiStatusBadge } from "@design-playground/ui-react";
import { runtimeSurfaceSummary, stageOneChecklist } from "@/shared/config/project-plan";

const previewTokens = compileCssVariables({
  "--ds-surface": "#f7f3ea",
  "--ds-foreground": "#171411",
  "--ds-accent": "#a85f2a"
});

export function RuntimeStatus() {
  return (
    <section className="runtime-status" aria-labelledby="runtime-status-title">
      <div className="runtime-status__eyebrow">Этап 1</div>
      <h1 id="runtime-status-title">Runtime-каркас Design Playground</h1>
      <p>
        Это минимальная оболочка Playground. Она проверяет, что Next.js-приложение видит
        workspace-пакеты и готово принимать реальные компоненты на следующих этапах.
      </p>

      <div className="runtime-status__grid">
        <div className="runtime-status__card">
          <h2>Готовим поверхности</h2>
          <ul>
            {stageOneChecklist.map((item) => (
              <li key={item}>
                <UiStatusBadge tone="ready">готовится</UiStatusBadge>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="runtime-status__card">
          <h2>Будущие слои</h2>
          <dl>
            <div>
              <dt>Токены</dt>
              <dd>{runtimeSurfaceSummary.tokenLayers.join(", ")}</dd>
            </div>
            <div>
              <dt>Паттерны</dt>
              <dd>{runtimeSurfaceSummary.patternGroups.join(", ")}</dd>
            </div>
          </dl>
        </div>

        <div className="runtime-status__card runtime-status__card--code">
          <h2>Пробный CSS-выход</h2>
          <pre>{previewTokens}</pre>
        </div>
      </div>
    </section>
  );
}
