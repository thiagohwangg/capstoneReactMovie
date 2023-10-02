import { HTMLInputTypeAttribute } from "react"
import { UseFormRegister } from "react-hook-form"

type InputProps = {
    label ?: string,
    id?: string,
    type?: HTMLInputTypeAttribute,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register ?: UseFormRegister<any>,
    error ?: string,
    placeholder ?:string,
    className ?: string,
    name ?:string,
    onChange ?: void 
}

export const Input = ({label,id,type = "text",register,error , placeholder,onChange , className = "" } : InputProps) => {
  return (
    <div className={className}>
        {!!label && <label htmlFor="taiKhoan">{label}</label>}
                <input
                    id={id}
                    type={type}
                    className="p-10 mt-8 w-full rounded-6  bg-[#333]"
                    placeholder={placeholder}
                    // value={formValue}
                    name={name}
                    onChange = {onChange}
                    {...register?.(id)}
                />
                {!!error  && (
                    <p className="text-red-500 text-14 mt-2">
                        {error}
                    </p>
                )}
    </div>
  )
}
