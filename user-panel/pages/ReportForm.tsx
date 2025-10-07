import { submitReport, getMyReports } from "../services/api";

function ReportForm() {
  const handleSubmit = async () => {
    const res = await submitReport(1, "Laporan Dana BOS");
    console.log(res);
  };

  return (
    <button onClick={handleSubmit}>Kirim Laporan</button>
  );
}

export default ReportForm;


import { useEffect, useState } from "react";

function MyReports() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    getMyReports(1).then((res) => setReports(res));
  }, []);

  return (
    <ul>
      {reports.map((r, i) => (
        <li key={i}>{r.report_name}</li>
      ))}
    </ul>
  );
}
