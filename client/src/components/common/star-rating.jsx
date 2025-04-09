import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange, variant, size }) {
  console.log(rating, "rating");

  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      className={`p-0  ${variant === "none" ? "" : "bg-white"} ${
        star <= rating
          ? "text-yellow-500 "
          : "text-black"
      }`}
      variant="none"
      size="14px"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-4 h-4 p-0 ${
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;
