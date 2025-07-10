import ClientProfile from "@/app/pages/coach/ClientProfile"

export default function ClientProfilePage({ params }) {
  return <ClientProfile id={params.id} />
}