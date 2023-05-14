import { ChangeEvent } from "react";
import useFetch from "../hooks/useFetch";
import Image from "../images/image.png";
// import Image1 from "../images/image1.png";
import Image2 from "../images/image2.png";
import Image3 from "../images/image3.png";
import Image4 from "../images/image4.png";
import Image5 from "../images/image5.png";
import Image6 from "../images/image6.png";

const Main = () => {
  const { data, loading, error, refetch } = useFetch(
    import.meta.env.VITE_API_BASE_URL + "/images"
  );
  console.log(data, "data");

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
        console.log("Images uploaded successfully");
      } else {
        console.log("Error uploading images");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <div className="container">
      <div className="content-div">
        <div className="cards-div">
          <div id="title-div">
            <h1>Connect people &amp; spaces</h1>
          </div>
          <div>
            <img src={Image2} alt="seemless" />
            <div className="text-on-image-div">
              <p>something something</p>
            </div>
          </div>
          <div>
            <img src={Image} alt="seemless" />
            <div className="text-on-image-div">
              <p>something something</p>
            </div>
          </div>
          <div>
            <img src={Image2} alt="seemless" />
            <div className="text-on-image-div">
              <p>something something</p>
            </div>
          </div>
          <div>
            <img src={Image3} alt="seemless" />
            <div className="text-on-image-div">
              <p>something something</p>
            </div>
          </div>
          <div>
            <img src={Image4} alt="seemless" />
            <div className="text-on-image-div">
              <p>something something</p>
            </div>
          </div>
          <div>
            <img src={Image5} alt="seemless" />
            <div className="text-on-image-div">
              <p>something something</p>
            </div>
          </div>
          <div>
            <img src={Image6} alt="seemless" />
            <div className="text-on-image-div">
              <p>something something</p>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default Main;
