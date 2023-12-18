
export interface ResourceDataType {
  sequence: string[];
}

export interface ResourceContentData {
  content_ids: string[]; //content table
  question_ids: string[]; //question table
  instruction_ids: string[]; //teacher_instruction table
  sequence: string[][]; //Page: ids "1": ["a", "b", "c"] // {[key: pageNo]: ["a", "inst", "z"]}
}

export type ResourceContentRevisionMap = {
  [revision_no: string]: ModuleResourceContentData;
};

export interface ModuleResourceContentData {
  created_by: string;
  revision_number: number;
  created_on: Date;
  deactivated_on?: Date;
  content_info: ResourceContentData;
  gcp_content_json_url: string
}
