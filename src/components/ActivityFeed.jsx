import { useDashboardContext } from "../context/DashboardContext";

function ActivityFeed() {
  const { activities, theme } = useDashboardContext();
  // var tickColor = theme === "dark" ? "white" : "black";

  if (!activities.length) {
    return <p className="text-sm text-gray-500">No recent activity</p>;
  }

  return (
    <div className="rounded-xl p-4 shadow space-y-3 mt-16">
      <h2 className={`font-semibold text-lg ${theme === "dark"?  "text-white" : "text-black"}`}>Recent Activity</h2>

      {activities.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg p-3 hover:bg-gray-50 transition"
        >
          <div className="flex justify-between text-sm font-medium">
            <span>{item.action}</span>
            <span className= {`${theme === "dark"?  "text-white" : "text-black"}`}>{item.time}</span>
          </div>
          <p className={`${theme === "dark"?  "text-white text-xs" : "text-gray-500 text-xs"}`}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ActivityFeed;
