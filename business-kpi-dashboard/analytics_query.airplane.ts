import airplane from "airplane";

export default airplane.task(
  {
    slug: "analytics_query",
    name: "Analytics Query",
  },
  // This is your task's entrypoint. When your task is executed, this
  // function will be called.
  async () => {
    var FATHOM_KEY = process.env.FATHOM_KEY;
    var SITE_ID    = process.env.SITE_ID;

    // URL and params for the Fathom API
    const root = 'https://api.usefathom.com/v1/aggregations';
    const query = `?entity=pageview&entity_id=${SITE_ID}&aggregates=pageviews&sort_by=timestamp:desc&limit=6&date_grouping=month`;
     
    const params = {
      'method': 'GET',
      'muteHttpExceptions': true,
      'headers': {
        'Authorization': 'Bearer ' + process.env.FATHOM_KEY
      }
    };
     
    // call the Fathom API
    let response = await fetch(root + query, params);
    let pageviewData = await response.json();

    // Prepare the data for display in our line chart
    const formattedPageviewData = pageviewData.map(item => {
      return {
        date: item.date,
        pageviews: item.pageviews
      };
    });

    return formattedPageviewData;
  }
);
