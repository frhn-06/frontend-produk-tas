import { cn } from '@/utils/cn';
import { Image, Spinner} from '@heroui/react' 
import { ChangeEvent } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

interface TypeProps {
  label?: string;
  name: string;
  onUpload: (e: FileList, onChange: (e: FileList) => void) => void;
  onChange: (file: FileList | undefined | string[]) => void;
  urlArray: string[] | string;
  isInvalid: boolean;
  errorMessage: string | undefined;
  isPendingUploadImages: boolean;
  isPendingSave: boolean;
  onDelete: (onChange: (files: FileList | undefined |  string[]) => void, index: number) => void;
  isPendingDelete?: boolean;
  textInCell: string;
}

const InputFiles = (props: TypeProps) => {
      const {
        onUpload,
        label,
        onChange,
        name,
        urlArray,
        isInvalid,
        errorMessage,
        isPendingUploadImages,
        isPendingSave,
        onDelete,
        isPendingDelete,
        textInCell
      } = props;


      const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
          onUpload(e.target.files, onChange);
        }
      }
  
      return (
        <div>
          <p className="text-default-700 mb-2">
            {label}
          </p>
          <label htmlFor="foto-input-buanyak">
            <div className={cn("w-full min-h-32 rounded-2xl bg-default-100 border-2 border-foreground-400 border-dashed flex justify-center items-center p-4 relative" )}>
              {urlArray ? (
                <div className='flex justify-center gap-4'>
                  {(urlArray as string[]).map((url: string, i:number) => (
                    <div key={`${url}`} className='w-20 lg:w-40 relative'>
                      <Image src={`${url}`} alt='image' className='w-full' />
                      
                      <div className='absolute top-0 right-0 w-fit bg-black/20 p-2 rounded-full text-white cursor-pointer z-10' onClick={() => onDelete(onChange, i)} >
                        {isPendingDelete ? <Spinner className="text-black" size="sm" /> : <FaRegTrashAlt className='text-xs' />}
                      </div>
                    </div>
                  ))}
                </div>
              ) : isPendingUploadImages? (
              

                <Spinner color="primary" />
            
              ) : (
                <div>
                  <h1 className="text-3xl text-default-400 text-center">
                    +
                  </h1>
                  <p className="text-sm text-default-400">
                    {textInCell}
                  </p>
                </div>
              )}
            
            </div>
          </label>
  
          {!!isInvalid && (
            <p className="text-danger text-xs mt-1">
              {errorMessage}
            </p>
          ) }
  
          <input type="file" multiple id="foto-input-buanyak" name={name} className="hidden" onChange={(e) => changeInput(e)} accept="image/*" disabled={!!urlArray || isPendingSave || isPendingUploadImages} />
        </div>
      )
    
}


export default InputFiles;