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

    const fetchNiamiDomainData = await axios.get(
      `https://api.niami.io/domain/${name}`
    );

    const fetchNiamiUnicodeData = await axios.get(
      `https://api.niami.io/domain/unicode/${name}`
    );

    const fetchNiamiHsdData = await axios.get(
      `https://api.niami.io/hsd/${name}`
    );

    const fetchNiamiTxsData = await axios.get(
      `https://api.niami.io/txs/${name}`
    );
    
    // Combine the domain data and history
    const hnsDomainData = {
/*       ...domainDataResponse.data,
      history: domainHistoryResponse.data.result,
 */      ehnsfans: {
        domain: domainDataResponse.data,
        history: domainHistoryResponse.data.result,
      },
      niami: {
        domain: fetchNiamiDomainData.data,
        unicode: fetchNiamiUnicodeData.data,
        hsd: fetchNiamiHsdData.data,
        txs: fetchNiamiTxsData.data,
      },
    };


    return hnsDomainData;
    
  } catch (error) {
    throw new Error("Error fetching HNS domain data");
  }
};
