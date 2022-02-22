import Pusher from "pusher-js";

export function getPusher() {
  if (!process.env.REACT_APP_APP_KEY) {
    throw new Error("REACT_APP_APP_KEY is not set");
  }

  const pusher = new Pusher(process.env.REACT_APP_APP_KEY, {
    cluster: process.env.REACT_APP_APP_CLUSTER,
    authEndpoint: process.env.REACT_APP_APP_AUTH_ENDPOINT,
    auth: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    },
  });

  return pusher;
}
