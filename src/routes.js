import PrivateAndPublic from "src/pages/PrivateAndPublic";
import WhoInMyOrbit from "src/pages/WhoInMyOrbit";
import IdentifyingFeelings from "src/pages/IdentifyingFeelings";

const routes = [
    { path: "/private-and-public", component: PrivateAndPublic, exact: true },
    { path: "/who-in-my-orbit", component: WhoInMyOrbit, exact: true },
    { path: "/identifying-feelings", component: IdentifyingFeelings, exact: true }
];

export default routes;
