(function initializeChatPage() {
  const SESSION_KEY = "study-tracker-session";
  const API_KEY = "study-tracker-api-base-url";
  const LIVE_API = "https://learnify-pro.onrender.com/api";
  const localHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const defaultApi = window.location.protocol === "file:" || localHost ? "http://localhost:5000/api" : LIVE_API;

  const session = readJson(SESSION_KEY);
  if (!session?.token || !session?.user) {
    window.location.href = "index.html";
    return;
  }

  const state = {
    user: session.user,
    token: session.token,
    mode: "global",
    activeFriend: null,
    friends: [],
    onlineUsers: new Set(),
    unread: new Map(),
    renderedMessageIds: new Set(),
    socket: null,
    typingTimer: null
  };

  function readJson(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch (error) {
      return null;
    }
  }

  function apiBase() {
    return (localStorage.getItem(API_KEY) || defaultApi).replace(/\/+$/, "");
  }

  function socketBase() {
    return apiBase().replace(/\/api$/, "");
  }

  async function apiRequest(path, options = {}) {
    const response = await fetch(`${apiBase()}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
        ...(options.headers || {})
      }
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem(SESSION_KEY);
        window.location.href = "index.html";
      }
      throw new Error(payload?.message || "Request failed.");
    }
    return payload;
  }

  function loadSocketClient() {
    if (window.io) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `${socketBase()}/socket.io/socket.io.js`;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error("Unable to load the live chat client."));
      document.head.appendChild(script);
    });
  }

  function nodes() {
    return {
      globalTab: document.getElementById("chat-tab-global"),
      friendsTab: document.getElementById("chat-tab-friends"),
      globalSummary: document.getElementById("chat-global-summary"),
      friendsPanel: document.getElementById("chat-friends-panel"),
      friendSearch: document.getElementById("chat-friend-search"),
      friendList: document.getElementById("chat-friend-list"),
      onlineSummary: document.getElementById("chat-online-summary"),
      conversationAvatar: document.getElementById("chat-conversation-avatar"),
      eyebrow: document.getElementById("chat-conversation-eyebrow"),
      title: document.getElementById("chat-conversation-title"),
      status: document.getElementById("chat-connection-status"),
      messages: document.getElementById("chat-message-list"),
      typing: document.getElementById("chat-typing-status"),
      form: document.getElementById("chat-message-form"),
      input: document.getElementById("chat-message-input"),
      send: document.getElementById("chat-send-button"),
      error: document.getElementById("chat-error")
    };
  }

  function setError(message = "") {
    nodes().error.textContent = message;
  }

  function setConnectionStatus(label, connected) {
    const status = nodes().status;
    status.textContent = label;
    status.classList.toggle("success", Boolean(connected));
  }

  function formatTime(value) {
    return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function currentUserId() {
    return String(state.user.id || state.user._id);
  }

  function messageMatchesView(message) {
    if (state.mode === "global") {
      return message.channel === "global";
    }
    if (!state.activeFriend || message.channel !== "direct") {
      return false;
    }
    const friendId = String(state.activeFriend.id);
    return String(message.sender.id) === friendId || String(message.recipientId) === friendId;
  }

  function renderEmpty(message) {
    const list = nodes().messages;
    list.innerHTML = "";
    const empty = document.createElement("div");
    empty.className = "chat-empty-state";
    const title = document.createElement("strong");
    title.textContent = "No messages yet";
    const copy = document.createElement("span");
    copy.textContent = message;
    empty.append(title, copy);
    list.appendChild(empty);
  }

  function renderMessage(message, { scroll = true } = {}) {
    if (!message?.id || state.renderedMessageIds.has(String(message.id)) || !messageMatchesView(message)) {
      return;
    }
    state.renderedMessageIds.add(String(message.id));

    const list = nodes().messages;
    list.querySelector(".chat-empty-state")?.remove();
    const own = String(message.sender.id) === currentUserId();
    const row = document.createElement("article");
    row.className = `chat-message-row${own ? " is-own" : ""}`;

    const avatar = document.createElement("span");
    avatar.className = "chat-message-avatar";
    const image = document.createElement("img");
    image.src = message.sender.avatarUrl;
    image.alt = "";
    avatar.appendChild(image);

    const content = document.createElement("div");
    content.className = "chat-message-content";
    const meta = document.createElement("div");
    meta.className = "chat-message-meta";
    const name = document.createElement("strong");
    name.textContent = own ? "You" : message.sender.name;
    const time = document.createElement("span");
    time.textContent = formatTime(message.createdAt);
    meta.append(name, time);

    const bubble = document.createElement("p");
    bubble.className = "chat-message-bubble";
    bubble.textContent = message.body;
    content.append(meta, bubble);
    row.append(avatar, content);
    list.appendChild(row);

    if (scroll) {
      list.scrollTop = list.scrollHeight;
    }
  }

  function renderMessages(messages) {
    state.renderedMessageIds.clear();
    nodes().messages.innerHTML = "";
    if (!messages.length) {
      renderEmpty(state.mode === "global" ? "Start the first community conversation." : "Say hello to your friend.");
      return;
    }
    messages.forEach((message) => renderMessage(message, { scroll: false }));
    nodes().messages.scrollTop = nodes().messages.scrollHeight;
  }

  function renderFriendList(filter = "") {
    const list = nodes().friendList;
    const query = filter.trim().toLocaleLowerCase();
    const friends = state.friends.filter((friend) => `${friend.name} ${friend.email}`.toLocaleLowerCase().includes(query));
    list.innerHTML = "";

    if (!friends.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state compact";
      empty.textContent = state.friends.length ? "No matching friends." : "Add a friend before starting a private chat.";
      list.appendChild(empty);
      return;
    }

    friends.forEach((friend) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `chat-friend-button${String(state.activeFriend?.id) === String(friend.id) ? " is-active" : ""}`;
      button.dataset.friendId = friend.id;

      const avatar = document.createElement("span");
      avatar.className = "chat-friend-avatar";
      const image = document.createElement("img");
      image.src = friend.avatarUrl;
      image.alt = "";
      avatar.appendChild(image);

      const presence = document.createElement("span");
      presence.className = `chat-presence-dot${state.onlineUsers.has(String(friend.id)) ? " is-online" : ""}`;
      presence.setAttribute("aria-label", state.onlineUsers.has(String(friend.id)) ? "Online" : "Offline");

      const copy = document.createElement("span");
      copy.className = "chat-friend-copy";
      const name = document.createElement("strong");
      name.textContent = friend.name;
      const status = document.createElement("span");
      status.className = "muted-text";
      status.textContent = state.onlineUsers.has(String(friend.id)) ? "Online" : "Offline";
      copy.append(name, status);
      button.append(avatar, presence, copy);

      const unreadCount = state.unread.get(String(friend.id)) || 0;
      if (unreadCount) {
        const unread = document.createElement("span");
        unread.className = "chat-unread";
        unread.textContent = unreadCount > 9 ? "9+" : String(unreadCount);
        button.appendChild(unread);
      }

      button.addEventListener("click", () => selectFriend(friend));
      list.appendChild(button);
    });
  }

  async function loadGlobalMessages() {
    setError("");
    nodes().messages.innerHTML = '<div class="chat-empty-state">Loading global messages...</div>';
    const payload = await apiRequest("/chat/global?limit=75");
    renderMessages(payload.data || []);
  }

  async function selectFriend(friend) {
    state.mode = "friends";
    state.activeFriend = friend;
    state.unread.delete(String(friend.id));
    updateModeUi();
    renderFriendList(nodes().friendSearch.value);
    nodes().messages.innerHTML = '<div class="chat-empty-state">Loading conversation...</div>';
    setError("");

    try {
      const payload = await apiRequest(`/chat/direct/${friend.id}?limit=75`);
      renderMessages(payload.data || []);
      await apiRequest(`/chat/direct/${friend.id}/read`, { method: "POST" });
    } catch (error) {
      setError(error.message);
      renderEmpty("This conversation could not be loaded.");
    }
  }

  function updateModeUi() {
    const ui = nodes();
    const globalMode = state.mode === "global";
    ui.globalTab.classList.toggle("is-active", globalMode);
    ui.globalTab.setAttribute("aria-selected", String(globalMode));
    ui.friendsTab.classList.toggle("is-active", !globalMode);
    ui.friendsTab.setAttribute("aria-selected", String(!globalMode));
    ui.globalSummary.classList.toggle("hidden", !globalMode);
    ui.friendsPanel.classList.toggle("hidden", globalMode);
    updateConversationIdentity();
    ui.input.disabled = !globalMode && !state.activeFriend;
    ui.send.disabled = ui.input.disabled || !state.socket?.connected;
    ui.input.placeholder = globalMode ? "Message everyone..." : state.activeFriend ? `Message ${state.activeFriend.name}...` : "Choose a friend first";
    ui.typing.textContent = "";
  }

  function updateConversationIdentity() {
    const ui = nodes();
    const globalMode = state.mode === "global";
    const activeFriend = state.activeFriend;
    const online = activeFriend && state.onlineUsers.has(String(activeFriend.id));

    ui.title.textContent = globalMode ? "Global chat" : activeFriend?.name || "Choose a friend";
    ui.eyebrow.textContent = globalMode
      ? `${state.onlineUsers.size} learner${state.onlineUsers.size === 1 ? "" : "s"} online`
      : activeFriend
        ? online ? "Online now" : "Direct message"
        : "Select a conversation";

    ui.conversationAvatar.replaceChildren();
    ui.conversationAvatar.classList.toggle("is-global", globalMode);
    if (!globalMode && activeFriend?.avatarUrl) {
      const image = document.createElement("img");
      image.src = activeFriend.avatarUrl;
      image.alt = "";
      ui.conversationAvatar.appendChild(image);
    }
  }

  function switchToGlobal() {
    state.mode = "global";
    state.activeFriend = null;
    updateModeUi();
    loadGlobalMessages().catch((error) => {
      setError(error.message);
      renderEmpty("Global messages could not be loaded.");
    });
  }

  function switchToFriends() {
    state.mode = "friends";
    updateModeUi();
    renderFriendList(nodes().friendSearch.value);
    if (!state.activeFriend) {
      state.renderedMessageIds.clear();
      renderEmpty("Select an accepted friend to start chatting.");
    }
  }

  function updateOnlineSummary() {
    const count = state.onlineUsers.size;
    nodes().onlineSummary.textContent = `${count} learner${count === 1 ? "" : "s"} online`;
    updateConversationIdentity();
  }

  function handleIncomingMessage(message) {
    if (messageMatchesView(message)) {
      renderMessage(message);
      if (message.channel === "direct" && String(message.sender.id) !== currentUserId()) {
        apiRequest(`/chat/direct/${message.sender.id}/read`, { method: "POST" }).catch(() => undefined);
      }
      return;
    }

    if (message.channel === "direct" && String(message.sender.id) !== currentUserId()) {
      const senderId = String(message.sender.id);
      state.unread.set(senderId, (state.unread.get(senderId) || 0) + 1);
      renderFriendList(nodes().friendSearch.value);
    }
  }

  async function connectSocket() {
    await loadSocketClient();
    state.socket = window.io(socketBase(), {
      auth: { token: state.token },
      transports: ["websocket", "polling"]
    });

    state.socket.on("connect", () => {
      setConnectionStatus("Live", true);
      updateModeUi();
    });
    state.socket.on("disconnect", () => {
      setConnectionStatus("Reconnecting", false);
      updateModeUi();
    });
    state.socket.on("connect_error", (error) => {
      setConnectionStatus("Offline", false);
      setError(error.message || "Unable to connect to live chat.");
    });
    state.socket.on("presence:snapshot", ({ userIds = [] }) => {
      state.onlineUsers = new Set(userIds.map(String));
      updateOnlineSummary();
      renderFriendList(nodes().friendSearch.value);
    });
    state.socket.on("presence:update", ({ userId, online }) => {
      if (online) {
        state.onlineUsers.add(String(userId));
      } else {
        state.onlineUsers.delete(String(userId));
      }
      updateOnlineSummary();
      renderFriendList(nodes().friendSearch.value);
    });
    state.socket.on("chat:message", handleIncomingMessage);
    state.socket.on("chat:typing", ({ userId, typing }) => {
      if (state.mode === "friends" && String(state.activeFriend?.id) === String(userId)) {
        nodes().typing.textContent = typing ? `${state.activeFriend.name} is typing...` : "";
      }
    });
  }

  function bindEvents() {
    const ui = nodes();
    ui.globalTab.addEventListener("click", switchToGlobal);
    ui.friendsTab.addEventListener("click", switchToFriends);
    ui.friendSearch.addEventListener("input", () => renderFriendList(ui.friendSearch.value));

    ui.form.addEventListener("submit", (event) => {
      event.preventDefault();
      setError("");
      const body = ui.input.value.trim();
      if (!body || !state.socket?.connected) {
        return;
      }

      const payload = {
        channel: state.mode === "friends" ? "direct" : "global",
        recipientId: state.activeFriend?.id || null,
        body
      };
      ui.send.disabled = true;
      state.socket.emit("chat:send", payload, (result) => {
        ui.send.disabled = false;
        if (!result?.success) {
          setError(result?.message || "Message could not be sent.");
          return;
        }
        ui.input.value = "";
        ui.input.style.height = "auto";
        if (state.mode === "friends" && state.activeFriend) {
          state.socket.emit("chat:typing", { recipientId: state.activeFriend.id, typing: false });
        }
      });
    });

    ui.input.addEventListener("input", () => {
      ui.input.style.height = "auto";
      ui.input.style.height = `${Math.min(ui.input.scrollHeight, 120)}px`;
      if (state.mode !== "friends" || !state.activeFriend || !state.socket?.connected) {
        return;
      }
      state.socket.emit("chat:typing", { recipientId: state.activeFriend.id, typing: true });
      clearTimeout(state.typingTimer);
      state.typingTimer = setTimeout(() => {
        state.socket?.emit("chat:typing", { recipientId: state.activeFriend?.id, typing: false });
      }, 1200);
    });

    ui.input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
        event.preventDefault();
        ui.form.requestSubmit();
      }
    });
  }

  async function start() {
    bindEvents();
    updateModeUi();

    try {
      const [friendsPayload] = await Promise.all([
        apiRequest("/friends/list"),
        loadGlobalMessages()
      ]);
      state.friends = friendsPayload.data || [];
      renderFriendList();
      await connectSocket();
    } catch (error) {
      setConnectionStatus("Offline", false);
      setError(error.message || "Chat could not be started.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
