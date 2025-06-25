import { ReactNode } from "react"
import styles from "./index.module.scss"

type ToastProps={
children:ReactNode
}

export function Toast({children}:ToastProps){
return(
  <div className={styles.toast}>
    {children}
  </div>
)
}