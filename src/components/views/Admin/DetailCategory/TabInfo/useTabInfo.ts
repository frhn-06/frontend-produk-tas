import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaCategory = yup.object({
    name: yup.string().required('please input category name'),
    description: yup.string().required('please input category description')
});

const useTabInfo = () => {

    const {handleSubmit:handleSubmitInfoCategory, control: controlInfoCategory, formState:{errors}, setValue: setValueInfoCategory, reset} = useForm({
        resolver: yupResolver(schemaCategory)
    })


    return {
        controlInfoCategory,
        errors,
        setValueInfoCategory,
        handleSubmitInfoCategory,
        reset
    }
}

export default useTabInfo;