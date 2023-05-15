import { ChangeEvent } from "react";
import useFetch from "../hooks/useFetch";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorAlert, successAlert } from "../utils";
import ErrorComponent from "../components/Error";
import LoadingComponent from "../components/Loading";


const Main = () => {
  const { data, loading, error, refetch } = useFetch(
    import.meta.env.VITE_API_BASE_URL + "/images"
  );

  const handleAddImages = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;
    const selectedFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    uploadImages(selectedFiles);
    refetch();
  };

  const uploadImages = async (images: File[]) => {
    const formData = new FormData();
    for (const file of images) {
      formData.append("images", file);
    }
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/images",
        {
          method: "POST",
          body: formData,
          redirect: "follow",
        }
      );

      if (response.status === 200 || response.status === 201) {
        successAlert("Images uploaded successfully");
      }
    } catch (error) {
      errorAlert("An error occured while uploading images");
    }
  };

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent />;
  return (
    <div className="container">
      <div id="gallery">
        <div id="title-div">
          <h1>Connect people &amp; spaces</h1>
        </div>
        {data &&
          data.map(
            (item: {
              image: string;
              article: { title: string; description: string };
            }) => (
              <div className="mosaic">
                <img src={item?.image} />
                <div className="content">
                  <div id="article-div">
                    <h1>{item?.article?.title}</h1>
                    <p>{item?.article?.description}</p>
                  </div>
                </div>
              </div>
            )
          )}
        <div id="button-div">
          <label className="button" htmlFor="upload">
            Button
          </label>
          <input
            name="marketingImages"
            id="upload"
            type="file"
            multiple
            accept="image/png, image/jpeg"
            onChange={(e) => handleAddImages(e)}
          />
        </div>
        
      </div>
      <ToastContainer />
    </div>
  );
};

export default Main;
