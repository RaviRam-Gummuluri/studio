import { BondTable } from "@/components/bond-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockBonds } from "@/lib/data";

export default function SearchPage() {
  // In a real application, filtering logic would be handled here
  const bonds = mockBonds;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Search & Filter Bonds</h2>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
          <CardDescription>Use the filters below to find specific bonds.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="isin-cusip">ISIN / CUSIP</Label>
              <Input id="isin-cusip" placeholder="Enter ISIN or CUSIP..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuer Name</Label>
              <Input id="issuer" placeholder="e.g., Apple Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="counterparty">Counterparty</Label>
              <Input id="counterparty" placeholder="e.g., Goldman Sachs" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="book">Book</Label>
               <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a book" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gov-us">GOV-US</SelectItem>
                  <SelectItem value="gov-de">GOV-DE</SelectItem>
                  <SelectItem value="corp-uk">CORP-UK</SelectItem>
                   <SelectItem value="tech-us">TECH-US</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
               <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="assignment">Assignment</Label>
               <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="col-span-1 flex items-end md:col-span-2 lg:col-span-2">
              <Button className="w-full lg:w-auto">Search</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
           <BondTable bonds={bonds} />
        </CardContent>
      </Card>

    </div>
  )
}
