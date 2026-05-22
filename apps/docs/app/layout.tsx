import Link from "next/link"
import type { ReactNode } from "react"
import "./globals.css"

export const metadata = {
  title: "Документация Design Playground",
  description: "Документация внутренней дизайн-системы Gigonom",
}

const navigationItems = [
  { href: "/", label: "Главная" },
  { href: "/process", label: "Процесс" },
  { href: "/foundations", label: "Foundations" },
  { href: "/inventory", label: "Инвентаризация" },
] as const

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <div className="docs-shell">
          <header className="docs-header">
            <Link className="docs-logo" href="/">
              Gigonom UI
            </Link>
            <nav className="docs-nav" aria-label="Основная навигация документации">
              {navigationItems.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="docs-main">{children}</main>
          <footer className="docs-footer">
            Design Playground: внутренняя дизайн-система Gigonom
          </footer>
        </div>
      </body>
    </html>
  )
}
