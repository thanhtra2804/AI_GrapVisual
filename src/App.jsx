import React, { useState, useEffect, useRef } from "react";
import {
  MousePointer2,
  Circle,
  Spline,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
  Code,
  Trash2,
  FolderOpen,
  ChevronRight,
  Hash,
  Edit3,
  Grid,
  List,
  Volume2,
  VolumeX,
  Hand,
  MessageCircle,
  Send,
  Bot,
  BookOpen,
  ChevronLeft,
  Headphones,
  Loader2,
} from "lucide-react";

// --- BỘ DỮ LIỆU C++ & THUẬT TOÁN ---
const ALGO_CODES = {
  BFS: {
    cpp: [
      "void BFS(int start) {",
      "  queue<int> q;",
      "  q.push(start);",
      "  visited[start] = true;",
      "  while (!q.empty()) {",
      "    int u = q.front();",
      "    q.pop();",
      "    for (int v : adj[u]) {",
      "      if (!visited[v]) {",
      "        visited[v] = true;",
      "        q.push(v);",
      "      }",
      "    }",
      "  }",
      "}",
    ],
    python: [
      "def BFS(start):",
      "  q = collections.deque([start])",
      "  visited[start] = True",
      "  while q:",
      "    u = q.popleft()",
      "    for v in adj[u]:",
      "      if not visited[v]:",
      "        visited[v] = True",
      "        q.append(v)",
    ],
  },
  DFS: {
    cpp: [
      "void DFS(int u) {",
      "  visited[u] = true;",
      "  // Đang xử lý u...",
      "  for (int v : adj[u]) {",
      "    if (!visited[v]) {",
      "      // Xét cạnh u - v",
      "      DFS(v);",
      "    }",
      "  }",
      "  // Hoàn tất nhánh của u",
      "}",
    ],
    python: [
      "def DFS(u):",
      "  visited[u] = True",
      "  # Đang xử lý u...",
      "  for v in adj[u]:",
      "    if not visited[v]:",
      "      # Xét cạnh u - v",
      "      DFS(v)",
      "  # Hoàn tất nhánh của u",
    ],
  },
  DIJKSTRA: {
    cpp: [
      "void Dijkstra(int start, int target) {",
      "  priority_queue<pair<int,int>> pq;",
      "  vector<int> dist(N, INF);",
      "  dist[start] = 0;",
      "  pq.push({0, start});",
      "  while (!pq.empty()) {",
      "    int u = pq.top().second;",
      "    int d = pq.top().first;",
      "    pq.pop();",
      "    if (d > dist[u]) continue;",
      "    if (u == target) break; // Tối ưu: Dừng sớm",
      "    for (auto edge : adj[u]) {",
      "      int v = edge.v, w = edge.weight;",
      "      if (dist[u] + w < dist[v]) {",
      "        dist[v] = dist[u] + w;",
      "        pq.push({dist[v], v});",
      "      }",
      "    }",
      "  }",
      "}",
    ],
    python: [
      "def Dijkstra(start, target):",
      "  pq = [(0, start)]",
      "  dist = {i: float('inf') for i in range(N)}",
      "  dist[start] = 0",
      "  while pq:",
      "    d, u = heapq.heappop(pq)",
      "    if d > dist[u]: continue",
      "    if u == target: break # Tối ưu: Dừng sớm",
      "    for v, w in adj[u]:",
      "      if dist[u] + w < dist[v]:",
      "        dist[v] = dist[u] + w",
      "        heapq.heappush(pq, (dist[v], v))",
    ],
  },
  BELLMAN_FORD: {
    cpp: [
      "void BellmanFord(int start) {",
      "  vector<int> dist(N, INF);",
      "  dist[start] = 0;",
      "  for (int i = 1; i <= N - 1; i++) {",
      "    for (auto edge : edges) {",
      "      int u = edge.u, v = edge.v, w = edge.weight;",
      "      if (dist[u] != INF && dist[u] + w < dist[v]) {",
      "        dist[v] = dist[u] + w;",
      "      }",
      "    }",
      "  }",
      "  // Kiểm tra chu trình âm",
      "  for (auto edge : edges) {",
      "    int u = edge.u, v = edge.v, w = edge.weight;",
      "    if (dist[u] != INF && dist[u] + w < dist[v]) {",
      "      return false; // Có chu trình âm",
      "    }",
      "  }",
      "  return true;",
      "}",
    ],
    python: [
      "def BellmanFord(start):",
      "  dist = {i: float('inf') for i in range(N)}",
      "  dist[start] = 0",
      "  for _ in range(N - 1):",
      "    for u, v, w in edges:",
      "      if dist[u] != float('inf') and dist[u] + w < dist[v]:",
      "        dist[v] = dist[u] + w",
      "  # Kiểm tra chu trình âm",
      "  for u, v, w in edges:",
      "    if dist[u] != float('inf') and dist[u] + w < dist[v]:",
      "      return False # Có chu trình âm",
      "  return True",
    ],
  },
  KRUSKAL: {
    cpp: [
      "void Kruskal() {",
      "  sort(edges.begin(), edges.end());",
      "  for (int i = 1; i <= N; i++) parent[i] = i;",
      "  ",
      "  for (auto edge : edges) {",
      "    if (find(edge.u) != find(edge.v)) {",
      "      union_sets(edge.u, edge.v);",
      "      mst_weight += edge.weight;",
      "      // Thêm cạnh vào cây khung",
      "    } else {",
      "      // Cạnh tạo chu trình, bỏ qua",
      "    }",
      "  }",
      "}",
    ],
    python: [
      "def Kruskal():",
      "  edges.sort(key=lambda x: x.weight)",
      "  parent = {i: i for i in range(N)}",
      "  ",
      "  for u, v, weight in edges:",
      "    if find(u) != find(v):",
      "      union_sets(u, v)",
      "      mst_weight += weight",
      "      # Thêm cạnh vào cây khung",
      "    else:",
      "      # Cạnh tạo chu trình, bỏ qua",
      "      pass",
    ],
  },
};

const PRESET_GRAPHS = {
  basic: {
    nodes: [
      { id: 0, x: 250, y: 150 },
      { id: 1, x: 150, y: 250 },
      { id: 2, x: 350, y: 250 },
      { id: 3, x: 100, y: 380 },
      { id: 4, x: 250, y: 380 },
      { id: 5, x: 400, y: 380 },
    ],
    edges: [
      { id: "0-1", u: 0, v: 1, w: 4 },
      { id: "0-2", u: 0, v: 2, w: 2 },
      { id: "1-3", u: 1, v: 3, w: 5 },
      { id: "1-4", u: 1, v: 4, w: 1 },
      { id: "2-4", u: 2, v: 4, w: 8 },
      { id: "2-5", u: 2, v: 5, w: 10 },
      { id: "4-5", u: 4, v: 5, w: 2 },
    ],
  },
  tree: {
    nodes: [
      { id: 0, x: 250, y: 80 },
      { id: 1, x: 150, y: 180 },
      { id: 2, x: 350, y: 180 },
      { id: 3, x: 100, y: 280 },
      { id: 4, x: 200, y: 280 },
      { id: 5, x: 300, y: 280 },
      { id: 6, x: 400, y: 280 },
    ],
    edges: [
      { id: "0-1", u: 0, v: 1, w: 5 },
      { id: "0-2", u: 0, v: 2, w: 3 },
      { id: "1-3", u: 1, v: 3, w: 2 },
      { id: "1-4", u: 1, v: 4, w: 8 },
      { id: "2-5", u: 2, v: 5, w: 7 },
      { id: "2-6", u: 2, v: 6, w: 4 },
    ],
  },
  complete: {
    nodes: [
      { id: 0, x: 250, y: 100 },
      { id: 1, x: 107, y: 146 },
      { id: 2, x: 52, y: 295 },
      { id: 3, x: 143, y: 420 },
      { id: 4, x: 357, y: 420 },
      { id: 5, x: 448, y: 295 },
      { id: 6, x: 393, y: 146 },
    ],
    edges: [
      { id: "0-1", u: 0, v: 1, w: 1 },
      { id: "0-2", u: 0, v: 2, w: 2 },
      { id: "0-3", u: 0, v: 3, w: 3 },
      { id: "0-4", u: 0, v: 4, w: 4 },
      { id: "0-5", u: 0, v: 5, w: 5 },
      { id: "0-6", u: 0, v: 6, w: 6 },
      { id: "1-2", u: 1, v: 2, w: 7 },
      { id: "1-3", u: 1, v: 3, w: 8 },
      { id: "1-4", u: 1, v: 4, w: 9 },
      { id: "1-5", u: 1, v: 5, w: 1 },
      { id: "1-6", u: 1, v: 6, w: 2 },
      { id: "2-3", u: 2, v: 3, w: 3 },
      { id: "2-4", u: 2, v: 4, w: 4 },
      { id: "2-5", u: 2, v: 5, w: 5 },
      { id: "2-6", u: 2, v: 6, w: 6 },
      { id: "3-4", u: 3, v: 4, w: 7 },
      { id: "3-5", u: 3, v: 5, w: 8 },
      { id: "3-6", u: 3, v: 6, w: 9 },
      { id: "4-5", u: 4, v: 5, w: 1 },
      { id: "4-6", u: 4, v: 6, w: 2 },
      { id: "5-6", u: 5, v: 6, w: 3 },
    ],
  },
};

const THEORY_PAGES = [
  {
    title: "BFS - Duyệt theo chiều rộng (Breadth-First Search)",
    content:
      "Thuật toán BFS khám phá đồ thị theo từng lớp (mức) từ đỉnh gốc. Nó lan rộng ra tất cả các đỉnh lân cận ở mức hiện tại trước khi chuyển xuống mức tiếp theo.\n\nCấu trúc dữ liệu sử dụng: Hàng đợi (Queue - FIFO) để lưu các đỉnh chờ duyệt.\n\nĐặc điểm & Ứng dụng:\n- Đảm bảo tìm được đường đi ngắn nhất (số lượng cạnh ít nhất) trên đồ thị không có trọng số.\n- Kiểm tra tính liên thông của đồ thị, tìm các thành phần liên thông.\n- Giải các bài toán tìm đường đi ngắn nhất trong ma trận, bản đồ lưới (ví dụ: đường đi qua mê cung).",
  },
  {
    title: "DFS - Duyệt theo chiều sâu (Depth-First Search)",
    content:
      "Thuật toán DFS khám phá đồ thị bằng cách đi xa nhất có thể dọc theo mỗi nhánh, cho tới khi chạm đường cùng thì mới quay lui lại (backtracking) và rẽ sang nhánh khác.\n\nCấu trúc dữ liệu sử dụng: Ngăn xếp (Stack - LIFO) hoặc sử dụng tính chất gọi Đệ quy của hàm.\n\nĐặc điểm & Ứng dụng:\n- Sử dụng ít bộ nhớ hơn BFS trong cấu trúc cây rộng.\n- Phù hợp để phát hiện chu trình (cycle detection) trong đồ thị.\n- Dùng trong bài toán sắp xếp Tô-pô (Topological Sort), kiểm tra tính liên thông mạnh, giải quyết các trò chơi như Sudoku, giải mê cung.",
  },
  {
    title: "Dijkstra - Đường đi ngắn nhất",
    content:
      "Thuật toán Dijkstra dùng để tìm đường đi ngắn nhất từ một đỉnh gốc tới tất cả các đỉnh còn lại trên đồ thị CÓ TRỌNG SỐ KHÔNG ÂM.\n\nCấu trúc dữ liệu sử dụng: Hàng đợi ưu tiên (Priority Queue / Min Heap).\n\nNguyên lý (Tham lam):\n- Luôn chọn đỉnh có khoảng cách tạm tính từ đỉnh gốc nhỏ nhất chưa được chốt.\n- Sau đó nới lỏng (relax) tất cả các cạnh xuất phát từ đỉnh vừa chọn.\n- Cập nhật lại khoảng cách cho các đỉnh kề nếu tìm thấy đường đi qua đỉnh hiện tại ngắn hơn.\n\nLưu ý quan trọng: Dijkstra sẽ tính toán sai nếu đồ thị tồn tại CẠNH CÓ TRỌNG SỐ ÂM.",
  },
  {
    title: "Bellman-Ford - Đường đi ngắn nhất (Trọng số âm)",
    content:
      "Thuật toán Bellman-Ford cũng giải quyết bài toán tìm đường đi ngắn nhất từ một đỉnh gốc, nhưng có khả năng xử lý được CẠNH TRỌNG SỐ ÂM.\n\nNguyên lý (Quy hoạch động):\n- Thực hiện lặp V-1 lần (với V là số lượng đỉnh).\n- Trong mỗi vòng lặp, thuật toán duyệt qua toàn bộ các cạnh của đồ thị và thử nới lỏng (relax) chúng.\n- Sau V-1 vòng, nếu đường đi ngắn nhất vẫn có thể tiếp tục được nới lỏng (giảm trọng số), tức là đồ thị chứa CHU TRÌNH TRỌNG SỐ ÂM.\n\nNhược điểm: Chạy chậm hơn Dijkstra khá nhiều (Độ phức tạp O(V*E) so với O((V+E)logV)), nên chỉ dùng khi bắt buộc phải xử lý trọng số âm.",
  },
  {
    title: "Kruskal - Cây khung nhỏ nhất (MST)",
    content:
      "Thuật toán Kruskal tìm Cây Khung Nhỏ Nhất (Minimum Spanning Tree) của một đồ thị vô hướng, liên thông, có trọng số. MST là tập hợp các cạnh kết nối toàn bộ đỉnh mà không tạo thành chu trình, có tổng trọng số nhỏ nhất.\n\nNguyên lý (Tham lam):\n- Bước 1: Sắp xếp tất cả các cạnh tăng dần theo trọng số.\n- Bước 2: Lần lượt lấy các cạnh từ nhỏ đến lớn.\n- Bước 3: Nếu cạnh đó kết nối hai tập hợp đỉnh khác nhau (nghĩa là không tạo ra chu trình), hãy đưa nó vào Cây khung.\n\nCấu trúc dữ liệu bổ trợ: Disjoint Set Union (DSU) dùng để gộp các tập hợp đỉnh và kiểm tra chu trình cực kỳ hiệu quả.",
  },
];

// --- CÁC HÀM TIỆN ÍCH PARSE ĐỒ THỊ TỪ TEXT ---
const generateCircularLayout = (
  nodeIds,
  centerX = 300,
  centerY = 250,
  radius = 160,
) => {
  return nodeIds.map((id, index) => {
    const angle = (index / nodeIds.length) * 2 * Math.PI - Math.PI / 2;
    return {
      id: parseInt(id),
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });
};

const parseGraphInput = (text, type) => {
  try {
    let parsedNodes = [];
    let parsedEdges = [];

    if (type === "MATRIX") {
      const rows = text
        .trim()
        .split("\n")
        .filter((l) => l.trim())
        .map((r) => r.trim().split(/\s+/).map(Number));
      const n = rows.length;
      if (n === 0 || rows.some((r) => r.length !== n))
        throw new Error("Ma trận không hợp lệ (phải là ma trận vuông).");

      const nodeIds = Array.from({ length: n }, (_, i) => i);
      parsedNodes = generateCircularLayout(nodeIds);

      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (rows[i][j] !== 0) {
            parsedEdges.push({ id: `${i}-${j}`, u: i, v: j, w: rows[i][j] });
          }
        }
      }
    } else if (type === "EDGE_LIST") {
      const lines = text
        .trim()
        .split("\n")
        .filter((l) => l.trim());
      const nodeSet = new Set();

      lines.forEach((line) => {
        const parts = line.trim().split(/\s+/).map(Number);
        if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          const u = parts[0];
          const v = parts[1];
          const w = parts.length >= 3 && !isNaN(parts[2]) ? parts[2] : 1;

          nodeSet.add(u);
          nodeSet.add(v);

          const minId = Math.min(u, v);
          const maxId = Math.max(u, v);
          if (!parsedEdges.some((e) => e.id === `${minId}-${maxId}`)) {
            parsedEdges.push({
              id: `${minId}-${maxId}`,
              u: minId,
              v: maxId,
              w: w,
            });
          }
        }
      });

      const uniqueNodes = Array.from(nodeSet).sort((a, b) => a - b);
      if (uniqueNodes.length === 0)
        throw new Error("Không tìm thấy đỉnh nào hợp lệ.");
      parsedNodes = generateCircularLayout(uniqueNodes);
    }

    return { nodes: parsedNodes, edges: parsedEdges, error: null };
  } catch (err) {
    return {
      nodes: [],
      edges: [],
      error: err.message || "Định dạng không hợp lệ.",
    };
  }
};

// --- CÁC HÀM GENERATOR THUẬT TOÁN (TẠO FRAMES) ---
const generateBFS = (nodes, edges, startId, endId = null) => {
  let frames = [];
  let visited = {};
  let q = [];
  let visitOrder = [];
  let adj = {};
  nodes.forEach((n) => (adj[n.id] = []));
  edges.forEach((e) => {
    adj[e.u].push({ to: e.v, edgeId: e.id });
    adj[e.v].push({ to: e.u, edgeId: e.id });
  });

  let nodeColors = {};
  let edgeColors = {};
  const hasTarget = endId !== null && endId !== undefined;
  let foundTarget = false;

  const buildResult = () => ({
    type: "ORDER",
    title: "Thứ tự duyệt BFS",
    startNode: startId,
    endNode: hasTarget ? endId : null,
    order: [...visitOrder],
    summary:
      visitOrder.length === 0
        ? hasTarget
          ? `BFS bắt đầu từ đỉnh ${startId} và sẽ dừng khi gặp đỉnh ${endId}.`
          : `BFS bắt đầu từ đỉnh ${startId}. Kết quả sẽ xuất hiện dần theo từng bước duyệt.`
        : foundTarget
          ? `BFS đã tìm thấy đỉnh đích ${endId}. Thứ tự duyệt hiện có ${visitOrder.length} đỉnh.`
          : hasTarget
            ? `BFS đang tìm đỉnh ${endId}. Đã ghi nhận ${visitOrder.length} đỉnh theo thứ tự duyệt.`
            : `BFS đã ghi nhận ${visitOrder.length} đỉnh theo thứ tự duyệt từ đỉnh ${startId}.`,
  });

  const pushFrame = (line, msg, sound = "STEP") => {
    frames.push({
      activeLine: line,
      nodeColors: { ...nodeColors },
      edgeColors: { ...edgeColors },
      queue: [...q],
      result: buildResult(),
      explanation: msg,
      sound,
    });
  };

  pushFrame(
    1,
    hasTarget
      ? `Bắt đầu thuật toán BFS từ đỉnh ${startId} và đặt đỉnh kết thúc là ${endId}. Khởi tạo hàng đợi q.`
      : `Bắt đầu thuật toán duyệt ưu tiên chiều rộng BFS từ đỉnh ${startId}. Khởi tạo hàng đợi q.`,
    "STEP",
  );
  q.push(startId);
  visited[startId] = true;
  nodeColors[startId] = "current";
  pushFrame(
    3,
    `Đưa đỉnh gốc ${startId} vào hàng đợi và đánh dấu là đã thăm.`,
    "UPDATE",
  );

  while (q.length > 0) {
    pushFrame(
      5,
      `Kiểm tra vòng lặp. Hàng đợi hiện tại đang có ${q.length} phần tử.`,
      "STEP",
    );
    let u = q.shift();
    visitOrder.push(u);
    nodeColors[u] = "visiting";
    pushFrame(
      6,
      `Lấy đỉnh ${u} ra khỏi hàng đợi để xử lý. Kết quả duyệt BFS ghi nhận thêm đỉnh ${u}.`,
      "VISIT",
    );

    if (hasTarget && u === endId) {
      foundTarget = true;
      nodeColors[u] = "path";
      pushFrame(
        15,
        `Đỉnh ${u} chính là đỉnh kết thúc cần tìm. BFS dừng sớm tại đây.`,
        "UPDATE",
      );
      break;
    }

    for (let neighbor of adj[u]) {
      let v = neighbor.to;
      pushFrame(8, `Bắt đầu xét đỉnh kề ${v} của đỉnh ${u}.`, "STEP");
      if (!visited[v]) {
        visited[v] = true;
        nodeColors[v] = "visited";
        edgeColors[neighbor.edgeId] = "traversed";
        q.push(v);
        pushFrame(
          10,
          `Đỉnh ${v} chưa được thăm. Ta sẽ đánh dấu nó là đã thăm và đưa vào hàng đợi để duyệt sau.`,
          "UPDATE",
        );
      } else {
        pushFrame(
          9,
          `Đỉnh ${v} đã được thăm trước đó nên ta sẽ bỏ qua.`,
          "IGNORE",
        );
      }
    }
    nodeColors[u] = "visited";
    pushFrame(14, `Hoàn tất việc duyệt tất cả các đỉnh kề của ${u}.`, "STEP");
  }

  if (hasTarget && !foundTarget) {
    pushFrame(
      15,
      `Hàng đợi đã rỗng nhưng chưa gặp đỉnh kết thúc ${endId}. Không tìm thấy đường đi tới đỉnh này.`,
      "IGNORE",
    );
  } else if (!foundTarget) {
    pushFrame(15, `Hàng đợi đã rỗng. Quá trình duyệt BFS kết thúc.`, "UPDATE");
  }

  return {
    frames,
    result: buildResult(),
  };
};

const generateDFS = (nodes, edges, startId, endId = null) => {
  let frames = [];
  let visited = {};
  let visitOrder = [];
  let callStack = [];
  let adj = {};
  nodes.forEach((n) => (adj[n.id] = []));
  edges.forEach((e) => {
    adj[e.u].push({ to: e.v, edgeId: e.id });
    adj[e.v].push({ to: e.u, edgeId: e.id });
  });

  let nodeColors = {};
  let edgeColors = {};
  const hasTarget = endId !== null && endId !== undefined;
  let foundTarget = false;

  const buildResult = () => ({
    type: "ORDER",
    title: "Thứ tự duyệt DFS",
    startNode: startId,
    endNode: hasTarget ? endId : null,
    order: [...visitOrder],
    summary:
      visitOrder.length === 0
        ? hasTarget
          ? `DFS bắt đầu từ đỉnh ${startId} và sẽ dừng khi gặp đỉnh ${endId}.`
          : `DFS bắt đầu từ đỉnh ${startId}. Kết quả sẽ xuất hiện dần theo từng lời gọi đệ quy.`
        : foundTarget
          ? `DFS đã tìm thấy đỉnh đích ${endId}. Thứ tự duyệt hiện có ${visitOrder.length} đỉnh.`
          : hasTarget
            ? `DFS đang tìm đỉnh ${endId}. Đã ghi nhận ${visitOrder.length} đỉnh theo thứ tự duyệt.`
            : `DFS đã ghi nhận ${visitOrder.length} đỉnh theo thứ tự duyệt từ đỉnh ${startId}.`,
  });

  const pushFrame = (line, msg, sound = "STEP") => {
    frames.push({
      activeLine: line,
      nodeColors: { ...nodeColors },
      edgeColors: { ...edgeColors },
      queue: [...callStack],
      queueLabel: "Ngăn xếp đệ quy DFS (Stack)",
      emptyQueueText: "Ngăn xếp rỗng",
      result: buildResult(),
      explanation: msg,
      sound,
    });
  };

  pushFrame(
    1,
    hasTarget
      ? `Bắt đầu DFS từ đỉnh ${startId} và đặt đỉnh kết thúc là ${endId}. Khởi tạo ngăn xếp đệ quy.`
      : `Bắt đầu hàm đệ quy duyệt ưu tiên chiều sâu DFS từ đỉnh ${startId}. Khởi tạo ngăn xếp đệ quy.`,
    "STEP",
  );

  const dfs = (u) => {
    callStack.push(u);
    visited[u] = true;
    visitOrder.push(u);
    nodeColors[u] = "visiting";
    pushFrame(
      2,
      `Đưa đỉnh ${u} vào ngăn xếp đệ quy, đánh dấu là đã thăm. Kết quả DFS ghi nhận đỉnh ${u}.`,
      "VISIT",
    );

    if (hasTarget && u === endId) {
      foundTarget = true;
      nodeColors[u] = "path";
      pushFrame(
        12,
        `Đỉnh ${u} chính là đỉnh kết thúc cần tìm. DFS dừng sớm tại đây.`,
        "UPDATE",
      );
      callStack.pop();
      pushFrame(
        11,
        `Rời khỏi hàm DFS(${u}). Lấy ${u} ra khỏi ngăn xếp đệ quy.`,
        "STEP",
      );
      return true;
    }

    for (let neighbor of adj[u]) {
      let v = neighbor.to;
      pushFrame(4, `Bây giờ, ta xét kề ${v} của đỉnh ${u}`, "STEP");
      if (!visited[v]) {
        edgeColors[neighbor.edgeId] = "traversed";
        pushFrame(
          6,
          `Vì đỉnh ${v} chưa được thăm, ta sẽ gọi đệ quy DFS đi sâu vào đỉnh ${v}.`,
          "UPDATE",
        );
        const found = dfs(v);
        if (found) {
          nodeColors[u] = "visited";
          pushFrame(
            10,
            `Đã tìm thấy đỉnh kết thúc ${endId} trong nhánh của ${v}. Quay lui và kết thúc DFS sớm.`,
            "UPDATE",
          );
          callStack.pop();
          pushFrame(
            11,
            `Rời khỏi hàm DFS(${u}). Lấy ${u} ra khỏi ngăn xếp đệ quy.`,
            "STEP",
          );
          return true;
        }
        nodeColors[u] = "visiting";
        pushFrame(
          10,
          `Đã duyệt xong nhánh của ${v}, giờ ta quay lui về lại đỉnh ${u}.`,
          "STEP",
        );
      } else {
        pushFrame(5, `Đỉnh ${v} đã được thăm trước đó, bỏ qua.`, "IGNORE");
      }
    }
    nodeColors[u] = "visited";
    pushFrame(11, `Đã duyệt xong mọi nhánh xuất phát từ đỉnh ${u}.`, "STEP");
    callStack.pop();
    pushFrame(
      11,
      `Rời khỏi hàm DFS của đỉnh ${u}. Lấy ${u} ra khỏi ngăn xếp đệ quy.`,
      "STEP",
    );
    return false;
  };

  const found = dfs(startId);
  if (hasTarget && !found) {
    pushFrame(
      12,
      `DFS đã duyệt hết thành phần liên thông nhưng không tìm thấy đỉnh kết thúc ${endId}.`,
      "IGNORE",
    );
  } else if (!hasTarget) {
    pushFrame(12, `Thuật toán DFS đã hoàn tất toàn bộ tiến trình.`, "UPDATE");
  }
  return {
    frames,
    result: buildResult(),
  };
};

const generateDijkstra = (nodes, edges, startId, endId) => {
  let frames = [];
  let dist = {};
  let adj = {};
  let parent = {};
  nodes.forEach((n) => {
    dist[n.id] = Infinity;
    adj[n.id] = [];
    parent[n.id] = null;
  });
  edges.forEach((e) => {
    adj[e.u].push({ to: e.v, w: e.w, edgeId: e.id });
    adj[e.v].push({ to: e.u, w: e.w, edgeId: e.id });
  });

  let nodeColors = {};
  let edgeColors = {};

  const buildResult = (summaryText) => ({
    type: "SUMMARY",
    title: "Dijkstra",
    summary: summaryText,
  });

  const pushFrame = (
    line,
    msg,
    sound = "STEP",
    summary = "Đang chạy thuật toán Dijkstra...",
  ) => {
    frames.push({
      activeLine: line,
      nodeColors: { ...nodeColors },
      edgeColors: { ...edgeColors },
      distances: { ...dist },
      explanation: msg,
      sound,
      result: buildResult(summary),
    });
  };

  pushFrame(
    3,
    "Đầu tiên, khởi tạo mảng khoảng cách dist. Đặt tất cả các đỉnh bằng Vô cực.",
    "STEP",
  );
  dist[startId] = 0;
  pushFrame(
    4,
    `Khoảng cách từ đỉnh gốc ${startId} đến chính nó luôn luôn là 0.`,
    "STEP",
  );

  let pq = [{ d: 0, u: startId }];
  pushFrame(5, `Đưa đỉnh gốc ${startId} vào hàng đợi ưu tiên.`, "UPDATE");

  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d);
    let curr = pq.shift();
    let u = curr.u;
    let d = curr.d;

    pushFrame(
      7,
      `Lấy đỉnh ${u} có khoảng cách ngắn nhất hiện tại là ${d} ra khỏi hàng đợi.`,
      "VISIT",
    );

    if (d > dist[u]) {
      pushFrame(
        10,
        `Khoảng cách ${d} lớn hơn khoảng cách hiện tại của đỉnh ${u}. Ta sẽ bỏ qua đỉnh này.`,
        "IGNORE",
      );
      continue;
    }

    if (endId !== null && endId !== undefined && u === endId) {
      nodeColors[u] = "visiting";
      pushFrame(
        11,
        `Tuyệt vời, đỉnh ${u} chính là đích đến. Đã tìm thấy đường đi ngắn nhất, dừng thuật toán sớm!`,
        "UPDATE",
      );
      break;
    }

    nodeColors[u] = "visiting";
    pushFrame(12, `Bắt đầu xét các đường đi đi qua đỉnh ${u}.`, "STEP");

    for (let neighbor of adj[u]) {
      let v = neighbor.to;
      let w = neighbor.w;
      edgeColors[neighbor.edgeId] = "visiting";
      pushFrame(
        13,
        `Kiểm tra thử đường đi từ ${u} đến đỉnh kề ${v} với trọng số cạnh là ${w}.`,
        "STEP",
      );

      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        parent[v] = { u, edgeId: neighbor.edgeId };
        pq.push({ d: dist[v], u: v });
        edgeColors[neighbor.edgeId] = "traversed";
        nodeColors[v] = "updated"; // highlight update
        pushFrame(
          15,
          `Tuyệt! Tìm thấy đường đi ngắn hơn đến ${v}. Cập nhật lại khoảng cách cho đỉnh ${v} thành ${dist[v]}.`,
          "UPDATE",
        );
        nodeColors[v] = "idle"; // reset sau khi highlight
      } else {
        pushFrame(
          14,
          `Đường đi qua đỉnh ${u} không ngắn hơn đường đi hiện tại đến ${v}. Ta giữ nguyên không cập nhật.`,
          "IGNORE",
        );
        edgeColors[neighbor.edgeId] = "ignored";
      }
    }
    nodeColors[u] = "visited";
    pushFrame(18, `Hoàn tất việc nới lỏng các cạnh đi từ đỉnh ${u}.`, "STEP");
  }

  if (endId !== null && endId !== undefined) {
    if (dist[endId] !== Infinity) {
      let pathNodes = [];
      let pathEdges = [];
      let curr = endId;
      while (curr !== null && curr !== startId) {
        pathNodes.push(curr);
        let p = parent[curr];
        if (p) {
          pathEdges.push(p.edgeId);
          curr = p.u;
        } else {
          break;
        }
      }
      pathNodes.push(startId);

      pathNodes.forEach((n) => (nodeColors[n] = "path"));
      pathEdges.forEach((e) => (edgeColors[e] = "path"));
      let summaryText = `Đường đi ngắn nhất từ ${startId} đến ${endId} có tổng trọng số là ${dist[endId]}.`;
      pushFrame(20, summaryText, "UPDATE", summaryText);
    } else {
      let summaryText = `Rất tiếc, không tồn tại đường đi từ đỉnh ${startId} đến đỉnh ${endId}.`;
      pushFrame(20, summaryText, "IGNORE", summaryText);
    }
  } else {
    let summaryText =
      "Hàng đợi đã rỗng. Thuật toán Dijkstra tìm đường đi ngắn nhất đến mọi đỉnh đã hoàn tất.";
    pushFrame(20, summaryText, "UPDATE", summaryText);
  }

  return { frames };
};

const generateBellmanFord = (nodes, edges, startId) => {
  let frames = [];
  let dist = {};
  nodes.forEach((n) => (dist[n.id] = Infinity));
  let nodeColors = {};
  let edgeColors = {};

  const buildResult = (summaryText) => ({
    type: "SUMMARY",
    title: "Bellman-Ford",
    summary: summaryText,
  });

  const pushFrame = (
    line,
    msg,
    sound = "STEP",
    summary = "Đang chạy thuật toán Bellman-Ford...",
  ) => {
    frames.push({
      activeLine: line,
      nodeColors: { ...nodeColors },
      edgeColors: { ...edgeColors },
      distances: { ...dist },
      explanation: msg,
      sound,
      result: buildResult(summary),
    });
  };

  pushFrame(
    2,
    "Khởi tạo mảng khoảng cách dist. Gán giá trị Vô cực cho toàn bộ các đỉnh ban đầu.",
  );
  dist[startId] = 0;
  nodeColors[startId] = "updated";
  pushFrame(
    3,
    `Khoảng cách từ đỉnh gốc ${startId} đến chính nó là 0.`,
    "UPDATE",
  );
  nodeColors[startId] = "idle";

  let V = nodes.length;
  let hasNegativeCycle = false;

  for (let i = 1; i <= V - 1; i++) {
    pushFrame(
      4,
      `Bắt đầu vòng lặp thứ ${i}. Ta sẽ lặp tối đa V trừ 1 lần.`,
      "STEP",
    );
    let anyUpdate = false;

    for (let edge of edges) {
      let { u, v, w } = edge;
      // Xóa màu các cạnh trước đó để tập trung vào cạnh đang xét
      edgeColors = {};
      edgeColors[edge.id] = "visiting";
      pushFrame(
        5,
        `Đang xét cạnh nối đỉnh ${u} và đỉnh ${v} với trọng số ${w}.`,
        "STEP",
      );

      let updated = false;

      // Do đồ thị mô phỏng không có hướng, ta xét cả 2 chiều u -> v và v -> u
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        nodeColors[v] = "updated";
        edgeColors[edge.id] = "traversed";
        pushFrame(
          8,
          `Tìm thấy đường ngắn hơn đến đỉnh ${v} đi qua ${u}. Cập nhật lại khoảng cách cho đỉnh ${v}.`,
          "UPDATE",
        );
        nodeColors[v] = "idle";
        updated = true;
        anyUpdate = true;
      }

      if (dist[v] !== Infinity && dist[v] + w < dist[u]) {
        dist[u] = dist[v] + w;
        nodeColors[u] = "updated";
        edgeColors[edge.id] = "traversed";
        pushFrame(
          8,
          `Tìm thấy đường ngắn hơn đến đỉnh ${u} đi qua ${v}. Cập nhật lại khoảng cách cho đỉnh ${u}.`,
          "UPDATE",
        );
        nodeColors[u] = "idle";
        updated = true;
        anyUpdate = true;
      }

      if (!updated) {
        edgeColors[edge.id] = "ignored";
        pushFrame(
          7,
          `Khoảng cách không được cải thiện qua cạnh này, ta giữ nguyên.`,
          "IGNORE",
        );
      }
    }

    if (!anyUpdate) {
      edgeColors = {};
      pushFrame(
        10,
        `Trong vòng lặp thứ ${i} không có đỉnh nào được cập nhật. Thuật toán có thể dừng lại sớm.`,
        "STEP",
      );
      break;
    }
  }

  edgeColors = {};
  pushFrame(
    12,
    `Kết thúc lặp. Bây giờ ta sẽ kiểm tra xem đồ thị có chu trình trọng số âm hay không.`,
    "STEP",
  );

  for (let edge of edges) {
    let { u, v, w } = edge;
    edgeColors = {};
    edgeColors[edge.id] = "visiting";
    pushFrame(
      13,
      `Kiểm tra lại cạnh giữa ${u} và ${v} xem khoảng cách có còn giảm được nữa không.`,
      "STEP",
    );

    if (
      (dist[u] !== Infinity && dist[u] + w < dist[v]) ||
      (dist[v] !== Infinity && dist[v] + w < dist[u])
    ) {
      hasNegativeCycle = true;
      edgeColors[edge.id] = "ignored";
      pushFrame(
        16,
        `Cảnh báo! Khoảng cách vẫn có thể giảm. Phát hiện chu trình trọng số âm trong đồ thị.`,
        "IGNORE",
        "Đồ thị chứa chu trình âm!",
      );
      break;
    }
  }

  let summaryText = hasNegativeCycle
    ? "Đã phát hiện chu trình trọng số âm trong đồ thị! Không thể tìm đường đi ngắn nhất chính xác."
    : `Hoàn tất thuật toán. Đã tìm được mảng khoảng cách ngắn nhất từ đỉnh ${startId}.`;

  nodes.forEach(
    (n) => (nodeColors[n.id] = dist[n.id] === Infinity ? "idle" : "visited"),
  );
  frames.push({
    activeLine: hasNegativeCycle ? 16 : 19,
    nodeColors: { ...nodeColors },
    edgeColors: {},
    distances: { ...dist },
    explanation: summaryText,
    sound: "UPDATE",
    result: buildResult(summaryText),
  });

  return { frames, result: buildResult(summaryText) };
};

const generateKruskal = (nodes, edges) => {
  let frames = [];
  let sortedEdges = [...edges].sort((a, b) => a.w - b.w);
  let parent = {};
  nodes.forEach((n) => (parent[n.id] = n.id));

  const find = (i) => {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i]));
  };

  const union = (i, j) => {
    let rootI = find(i);
    let rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      return true;
    }
    return false;
  };

  let edgeColors = {};
  let nodeColors = {};
  let mstWeight = 0;
  let mstEdges = [];

  const buildResult = () => ({
    type: "MST",
    title: "Cây khung nhỏ nhất Kruskal",
    edges: mstEdges.map((edge) => ({ ...edge })),
    totalWeight: mstWeight,
    summary:
      mstEdges.length === 0
        ? "Kruskal đang xét các cạnh theo trọng số tăng dần. Cạnh được chọn sẽ xuất hiện dần ở đây."
        : `Kruskal đã chọn ${mstEdges.length} cạnh vào MST, tổng trọng số hiện tại là ${mstWeight}.`,
  });

  const pushFrame = (line, msg, sound = "STEP") => {
    frames.push({
      activeLine: line,
      edgeColors: { ...edgeColors },
      nodeColors: { ...nodeColors },
      result: buildResult(),
      explanation: msg,
      sound,
    });
  };

  pushFrame(
    2,
    "Bước 1: Sắp xếp tất cả các cạnh của đồ thị theo thứ tự trọng số tăng dần.",
    "STEP",
  );
  pushFrame(
    3,
    "Khởi tạo cấu trúc Disjoint Set để theo dõi các chu trình. Mỗi đỉnh hiện tại là một tập hợp riêng biệt.",
    "STEP",
  );

  for (let e of sortedEdges) {
    edgeColors[e.id] = "visiting";
    pushFrame(
      5,
      `Lấy ra cạnh có trọng số nhỏ nhất tiếp theo: nối ${e.u} và ${e.v} với trọng số ${e.w}.`,
      "VISIT",
    );

    if (find(e.u) !== find(e.v)) {
      union(e.u, e.v);
      mstWeight += e.w;
      mstEdges.push({ u: e.u, v: e.v, w: e.w });
      edgeColors[e.id] = "mst";
      nodeColors[e.u] = "mst";
      nodeColors[e.v] = "mst";
      pushFrame(
        7,
        `Cạnh nối ${e.u} và ${e.v} nối 2 tập hợp đỉnh khác nhau nên không tạo ra chu trình. Thêm cạnh này vào cây khung. Tổng trọng số hiện tại là ${mstWeight}`,
        "UPDATE",
      );
    } else {
      edgeColors[e.id] = "ignored";
      pushFrame(
        10,
        `Hai đỉnh ${e.u} và ${e.v} đã nằm trong cùng một tập hợp rồi. Thêm cạnh này sẽ tạo thành vòng lặp, nên ta bỏ qua.`,
        "IGNORE",
      );
    }
  }
  pushFrame(
    14,
    `Đã duyệt qua toàn bộ danh sách cạnh. Thuật toán Kruskal hoàn tất với tổng trọng số cây khung nhỏ nhất là ${mstWeight}.`,
    "UPDATE",
  );
  return {
    frames,
    result: buildResult(),
  };
};

// --- HÀM GỌI API AI GROQ TEXT ---
const callGeminiAPI = async (history, promptText, appContextText = "") => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    return "Chưa cấu hình Groq API key. Hãy tạo file .env.local và thêm VITE_GROQ_API_KEY=API_KEY_CUA_BAN, sau đó chạy lại npm run dev.";
  }

  const models = ["llama-3.1-8b-instant"];

  const systemPrompt =
    "Bạn là trợ lý AI thông minh cho ứng dụng GraphVisualizer. Ứng dụng này giúp sinh viên trực quan hóa các thuật toán đồ thị như BFS, DFS, Dijkstra, Bellman-Ford, Kruskal. Luôn ưu tiên dùng phần NGỮ CẢNH BÀI ĐANG LÀM được cung cấp trong prompt: thuật toán đang chọn, đỉnh bắt đầu/kết thúc, danh sách cạnh và trọng số, bước mô phỏng hiện tại, kết quả hiện tại. Nếu người dùng hỏi 'tại sao không đi đường A->B->C', hãy dựa trên cạnh/trọng số hiện có để so sánh tổng trọng số đường họ nêu với kết quả thuật toán. Không trả lời chung chung kiểu cần biết bạn đang chạy thuật toán nào nếu ngữ cảnh đã có. Trả lời ngắn gọn, thân thiện, dễ hiểu bằng tiếng Việt.";

  const historyContext = history
    .slice(-8)
    .map((msg) => `${msg.role === "user" ? "Người dùng" : "AI"}: ${msg.text}`)
    .join("\n");

  const contextBlock = appContextText
    ? `NGỮ CẢNH BÀI ĐANG LÀM TRONG APP:\n${appContextText}\n`
    : "";

  const fullPrompt = `${contextBlock}${historyContext ? `\nLỊCH SỬ CHAT GẦN ĐÂY:\n${historyContext}\n` : ""}\nCÂU HỎI HIỆN TẠI CỦA NGƯỜI DÙNG:\n${promptText}`;

  try {
    const attemptsPerModel = 3;
    const baseDelayMs = 300; // base for exponential backoff
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    for (const model of models) {
      const url = "https://api.groq.com/openai/v1/chat/completions";
      for (let attempt = 1; attempt <= attemptsPerModel; attempt++) {
        const payload = {
          model: model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: fullPrompt },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          console.info(`Groq model ${model} succeeded (attempt ${attempt})`);
          return (
            data?.choices?.[0]?.message?.content ||
            "Xin lỗi, tôi chưa thể trả lời câu hỏi này lúc này."
          );
        }

        console.error(
          `Groq API error (model ${model}):`,
          response.status,
          data,
        );
        const errorMessage = data?.error?.message || "Không rõ lỗi.";

        // Retry on temporary server-side errors
        if (
          (response.status === 503 ||
            response.status === 429 ||
            response.status >= 500) &&
          attempt < attemptsPerModel
        ) {
          const jitter = Math.floor(Math.random() * 100);
          const delay = Math.pow(2, attempt) * baseDelayMs + jitter;
          console.warn(
            `Model ${model} temporary error (status ${response.status}). Retrying in ${delay}ms (attempt ${attempt})`,
          );
          await sleep(delay);
          continue;
        }

        // Non-retriable errors
        if (response.status === 400) {
          return `Groq API báo lỗi 400: ${errorMessage}`;
        }

        if (response.status === 401) {
          return "Groq API key không hợp lệ. Hãy kiểm tra VITE_GROQ_API_KEY trong .env.local.";
        }

        if (response.status === 429) {
          console.warn(`Rate limited on model ${model}.`);
          break;
        }

        console.warn(
          `Model ${model} returned status ${response.status}, trying next model if available.`,
        );
        break;
      }

      console.info(
        `Switching to next model after exhausting attempts for ${model}.`,
      );
    }

    return "Tất cả model đang bận/không khả dụng. Hãy thử lại sau.";
  } catch (error) {
    console.error("Groq network error:", error);
    return "Không kết nối được tới Groq API. Hãy kiểm tra mạng, API key, hoặc mở F12 → Console/Network để xem lỗi chi tiết.";
  }
};

// --- HÀM GỌI API AI GEMINI TTS (CHUYỂN VĂN BẢN THÀNH GIỌNG NÓI) ---
const createWavBlobFromPcm = (base64String, sampleRate) => {
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const buffer = new ArrayBuffer(44 + len);
  const view = new DataView(buffer);

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + len, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM Format
  view.setUint16(22, 1, true); // Mono channel
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // ByteRate
  view.setUint16(32, 2, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample
  writeString(view, 36, "data");
  view.setUint32(40, len, true);

  new Uint8Array(buffer, 44).set(bytes);
  return new Blob([buffer], { type: "audio/wav" });
};

// --- THÀNH PHẦN GIAO DIỆN CHÍNH (APP) ---
function cleanAIText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\$(.*?)\$/g, "$1")
    .replace(/`/g, "")
    .replace(/\\\((.*?)\\\)/g, "$1")
    .replace(/\\\[(.*?)\\\]/g, "$1");
}

const getNextAvailableNodeId = (nodeList) => {
  const usedIds = new Set(nodeList.map((node) => Number(node.id)));
  let nextId = 0;
  while (usedIds.has(nextId)) nextId += 1;
  return nextId;
};

const normalizeEdge = (u, v, w = 1) => {
  const a = Math.min(Number(u), Number(v));
  const b = Math.max(Number(u), Number(v));
  return { id: `${a}-${b}`, u: a, v: b, w };
};

const findShortestPathForAI = (nodeList, edgeList, startId, endId) => {
  if (
    startId === null ||
    startId === undefined ||
    endId === null ||
    endId === undefined
  )
    return null;
  if (
    !nodeList.some((node) => node.id === startId) ||
    !nodeList.some((node) => node.id === endId)
  )
    return null;
  if (edgeList.some((edge) => Number(edge.w) < 0)) {
    return {
      error:
        "Đồ thị có cạnh âm nên Dijkstra không phù hợp để kết luận đường đi ngắn nhất.",
    };
  }

  const dist = {};
  const parent = {};
  const adj = {};
  nodeList.forEach((node) => {
    dist[node.id] = Infinity;
    parent[node.id] = null;
    adj[node.id] = [];
  });

  edgeList.forEach((edge) => {
    const weight = Number(edge.w);
    adj[edge.u]?.push({ to: edge.v, weight });
    adj[edge.v]?.push({ to: edge.u, weight });
  });

  dist[startId] = 0;
  const pq = [{ node: startId, dist: 0 }];

  while (pq.length > 0) {
    pq.sort((a, b) => a.dist - b.dist);
    const current = pq.shift();
    if (!current || current.dist > dist[current.node]) continue;
    if (current.node === endId) break;

    for (const next of adj[current.node] || []) {
      const candidate = dist[current.node] + next.weight;
      if (candidate < dist[next.to]) {
        dist[next.to] = candidate;
        parent[next.to] = current.node;
        pq.push({ node: next.to, dist: candidate });
      }
    }
  }

  if (dist[endId] === Infinity) {
    return { distance: Infinity, path: [], distances: dist };
  }

  const path = [];
  let cur = endId;
  while (cur !== null && cur !== undefined) {
    path.unshift(cur);
    if (cur === startId) break;
    cur = parent[cur];
  }

  return { distance: dist[endId], path, distances: dist };
};

const formatAlgorithmResultForAI = (result) => {
  if (!result) return "Chưa có kết quả thuật toán ở bước hiện tại.";

  const lines = [result.summary || "Không có tóm tắt kết quả."];

  if (result.type === "ORDER" && Array.isArray(result.order)) {
    lines.push(
      `Thứ tự duyệt hiện tại: ${result.order.length ? result.order.join(" -> ") : "chưa có đỉnh nào"}.`,
    );
  }

  if (result.type === "MST" && Array.isArray(result.edges)) {
    lines.push(
      `MST hiện có các cạnh: ${result.edges.length ? result.edges.map((edge) => `${edge.u}-${edge.v}(w=${edge.w})`).join(", ") : "chưa chọn cạnh nào"}. Tổng trọng số: ${result.totalWeight}.`,
    );
  }

  return lines.join(" ");
};

const buildGraphContextForAI = ({
  nodeList,
  edgeList,
  selectedAlgo,
  selectedStartNode,
  selectedEndNode,
  frameList,
  stepIndex,
  isPlayingNow,
  currentMode,
}) => {
  const sortedNodes = [...nodeList].sort((a, b) => a.id - b.id);
  const sortedEdges = [...edgeList].sort((a, b) => a.u - b.u || a.v - b.v);
  const hasNode = (id) =>
    id !== null && id !== undefined && nodeList.some((node) => node.id === id);
  const resolvedStart =
    selectedAlgo !== "KRUSKAL"
      ? hasNode(selectedStartNode)
        ? selectedStartNode
        : sortedNodes[0]?.id
      : null;
  const resolvedEnd =
    ["BFS", "DFS", "DIJKSTRA"].includes(selectedAlgo) &&
    hasNode(selectedEndNode)
      ? selectedEndNode
      : null;
  const currentFrame = frameList?.[stepIndex] || null;
  const lines = [];

  lines.push(`Thuật toán đang chọn: ${selectedAlgo}.`);
  if (resolvedStart !== null && resolvedStart !== undefined)
    lines.push(`Đỉnh bắt đầu đang chọn: ${resolvedStart}.`);
  if (["BFS", "DFS", "DIJKSTRA"].includes(selectedAlgo)) {
    lines.push(
      `Đỉnh kết thúc đang chọn: ${resolvedEnd !== null && resolvedEnd !== undefined ? resolvedEnd : "không chọn, đang duyệt/tính tới tất cả đỉnh"}.`,
    );
  }
  lines.push(`Chế độ công cụ hiện tại: ${currentMode}.`);
  lines.push(
    `Các đỉnh hiện có: ${sortedNodes.length ? sortedNodes.map((node) => node.id).join(", ") : "không có đỉnh nào"}.`,
  );
  lines.push(
    `Các cạnh vô hướng kèm trọng số: ${sortedEdges.length ? sortedEdges.map((edge) => `${edge.u}-${edge.v}(w=${edge.w})`).join(", ") : "không có cạnh nào"}.`,
  );

  if (currentFrame) {
    lines.push(
      `Trạng thái mô phỏng: ${isPlayingNow ? "đang phát" : "đang tạm dừng/đã dừng"}, bước ${stepIndex + 1}/${frameList.length}.`,
    );
    lines.push(
      `Giải thích bước hiện tại: ${currentFrame.explanation || "không có"}.`,
    );
    lines.push(
      `Kết quả ở bước hiện tại: ${formatAlgorithmResultForAI(currentFrame.result)}.`,
    );
    if (currentFrame.distances) {
      const distText = Object.entries(currentFrame.distances)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([id, d]) => `${id}:${d === Infinity ? "∞" : d}`)
        .join(", ");
      lines.push(`Mảng khoảng cách đang hiển thị: ${distText}.`);
    }
  } else {
    lines.push("Trạng thái mô phỏng: chưa chạy thuật toán trong lần hiện tại.");
  }

  if (
    selectedAlgo === "DIJKSTRA" &&
    resolvedStart !== null &&
    resolvedStart !== undefined &&
    resolvedEnd !== null &&
    resolvedEnd !== undefined
  ) {
    const shortest = findShortestPathForAI(
      nodeList,
      edgeList,
      resolvedStart,
      resolvedEnd,
    );
    if (shortest?.error) {
      lines.push(`Gợi ý kiểm tra Dijkstra: ${shortest.error}`);
    } else if (shortest?.distance === Infinity) {
      lines.push(
        `Kết quả Dijkstra tính theo đồ thị hiện tại: không có đường đi từ ${resolvedStart} tới ${resolvedEnd}.`,
      );
    } else if (shortest) {
      lines.push(
        `Kết quả Dijkstra tính theo đồ thị hiện tại: đường ngắn nhất từ ${resolvedStart} tới ${resolvedEnd} là ${shortest.path.join(" -> ")} với tổng trọng số ${shortest.distance}.`,
      );
      lines.push(
        "Nếu người dùng nêu một đường đi khác, hãy cộng trọng số từng cạnh trên đường đó rồi so sánh với tổng trọng số ngắn nhất này.",
      );
    }
  }

  return lines.join("\n");
};
export default function App() {
  // State đồ thị
  const [nodes, setNodes] = useState(PRESET_GRAPHS.basic.nodes);
  const [edges, setEdges] = useState(PRESET_GRAPHS.basic.edges);

  // State công cụ & tương tác
  const [mode, setMode] = useState("PAN"); // PAN, MOVE, ADD_NODE, ADD_EDGE, EDIT_WEIGHT, DELETE_NODE, DELETE_EDGE
  const [draggingNode, setDraggingNode] = useState(null);
  const [edgeStartNode, setEdgeStartNode] = useState(null);
  const [tempMousePos, setTempMousePos] = useState(null);

  // State Panning (Kéo nền)
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  // State thuật toán & Player
  const [algo, setAlgo] = useState("BFS");
  const [frames, setFrames] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [showCode, setShowCode] = useState(true);

  // State tùy chọn đỉnh bắt đầu / kết thúc
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);

  // State Modal Nhập đồ thị
  const [showInputModal, setShowInputModal] = useState(false);
  const [inputType, setInputType] = useState("EDGE_LIST");
  const [inputText, setInputText] = useState("");
  const [inputError, setInputError] = useState("");

  // State thêm/sửa trọng số cạnh
  const [editingEdge, setEditingEdge] = useState(null);
  const [pendingEdge, setPendingEdge] = useState(null);
  const [edgeWeightInput, setEdgeWeightInput] = useState("");
  const [edgeWeightError, setEdgeWeightError] = useState("");

  // State sửa đỉnh
  const [editingNode, setEditingNode] = useState(null);
  const [nodeIdInput, setNodeIdInput] = useState("");
  const [nodeIdError, setNodeIdError] = useState("");

  // State Ngôn ngữ & Lý thuyết
  const [codeLang, setCodeLang] = useState("cpp");
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [theoryPage, setTheoryPage] = useState(0);

  // State Chatbot AI
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "ai",
      text: "Chào bạn! 👋\nTôi là trợ lý AI của GraphVisualizer. Bạn cần tìm hiểu thuật toán nào hay gặp khó khăn gì khi dùng ứng dụng không?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // State AI Giảng Bài (TTS)
  const [isAIVoiceEnabled, setIsAIVoiceEnabled] = useState(false);
  const [speechStatus, setSpeechStatus] = useState("IDLE"); // IDLE, FETCHING, SPEAKING, DONE
  const [speechError, setSpeechError] = useState("");
  // Chỉ dùng một nguồn giọng duy nhất: SpeechSynthesis của trình duyệt.
  // Không gọi Gemini TTS nên không bị lỗi quota và không bị đổi qua lại giữa 2 loại giọng.
  const browserVoiceRef = useRef(null);

  // State & Ref Âm thanh (Beep Sounds)
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const audioCtx = useRef(null);
  const svgRef = useRef(null);

  // Khởi tạo Audio Context cho tiếng beep cơ bản
  const initAudio = () => {
    if (!isSoundEnabled) return;
    if (!audioCtx.current) {
      audioCtx.current = new (
        window.AudioContext || window.webkitAudioContext
      )();
    }
    if (audioCtx.current.state === "suspended") {
      audioCtx.current.resume();
    }
  };

  const playSound = (type) => {
    if (!isSoundEnabled || !audioCtx.current) return;
    const osc = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.current.destination);
    const now = audioCtx.current.currentTime;

    if (type === "VISIT") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === "UPDATE") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.setValueAtTime(1200, now + 0.05);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "IGNORE") {
      osc.type = "square";
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      gainNode.gain.setValueAtTime(0.02, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, now);
      gainNode.gain.setValueAtTime(0.02, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  };

  // --- LOGIC CHẠY GIỌNG NÓI AI ỔN ĐỊNH BẰNG TRÌNH DUYỆT ---
  // Lưu ý: phần AI chat vẫn dùng Gemini Text API ở hàm callGeminiAPI.
  // Riêng AI giảng bài chỉ dùng SpeechSynthesis để tránh lỗi quota TTS.

  const waitForBrowserVoices = () => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve([]);
        return;
      }

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
        return;
      }

      const timeout = setTimeout(() => {
        resolve(window.speechSynthesis.getVoices());
      }, 500);

      window.speechSynthesis.onvoiceschanged = () => {
        clearTimeout(timeout);
        resolve(window.speechSynthesis.getVoices());
      };
    });
  };

  const getStableBrowserVoice = async () => {
    const voices = await waitForBrowserVoices();
    if (browserVoiceRef.current) {
      const sameVoice = voices.find(
        (v) => v.voiceURI === browserVoiceRef.current.voiceURI,
      );
      if (sameVoice) return sameVoice;
    }

    const selectedVoice =
      voices.find((v) => v.lang?.toLowerCase() === "vi-vn") ||
      voices.find((v) => v.lang?.toLowerCase().startsWith("vi")) ||
      voices.find((v) => v.name?.toLowerCase().includes("vietnam")) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ||
      voices[0] ||
      null;

    browserVoiceRef.current = selectedVoice;
    return selectedVoice;
  };

  const speakWithVoiceRSS = async (text) => {
    const apiKey = import.meta.env.VITE_VOICE_RSS_API_KEY;
    if (!apiKey) {
      throw new Error("VoiceRSS API key chưa được cấu hình.");
    }

    // VoiceRSS TTS API - Tiếng Việt chất lượng cao
    const url = "https://api.voicerss.org/";

    const params = new URLSearchParams({
      key: apiKey,
      src: text,
      hl: "vi-vn", // Tiếng Việt
      c: "MP3", // Format MP3
      f: "44khz_16bit_stereo", // Chất lượng cao
    });

    return new Promise((resolve) => {
      const audio = new Audio(`${url}?${params.toString()}`);

      audio.onended = () => {
        resolve();
      };
      audio.onerror = (err) => {
        console.error("Audio playback error:", err);
        resolve();
      };

      audio.play().catch((err) => {
        console.error("Play error:", err);
        resolve();
      });
    });
  };

  // Effect: Khi chuyển bước, nếu bật AI Giảng thì đọc Explanation bằng VoiceRSS TTS
  useEffect(() => {
    if (!isAIVoiceEnabled || frames.length === 0 || !frames[currentStep])
      return;

    let isCancelled = false;
    const frame = frames[currentStep];

    const speakFrame = async () => {
      setSpeechStatus("FETCHING");
      setSpeechError("");
      try {
        if (!isCancelled) {
          setSpeechStatus("SPEAKING");
          await speakWithVoiceRSS(frame.explanation);
        }

        if (!isCancelled) {
          setSpeechStatus("DONE");
        }
      } catch (e) {
        console.error("AI Voice Error:", e);
        if (!isCancelled) {
          setIsPlaying(false);
          setSpeechStatus("IDLE");
          setSpeechError(
            `Lỗi giọng nói: ${e.message}. Hãy kiểm tra VoiceRSS API key trong .env.local.`,
          );
        }
      }
    };

    speakFrame();

    return () => {
      isCancelled = true;
    };
  }, [currentStep, isAIVoiceEnabled, frames]);

  // Huỷ trạng thái chạy khi người dùng thay đổi đồ thị
  const resetRunState = () => {
    setIsPlaying(false);
    setFrames([]);
    setCurrentStep(0);
    setSpeechStatus("IDLE");
    setSpeechError("");
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  const handleApplyInput = () => {
    const {
      nodes: newNodes,
      edges: newEdges,
      error,
    } = parseGraphInput(inputText, inputType);
    if (error) {
      setInputError(error);
    } else {
      setNodes(newNodes);
      setEdges(newEdges);
      setPan({ x: 0, y: 0 });
      setShowInputModal(false);
      setInputError("");
      resetRunState();
    }
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isBotTyping) return;

    const userMsg = { role: "user", text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsBotTyping(true);

    const currentAppContext = buildGraphContextForAI({
      nodeList: nodes,
      edgeList: edges,
      selectedAlgo: algo,
      selectedStartNode: startNode,
      selectedEndNode: endNode,
      frameList: frames,
      stepIndex: currentStep,
      isPlayingNow: isPlaying,
      currentMode: mode,
    });

    const aiResponseText = await callGeminiAPI(
      chatMessages,
      userMsg.text,
      currentAppContext,
    );

    setChatMessages((prev) => [...prev, { role: "ai", text: aiResponseText }]);
    setIsBotTyping(false);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isBotTyping, isChatOpen]);

  // Vòng lặp phát animation (Cập nhật để chờ AI Giảng xong)
  useEffect(() => {
    let timer;
    if (isPlaying && frames.length > 0) {
      if (currentStep < frames.length - 1) {
        // Nếu đang bật Loa AI, chờ đến khi giảng xong (trạng thái DONE) mới đi tiếp
        if (isAIVoiceEnabled) {
          if (speechStatus === "DONE") {
            timer = setTimeout(() => {
              setCurrentStep((s) => s + 1);
            }, 500); // Tạm dừng nhẹ giữa 2 câu
          }
        } else {
          // Nếu tắt Loa AI, chạy theo tốc độ Speed Slider
          timer = setTimeout(
            () => {
              setCurrentStep((s) => {
                const nextStep = s + 1;
                if (frames[nextStep]) playSound(frames[nextStep].sound);
                return nextStep;
              });
            },
            1200 - speed * 10,
          );
        }
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, frames, speed, isAIVoiceEnabled, speechStatus]);

  const handleManualStep = (dir) => {
    initAudio();
    const nextStep = currentStep + dir;
    if (nextStep >= 0 && nextStep < frames.length) {
      setCurrentStep(nextStep);
      if (!isAIVoiceEnabled) playSound(frames[nextStep].sound);
    }
  };

  const togglePlayPause = () => {
    initAudio();
    setIsPlaying(!isPlaying);
  };

  const handleSvgMouseDown = (e) => {
    // Chỉ xử lý khi bấm vào vùng nền SVG. Nếu bấm lên đỉnh/cạnh, không để nền
    // reset trạng thái chọn đỉnh, đặc biệt trong chế độ Thêm Cạnh.
    if (e.target !== svgRef.current) return;

    if (mode === "PAN") {
      setIsPanning(true);
    } else if (mode === "ADD_NODE") {
      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - pan.x;
      const y = e.clientY - rect.top - pan.y;
      setNodes((prevNodes) => [
        ...prevNodes,
        { id: getNextAvailableNodeId(prevNodes), x, y },
      ]);
      resetRunState();
    } else if (mode === "ADD_EDGE") {
      setEdgeStartNode(null);
      setTempMousePos(null);
    }
  };

  const handleSvgMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();

    if (mode === "PAN" && isPanning) {
      setPan((prev) => ({ x: prev.x + e.movementX, y: prev.y + e.movementY }));
      return;
    }

    const x = e.clientX - rect.left - pan.x;
    const y = e.clientY - rect.top - pan.y;

    if (draggingNode !== null && mode === "MOVE") {
      setNodes((prevNodes) =>
        prevNodes.map((n) => (n.id === draggingNode ? { ...n, x, y } : n)),
      );
    }
    if (mode === "ADD_EDGE" && edgeStartNode !== null) {
      setTempMousePos({ x, y });
    }
  };

  const handleSvgMouseUp = () => {
    setIsPanning(false);
    setDraggingNode(null);
  };

  const handleEdgeClick = (e, edge) => {
    e.stopPropagation();

    if (mode === "DELETE_EDGE") {
      setEdges((prevEdges) => prevEdges.filter((item) => item.id !== edge.id));
      setEdgeStartNode(null);
      resetRunState();
      return;
    }

    if (mode === "EDIT_WEIGHT") {
      if (isRunning) return;
      setEditingEdge(edge);
      setEdgeWeightInput(String(edge.w));
      setEdgeWeightError("");
      return;
    }
  };

  const closeEdgeWeightModal = () => {
    setEditingEdge(null);
    setPendingEdge(null);
    setEdgeWeightInput("");
    setEdgeWeightError("");
  };

  const handleUpdateEdgeWeight = () => {
    const targetEdge = pendingEdge || editingEdge;
    if (!targetEdge) return;

    const nextWeight = Number(edgeWeightInput);
    if (edgeWeightInput.trim() === "" || !Number.isFinite(nextWeight)) {
      setEdgeWeightError("Trọng số phải là một số hợp lệ.");
      return;
    }

    if (pendingEdge) {
      const newEdge = { ...pendingEdge, w: nextWeight };
      setEdges((prevEdges) => {
        if (prevEdges.some((edge) => edge.id === newEdge.id)) return prevEdges;
        return [...prevEdges, newEdge];
      });
    } else {
      setEdges((prevEdges) =>
        prevEdges.map((edge) =>
          edge.id === editingEdge.id ? { ...edge, w: nextWeight } : edge,
        ),
      );
    }

    closeEdgeWeightModal();
    resetRunState();
  };

  const handleOpenNodeEditor = (e, node) => {
    e.stopPropagation();
    if (
      isRunning ||
      mode === "ADD_EDGE" ||
      mode === "ADD_NODE" ||
      mode === "EDIT_WEIGHT" ||
      mode === "DELETE_NODE" ||
      mode === "DELETE_EDGE"
    )
      return;
    setEditingNode(node);
    setNodeIdInput(String(node.id));
    setNodeIdError("");
  };

  const handleUpdateNodeId = () => {
    if (!editingNode) return;

    const nextId = Number(nodeIdInput);
    if (nodeIdInput.trim() === "" || !Number.isInteger(nextId) || nextId < 0) {
      setNodeIdError("ID đỉnh phải là số nguyên không âm.");
      return;
    }

    if (nextId !== editingNode.id && nodes.some((node) => node.id === nextId)) {
      setNodeIdError(`Đỉnh ${nextId} đã tồn tại. Hãy chọn ID khác.`);
      return;
    }

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === editingNode.id ? { ...node, id: nextId } : node,
      ),
    );

    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        const nextU = edge.u === editingNode.id ? nextId : edge.u;
        const nextV = edge.v === editingNode.id ? nextId : edge.v;
        return normalizeEdge(nextU, nextV, edge.w);
      }),
    );

    if (startNode === editingNode.id) setStartNode(nextId);
    if (endNode === editingNode.id) setEndNode(nextId);
    if (edgeStartNode === editingNode.id) setEdgeStartNode(nextId);

    setEditingNode(null);
    setNodeIdInput("");
    setNodeIdError("");
    resetRunState();
  };

  const handleNodeClick = (e, node) => {
    e.stopPropagation();

    if (mode === "DELETE_NODE") {
      setNodes((prevNodes) => prevNodes.filter((item) => item.id !== node.id));
      setEdges((prevEdges) =>
        prevEdges.filter((edge) => edge.u !== node.id && edge.v !== node.id),
      );
      if (startNode === node.id) setStartNode(null);
      if (endNode === node.id) setEndNode(null);
      setEdgeStartNode(null);
      setTempMousePos(null);
      resetRunState();
      return;
    }

    if (mode === "ADD_EDGE") {
      if (edgeStartNode === null) {
        setEdgeStartNode(node.id);
        setTempMousePos({ x: node.x, y: node.y });
        return;
      }

      if (edgeStartNode === node.id) {
        setEdgeStartNode(null);
        setTempMousePos(null);
        return;
      }

      const newEdge = normalizeEdge(edgeStartNode, node.id, 1);
      const exists = edges.some((edge) => edge.id === newEdge.id);
      if (!exists) {
        setPendingEdge(newEdge);
        setEditingEdge(null);
        setEdgeWeightInput("");
        setEdgeWeightError("");
      }
      setEdgeStartNode(null);
      setTempMousePos(null);
    }
  };

  const handleNodeMouseDown = (e, node) => {
    if (mode === "MOVE") {
      e.stopPropagation();
      setDraggingNode(node.id);
      return;
    }

    if (
      [
        "ADD_EDGE",
        "ADD_NODE",
        "EDIT_WEIGHT",
        "DELETE_NODE",
        "DELETE_EDGE",
      ].includes(mode)
    ) {
      e.stopPropagation();
    }
  };

  const handleRun = () => {
    if (nodes.length === 0) return alert("Đồ thị trống!");

    if (algo === "DIJKSTRA" && edges.some((edge) => Number(edge.w) < 0)) {
      alert(
        "Dijkstra không hỗ trợ cạnh có trọng số âm. Hãy chọn Bellman-Ford hoặc sửa các trọng số âm thành không âm trước khi chạy Dijkstra.",
      );
      return;
    }

    resetRunState();
    initAudio();

    const startNodeId =
      startNode !== null && nodes.some((n) => n.id === startNode)
        ? startNode
        : nodes[0]?.id;
    const endNodeId =
      endNode !== null && nodes.some((n) => n.id === endNode) ? endNode : null;
    let runOutput = null;

    switch (algo) {
      case "BFS":
        runOutput = generateBFS(nodes, edges, startNodeId, endNodeId);
        break;
      case "DFS":
        runOutput = generateDFS(nodes, edges, startNodeId, endNodeId);
        break;
      case "DIJKSTRA":
        runOutput = generateDijkstra(nodes, edges, startNodeId, endNodeId);
        break;
      case "BELLMAN_FORD":
        runOutput = generateBellmanFord(nodes, edges, startNodeId);
        break;
      case "KRUSKAL":
        runOutput = generateKruskal(nodes, edges);
        break;
      default:
        break;
    }

    const generatedFrames = runOutput?.frames || [];
    setFrames(generatedFrames);
    setCurrentStep(0);
    setIsPlaying(true);
    if (!isAIVoiceEnabled && generatedFrames[0]) {
      playSound(generatedFrames[0].sound);
    }
  };

  const isRunning = frames.length > 0;
  const currentFrameData = isRunning ? frames[currentStep] : null;
  const tempEdgeStartNode =
    edgeStartNode !== null
      ? nodes.find((node) => node.id === edgeStartNode)
      : null;

  const getNodeColorClass = (id) => {
    if (!isRunning) {
      if (mode === "DELETE_NODE")
        return "fill-red-50 stroke-red-500 text-red-700 hover:fill-red-100";
      if (mode === "ADD_EDGE" && edgeStartNode === id)
        return "fill-yellow-300 stroke-yellow-500 text-yellow-950 drop-shadow-[0_0_8px_rgba(250,204,21,0.65)]";
      return "fill-white stroke-blue-500 text-blue-900";
    }
    const status = currentFrameData?.nodeColors?.[id];
    if (status === "path")
      return "fill-green-400 stroke-green-600 text-green-950 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]";
    if (status === "current" || status === "visiting")
      return "fill-yellow-400 stroke-yellow-500 text-yellow-950 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]";
    if (status === "visited" || status === "mst")
      return "fill-blue-500 stroke-blue-700 text-white";
    if (status === "updated")
      return "fill-orange-400 stroke-orange-600 text-white";
    return "fill-white stroke-blue-200 text-blue-400";
  };

  const getEdgeStyle = (id) => {
    if (!isRunning) {
      if (mode === "DELETE_EDGE") return "stroke-red-400 stroke-[4] opacity-80";
      if (mode === "EDIT_WEIGHT")
        return "stroke-orange-400 stroke-[4] opacity-90";
      return "stroke-blue-300 stroke-[3] opacity-70";
    }
    const status = currentFrameData?.edgeColors?.[id];
    if (status === "path") return "stroke-green-500 stroke-[6]";
    if (status === "visiting") return "stroke-yellow-400 stroke-[5]";
    if (status === "traversed" || status === "mst")
      return "stroke-blue-500 stroke-[5]";
    if (status === "ignored")
      return "stroke-red-300 stroke-[3] stroke-dasharray-4 opacity-40";
    return "stroke-blue-100 stroke-[3] opacity-60";
  };

  const getCursorStyle = () => {
    if (mode === "PAN") return isPanning ? "cursor-grabbing" : "cursor-grab";
    if (mode === "ADD_NODE" || mode === "ADD_EDGE") return "cursor-crosshair";
    if (mode === "DELETE_NODE" || mode === "DELETE_EDGE")
      return "cursor-pointer";
    return "cursor-default";
  };

  const edgeWeightModalEdge = pendingEdge || editingEdge;
  const isAddingEdgeWeight = Boolean(pendingEdge);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 font-sans text-slate-800 overflow-hidden select-none">
      {/* HEADER / TOP NAV */}
      <div className="h-14 bg-blue-900 shadow-md flex items-center justify-between px-6 z-20 shrink-0 border-b border-blue-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-blue-900 font-bold shadow-md">
            G
          </div>
          <h1 className="font-extrabold text-lg tracking-tight text-white hidden sm:block">
            GraphVisualizer
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowTheoryModal(true)}
            className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-yellow-400 transition-colors px-2 sm:px-3 py-1.5 rounded-lg hover:bg-blue-800"
          >
            <BookOpen size={16} />{" "}
            <span className="hidden sm:inline">Lý Thuyết</span>
          </button>
          <button
            onClick={() => setShowInputModal(true)}
            className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-yellow-400 transition-colors px-2 sm:px-3 py-1.5 rounded-lg hover:bg-blue-800"
          >
            <Edit3 size={16} />{" "}
            <span className="hidden sm:inline">Nhập Đồ Thị</span>
          </button>

          <select
            className="bg-blue-800 hover:bg-blue-700 text-white border-none rounded-lg px-2 sm:px-3 py-1.5 text-sm font-medium outline-none cursor-pointer transition-colors"
            onChange={(e) => {
              if (e.target.value) {
                setNodes(PRESET_GRAPHS[e.target.value].nodes);
                setEdges(PRESET_GRAPHS[e.target.value].edges);
                setPan({ x: 0, y: 0 }); // Reset khung nhìn
                resetRunState();
                e.target.value = "";
              }
            }}
          >
            <option value="">+ Mẫu...</option>
            <option value="basic">Cơ bản</option>
            <option value="tree">Cây</option>
            <option value="complete">Đầy đủ</option>
          </select>

          <button
            onClick={() => {
              setNodes([]);
              setEdges([]);
              setPan({ x: 0, y: 0 });
              resetRunState();
            }}
            className="flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-red-400 transition-colors px-2 sm:px-3 py-1.5 rounded-lg hover:bg-blue-800"
            title="Xóa trắng đồ thị"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        {/* CENTER COLUMN: CANVAS VÀ BẢNG ĐIỀU KHIỂN DƯỚI */}
        <div className="flex flex-col flex-1 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-blue-100/30">
          {/* FLOATING LEFT TOOLBAR */}
          <div className="absolute top-6 left-6 flex flex-col bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-2 gap-2 border border-blue-100 z-10">
            <ToolButton
              icon={<Hand size={20} />}
              label="Kéo Nền (Pan)"
              active={mode === "PAN"}
              onClick={() => {
                setMode("PAN");
                setEdgeStartNode(null);
                setTempMousePos(null);
              }}
            />
            <ToolButton
              icon={<MousePointer2 size={20} />}
              label="Di chuyển Đỉnh"
              active={mode === "MOVE"}
              onClick={() => {
                setMode("MOVE");
                setEdgeStartNode(null);
                setTempMousePos(null);
              }}
            />
            <ToolButton
              icon={<Circle size={20} />}
              label="Thêm Đỉnh"
              active={mode === "ADD_NODE"}
              onClick={() => {
                setMode("ADD_NODE");
                setEdgeStartNode(null);
                setTempMousePos(null);
              }}
            />
            <ToolButton
              icon={<Spline size={20} />}
              label="Thêm Cạnh"
              active={mode === "ADD_EDGE"}
              onClick={() => {
                setMode("ADD_EDGE");
                setEdgeStartNode(null);
                setTempMousePos(null);
              }}
            />
            <ToolButton
              icon={<Hash size={20} />}
              label="Sửa Trọng Số"
              active={mode === "EDIT_WEIGHT"}
              onClick={() => {
                setMode("EDIT_WEIGHT");
                setEdgeStartNode(null);
                setTempMousePos(null);
              }}
            />
            <ToolButton
              icon={<Trash2 size={20} />}
              label="Xóa Đỉnh"
              active={mode === "DELETE_NODE"}
              onClick={() => {
                setMode("DELETE_NODE");
                setEdgeStartNode(null);
                setTempMousePos(null);
              }}
            />
            <ToolButton
              icon={<X size={20} />}
              label="Xóa Cạnh"
              active={mode === "DELETE_EDGE"}
              onClick={() => {
                setMode("DELETE_EDGE");
                setEdgeStartNode(null);
                setTempMousePos(null);
              }}
            />
          </div>

          {!showCode && (
            <button
              onClick={() => setShowCode(true)}
              className="absolute top-6 right-6 bg-white p-3 rounded-xl shadow-xl text-blue-600 hover:bg-blue-50 border border-blue-100 z-20 flex items-center gap-2 font-bold"
            >
              <Code size={20} /> Hiện Code
            </button>
          )}

          {/* CANVAS GRAPH */}
          <div className="flex-1 relative overflow-hidden">
            <svg
              ref={svgRef}
              className={`w-full h-full ${getCursorStyle()}`}
              onMouseDown={handleSvgMouseDown}
              onMouseMove={handleSvgMouseMove}
              onMouseUp={handleSvgMouseUp}
              onMouseLeave={handleSvgMouseUp}
            >
              <defs>
                <filter
                  id="shadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="4"
                    floodOpacity="0.15"
                  />
                </filter>

                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                  patternTransform={`translate(${pan.x % 40}, ${pan.y % 40})`}
                >
                  <circle cx="2" cy="2" r="1.5" className="fill-blue-200/50" />
                </pattern>
              </defs>

              <rect
                width="100%"
                height="100%"
                fill="url(#grid)"
                pointerEvents="none"
              />

              <g transform={`translate(${pan.x}, ${pan.y})`}>
                {edges.map((e) => {
                  const start = nodes.find((n) => n.id === e.u);
                  const end = nodes.find((n) => n.id === e.v);
                  if (!start || !end) return null;
                  const midX = (start.x + end.x) / 2;
                  const midY = (start.y + end.y) / 2;
                  return (
                    <g
                      key={e.id}
                      onClick={(event) => handleEdgeClick(event, e)}
                      className={`transition-all duration-300 ${mode === "DELETE_EDGE" || mode === "EDIT_WEIGHT" ? "cursor-pointer" : ""}`}
                    >
                      <line
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                        className="stroke-transparent stroke-[18]"
                        pointerEvents="stroke"
                      />
                      <line
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                        className={`transition-all duration-500 ${getEdgeStyle(e.id)}`}
                      />
                      <text
                        x={midX}
                        y={midY - 6}
                        textAnchor="middle"
                        dy=".3em"
                        className="text-[14px] font-extrabold fill-blue-900 pointer-events-none select-none"
                        style={{
                          paintOrder: "stroke",
                          stroke: "rgba(255,255,255,0.95)",
                          strokeWidth: "4px",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                        }}
                      >
                        {e.w}
                      </text>
                    </g>
                  );
                })}

                {mode === "ADD_EDGE" && tempEdgeStartNode && tempMousePos && (
                  <line
                    x1={tempEdgeStartNode.x}
                    y1={tempEdgeStartNode.y}
                    x2={tempMousePos.x}
                    y2={tempMousePos.y}
                    className="stroke-yellow-400 stroke-[3] stroke-dasharray-4 pointer-events-none"
                  />
                )}

                {nodes.map((node) => (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onMouseDown={(e) => handleNodeMouseDown(e, node)}
                    onClick={(e) => handleNodeClick(e, node)}
                    onDoubleClick={(e) => handleOpenNodeEditor(e, node)}
                    className="transition-transform"
                  >
                    <circle
                      r={22}
                      className={`stroke-[3px] transition-colors duration-500 cursor-pointer ${getNodeColorClass(node.id)}`}
                      filter="url(#shadow)"
                    />
                    <text
                      textAnchor="middle"
                      dy=".3em"
                      className="font-bold text-[14px] pointer-events-none fill-current"
                    >
                      {node.id}
                    </text>
                    {currentFrameData?.distances?.[node.id] !== undefined && (
                      <g transform="translate(0, -35)">
                        <rect
                          x="-16"
                          y="-12"
                          width="32"
                          height="20"
                          rx="4"
                          className="fill-blue-600"
                        />
                        <text
                          textAnchor="middle"
                          dy=".3em"
                          className="text-[11px] font-bold fill-white"
                        >
                          {currentFrameData.distances[node.id] === Infinity
                            ? "∞"
                            : currentFrameData.distances[node.id]}
                        </text>
                      </g>
                    )}
                  </g>
                ))}
              </g>
            </svg>
          </div>

          {/* DEDICATED BOTTOM CONTROL BAR */}
          <div className="p-4 pt-2 shrink-0 flex justify-center bg-transparent z-10 w-full">
            <div className="w-full max-w-6xl bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 px-5 py-4 flex flex-col items-center gap-3 relative overflow-visible">
              {/* Hàng 1: Chọn thuật toán & đỉnh */}
              <div className="w-full flex flex-wrap items-center justify-center gap-3 pb-3 border-b border-blue-50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-blue-800 uppercase tracking-wider whitespace-nowrap">
                    Thuật toán:
                  </span>
                  <select
                    className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-2 font-bold text-blue-900 outline-none cursor-pointer transition-colors text-sm min-w-[150px]"
                    value={algo}
                    onChange={(e) => {
                      setAlgo(e.target.value);
                      resetRunState();
                    }}
                  >
                    <option value="BFS">BFS (Chiều rộng)</option>
                    <option value="DFS">DFS (Chiều sâu)</option>
                    <option value="DIJKSTRA">Dijkstra</option>
                    <option value="BELLMAN_FORD">Bellman-Ford</option>
                    <option value="KRUSKAL">Kruskal</option>
                  </select>
                </div>

                {algo !== "KRUSKAL" && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-blue-800 uppercase whitespace-nowrap">
                      Bắt đầu:
                    </span>
                    <select
                      className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 font-bold text-blue-900 outline-none cursor-pointer text-sm min-w-[100px]"
                      value={
                        startNode !== null &&
                        nodes.some((n) => n.id === startNode)
                          ? startNode
                          : (nodes[0]?.id ?? "")
                      }
                      onChange={(e) => {
                        setStartNode(
                          e.target.value === "" ? null : Number(e.target.value),
                        );
                        resetRunState();
                      }}
                    >
                      {nodes.map((n) => (
                        <option key={n.id} value={n.id}>
                          Đỉnh {n.id}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {["BFS", "DFS", "DIJKSTRA"].includes(algo) && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-blue-800 uppercase whitespace-nowrap">
                      Kết thúc:
                    </span>
                    <select
                      className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 font-bold text-blue-900 outline-none cursor-pointer text-sm min-w-[110px]"
                      value={
                        endNode !== null && nodes.some((n) => n.id === endNode)
                          ? endNode
                          : ""
                      }
                      onChange={(e) => {
                        setEndNode(
                          e.target.value === "" ? null : Number(e.target.value),
                        );
                        resetRunState();
                      }}
                    >
                      <option value="">(Tất cả)</option>
                      {nodes.map((n) => (
                        <option key={n.id} value={n.id}>
                          Đỉnh {n.id}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Hàng 2: Chạy thuật toán, player, âm thanh */}
              <div className="w-full flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRun}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 px-7 py-2.5 rounded-xl font-bold shadow-md shadow-yellow-500/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap text-sm"
                >
                  Chạy Thuật Toán
                </button>

                <div className="w-px h-8 bg-blue-100 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleManualStep(-1)}
                    disabled={!isRunning || currentStep === 0}
                    className="p-2 rounded-full text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <SkipBack size={18} />
                  </button>
                  <button
                    onClick={togglePlayPause}
                    disabled={!isRunning || currentStep === frames.length - 1}
                    className="w-11 h-11 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg shadow-blue-500/30 disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause size={18} />
                    ) : (
                      <Play size={18} className="ml-1" />
                    )}
                  </button>
                  <button
                    onClick={() => handleManualStep(1)}
                    disabled={!isRunning || currentStep === frames.length - 1}
                    className="p-2 rounded-full text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <SkipForward size={18} />
                  </button>
                </div>

                <div className="w-px h-8 bg-blue-100 hidden md:block" />

                <button
                  onClick={() => {
                    const newVal = !isAIVoiceEnabled;
                    setIsAIVoiceEnabled(newVal);
                    setSpeechError("");
                    if (!newVal) {
                      setSpeechStatus("IDLE");
                    }
                    if (!newVal && window.speechSynthesis) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${isAIVoiceEnabled ? "bg-blue-100 text-blue-700 shadow-inner ring-1 ring-blue-300" : "text-slate-500 hover:bg-slate-100"}`}
                  title="AI tự động đọc lời giải thích bằng một giọng máy ổn định duy nhất."
                >
                  <Headphones
                    size={18}
                    className={isAIVoiceEnabled ? "animate-pulse" : ""}
                  />
                  <span>
                    {isAIVoiceEnabled ? "AI Đang Giảng" : "Giảng Bài AI"}
                  </span>
                </button>

                {speechError && (
                  <div className="basis-full text-center text-xs font-semibold text-red-500 -mt-1">
                    {speechError}
                  </div>
                )}

                <div
                  className={`flex items-center gap-2 transition-opacity ${isAIVoiceEnabled ? "opacity-30 pointer-events-none" : ""}`}
                >
                  <span className="text-xs font-semibold text-blue-400 whitespace-nowrap">
                    Tốc độ:
                  </span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    className="w-20 sm:w-28 accent-yellow-500 cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => {
                    const newState = !isSoundEnabled;
                    setIsSoundEnabled(newState);
                    if (newState) initAudio();
                  }}
                  className={`p-2 rounded-full transition-colors ${isSoundEnabled ? "text-blue-600 hover:bg-blue-50" : "text-slate-400 hover:bg-slate-100"}`}
                  title={
                    isSoundEnabled
                      ? "Tắt hiệu ứng âm thanh"
                      : "Bật hiệu ứng âm thanh"
                  }
                >
                  {isSoundEnabled ? (
                    <Volume2 size={20} />
                  ) : (
                    <VolumeX size={20} />
                  )}
                </button>
              </div>

              {isRunning && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-50 pointer-events-none overflow-hidden rounded-t-2xl">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{
                      width: `${frames.length > 1 ? (currentStep / (frames.length - 1)) * 100 : 0}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - C++ CODE & DATA STRUCTURES */}
        {showCode && (
          <div className="w-[400px] h-full shrink-0 flex flex-col bg-white border-l border-blue-100 z-30 transition-all duration-300 ease-in-out shadow-[-10px_0_20px_rgba(0,0,0,0.03)]">
            <div className="h-14 bg-blue-50 border-b border-blue-100 flex justify-between items-center px-4 shrink-0">
              <h3 className="font-extrabold text-blue-900 flex items-center gap-2">
                <Code size={18} className="text-blue-600" /> Visualization
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex bg-white rounded-md p-0.5 border border-blue-200">
                  <button
                    onClick={() => setCodeLang("cpp")}
                    className={`px-2 py-1 text-[10px] font-bold rounded-sm transition-colors ${codeLang === "cpp" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"}`}
                  >
                    C++
                  </button>
                  <button
                    onClick={() => setCodeLang("python")}
                    className={`px-2 py-1 text-[10px] font-bold rounded-sm transition-colors ${codeLang === "python" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"}`}
                  >
                    Python
                  </button>
                </div>
                <button
                  onClick={() => setShowCode(false)}
                  className="text-blue-400 hover:text-blue-700 p-1 rounded-md hover:bg-blue-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Code Viewer */}
            <div className="flex-1 overflow-auto bg-[#1e1e1e] p-4 text-[13px] font-mono leading-relaxed select-text">
              {(ALGO_CODES[algo][codeLang] || []).map((line, idx) => {
                const isActive =
                  isRunning && currentFrameData?.activeLine === idx + 1;
                return (
                  <div
                    key={idx}
                    className={`px-2 py-0.5 rounded-sm flex ${isActive ? "bg-yellow-500/20 border-l-2 border-yellow-400 text-yellow-100" : "text-slate-300 border-l-2 border-transparent"}`}
                  >
                    <span className="w-6 text-right mr-4 text-slate-500 select-none">
                      {idx + 1}
                    </span>
                    <span className="whitespace-pre">{line}</span>
                  </div>
                );
              })}
            </div>

            {isRunning && (
              <div className="bg-white shrink-0 flex flex-col border-t border-blue-100">
                {currentFrameData.queue && (
                  <div className="p-4 border-b border-blue-100">
                    <h4 className="text-[11px] font-extrabold text-blue-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                      <ChevronRight size={14} />{" "}
                      {currentFrameData.queueLabel || "Hàng đợi (Queue)"}
                    </h4>
                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                      {currentFrameData.queue.length === 0 && (
                        <span className="text-xs text-blue-300 italic">
                          {currentFrameData.emptyQueueText || "Hàng đợi rỗng"}
                        </span>
                      )}
                      {currentFrameData.queue.map((item, i) => (
                        <div
                          key={`${item}-${i}`}
                          className="min-w-[36px] h-9 shrink-0 flex items-center justify-center rounded-lg bg-yellow-100 text-yellow-800 font-bold border border-yellow-300 shadow-sm font-mono text-sm"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentFrameData.distances && (
                  <div className="p-4 border-b border-blue-100">
                    <h4 className="text-[11px] font-extrabold text-blue-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                      <ChevronRight size={14} /> Mảng Khoảng Cách (Dist)
                    </h4>
                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                      {Object.entries(currentFrameData.distances).map(
                        ([id, d]) => (
                          <div
                            key={id}
                            className="min-w-[44px] shrink-0 flex flex-col overflow-hidden rounded-lg bg-white border border-blue-200 shadow-sm"
                          >
                            <div className="bg-blue-100 text-center py-1 text-[10px] font-bold text-blue-800 border-b border-blue-200">
                              Đỉnh {id}
                            </div>
                            <div className="text-center py-1.5 text-sm font-mono font-bold text-blue-700">
                              {d === Infinity ? "∞" : d}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                <AlgorithmResult result={currentFrameData?.result} />

                <div className="p-4 bg-yellow-50 border-t-2 border-yellow-200 relative overflow-hidden flex flex-col gap-2">
                  <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-yellow-700 uppercase flex items-center gap-1">
                      {isAIVoiceEnabled && speechStatus === "FETCHING" && (
                        <Loader2 size={12} className="animate-spin" />
                      )}
                      {isAIVoiceEnabled && speechStatus === "SPEAKING" && (
                        <span className="flex gap-0.5">
                          <span
                            className="w-1 h-1 bg-yellow-600 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></span>
                          <span
                            className="w-1 h-1 bg-yellow-600 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></span>
                          <span
                            className="w-1 h-1 bg-yellow-600 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></span>
                        </span>
                      )}
                      Giải thích:
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-yellow-900 leading-relaxed pl-2">
                    {currentFrameData.explanation || "Sẵn sàng."}
                  </p>
                </div>
              </div>
            )}

            {!isRunning && (
              <div className="p-6 bg-blue-50/50 text-center text-blue-500 flex-1 flex flex-col justify-center items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-400">
                  <Play size={24} />
                </div>
                <p className="text-sm">
                  Nhấn <strong>Chạy Thuật Toán</strong> để xem minh họa chi tiết
                  từng bước ở đây.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- AI CHAT BOT THÊM VÀO GÓC DƯỚI BÊN PHẢI --- */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
        {/* Chat Window */}
        <div
          className={`bg-white w-[340px] sm:w-[380px] rounded-2xl shadow-2xl border border-blue-100 mb-4 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right pointer-events-auto ${
            isChatOpen
              ? "opacity-100 scale-100 h-[480px] max-h-[70vh]"
              : "opacity-0 scale-90 h-0 pointer-events-none"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white flex justify-between items-center shrink-0 shadow-sm">
            <div className="flex items-center gap-2">
              <Bot size={22} className="text-yellow-400 drop-shadow-md" />
              <div>
                <h3 className="font-bold text-sm leading-tight">
                  AI Trợ Giảng
                </h3>
                <p className="text-[10px] text-blue-200">Hỏi đáp thuật toán</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-blue-200 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50/50 custom-scrollbar">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] px-4 py-2.5 text-[14px] leading-7 shadow-sm break-words whitespace-pre-wrap font-sans ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                      : "bg-white border border-blue-100 text-slate-700 rounded-2xl rounded-bl-sm"
                  }`}
                >
                  {cleanAIText(msg.text)
                    .split("\n")
                    .map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i !== msg.text.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            ))}

            {isBotTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-blue-100 text-slate-500 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>

          <div className="p-3 bg-white border-t border-blue-100 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                disabled={isBotTyping}
                className="flex-1 bg-slate-100 border border-transparent rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isBotTyping}
                className="bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors flex items-center justify-center w-11 h-11 shrink-0 shadow-md shadow-blue-600/20"
              >
                <Send
                  size={18}
                  className={
                    chatInput.trim() && !isBotTyping ? "translate-x-0.5" : ""
                  }
                />
              </button>
            </form>
          </div>
        </div>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="pointer-events-auto w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full shadow-xl shadow-blue-900/40 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all relative z-10"
        >
          {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
          {!isChatOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
          )}
        </button>
      </div>

      {/* INPUT MODAL */}
      {showInputModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[500px] overflow-hidden flex flex-col border border-blue-100">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <Edit3 size={20} className="text-blue-600" /> Nhập Đồ Thị Thủ
                Công
              </h2>
              <button
                onClick={() => setShowInputModal(false)}
                className="text-blue-400 hover:text-blue-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex bg-blue-50 p-1 rounded-lg">
                <button
                  onClick={() => setInputType("EDGE_LIST")}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all ${inputType === "EDGE_LIST" ? "bg-white text-blue-700 shadow-sm" : "text-blue-500 hover:text-blue-700"}`}
                >
                  <List size={16} /> Danh sách Cạnh
                </button>
                <button
                  onClick={() => setInputType("MATRIX")}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all ${inputType === "MATRIX" ? "bg-white text-blue-700 shadow-sm" : "text-blue-500 hover:text-blue-700"}`}
                >
                  <Grid size={16} /> Ma trận kề
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  {inputType === "EDGE_LIST"
                    ? "Nhập theo cú pháp: u v [trọng_số]"
                    : "Nhập ma trận vuông N x N"}
                </label>
                <textarea
                  className="w-full h-40 border border-slate-200 rounded-xl p-3 text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none bg-slate-50"
                  placeholder={
                    inputType === "EDGE_LIST"
                      ? "0 1 5\n1 2 -10\n0 2 3"
                      : "0 5 0\n5 0 10\n0 10 0"
                  }
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                {inputError && (
                  <p className="text-red-500 text-xs mt-2 font-medium">
                    {inputError}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setShowInputModal(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  onClick={handleApplyInput}
                  className="px-6 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md shadow-blue-500/20"
                >
                  Xác nhận tạo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDGE WEIGHT ADD/EDIT MODAL */}
      {edgeWeightModalEdge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[420px] overflow-hidden flex flex-col border border-blue-100">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <Edit3 size={20} className="text-blue-600" />{" "}
                {isAddingEdgeWeight
                  ? "Thêm Trọng Số Cạnh"
                  : "Sửa Trọng Số Cạnh"}
              </h2>
              <button
                onClick={closeEdgeWeightModal}
                className="text-blue-400 hover:text-blue-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm font-semibold text-blue-900">
                Cạnh:{" "}
                <span className="font-mono">
                  {edgeWeightModalEdge.u} - {edgeWeightModalEdge.v}
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  {isAddingEdgeWeight
                    ? "Nhập trọng số cho cạnh mới"
                    : "Trọng số mới"}
                </label>
                <input
                  type="number"
                  value={edgeWeightInput}
                  onChange={(e) => {
                    setEdgeWeightInput(e.target.value);
                    setEdgeWeightError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleUpdateEdgeWeight();
                  }}
                  placeholder="Ví dụ: 5"
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-slate-50"
                  autoFocus
                />
                <p className="text-xs text-slate-400 mt-2">
                  Có thể nhập trọng số âm để thử Bellman-Ford. Dijkstra sẽ cảnh
                  báo nếu có cạnh âm.
                </p>
                {edgeWeightError && (
                  <p className="text-red-500 text-xs mt-2 font-medium">
                    {edgeWeightError}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={closeEdgeWeightModal}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateEdgeWeight}
                  className="px-6 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md shadow-blue-500/20"
                >
                  {isAddingEdgeWeight ? "Thêm cạnh" : "Cập nhật"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NODE EDIT MODAL */}
      {editingNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[420px] overflow-hidden flex flex-col border border-blue-100">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <Edit3 size={20} className="text-blue-600" /> Sửa Đỉnh
              </h2>
              <button
                onClick={() => {
                  setEditingNode(null);
                  setNodeIdError("");
                }}
                className="text-blue-400 hover:text-blue-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm font-semibold text-blue-900">
                Đỉnh đang sửa:{" "}
                <span className="font-mono">{editingNode.id}</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  ID đỉnh mới
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={nodeIdInput}
                  onChange={(e) => {
                    setNodeIdInput(e.target.value);
                    setNodeIdError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleUpdateNodeId();
                  }}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-slate-50"
                  autoFocus
                />
                <p className="text-xs text-slate-400 mt-2">
                  Nhấp đúp vào một đỉnh khi không chạy thuật toán để mở phần sửa
                  đỉnh.
                </p>
                {nodeIdError && (
                  <p className="text-red-500 text-xs mt-2 font-medium">
                    {nodeIdError}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => {
                    setEditingNode(null);
                    setNodeIdError("");
                  }}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateNodeId}
                  className="px-6 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md shadow-blue-500/20"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* THEORY MODAL (CUỐN SÁCH) */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/60 backdrop-blur-sm">
          <div className="bg-[#fdfbf7] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-[650px] max-w-[90vw] h-[500px] flex flex-col relative overflow-hidden border-2 border-[#e5e0d8] transform transition-all">
            <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-[#d6cec0] to-transparent opacity-30 pointer-events-none"></div>

            <div className="bg-[#8b5a2b] px-6 py-3 border-b border-[#724a23] flex justify-between items-center text-white shrink-0">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <BookOpen size={20} className="text-[#f4d03f]" /> Cẩm nang Thuật
                toán
              </h2>
              <button
                onClick={() => setShowTheoryModal(false)}
                className="text-[#e0c9a3] hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar flex flex-col relative">
              <h3 className="text-2xl font-black text-[#5c3a21] mb-6 text-center border-b-2 border-[#e5e0d8] pb-4">
                {THEORY_PAGES[theoryPage].title}
              </h3>
              <div className="text-[#4a3f35] leading-relaxed whitespace-pre-wrap font-serif text-[15px] text-justify">
                {THEORY_PAGES[theoryPage].content}
              </div>
            </div>

            <div className="p-4 bg-[#f8f5f0] border-t border-[#e5e0d8] flex justify-between items-center shrink-0">
              <button
                onClick={() => setTheoryPage(Math.max(0, theoryPage - 1))}
                disabled={theoryPage === 0}
                className="flex items-center gap-1 px-4 py-2 text-[#5c3a21] font-bold hover:bg-[#e8e4db] rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft size={18} /> Trang trước
              </button>
              <span className="text-sm font-bold text-[#8b5a2b]">
                Trang {theoryPage + 1} / {THEORY_PAGES.length}
              </span>
              <button
                onClick={() =>
                  setTheoryPage(
                    Math.min(THEORY_PAGES.length - 1, theoryPage + 1),
                  )
                }
                disabled={theoryPage === THEORY_PAGES.length - 1}
                className="flex items-center gap-1 px-4 py-2 text-[#5c3a21] font-bold hover:bg-[#e8e4db] rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                Trang tiếp <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #eff6ff; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #93c5fd; }
      `}</style>
    </div>
  );
}

// Component Nút Toolbar Phụ
function ToolButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${active ? "bg-yellow-100 text-yellow-700 shadow-inner" : "text-blue-600 hover:bg-blue-50 hover:text-blue-800"}`}
    >
      {icon}
      <div className="absolute left-14 bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
        {label}
      </div>
    </button>
  );
}

function AlgorithmResult({ result }) {
  if (!result) return null;

  return (
    <div className="p-4 border-b border-blue-100 bg-blue-50/50">
      <h4 className="text-[11px] font-extrabold text-blue-500 uppercase tracking-wider mb-3 flex items-center gap-1">
        <Hash size={14} /> Kết quả thuật toán
      </h4>

      <p className="text-xs font-semibold text-blue-900 mb-3 leading-relaxed">
        {result.summary}
      </p>

      {result.type === "ORDER" && (
        <div className="flex flex-wrap items-center gap-2">
          {result.order.length === 0 && (
            <span className="text-xs text-blue-300 italic">
              Chưa ghi nhận đỉnh nào.
            </span>
          )}
          {result.order.map((id, index) => (
            <React.Fragment key={`${id}-${index}`}>
              <div className="min-w-[34px] h-8 px-2 flex items-center justify-center rounded-lg bg-white text-blue-700 font-bold border border-blue-200 shadow-sm font-mono text-sm">
                {id}
              </div>
              {index < result.order.length - 1 && (
                <span className="text-blue-300 font-bold">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {result.type === "MST" && (
        <div className="flex flex-col gap-3">
          <div className="rounded-lg bg-yellow-100 border border-yellow-300 px-3 py-2 text-sm font-extrabold text-yellow-900">
            Tổng trọng số: {result.totalWeight}
          </div>

          <div className="flex flex-col gap-2 max-h-32 overflow-auto pr-1 custom-scrollbar">
            {result.edges.length === 0 && (
              <span className="text-xs text-blue-300 italic">
                Chưa chọn được cạnh nào.
              </span>
            )}
            {result.edges.map((edge, index) => (
              <div
                key={`${edge.u}-${edge.v}-${index}`}
                className="flex items-center justify-between rounded-lg bg-white border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-900"
              >
                <span>
                  Cạnh {edge.u} - {edge.v}
                </span>
                <span className="font-mono text-blue-600">w = {edge.w}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
