import { useSelector } from "react-redux"

export const useToken = () => {
  const tokenStore = useSelector((state) => state.user.accessToken)

  return {
    tokenStore,
  }
}
