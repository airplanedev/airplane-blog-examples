import airplane from "airplane"
const {BetaAnalyticsDataClient} = require('@google-analytics/data');

// Swap this with your GA Property ID before running your Task
const propertyId = process.env.property_id;

function formatDate(date) {
	const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
	const adjustedDate = new Date(date.getTime() - timezoneOffset);
	return adjustedDate.toISOString().substr(0, 10);
}

export default airplane.task(
	{
		slug: "pageviews_last_7_days",
		name: "Pageviews - Last 7 Days",
	},
	// This is your task's entrypoint. When your task is executed, this
	// function will be called.
	async () => {
		var data = [];

		const analyticsDataClient = new BetaAnalyticsDataClient({
			credentials: {
				client_email: process.env.client_email,
				private_key: process.env.private_key.split(String.raw`\n`).join('\n')
			},
			projectId: process.env.project_id
		});

		const today = formatDate(new Date());
		const weekAgo = formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

		const [response] = await analyticsDataClient.runReport({
			property: `properties/${propertyId}`,
			dateRanges: [
				{
					startDate: weekAgo,
					endDate: today
				}
			],
			dimensions: [
				{
				  name: 'date',
				},
			],
			metrics: [
				{
				  name: 'activeUsers',
				},
			],
		});

		response.rows.forEach(row => {
			var row_date = row.dimensionValues[0].value;
			data.push({"date": `${row_date.substr(4,2)}/${row_date.substr(6,2)}`, Users: row.metricValues[0].value});
		});

		return data;
	}
)