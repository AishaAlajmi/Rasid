import React from 'react';

// Information Block Component
function InfoBlock({ title, content }) {
  const blockStyle = {
    backgroundColor: '#1F2A40',  // light gray background for blocks
    border: '1px solid #cccccc',  // lighter gray border
    padding: '10px',
    marginBottom: '10px',
  };

  const titleStyle = {
    margin: '0 0 10px 0',  // space below the title
    fontSize: '16px',  // slightly larger text
  };

  const contentStyle = {
    fontSize: '14px',
    margin: '0',
  };

  return (
    <div style={blockStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <p style={contentStyle}>{content}</p>
    </div>
  );
}

// Main High Temperature Alert Component
function HighTemperatureAlert() {
  const alertStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',  // subtle shadow for the whole component
    padding: '20px',
   backgroundColor: '#1F2A40',  // white background for the entire component
  };

  const headerStyle = {
    backgroundColor: '#2c3e50',  // dark blue header background
    padding: '10px 20px',
    fontSize: '24px',
    textAlign: 'center',
  };

  const sectionStyle = {
    margin: '20px 0',
  };

  const h2Style = {
    borderBottom: '2px solid #2c3e50',  // border under section titles
    paddingBottom: '10px',
    marginBottom: '20px',
  };

  return (
    <div style={alertStyle}>
      <header style={headerStyle}>
        <h1>High Temperature Alert</h1>
      </header>
      <section style={sectionStyle}>
        <h2 style={h2Style}>1. Basic Alert Information</h2>
        <InfoBlock title="Current Reading" content="95°C" />
        <InfoBlock title="Alert Time and Date" content="August 9, 2024, 10:15" />
        <InfoBlock title="Severity Level" content="Critical" />
      </section>
      <section style={sectionStyle}>
        <h2 style={h2Style}>2. Equipment Details</h2>
        <InfoBlock title="Equipment Name" content="Heat Exchanger HE-201" />
        <InfoBlock title="Location" content="Main Production Building, Second Floor, Manufacturing Section A" />
        <InfoBlock title="Equipment Type" content="Three-phase Electric Motor, 250 kW" />
        <InfoBlock title="Last Maintenance Date" content="July 15, 2024" />
      </section>
      <section style={sectionStyle}>
        <h2 style={h2Style}>3. Alert Cause Analysis</h2>
        <InfoBlock title="Description" content="High vibration exceeding the allowable limit by 25%" />
        <InfoBlock title="Possible Causes" content="Motor bearing fault (70% probability)" />
        <InfoBlock title="Additional Causes" content="Rotor imbalance (20%), Misalignment with load (10%)" />
      </section>
      <section style={sectionStyle}>
        <h2 style={h2Style}>4. Maintenance Recommendations</h2>
        <InfoBlock title="Immediate Actions" content="Reduce motor speed by 20% to decrease vibration" />
        <InfoBlock title="Recommended Maintenance Steps" content="Inspect and lubricate bearings (2 hours), Check rotor balance (3 hours), Inspect motor alignment with load (1 hour)" />
        <InfoBlock title="Required Tools" content="Vibration meter, lubrication tool, balancing equipment" />
      </section>
    </div>
  );
}

export default HighTemperatureAlert;
