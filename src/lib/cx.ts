export const cx = (
	...classNames: (string | boolean | null | undefined)[]
): string => {
	let result = "";

	for (let i = 0; i < classNames.length; i++) {
		if (classNames[i]) {
			if (result) {
				result += " ";
			}

			result += classNames[i];
		}
	}

	return result;
};
