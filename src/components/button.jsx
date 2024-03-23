import { SvgSpinners270RingWithBg } from "@/app/akun/DaftarMitra"
import { forwardRef } from "react"
import { useFormStatus } from "react-dom";
import { useLoading } from "./useLoading";

// export default function Button({ children }) {
//   return <button className="">
//     {children}
//   </button>
// }

export const Button = forwardRef(
  function Button({ loading, children, onClickLoad, onClick, ...props }, ref) {
    const { pending } = useFormStatus();
    const { loading: loadingReactState, setLoading } = useLoading()
    const loadingStatus = pending || loading || props.disabled || loadingReactState
    console.log(pending, loading, props.disabled, loadingReactState, "Status", loadingStatus)
    return <button
      onClick={(e) => {
        if (onClickLoad) {
          setLoading(true)
        }
        onClick?.(e)
      }}
      {...props}
      disabled={!!loadingStatus}
    >
      {
        loadingStatus ? <div className="flex gap-2 items-center">
          <SvgSpinners270RingWithBg /> Loading...
        </div> : children
      }
    </button>
  }
)