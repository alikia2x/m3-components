function removeAttr<T extends object, K extends keyof T>(obj: T, attr: K): Omit<T, K> {
    delete obj[attr];
    return obj as Omit<T, K>;
}

export function getRestProps<P>(
    props: P extends object ? P : never,
	attrs: (keyof P)[]
): Omit<P, typeof attrs[number]> {
    for (const attr of attrs) {
		removeAttr(props, attr);
	}
	return props;
}