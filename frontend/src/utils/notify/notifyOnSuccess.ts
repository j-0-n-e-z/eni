import toast from 'react-hot-toast'

export const notifyOnSuccess = (successMessage: string, id: string) => {
	toast.success(successMessage, { id })
}
