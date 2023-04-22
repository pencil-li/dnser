import axios from "axios";

export const fetchHnsDomainData = async (name: string) => {
  try {
    // Fetch the HNS domain data
    const domainDataResponse = await axios.get(
      `https://e.hnsfans.com/api/names/${name}`
    );
    const domainHistoryResponse = await axios.get(
      `https://e.hnsfans.com/api/names/${name}/history`
    );

    // Combine the domain data and history
    const hnsDomainData = {
      ...domainDataResponse.data,
      history: domainHistoryResponse.data.result,
    };

    return hnsDomainData;
  } catch (error) {
    throw new Error("Error fetching HNS domain data");
  }
};
