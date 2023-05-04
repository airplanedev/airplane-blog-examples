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
		slug: "referrers_last_7_days",
		name: "Referrers - Last 7 Days",
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
				  name: 'firstUserSource',
				},
			],
			metrics: [
				{
				  name: 'activeUsers',
				},
			],
		});

		response.rows.forEach(row => {
			data.push({source: row.dimensionValues[0].value, users: row.metricValues[0].value});
		});

		return data;
	}
)
