import { MOCK_CONTENT_QUEUE } from "./mockAdminData";
import type { AdminContentQueueItem } from "./adminTypes";
export async function getAdminContentQueue(area?: AdminContentQueueItem["area"]) { return MOCK_CONTENT_QUEUE.filter((item) => !area || item.area === area).map((item) => ({ ...item })); }
