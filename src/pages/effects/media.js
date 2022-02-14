import { useState, useEffect } from 'react';
import { get } from 'lodash';
import MediaTypes from '../../types/MediaTypes';
import { fetchMediaList, fetchSharedMembers } from '../../utils/apiCalls';

export function useMediaList(id) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const mediaList = await fetchMediaList(id);
        const sharedMediaList = await Promise.all(
          mediaList.map(async (media) => ({
            ...media,
            sharedWith: await fetchSharedMembers(media.id),
          }))
        );
        setData(sharedMediaList);
      } catch (err) {
        console.error(err);
        setData([]);
      }
    }

    setData(null);
    fetchData();
  }, [id]);

  return data;
}

export function useFilteredMediaList(data) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const sortedData = (data || []).map((media) => {
      let type = MediaTypes.FOLDER;
      if (media?.folder === 2) type = MediaTypes.MP4;
      else if (media?.folder === 3) type = MediaTypes.JPG;

      return {
        id: media.id,
        name: media?.name || 'Unknown Media',
        dateCreated: new Date(media?.created?.on),
        size: media?.size || 0,
        isSelected: false,
        sharedWith: Object.entries(media?.sharedWith || []).map(
          ([, member]) => ({
            name: get(member, 'name', ''),
            userId: member?.id,
            email: member?.email,
          })
        ),
        type,
      };
    });
    setFilteredData(sortedData);
  }, [data]);

  return [filteredData, setFilteredData];
}
