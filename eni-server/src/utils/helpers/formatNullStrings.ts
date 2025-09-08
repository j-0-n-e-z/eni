/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function convertNullStrings(obj: Record<string, any>) {
	for (const key in obj) {
		if (obj[key] === 'null') {
			obj[key] = null
		} else if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
			convertNullStrings(obj[key] as Record<string, any>)
		} else if (Array.isArray(obj[key])) {
			obj[key] = obj[key].map((item) =>
				Object.prototype.toString.call(obj) === '[object Object]' ||
				Array.isArray(obj)
					? convertNullStrings(item as Record<string, any>)
					: item
			)
		}
	}

	return obj
}
