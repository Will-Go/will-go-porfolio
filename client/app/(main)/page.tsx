import { headers } from "next/headers";
import HomePage from "@/components/HomePage";
import HomePageServer from "@/components/HomePageServer";
import { isMobileOrTabletDevice } from "@/utils/isMobileOrTabletDevice";

export default async function Home() {
	const headersList = await headers();
	const userAgent = headersList.get("user-agent") ?? "";
	const isMobileOrTablet = isMobileOrTabletDevice(userAgent);

	if (isMobileOrTablet) {
		return <HomePageServer />;
	}

	return <HomePage />;
}
