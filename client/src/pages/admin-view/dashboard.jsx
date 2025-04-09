import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages, removeFeatureImage } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { Toast } from "@/components/ui/toast"; // Assuming a Toast component exists
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "lucide-react"; 

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log("Uploaded Image URL:", uploadedImageUrl);

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      console.error("No image URL provided.");
      return;
    }

    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDeleteImage(imageId) { 
    if (!imageId) {
      console.error("Feature image ID is undefined!");
      return;
    }

    console.log("Deleting Image ID:", imageId); // Log the image ID being deleted

    dispatch(removeFeatureImage(imageId)).then((data) => {
      if (data?.payload?.success) {
        setAlertMessage("Image deleted successfully!");
        setAlertType("success");
        dispatch(getFeatureImages()); // Refresh the image list after deletion
        setAlertMessage("Failed to delete image.");
        setAlertType("error");
        console.error("Failed to delete image:", data?.payload);
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log("Feature Image List:", featureImageList);
  console.log("Feature Image List IDs:", featureImageList.map(img => img._id));

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      {alertMessage && (
        <Toast message={alertMessage} type={alertType} /> // Display alert message
      )}
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem, index) => (
              <div className="relative" key={featureImgItem?.id || index}>
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                  onClick={() => handleDeleteImage(featureImgItem?._id)}
                >
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            ))
          : <p>Hero banners are not available</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;
