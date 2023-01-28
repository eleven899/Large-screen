import hyRequest from "../index";
enum IndexApi {
  MainData = "index_data",
  InfoData = "money_data",
  BillData = "tax_data",
  TaskData = "task_flow_data",
}

export function getMainData() {
  return hyRequest.post({
    url: IndexApi.MainData,
  });
}
export function getInfoData() {
  return hyRequest.post({
    url: IndexApi.InfoData,
  });
}
export function getBillData() {
  return hyRequest.post({
    url: IndexApi.BillData,
  });
}
export function getTaskData() {
  return hyRequest.post({
    url: IndexApi.TaskData,
  });
}
