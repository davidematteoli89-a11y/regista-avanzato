import { getAdminContentQueue } from "./getAdminContentQueue";
export async function getAdminHighlightLinks() { return getAdminContentQueue("highlight_links"); }
