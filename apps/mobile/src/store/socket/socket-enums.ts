export enum SOCKET_CONNECTION_TYPES {
  SEND_MESSAGE = "user-response",
  AGENT_CHAT = "agent-chat",

  RECEIVE_MESSAGE = "bot-response",
  RECEIVE_MESSAGE_HISTORY = "bot-response-history",

  JOIN_ROOM = "join_room",
  CONNECT = "connect",

  DISCONNECT = "disconnect",

  AGENT_CONNECT = "agent-connect",
  AGENT_CONNECT_INFO = "agent-connnect-info",
  USER_CONNECT = "user-connect",
  USER_RECONNECT_RESPONSE = "user-reconnect-response",

  AGENT_RESPONSE = "agent-response",
  USER_RESPONSE = "live_user_response",

  BOT_CONVERSATION = "bot-conversation",
  BOT_CONVERSATION_PREVIEW = "bot-conversation-preview",
  BOT_CONVERSATION_HISTROY = "get-history",

  TYPING_STATUS = "typing-status",
  SET_TYPING_STATUS = "set-typing-status",
  INITIATE_BOT_SESSION = "intiate-bot",
  GET_SESSION_ID = "get-session",

  GET_NEW_SESSIONS = "user-session",
  RESET_UNREAD_MSG_COUNT = "message-read-status",
  AGENT_REASSIGN = "agent-reassign",

  RECONNECT = "reconnect",
  CONNECT_ERROR = "connect_error",
  RECONNECT_ERROR = "reconnect_failed",

  MY_SESSION = "my-session",
  ONLINE_AGENT_LISTINGS = "online-agent-listings",
  ONLINE_AGENT_LISTINGS_REFRESH = "agent-refresh-list",
  ONLINE_AGENTS_STATUS_CHANGED = "online-agent-status-changed",
}

export enum MESSAGE_TYPES {
  ATTACHMENT = "attachment",
  TEXT = "text",
  FILE = "file",
  IMAGE = "image",
  STICKER = "image/webp",
  VIDEO = "video",
  AUDIO = "audio",
  LINK = "link",
  DOCUMENT = "document",
  MOBILE = "mobile",
  EMAIL = "email",
  CAROUSEL = "carousel",
  BUTTONS = "buttons",
  CHOICE = "choice",
  FLOW = "flow",
  FEEDBACK = "feedback",
  LIVE_AGENT_REQUESTED = "live_agent",
  TIMESTAMPS = "timestamps",
  ALERT = "alert",
  AWAY = "AWAY",
  TRANSFER_TO_FAQS = "TRANSFER_TO_FAQS",
  INFO = "info",
  PRIVATE_NOTE = "private_note",
  WHATSAPP_TEMPLATE = "whatsapp_template",
  WHATSAPP_INTERACTIVE_LIST = "whatsapp_interactive_list",
  WHATSAPP_INTERACTIVE = "whatsapp_interactive",
  OPT_OUT_BUTTON = "opt_out",
  QUICK_REPLY_BUTTON = "QUICK_REPLY",
  LOCATION= "location",
}

export enum INPUT_TYPES {
  NAME = "NAME",
  MOBILE = "MOBILE",
  WEBSITE = "WEBSITE",
  EMAIL = "EMAIL",
  QUERY = "QUERY",
  AWAY = "AWAY",
  NONE = "NONE",
  FILE = "FILE",
  FAQ = "TRANSFER_TO_FAQS",
  TRANSFER_TO_FAQS = "TRANSFER_TO_FAQS",
  OTP = "OTP",
  NUMBER = "NUMBER",
  DATE = "DATE",
  FEEDBACK = "FEEDBACK",
  TEXT = "TEXT",
  DATETIME = "DATETIME",
  DROPDOWN = "DROPDOWN",
  FILE_UPLOAD = "FILE_UPLOAD",
  CUSTOM = "CUSTOM",
  LIVECHAT = "LIVECHAT",
}


export enum PreviewType {
  getaWidgetPreview = "getaWidgetPreview",
}
