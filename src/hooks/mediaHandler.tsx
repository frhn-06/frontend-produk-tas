import { toasterContext } from "@/context/toasterContext";
import { MediaServices } from "@/services/media.service";
import { IFileUrl } from "@/types/media";
import { useMutation } from "@tanstack/react-query";
import { form } from "framer-motion/client";
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





    const uploadImages = async (files: FileList, callback: (files: string[]) => void) => {
        const formData = new FormData();
        Array.from(files).map((f: File) => {
            formData.append("files", f);
        });

        const { data } = await MediaServices.uploadBuanyak(formData);

        
        const payload = data.data.map((d: {secure_url: string}) => {
            const arr = [];
            arr.push(d.secure_url);
            return arr;
        });

        callback(payload);
    }


    const {mutate: mutateUploadImages, isPending: isPendingUploadImages} = useMutation({
        mutationFn: (object: {files: FileList, callback: (files: string[]) => void}) => uploadImages(object.files, object.callback),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        },
    })


    const deleteImages = async (payload: IFileUrl, callback: () => void) => {
        const data = await MediaServices.delete(payload);
        if(data.data.result === "ok") {
            callback();
        }
    } 

    const {mutate: mutateDeleteImages, isPending: isPendingDeleteImages} = useMutation({
        mutationFn: (object: {fileUrl: IFileUrl, callback: () => void}) => deleteImages(object.fileUrl, object.callback),
        onError(error) {
            setToaster({
                type: "error",
                message: error.message
            })
        }
    })



    return {
        mutateUploadImage,
        isPendingUploadImage,

        mutateDeleteImage,
        isPendingDeleteImage,

        mutateUploadImages,
        isPendingUploadImages,

        mutateDeleteImages,
        isPendingDeleteImages,
    }
}

export default useMediaHandler;