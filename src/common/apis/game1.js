import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/wp-json/wp/v2/",
});

export const getPersonalizeCategories = async () => {
  return axiosInstance.get("member_categories", {
    params: {
      acf_format: "standard",
    },
  });
};

export const getCategoryMembers = async (categoryId) => {
  return axiosInstance.get("member", {
    params: {
      acf_format: "standard",
      member_categories: categoryId,
    },
  });
};

export default axiosInstance;
