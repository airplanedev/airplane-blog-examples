import { Callout, Heading, Link, Stack, Text, Card, Table, Chart, useTaskQuery } from "@airplane/views";
import airplane from "airplane";

const AnalyticsDashboard = () => {
  const { output, loading, error } = useTaskQuery({ slug: "referrers_last_7_days" });

  let referrer_labels = [];
  let referrer_data   = [];
  if( output ) {
    referrer_labels = output.map((o) => o.source);
    referrer_data   = output.map((o) => ({users: o.users}));
  }

  return (
    <Stack spacing="lg">
      <Heading level={1}>Real-time Analytics Dashboard</Heading>

      <Stack direction="row" justify="space-between">
        <Card width="1/2">
          <Chart type="line" title="Active Users (last 7 days)" task="pageviews_last_7_days" />
        </Card>
        <Card width="1/2">
          <Chart
            type="pie"
            title="Referrers (last 7 days)"
            data={referrer_data}
            labels={referrer_labels}
          />
        </Card>
      </Stack>
      <Stack>
        <Card width="1">
          <Table task="most_popular_pages" title="Most Popular Pages (last 7 days)" defaultPageSize={5}></Table>
        </Card>
      </Stack>
    </Stack>
  );
};

export default airplane.view(
  {
    slug: "analytics_dashboard",
    name: "Analytics Dashboard",
  },
  AnalyticsDashboard
);