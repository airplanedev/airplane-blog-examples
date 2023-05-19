import airplane from "airplane";

export default airplane.task(
  {
    slug: "support_tickets",
    name: "Support Tickets",
  },
  // This is your task's entrypoint. When your task is executed, this
  // function will be called.
  async () => {
    const data = [];

    const HS_APP_ID = process.env.HS_APP_ID;
    const HS_APP_SECRET = process.env.HS_APP_SECRET;
    const MAILBOX_ID = process.env.MAILBOX_ID;

    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');
    requestBody.append('client_id', HS_APP_ID);
    requestBody.append('client_secret', HS_APP_SECRET);

    const token_request = await fetch('https://api.helpscout.net/v2/oauth2/token',
      {
        method: 'POST',
        body: requestBody
      }
    );

    let oauth_token = await token_request.json();
    oauth_token = oauth_token.access_token;

    const params = {
      'method': 'GET',
      'headers': {
        'Authorization': 'Bearer ' + oauth_token
      }
    };

    const conversation_request = await fetch(`https://api.helpscout.net/v2/conversations?mailbox=${MAILBOX_ID}&status=open`, params);
    const conversation_info = await conversation_request.json();

    return conversation_info.page.totalElements;
  }
);
