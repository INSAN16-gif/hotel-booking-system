const STORAGE_KEY = "case4_bookings_v1";

const DEFAULT_BOOKINGS = [
  { id: 1, guest_name: "Taylor Lim", room_number: "101", check_in: "2026-11-10", check_out: "2026-11-12" },
  { id: 2, guest_name: "Morgan Reyes", room_number: "204", check_in: "2026-11-15", check_out: "2026-11-18" },
  { id: 3, guest_name: "Jamie Cruz", room_number: "302", check_in: "2026-11-20", check_out: "2026-11-21" }
];

function getRecords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BOOKINGS)); return [...DEFAULT_BOOKINGS]; }
  try { return JSON.parse(raw); } catch { return [...DEFAULT_BOOKINGS]; }
}
function saveRecords(records) { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
function getRecordById(id) { return getRecords().find(r => Number(r.id) === Number(id)) || null; }
function addRecord(data) {
  const records = getRecords();
  const nextId = records.length ? Math.max(...records.map(r => Number(r.id))) + 1 : 1;
  records.push({ id: nextId, ...data });
  saveRecords(records);
}
function updateRecord(id, data) { saveRecords(getRecords().map(r => Number(r.id) === Number(id) ? { id: Number(id), ...data } : r)); }
function deleteRecord(id) { saveRecords(getRecords().filter(r => Number(r.id) !== Number(id))); }
function resetSampleData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BOOKINGS)); }

function isValidDateStr(str) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return false;
  const [y, m, d] = str.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}
