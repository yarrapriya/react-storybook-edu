import { createConnectTransport } from '@bufbuild/connect-web';
import { setLocalStorage } from '@geneo2-web/shared-ui';

const backend_url = process.env.NX_GENEO_BACKEND_URL;

export const BASE_URL = backend_url ? backend_url : 'https://dev2-api.geneo.in';

async function checkAuthAndFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  // console.log('Login');
  try {
    const res = await fetch(input, init);
    if (res.status === 401) {
      // console.log('Login Failed');
      setLocalStorage('auth', 'false');
      window.location.replace('/');
    }
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const CMS_URL = `${BASE_URL}/cms`;

export const cmsTransport = createConnectTransport({
  baseUrl: CMS_URL,
  credentials: 'include',
  useHttpGet: true,
  fetch: checkAuthAndFetch,
});

export const LMS_URL = `${BASE_URL}/lms`;

export const lmsTransport = createConnectTransport({
  baseUrl: LMS_URL,
  credentials: 'include',
  useHttpGet: true,
  fetch: checkAuthAndFetch,
});

export const UMS_URL = `${BASE_URL}/ums`;

export const umsTransport = createConnectTransport({
  baseUrl: UMS_URL,
  credentials: 'include',
  useHttpGet: true,
  fetch: checkAuthAndFetch,
});
