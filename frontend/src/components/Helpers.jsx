export const getTimeFrameRange = (timeFrame) => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (timeFrame === "daily") {
    return { start, end: new Date(now), label: "Today" };
  }
  if (timeFrame === "weekly") {
    const startOfWeek = new Date(start);
    startOfWeek.setDate(start.getDate() - start.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return { start: startOfWeek, end: new Date(now), label: "This Week" };
  }
  if (timeFrame === "monthly") {
    const startOfMonth = new Date(start.getFullYear(), start.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);
    return { start: startOfMonth, end: new Date(now), label: "This Month" };
  }
  if (timeFrame === "yearly") {
    const startOfYear = new Date(start.getFullYear(), 0, 1);
    startOfYear.setHours(0, 0, 0, 0);
    return { start: startOfYear, end: new Date(now), label: "This Year" };
  }
  const startOfMonth = new Date(start.getFullYear(), start.getMonth(), 1);
  return { start: startOfMonth, end: new Date(now), label: "This Month" };
};

export const getPreviousTimeFrameRange = (timeFrame) => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (timeFrame === "daily") {
    const yesterday = new Date(start);
    yesterday.setDate(start.getDate() - 1);
    const end = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);
    return { start: yesterday, end, label: "Yesterday" };
  }
  if (timeFrame === "weekly") {
    const startOfThisWeek = new Date(start);
    startOfThisWeek.setDate(start.getDate() - start.getDay());
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfThisWeek);
    endOfLastWeek.setDate(startOfThisWeek.getDate() - 1);
    endOfLastWeek.setHours(23, 59, 59, 999);
    return { start: startOfLastWeek, end: endOfLastWeek, label: "Last Week" };
  }
  if (timeFrame === "monthly") {
    const startOfLastMonth = new Date(start.getFullYear(), start.getMonth() - 1, 1);
    const endOfLastMonth = new Date(start.getFullYear(), start.getMonth(), 0, 23, 59, 59, 999);
    return { start: startOfLastMonth, end: endOfLastMonth, label: "Last Month" };
  }
  if (timeFrame === "yearly") {
    const startOfLastYear = new Date(start.getFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(start.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
    return { start: startOfLastYear, end: endOfLastYear, label: "Last Year" };
  }
  const startOfLastMonth = new Date(start.getFullYear(), start.getMonth() - 1, 1);
  const endOfLastMonth = new Date(start.getFullYear(), start.getMonth(), 0, 23, 59, 59, 999);
  return { start: startOfLastMonth, end: endOfLastMonth, label: "Last Month" };
};

export const generateChartPoints = (timeFrame, timeFrameRange) => {
  const { start, end } = timeFrameRange;
  const points = [];

  if (timeFrame === "daily") {
    for (let h = 0; h < 24; h++) {
      points.push({ label: `${h}:00`, hour: h, date: new Date(start), isCurrent: h === new Date().getHours() });
    }
    return points;
  }

  if (timeFrame === "weekly" || timeFrame === "monthly") {
    const current = new Date(start);
    const today = new Date();
    while (current <= end) {
      const d = new Date(current);
      points.push({
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        date: d,
        isCurrent: d.toDateString() === today.toDateString(),
      });
      current.setDate(current.getDate() + 1);
    }
    return points;
  }

  if (timeFrame === "yearly") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    for (let m = 0; m < 12; m++) {
      points.push({
        label: months[m],
        date: new Date(start.getFullYear(), m, 1),
        isCurrent: m === currentMonth,
      });
    }
    return points;
  }

  return points;
};
