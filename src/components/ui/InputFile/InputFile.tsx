import { FaRegTrashAlt } from "react-icons/fa";
import { cn, Image, Spinner } from '@heroui/react'
import { ChangeEvent } from "react";


interface TypeProps {
  name: string;
  inputIcon: string;
  onChange: (e: FileList | undefined) => void;
  onUpload: (files: FileList, onChange: (e: FileList) => void) => void; 
  isPendingUpload: boolean;
  isInvalid: boolean;
  errorMessage: string | undefined;
  isPendingSave: boolean;
  onDelete: (onChange: (files: FileList | undefined) => void) => void;
  isPendingDelete: boolean;
  label?: string;
  textInCell: string;
}

const InputFile = (props: TypeProps) => {
    const {
      name,
      inputIcon,
      onChange,
      onUpload,
      isPendingUpload,
      isInvalid,
      errorMessage,
      isPendingSave,
      onDelete,
      isPendingDelete,
      label,
      textInCell
    } = props;


    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.files) {
        onUpload(e.target.files, onChange)
      }
    }

    return (
      <div>
        <p className="text-default-700 mb-2">
          {label}
        </p>
        <label htmlFor="foto-input">
          <div className={cn("w-full min-h-32 rounded-2xl bg-default-100 border-2 border-foreground-400 border-dashed flex justify-center items-center p-4 relative", {"border-danger": isInvalid})}>
            {inputIcon ? (
              <>
                <Image src={inputIcon} alt='icon' height={150} width={150} />
                
                <div className='absolute top-4 right-4 w-fit bg-danger/20 p-2 rounded-full text-danger/80 cursor-pointer' onClick={()=> onDelete(onChange)} >
                  {isPendingDelete ? <Spinner color="danger" size="sm" /> : <FaRegTrashAlt className='text-lg' />}
                </div>
              </>
            ) : isPendingUpload? (
            
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

        <input type="file" id="foto-input" name={name} className="hidden" onChange={(e) => changeInput(e)} disabled={isPendingSave || isPendingUpload || isPendingDelete || !!inputIcon} accept="image/*" />
      </div>
    )
}

export default InputFile;