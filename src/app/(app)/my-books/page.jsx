import { BondTable } from "@/components/bond-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBonds } from "@/lib/data";

export default function MyBooksPage() {
    // In a real app, this would be filtered based on the logged-in user's assigned books.
    // Simulating this by taking the first 3 bonds.
    const myBookBonds = mockBonds.filter(bond => bond.assignedTo?.name === 'Alice');

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">My Books</h2>
            
            <Card>
                <CardHeader>
                    <CardTitle>Bonds in Your Books</CardTitle>
                    <CardDescription>
                        This is a list of all active trades in books assigned to you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BondTable bonds={myBookBonds} />
                </CardContent>
            </Card>
        </div>
    );
}
