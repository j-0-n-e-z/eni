import toast from 'react-hot-toast'

export class Notification {
	static success(message: string, id?: string) {
		toast.success(message, { id })
	}

	static error(message: string, id?: string) {
		toast.error(message, { id })
	}
}
