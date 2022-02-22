export interface ICall {
    via: string;
    call_type: string;
    id: string;
    duration: number;
    from: string;
    to: string;
    is_archived: boolean;
    created_at: string;
    direction: "inbound" | "outbound";
    notes: {
        [key: string]: string;
    }[]
  }