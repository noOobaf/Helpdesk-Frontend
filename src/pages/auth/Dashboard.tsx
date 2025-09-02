import React, { useState, useMemo } from "react";
import { Layout } from "antd";

// Import components
import WeWinSidebar from "../../components/sidebar";
import WeWinHeader from "../../components/headers";
import TicketsTable from "../../components/tickettable";
import StatsCards from "../../components/stats";

const { Content } = Layout;

// Interfaces - Exporting so other components can use it
export interface Ticket {
  key: string;
  docketNo: string;
  task: string;
  source: string;
  mt: string;
  type: "Query" | "Complaint" | "Request";
  disposition: string;
  subDisposition: string;
  departments: string;
  assignTo: string;
  status: "New" | "Resolved" | "Inprogress";
  person: string;
  sourceInfo: string;
}

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // --- STATE MANAGEMENT ---
  // State for the text search from header or table search bar
  const [searchTerm, setSearchTerm] = useState<string>("");
  // State for the active tab ('All Tickets', 'My Tickets', 'Department Tickets')
  const [activeTab, setActiveTab] = useState<string>("All Tickets");
  // State for the advanced filter values from the popover form
  const [filterValues, setFilterValues] = useState<Partial<Ticket>>({});

  // Assume the current logged-in user details for filtering
  const currentUser = "Upendra V";
  const currentDepartment = "Presales";

  // The master list of all tickets
  const [allTickets, setAllTickets] = useState<Ticket[]>([
    {
      key: "1",
      docketNo: "T-250829-01028",
      task: "0",
      source: "15%",
      mt: "0",
      type: "Query",
      disposition: "Akash",
      subDisposition: "Akash",
      departments: "Presales",
      assignTo: "Akash",
      status: "New",
      person: "Himanshu",
      sourceInfo: "Notification",
    },
    {
      key: "2",
      docketNo: "T-250829-01029",
      task: "0",
      source: "10%",
      mt: "0",
      type: "Query",
      disposition: "Ronit Davy",
      subDisposition: "Ronit Davy",
      departments: "Support",
      assignTo: "Ronit Davy",
      status: "Resolved",
      person: "Manis Shar...",
      sourceInfo: "Test",
    },
    {
      key: "3",
      docketNo: "T-250829-01030",
      task: "0",
      source: "8%",
      mt: "0",
      type: "Query",
      disposition: "MoneyRefund",
      subDisposition: "Not Refunded",
      departments: "South Region",
      assignTo: "Gopal Krishna",
      status: "Inprogress",
      person: "Amit moh...",
      sourceInfo: "Notification",
    },
    {
      key: "4",
      docketNo: "T-250829-01031",
      task: "0",
      source: "5%",
      mt: "0",
      type: "Complaint",
      disposition: "Ravi Teghadaur",
      subDisposition: "Not Refunded",
      departments: "SouthRegion",
      assignTo: "Ravi Teghadaur",
      status: "New",
      person: "manish pati...",
      sourceInfo: "Notification",
    },
    {
      key: "5",
      docketNo: "T-250829-01032",
      task: "0",
      source: "5%",
      mt: "0",
      type: "Complaint",
      disposition: "MoneyRefund",
      subDisposition: "Not Refunded",
      departments: "Presales",
      assignTo: "Piyar singh",
      status: "Resolved",
      person: "Aditya",
      sourceInfo: "Vinay Kum...",
    },
    // --- Added tickets for demonstrating filtering ---
    {
      key: "6",
      docketNo: "T-250829-01033",
      task: "1",
      source: "20%",
      mt: "1",
      type: "Request",
      disposition: "Service",
      subDisposition: "Callback",
      departments: "Presales",
      assignTo: currentUser,
      status: "Inprogress",
      person: "Anjali",
      sourceInfo: "Email",
    },
    {
      key: "7",
      docketNo: "T-250829-01034",
      task: "0",
      source: "12%",
      mt: "0",
      type: "Query",
      disposition: "Product Info",
      subDisposition: "Features",
      departments: "Support",
      assignTo: currentUser,
      status: "New",
      person: "Rohan",
      sourceInfo: "Chat",
    },
    {
      key: "8",
      docketNo: "T-250829-01035",
      task: "1",
      source: "9%",
      mt: "1",
      type: "Complaint",
      disposition: "Billing",
      subDisposition: "Overcharge",
      departments: "Presales",
      assignTo: "Priya",
      status: "Resolved",
      person: "Karan",
      sourceInfo: "Phone",
    },
  ]);

  // --- HANDLER FUNCTIONS ---
  const handleSearch = (value: string) => setSearchTerm(value);
  const handleTabChange = (tab: string) => setActiveTab(tab);
  const handleFilterApply = (values: Partial<Ticket>) =>
    setFilterValues(values);
  const handleCreateTicket = (newTicket: Ticket) =>
    setAllTickets((prevTickets) => [...prevTickets, newTicket]);

  // --- FILTERING LOGIC ---
  const displayedTickets = useMemo(() => {
    let filtered = allTickets;

    // 1. Filter by Active Tab
    if (activeTab === "My Tickets") {
      filtered = filtered.filter((ticket) => ticket.assignTo === currentUser);
    } else if (activeTab === "Department Tickets") {
      filtered = filtered.filter(
        (ticket) => ticket.departments === currentDepartment
      );
    }
    // 'All Tickets' requires no tab filtering

    // 2. Filter by Advanced Filter Form Values
    const activeFilters = Object.entries(filterValues).filter(
      ([, value]) => value !== null && value !== undefined && value !== ""
    );

    if (activeFilters.length > 0) {
      filtered = filtered.filter((ticket) => {
        return activeFilters.every(([key, value]) => {
          const ticketValue = ticket[key as keyof Ticket];
          // Use a case-insensitive check
          return String(ticketValue)
            .toLowerCase()
            .includes(String(value).toLowerCase());
        });
      });
    }

    // 3. Filter by Global Search Term
    if (searchTerm) {
      filtered = filtered.filter((ticket) =>
        Object.values(ticket).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filtered;
  }, [allTickets, activeTab, filterValues, searchTerm]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header Component - Fixed at top */}
      <WeWinHeader
        sidebarCollapsed={sidebarCollapsed}
        userName={currentUser}
        onSearch={handleSearch}
        onNotificationClick={() => console.log("Notification clicked")}
        onUserMenuClick={(key) => console.log("User menu clicked:", key)}
      />

      {/* Sidebar Component - Fixed at left */}
      <WeWinSidebar
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
      />

      {/* Main Content - Positioned to avoid overlap */}
      <div
        style={{
          marginLeft: sidebarCollapsed ? "80px" : "250px",
          marginTop: "64px",
          transition: "margin-left 0.2s",
          minHeight: "calc(100vh - 64px)",
          background: "#f5f5f5",
        }}
      >
        <Content style={{ padding: "24px" }}>
          {/* Stats Cards Component with integrated action buttons */}
          <StatsCards
            style={{ marginBottom: "32px" }}
            onCreateTicket={handleCreateTicket}
            onTabChange={handleTabChange}
            onFilterApply={handleFilterApply}
          />

          {/* Tickets Table Component */}
          <TicketsTable
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            ticketData={displayedTickets} // Use the final filtered data here
          />
        </Content>
      </div>
    </div>
  );
};

export default Dashboard;
