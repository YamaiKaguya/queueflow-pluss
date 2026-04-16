import PrivateHeader from "@/src/components/header/PrivateHeader"

export default async function PrivateLayout({
children,
}: {
children: React.ReactNode
}) {
   return (
      <>
         <PrivateHeader />
         {children}
      </>
   )
}
