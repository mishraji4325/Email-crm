import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-4">

      <Card>
        <CardContent className="p-6">
          Total Leads
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          Open Rate
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          Replies
        </CardContent>
      </Card>

    </div>
  );
}