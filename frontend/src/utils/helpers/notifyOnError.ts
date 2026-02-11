import toast from 'react-hot-toast'

export const notifyOnError = (errorMessage: string, id: string) => {
	toast.error(errorMessage, { id })
}
