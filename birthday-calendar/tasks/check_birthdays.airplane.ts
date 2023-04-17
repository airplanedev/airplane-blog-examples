import airplane from "airplane"

const https = require('https');

export default airplane.task(
	{
		slug: "check_birthdays",
		name: "Check Birthdays",
	},
	// This is your task's entrypoint. When your task is executed, this
	// function will be called.
	async () => {
	    const run = await airplane.execute('read_birthdays');
	    const employeeData = run.output;

	    employeeData.forEach((employee) => {
	    	const givenDate = new Date(employee.birthday);
			const today = new Date();

			if( givenDate.toDateString() === today.toDateString() ) {
				// Replace the webhook URL with your own
				const webhookUrl = 'https://hooks.slack.com/services/XXXXXXXXXXX/XXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX';

				// Message payload
				const payload = JSON.stringify({
				  text: `It's someone's birthday! Join me in wishing ${employee.name} a very happy birthday!`
				});

				// Request options
				const options = {
				  method: 'POST',
				  headers: {
				    'Content-Type': 'application/json'
				  }
				};

				// Send the message
				const req = https.request(webhookUrl, options, res => {
				  console.log(`Status code: ${res.statusCode}`);

				  res.on('data', d => {
				    console.log(`Response body: ${d}`);
				  });
				});

				req.on('error', error => {
				  console.error(error);
				});

				req.write(payload);
				req.end();
			}
	    });
	}
)
