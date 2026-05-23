"use client"

import { useState } from "react"
import type {
  ProviderConnectionFixture,
  ProviderMetric,
  ProviderSettingsField,
  SettingsProviderPreviewProps,
  SettingsSectionId,
  SettingsSectionItem,
} from "./contracts"
import { settingsProviderConnectedMock } from "./mock-data"

export function SettingsProviderPreview({
  fixture = settingsProviderConnectedMock,
}: SettingsProviderPreviewProps) {
  const [activeSection, setActiveSection] = useState<SettingsSectionId>(fixture.activeSection)
  const [expanded, setExpanded] = useState(fixture.expanded)
  const [credential, setCredential] = useState("")

  return (
    <section className="min-h-[720px] bg-[#f4f1ea] p-5 text-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-950/5">
        <header className="flex flex-col gap-3 border-b border-zinc-200 pb-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Settings / Provider Connection
          </span>
          <h2 className="text-3xl font-semibold tracking-[-0.05em]">Настройки</h2>
          <p className="max-w-3xl text-sm leading-6 text-zinc-500">
            Presentation-only сценарий подключения провайдера. Секреты не отдаются обратно в
            браузер, UI получает только маску и состояние adapter-логики.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <SettingsSectionNav
            activeSection={activeSection}
            sections={fixture.sections}
            onChange={setActiveSection}
          />
          <div className="min-w-0">
            {activeSection === "integrations" ? (
              <ProviderConnectionCard
                credential={credential}
                expanded={expanded}
                fixture={fixture}
                onCredentialChange={setCredential}
                onToggleExpanded={() => setExpanded((current) => !current)}
              />
            ) : (
              <PlaceholderPanel section={activeSection} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function SettingsSectionNav({
  activeSection,
  sections,
  onChange,
}: {
  activeSection: SettingsSectionId
  sections: SettingsSectionItem[]
  onChange: (section: SettingsSectionId) => void
}) {
  return (
    <nav className="flex flex-col gap-2" aria-label="Разделы настроек">
      {sections.map((section) => (
        <button
          aria-pressed={activeSection === section.id}
          className={`rounded-2xl px-4 py-3 text-left transition ${
            activeSection === section.id
              ? "bg-zinc-950 text-white"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
          }`}
          key={section.id}
          type="button"
          onClick={() => onChange(section.id)}
        >
          <span className="block text-sm font-semibold">{section.title}</span>
          <span
            className={`mt-1 block text-xs leading-5 ${activeSection === section.id ? "text-zinc-300" : "text-zinc-500"}`}
          >
            {section.description}
          </span>
        </button>
      ))}
    </nav>
  )
}

function ProviderConnectionCard({
  credential,
  expanded,
  fixture,
  onCredentialChange,
  onToggleExpanded,
}: {
  credential: string
  expanded: boolean
  fixture: ProviderConnectionFixture
  onCredentialChange: (value: string) => void
  onToggleExpanded: () => void
}) {
  const isPending = fixture.state === "connecting" || fixture.state === "saving"

  return (
    <section className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#eee6d8] text-lg font-semibold">
            OR
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold tracking-[-0.03em]">{fixture.providerName}</h3>
              <StatusPill connected={fixture.connected} state={fixture.state} />
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
              {fixture.providerDescription}
            </p>
            {fixture.maskedCredential ? (
              <p className="mt-2 text-xs text-zinc-400">Ключ: {fixture.maskedCredential}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold"
            type="button"
            onClick={onToggleExpanded}
          >
            {expanded ? "Свернуть" : fixture.connected ? "Детали" : "Подключить"}
          </button>
          {fixture.connected ? (
            <button
              className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
              type="button"
            >
              Отключить
            </button>
          ) : null}
        </div>
      </div>

      {fixture.message || fixture.error ? (
        <div className="border-t border-zinc-200 px-5 py-3">
          {fixture.message ? <MessageBanner tone="success" text={fixture.message} /> : null}
          {fixture.error ? <MessageBanner tone="danger" text={fixture.error} /> : null}
        </div>
      ) : null}

      {expanded ? (
        <div className="border-t border-zinc-200 p-5">
          {fixture.connected ? (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <ProviderSettingsForm fields={fixture.fields} isPending={isPending} />
              <ProviderMetricsAside checkedAt={fixture.checkedAt} metrics={fixture.metrics} />
            </div>
          ) : (
            <CredentialForm
              credential={credential}
              fixture={fixture}
              isPending={isPending}
              onCredentialChange={onCredentialChange}
            />
          )}
        </div>
      ) : null}
    </section>
  )
}

function CredentialForm({
  credential,
  fixture,
  isPending,
  onCredentialChange,
}: {
  credential: string
  fixture: ProviderConnectionFixture
  isPending: boolean
  onCredentialChange: (value: string) => void
}) {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
        API ключ
        <input
          autoComplete="off"
          className="h-11 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none focus:border-zinc-950"
          placeholder={fixture.credentialPlaceholder}
          type="password"
          value={credential}
          onChange={(event) => onCredentialChange(event.target.value)}
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button
          className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          disabled={isPending}
          type="button"
        >
          {isPending ? "Проверяю..." : "Подключить"}
        </button>
        <span className="text-xs leading-5 text-zinc-500">
          Ключ сохраняется только после успешной проверки adapter-логикой.
        </span>
      </div>
    </div>
  )
}

function ProviderSettingsForm({
  fields,
  isPending,
}: {
  fields: ProviderSettingsField[]
  isPending: boolean
}) {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <ProviderField field={field} key={field.id} />
        ))}
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          disabled={isPending}
          type="button"
        >
          {isPending ? "Сохраняю..." : "Сохранить детали"}
        </button>
        <button
          className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-700"
          type="button"
        >
          Обновить лимиты
        </button>
      </div>
    </div>
  )
}

function ProviderField({ field }: { field: ProviderSettingsField }) {
  const fieldControlId = `provider-field-${field.id}`

  return (
    <label
      className={
        field.kind === "textarea" ? "flex flex-col gap-2 md:col-span-2" : "flex flex-col gap-2"
      }
      htmlFor={fieldControlId}
    >
      <span className="text-sm font-semibold text-zinc-700">{field.label}</span>
      {field.kind === "select" ? (
        <select
          className="h-11 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none focus:border-zinc-950"
          defaultValue={field.value}
          id={fieldControlId}
        >
          {field.options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <textarea
          className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-6 outline-none focus:border-zinc-950"
          defaultValue={field.value}
          id={fieldControlId}
          rows={field.rows ?? 4}
        />
      )}
    </label>
  )
}

function ProviderMetricsAside({
  checkedAt,
  metrics,
}: {
  checkedAt?: string
  metrics: ProviderMetric[]
}) {
  return (
    <aside className="flex flex-col gap-4 rounded-[22px] bg-zinc-100 p-5">
      <h4 className="text-base font-semibold tracking-[-0.03em]">Баланс и лимиты</h4>
      {metrics.length ? (
        <div className="flex flex-col gap-3">
          {metrics.map((metric) => (
            <MetricRow key={metric.id} metric={metric} />
          ))}
        </div>
      ) : (
        <p className="text-sm leading-6 text-zinc-500">Сохраните ключ и запустите проверку.</p>
      )}
      {checkedAt ? <p className="text-xs text-zinc-500">Проверено: {checkedAt}</p> : null}
    </aside>
  )
}

function MetricRow({ metric }: { metric: ProviderMetric }) {
  return (
    <div className="rounded-2xl bg-white p-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="text-zinc-500">{metric.label}</span>
        <span
          className={`font-semibold tabular-nums ${metric.tone === "success" ? "text-emerald-700" : "text-zinc-950"}`}
        >
          {metric.value}
        </span>
      </div>
      {metric.hint ? <p className="mt-2 text-xs leading-5 text-zinc-500">{metric.hint}</p> : null}
    </div>
  )
}

function StatusPill({ connected, state }: { connected: boolean; state: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${connected ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"}`}
    >
      {state === "loading" ? "Загрузка" : connected ? "Подключено" : "Не подключено"}
    </span>
  )
}

function MessageBanner({ text, tone }: { text: string; tone: "success" | "danger" }) {
  return (
    <div
      className={`rounded-2xl px-4 py-3 text-sm ${tone === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}
    >
      {text}
    </div>
  )
}

function PlaceholderPanel({ section }: { section: SettingsSectionId }) {
  return (
    <div className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold tracking-[-0.03em]">
        {section === "user" ? "Настройки пользователя" : "Администрирование"}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
        Placeholder-раздел остается частью shell pattern, но не смешивается с provider connection
        логикой.
      </p>
    </div>
  )
}
