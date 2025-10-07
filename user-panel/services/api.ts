// services/api.ts

export async function getMyReports(userId: number) {
  const res = await fetch(`http://localhost/api/getReports.php?user_id=${userId}`);
  return await res.json();
}

export async function submitReport(data: any) {
  const res = await fetch("http://localhost/api/submitReport.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}
