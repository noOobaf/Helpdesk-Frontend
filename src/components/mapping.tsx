import React, { useState } from "react";
// CHANGED: Import useNavigate for routing
import { useNavigate } from "react-router-dom";
import { Layout, Card, Button, Space, Typography, Row, Col } from "antd";
// Removed unused Ant Design icon imports

// Import components (you'll need to adjust paths based on your project structure)
import WeWinSidebar from "./sidebar";
import WeWinHeader from "./headers";

const { Content } = Layout;
const { Title, Text } = Typography;

interface MappingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const MappingCard: React.FC<MappingCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
}) => (
  <Card
    hoverable
    // CHANGED: Added onClick to make the entire card clickable
    onClick={onButtonClick}
    style={{
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
    bodyStyle={{
      padding: "32px 24px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      flexGrow: 1,
    }}
  >
    <div>
      <div style={{ fontSize: "48px", color: "#6366f1", marginBottom: "24px" }}>
        {icon}
      </div>
      <Title level={3} style={{ marginBottom: "16px" }}>
        {title}
      </Title>
      <Text
        type="secondary"
        style={{
          minHeight: "60px",
          display: "block",
          marginBottom: "32px",
          lineHeight: "1.6",
        }}
      >
        {description}
      </Text>
    </div>
    <Button
      type="primary"
      size="large"
      // The onClick is now on the card, but we can leave it here too.
      // The parent onClick will handle navigation.
      onClick={(e) => {
        e.stopPropagation(); // Prevents the card's onClick from firing twice
        onButtonClick();
      }}
      style={{ background: "#6366f1", minWidth: "240px" }}
    >
      {/* OPTION 1: Add plus icon inside the button */}
      <img 
        src="/plus.svg" 
        alt="Plus" 
        style={{ 
          width: "16px", 
          height: "16px", 
          marginRight: "8px",
          filter: "invert(1)" // Makes the icon white if it's black
        }} 
      />
      {buttonText}
    </Button>
  </Card>
);

// Main Dashboard Component
const DispositionMappingDashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  // CHANGED: Initialize the navigate function
  const navigate = useNavigate();

  // --- Click Handlers for the cards ---
  // CHANGED: Updated handlers to use navigate
  const handleDispositionClick = () => {
    console.log("Navigating to /dispositions");
    navigate("/disposition");
  };

  const handleSubdispositionClick = () => {
    console.log("Navigating to /subdispositions");
    navigate("/subdispositions");
  };

  const handlePriorityMappingClick = () => {
    console.log("Navigating to /priority-mapping");
    navigate("/priority-mapping");
  };

  // Handlers from the header/sidebar template
  const handleSearch = (value: string) => console.log("Search:", value);
  const handleNotificationClick = () => console.log("Notification clicked");
  const handleUserMenuClick = (key: string) =>
    console.log("User menu clicked:", key);

  return (
    <div style={{ minHeight: "100vh" }}>
      <WeWinHeader
        sidebarCollapsed={sidebarCollapsed}
        userName="Upendra V"
        onSearch={handleSearch}
        onNotificationClick={handleNotificationClick}
        onUserMenuClick={handleUserMenuClick}
      />
      <WeWinSidebar
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
      />
      <div
        style={{
          marginLeft: sidebarCollapsed ? "80px" : "250px",
          marginTop: "64px",
          transition: "margin-left 0.2s",
          minHeight: "calc(100vh - 64px)",
          background: "#f8f9fa",
        }}
      >
        <Content style={{ padding: "40px" }}>
          {/* CHANGED: Added a wrapper div to center the content */}
          <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            <Title
              level={2}
              style={{
                textAlign: "center",
                marginBottom: "48px",
                fontWeight: 600,
              }}
            >
              Disposition, Subdisposition & Priority Mapping
            </Title>
            <Row gutter={[32, 32]} justify="center" align="stretch">
              <Col xs={24} sm={24} md={12} lg={8}>
                <MappingCard
                  icon={<img src="/settings.svg" alt="Disposition icon" />}
                  title="Disposition"
                  description="Disposition captures call outcomes, agent actions, and customer intent for accurate tracking and reporting."
                  // CHANGED: Updated button text
                  buttonText="Manage Dispositions"
                  onButtonClick={handleDispositionClick}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <MappingCard
                  icon={
                    <img src="/subdisposition.svg" alt="Subdisposition icon" />
                  }
                  title="Subdisposition"
                  description="Sub-disposition refines call outcomes, adding specific context for deeper insights and accurate reporting."
                  // CHANGED: Updated button text
                  buttonText="Manage Subdispositions"
                  onButtonClick={handleSubdispositionClick}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <MappingCard
                  icon={<img src="/priority.svg" alt="Priority Mapping icon" />}
                  title="Priority Mapping"
                  description="Priority Mapping aligns tasks with urgency and importance, ensuring efficient workflow and resource allocation."
                  // CHANGED: Updated button text
                  buttonText="Configure Priority Mapping"
                  onButtonClick={handlePriorityMappingClick}
                />
              </Col>
            </Row>
          </div>
        </Content>
      </div>
    </div>
  );
};

export default DispositionMappingDashboard;