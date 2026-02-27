import { cn } from "@/utils/cn";
import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

interface TypeProps {
  name: string;
  onChange: (e: number | undefined) => void;
  isInvalid: boolean;
  errorMessage: string | undefined;
  isPendingReview?: boolean;
}

const InputRating = (props: TypeProps) => {
    const {
      name,
      onChange,
      isInvalid,
      errorMessage,
      isPendingReview
    } = props;

    const [rating, setRating] = useState(0);
      
        const handleClickStar = (star: number, onChange: (e: number | undefined) => void) => {
          if(star === rating) {
            setRating(0);
            onChange(undefined)
            return;
          } 
          setRating(star);
          onChange(star);
        }
    

    return (
        <>
          <label htmlFor="star-input">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => 
                rating >= star ? (
                  <IoStar key={star} className={cn("w-12 h-12 text-yellow-400", {"text-danger" : isInvalid})} onClick={() => handleClickStar(star, onChange)} />
                ) : (
                  <IoStarOutline key={star} className={cn("w-12 h-12", {"text-danger" : isInvalid})} onClick={() => handleClickStar(star, onChange)} />
                )
              )}
            </div>
            {isInvalid && (
              <p className="text-danger text-sm">
                {errorMessage}
              </p>
            )}
          </label>
          
          <input name={name} type="hidden" id="star-input" disabled={isPendingReview} />
        </>
    )
}

export default InputRating;