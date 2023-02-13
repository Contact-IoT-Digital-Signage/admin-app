const API_ENDPOINT_URL =
  "https://cnfazva4d7jxl6dfjxif4mio6a.apigateway.us-sanjose-1.oci.customer-oci.com/dev/";

const activecallService = {
  listActivecalls: async () => {
    const endpoint = API_ENDPOINT_URL + "activecalls";
    const result = await fetch(endpoint);
    // const resultJson = await result.json()

    //driver
    const resultJson = {
      list: [{
        tpc: "Ike0001",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoiZk5tUWloVkttbG5IREFmYmN1c1JWNzk3a05OQTVFSW5RWVVCIiwidHBjIjoiSWtlMDAwMSIsInZlcnNpb24iOjEsInJvbGVfdHlwZSI6MSwiaWF0IjoxNjc2MzMwMTgzLCJleHAiOjE2NzY0MTY1ODN9.wCF0kE2KKmDQuxU1jIfpJT6zN0b1Q8Q_3BMJzTbBs7k",
        signageName: "user2"
      }],
    };

    return resultJson;
  },
};

export default activecallService;
