import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BondTable } from "@/components/bond-table"
import { mockBonds } from "@/lib/data"
import { addDays, isAfter, isBefore, subDays } from "date-fns"

export default function DashboardPage() {
  const today = new Date()
  const next5BusinessDays = addDays(today, 5)
  const last5BusinessDays = subDays(today, 5)

  const maturingNext5Days = mockBonds.filter(
    (bond) => isAfter(bond.maturityDate, today) && isBefore(bond.maturityDate, next5BusinessDays)
  )

  const maturedLast5Days = mockBonds.filter(
    (bond) => isBefore(bond.maturityDate, today) && isAfter(bond.maturityDate, last5BusinessDays)
  )

  const allOpenBonds = mockBonds.filter((bond) => bond.status === 'Open');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="maturing">
        <TabsList>
          <TabsTrigger value="maturing">Maturing in Next 5 Days</TabsTrigger>
          <TabsTrigger value="matured">Matured in Last 5 Days</TabsTrigger>
          <TabsTrigger value="all-open">All Open Bonds</TabsTrigger>
        </TabsList>
        <TabsContent value="maturing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Maturing Soon</CardTitle>
              <CardDescription>
                These bonds are maturing within the next 5 business days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BondTable bonds={maturingNext5Days} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="matured" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Matured</CardTitle>
              <CardDescription>
                These bonds have matured in the last 5 business days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BondTable bonds={maturedLast5Days} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all-open" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Open Bonds</CardTitle>
              <CardDescription>
                A list of all bonds with an 'Open' status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BondTable bonds={allOpenBonds} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
