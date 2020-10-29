type RecordItem = {
  tags: string[];
  type: string;
  notes: string;
  amount: number;
  createTime: Date;
}

type tags = {
  id: string;
  name: string;
}

type tagListModel = {
  data: tags[];
  fetch: () => tags[];
  save: () => void;  // void代表不返回
  create: (name: string) => "success" | "duplicated";
  update: (id: string,name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
}

interface Window {
  tagList: Tag[];
}