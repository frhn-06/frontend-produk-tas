import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaBanner = yup.object({
    name: yup.string().required('please input banner name'),
    description: yup.string().required('please input banner description')
});

const useTabInfo = () => {

    const {handleSubmit:handleSubmitInfoBanner, control: controlInfoBanner, formState:{errors}, setValue: setValueInfoBanner, reset} = useForm({
        resolver: yupResolver(schemaBanner)
    })


    return {
        controlInfoBanner,
        errors,
        setValueInfoBanner,
        handleSubmitInfoBanner,
        reset
    }
}

export default useTabInfo;