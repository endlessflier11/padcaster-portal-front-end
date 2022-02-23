import { get } from 'lodash';
import { requestJson } from './network';

export async function fetchMediaList(id) {
  try {
    let requestUrl = `${process.env.TEST_API_URL}/files/`;
    if (id) requestUrl = requestUrl + `${id}/`;
    const data = await requestJson(requestUrl);
    const results = !id
      ? get(data, 'results', [])
      : get(data, 'children.results', []);
    return results;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchSharedMembers(id) {
  try {
    const data = await requestJson(
      `${process.env.TEST_API_URL}/files/${id}/members/`
    );
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
