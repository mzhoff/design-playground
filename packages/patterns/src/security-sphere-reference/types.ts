export type SecuritySphereReferenceArea = "website" | "admin" | "forms"

export interface SecuritySphereWebsiteCard {
  id: string
  kind: "course" | "article"
  title: string
  eyebrow: string
  meta: string
  cta: string
  tone: string
}

export interface SecuritySphereCatalogFilter {
  id: string
  label: string
  active?: boolean
}

export type SecuritySphereAdminStatus = "draft" | "active" | "review" | "archived" | "error"

export interface SecuritySphereAdminRow {
  id: string
  title: string
  status: SecuritySphereAdminStatus
  meta: string
  updatedAt: string
}

export interface SecuritySphereFormTab {
  id: string
  label: string
  state?: "clean" | "invalid" | "saved"
}

export interface SecuritySphereUploadState {
  id: string
  filename: string
  type: "image" | "document"
  state: "empty" | "uploading" | "uploaded" | "error"
  caption: string
}
