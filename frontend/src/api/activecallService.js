const API_ENDPOINT_URL =
  "https://cnfazva4d7jxl6dfjxif4mio6a.apigateway.us-sanjose-1.oci.customer-oci.com/dev/";

const activecallService = {
  listActivecalls: async () => {
    const endpoint = API_ENDPOINT_URL + "activecalls";
    const result = await fetch(endpoint);
    const resultJson = await result.json()

    return resultJson.activeCalls;
  },

  updateActivecalls: async (tpc) => {
    const body = {
        "tpc": tpc
    }
    const endpoint = API_ENDPOINT_URL + "activecall";
    await fetch(endpoint, {
        method: 'PATCH',
        body: JSON.stringify(body),
    });
  },

  deleteActivecalls: async (tpc) => {
    const body = {
        "tpc": tpc
    }
    const endpoint = API_ENDPOINT_URL + "activecall";
    await fetch(endpoint, {
        method: 'DELETE',
        body: JSON.stringify(body),
    });
  },
};

export default activecallService;
