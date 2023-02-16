const API_ENDPOINT_URL =
  "https://cnfazva4d7jxl6dfjxif4mio6a.apigateway.us-sanjose-1.oci.customer-oci.com/dev/";

const callhistoryService = {
  listCallhistory: async () => {
    const endpoint = API_ENDPOINT_URL + "callhistory";
    const result = await fetch(endpoint);
    const resultJson = await result.json()

    let returnVal = resultJson.history
    returnVal.sort(function (a, b) {
        if (a.callEnd > b.callEnd) return -1;
        if (a.callEnd < b.callEnd) return 1;
        return 0;
      });
    return returnVal
  },

  createCallhistory: async (body) => {
    await fetch(API_ENDPOINT_URL + "callhistory", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};

export default callhistoryService;
