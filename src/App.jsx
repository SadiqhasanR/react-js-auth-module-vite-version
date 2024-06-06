import React from "react";
import Cookies from "js-cookie";

function App() {
  async function fetchStarApi(parentFolderPath = null, offset = null) {
    try {
      let formData = new FormData();
      if (parentFolderPath !== null) {
        formData.append("parent_folder_path", parentFolderPath);
      }
      if (offset !== null) {
        formData.append("offset", offset);
      }
      const response = await fetch(
        `https://api.silocloud.io/api/v1/file-manager/fetch-star`,
        {
          method: "POST",
          headers: {
            authToken: Cookies.get("authToken"),
          },
          ...((parentFolderPath !== null || offset !== null) && {
            body: formData,
          }),
        }
      );
      let responseData = await response.json();
      return responseData;
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  React.useEffect(() => {
    fetchStarApi();
  }, []);

  return <>Hii Bruh</>;
}

export default App;
