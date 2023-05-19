import { Callout, Heading, Link, Stack, Text, Chart, Card, Table, useTaskQuery } from "@airplane/views";
import airplane from "airplane";

const KpiDashboard = () => {
  const { output, loading, error } = useTaskQuery({ slug: "support_tickets" });

  return (
    <Stack spacing="lg">
      <Stack>
        <Chart
          type="line"
          task="analytics_query"
          title="Pageviews by month"
          xAxisTitle="Month"
          xAxis="date"
        />
      </Stack>
      <Stack direction="row">
        <Card width="1/2">
          <Table task="stripe_charges" title="Recent Stripe Charges" defaultPageSize={10}></Table>
        </Card>
        <Card width="1/2">
          <Stack justify="center" align="center" spacing="xs" height="100%">
            <Heading level={1}>{output}</Heading>
            {output && 
              <Text>open support tickets</Text>
            }
          </Stack>
        </Card>
      </Stack>
    </Stack>

  );
};

export default airplane.view(
  {
    slug: "kpi_dashboard",
    name: "KPI Dashboard",
  },
  KpiDashboard
);
