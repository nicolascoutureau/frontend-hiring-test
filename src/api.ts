
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface IUser {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    username: string;
  };
}

function saveTokensToLocalStorage(data: IUser) {
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem("user", JSON.stringify(data.user));
}

export async function login(
  username: string,
  password: string
): Promise<IUser | null> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    let res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers,
    });
    let data = await res.json();

    saveTokensToLocalStorage(data);

    return data;
  } catch (err) {
    return null;
  }
}

export async function refreshToken() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "Authorization",
    `Bearer ${localStorage.getItem("refresh_token")}`
  );

  try {
    let res = await fetch(`${BASE_URL}/auth/refresh-token-v2`, {
      method: "POST",
      headers,
    });
    let data = await res.json();

    if(data.statusCode === 401){
        return null;
    }

    saveTokensToLocalStorage(data);

    return data;
  } catch (err) {
    localStorage.clear();
    return null;
  }
}

export async function request(
  enpoint: string,
  method: string,
  body: object | null
) {
  const access_token = localStorage.getItem("access_token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${access_token}`);

  // if(access_token){
  //     const user = jwt_decode(access_token)
  //     // @ts-ignore
  //     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  // }

  let params = {
    method,
    enpoint,
    headers,
    body: null,
  } as RequestInit;

  if (body) {
    params.body = JSON.stringify(body);
  }

  try {
    let res = await fetch(`${BASE_URL}/${enpoint}`, params);
    let data = await res.json();

    if (data?.statusCode === 401) {
      let hasRefreshedTokens = await refreshToken();

      if(!hasRefreshedTokens){
          window.location.href = '/login'
      }    
      
      let res = await fetch(`${BASE_URL}/${enpoint}`, params);
      return await res.json();
    }

    return data;
  } catch (err) {
    return null;
  }
}

export async function getCalls(offset: number, limit: number): Promise<any> {
  return await request(`calls?offset=${offset}&limit=${limit}`, "GET", null);
}

export async function archiveCalls(ids: string[]) {
  let promises: Promise<any>[] = [];

  ids.forEach((id) => {
    promises.push(request(`calls/${id}/archive`, "PUT", null));
  });

  return await Promise.all(promises);
}

export async function getCall(id: string) {
  return await request(`calls/${id}`, "GET", null);
}
