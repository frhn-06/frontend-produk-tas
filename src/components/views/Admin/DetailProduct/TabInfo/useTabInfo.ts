import CategoryService from '@/services/category.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaProduct = yup.object({
    name: yup.string().required('please input product name'),
    categoryId: yup.string().required('please input category'),
    isPublish: yup.string().required('please select status'),
    price: yup.string().required('please input price'),
    quantity: yup.string().required('please input quantity'),
    description: yup.string().required('please input category description'),
    isFeatured: yup.string().required('please select featured'),
    discount: yup.string()
});

const useTabInfo = () => {

    const router = useRouter();

    const {handleSubmit:handleSubmitInfoProduct, control: controlInfoProduct, formState:{errors}, setValue: setValueInfoProduct, reset} = useForm({
        resolver: yupResolver(schemaProduct)
    })


    const getCategories = async () => {
        const {data} = await CategoryService.findAll();
        return data;
    }

    const {data:dataCategories, isLoading:isLoadingCategories} = useQuery({
        queryKey: ["CategorySelect"],
        queryFn: getCategories,
        enabled: true
    });


    return {
        controlInfoProduct,
        errors,
        setValueInfoProduct,
        handleSubmitInfoProduct,
        reset,

        dataCategories,
        isLoadingCategories

    }
}

export default useTabInfo;