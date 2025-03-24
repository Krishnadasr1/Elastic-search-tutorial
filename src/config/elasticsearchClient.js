import { Client } from "@elastic/elasticsearch";

const esClient = new Client({
  node: "https://localhost:9200", 
  auth: { username: "your-username", password: "your-password" }, 
  tls: {
    rejectUnauthorized: false, 
  },
});

export default esClient;
