import { api } from "..";

export const getUsers = (page = 0, limit = 10, filter = {}) => {
  const queryParams = {
    _page: page,
    _limit: limit,
    ...(Object.keys(filter).length > 0 && filter),
  };

  return api.get(`/users`, { params: queryParams });
};


export const deleteUsers=()=>{
    return api.delete();
}