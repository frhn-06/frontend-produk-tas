import { toasterContext } from "@/context/toasterContext";
import { MediaServices } from "@/services/media.service";
import { IFileUrl } from "@/types/media";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { fileURLToPath } from "url";

const useMediaHandler = () => {

    const {setToaster} = useContext(toasterContext) 

    const uploadImage = async(file: File, callback: (file: string) => void) => {
        const formData = new FormData();
    
        formData.append("file", file);
    
        const {data} = await MediaServices.upload(formData);
        if(data.data.secure_url) {
            callback(data.data.secure_url);
        }
    }

    const {mutate: mutateUploadImage, isPending:isPendingUploadImage} = useMutation({
        mutationFn: (object: {file: File, callback: (url: string) => void}) => uploadImage(object.file, object.callback),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
    });


    const deleteImage = async (payload: IFileUrl, callback: () => void) => {
        const {data} = await MediaServices.delete(payload);
        if(data.data.result === "ok") {
            callback();
        }
    }


    const {mutate: mutateDeleteImage, isPending: isPendingDeleteImage} = useMutation({
        mutationFn: (object : {fileUrl: IFileUrl, callback: () => void}) => deleteImage(object.fileUrl, object.callback),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
    })


    return {
        mutateUploadImage,
        isPendingUploadImage,

        mutateDeleteImage,
        isPendingDeleteImage
    }
}

export default useMediaHandler;