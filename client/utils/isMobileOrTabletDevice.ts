export function isMobileOrTabletDevice(userAgent: string): boolean {
	const ua = userAgent.toLowerCase();

	if (!ua) {
		return false;
	}

	const mobilePattern =
		/android|webos|iphone|ipod|blackberry|iemobile|opera mini|mobile/i;
	const tabletPattern = /ipad|tablet|playbook|silk/i;
	const androidTabletPattern = /android(?!.*mobile)/i;

	return (
		mobilePattern.test(ua) ||
		tabletPattern.test(ua) ||
		androidTabletPattern.test(ua)
	);
}
