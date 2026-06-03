const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const headers = {
  Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
};

async function setKey(key: string, value: string) {
  const response = await fetch(`${UPSTASH_REDIS_REST_URL}/set/${key}/${value}`, { headers });
  const data = await response.json();
  console.log("SET:", data);
}

async function getKey(key: string) {
  const response = await fetch(`${UPSTASH_REDIS_REST_URL}/get/${key}`, { headers });
  const data = await response.json();
  console.log("GET:", data);
}

async function deleteKey(key: string) {
  const response = await fetch(`${UPSTASH_REDIS_REST_URL}/del/${key}`, { headers });
  const data = await response.json();
  console.log("DEL:", data);
}

async function pingRedis() {
  try {
    await setKey("foo", "bar");
    await getKey("foo");
    await deleteKey("foo");
  } catch (error) {
    console.error("Redis ping failed:", error);
  }
}

pingRedis();
